import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Chip, IconButton, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CodeIcon from '@material-ui/icons/Code';
import DeleteIcon from '@material-ui/icons/Delete';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import omit from 'lodash/omit';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import KeyFormModal from 'src/components/modal/KeyFormModal';
import TranslationFormModal from 'src/components/modal/TranslationFormModal';
import MainLayout from 'src/layout/MainLayout';
import { openSnackBar, setSnackbarMessage } from 'src/store/system/actions';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';
import {
    TranslatePage_DeleteKeyMutation,
    TranslatePage_ProjectQuery,
    TranslatePage_ScreenQuery,
} from '../../generated/graphql';
import { useDispatch } from 'react-redux';

export const projectQuery = gql`
    query TranslatePage_project($id: ID!) {
        project(where: { id: $id }) {
            locales {
                id
                name
                nativeName
                code
            }
        }
    }
`;

export const screenQuery = gql`
    query TranslatePage_screen($id: ID!) {
        screen(where: { id: $id }) {
            id
            name
            description
            keys {
                id
                name
                plural
                translations {
                    id
                    value
                    locale {
                        id
                    }
                }
            }
        }
    }
`;

export const deleteKeyMutation = gql`
    mutation TranslatePage_deleteKey($id: ID!) {
        deleteKey(where: { id: $id })
    }
`;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        height: 'calc(100% - 115px)',
    },
    languages: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageField: {
        width: 300,
    },
    switchButton: {
        margin: theme.spacing(3),
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(3),
    },
    screenTitle: {
        width: '100%',
        textAlign: 'center',
    },
    screenDescription: {
        margin: theme.spacing(3),
    },
    keyItem: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #eee',
    },
    keyTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 12,
    },
    keyTitle: {
        color: 'cornflowerblue',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    translationsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    translationContainer: {
        width: '50%',
        height: '100%',
        cursor: 'pointer',
    },
    translation: {
        padding: theme.spacing(1),
        cursor: 'pointer',
    },
    leftContainer: { height: '100%' },
    rightContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    spacer: { flex: 2 },
    noTranslation: {
        color: 'rgba(0,0,0,0.4)',
        padding: theme.spacing(1),
    },
}));

const INITIAL_LANGUAGE = {
    id: '',
    code: '',
    nativeName: '',
    name: '',
};

const ScreenPage = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [leftLanguage, setLeftLanguage] = useState(INITIAL_LANGUAGE);
    const [rightLanguage, setRightLanguage] = useState(INITIAL_LANGUAGE);
    const [keyId, setKeyId] = useState<string>(null);
    const [localeId, setLocaleId] = useState<string>(null);
    const [translationId, setTranslationId] = useState<string>(null);
    const [openKeyFormModal, setOpenKeyFormModal] = useState<boolean>(false);
    const [openTranslationFormModal, setOpenTranslationFormModal] = useState<boolean>(false);

    const onCloseKeyFormModalHandler = useCallback(() => {
        setOpenKeyFormModal(false);
    }, []);

    const onCloseTranslationFormModalHandler = useCallback(() => {
        setOpenTranslationFormModal(false);
    }, []);

    const router = useRouter();
    const projectId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
    const screenId = Array.isArray(router.query.screenId) ? router.query.screenId[0] : router.query.screenId;
    const dispatch = useDispatch();

    const { data: project, loading: projectLoading } = useQuery<TranslatePage_ProjectQuery>(projectQuery, {
        variables: { id: projectId },
    });

    const { data: screen } = useQuery<TranslatePage_ScreenQuery>(screenQuery, {
        variables: { id: screenId },
        skip: !screenId,
    });

    const [deleteKey] = useMutation<TranslatePage_DeleteKeyMutation>(deleteKeyMutation, {
        refetchQueries: ['TranslatePage_screen'],
    });

    const onDeleteKeyHandler = useCallback(
        async i => {
            setKeyId(i.id);
            try {
                await deleteKey({ variables: { id: i.id } });
                dispatch(setSnackbarMessage('Key is deleted successfully'));
                dispatch(openSnackBar());
            } catch (error) {
                dispatch(setSnackbarMessage(error.message));
                dispatch(openSnackBar());
            }
        },
        [deleteKey, dispatch],
    );

    return (
        <MainLayout>
            <div className={classes.root}>
                <CustomBreadcrumbs
                    paths={[
                        { name: 'Projects', path: '/home' },
                        { name: 'Screens', path: `/project/${projectId}` },
                        { name: 'Translate' },
                    ]}
                />
                <Typography className={classes.screenTitle} variant="h3">
                    {screen?.screen?.name}
                </Typography>
                <Typography className={classes.screenDescription}>{screen?.screen?.description}</Typography>
                {!projectLoading ? (
                    <div className={classes.languages}>
                        <Autocomplete
                            className={classes.languageField}
                            disableClearable
                            options={project?.project.locales ?? []}
                            getOptionLabel={option => option.name}
                            getOptionSelected={option => (leftLanguage ? option.code === leftLanguage.code : false)}
                            onChange={(_event, value: any) => setLeftLanguage(value ?? INITIAL_LANGUAGE)}
                            value={leftLanguage}
                            autoSelect
                            renderInput={params => (
                                <TextField {...params} placeholder="Ex: English" variant="outlined" />
                            )}
                        />
                        <IconButton
                            className={classes.switchButton}
                            onClick={() => {
                                setLeftLanguage(rightLanguage);
                                setRightLanguage(leftLanguage);
                            }}
                        >
                            <CodeIcon />
                        </IconButton>
                        <Autocomplete
                            className={classes.languageField}
                            disableClearable
                            options={project?.project.locales ?? []}
                            getOptionLabel={option => option.name}
                            getOptionSelected={option => option.code === rightLanguage.code}
                            onChange={(_event, value: any) =>
                                setRightLanguage(
                                    (omit(value, '__typename') as {
                                        id: string;
                                        code: string;
                                        nativeName: string;
                                        name: string;
                                    }) ?? INITIAL_LANGUAGE,
                                )
                            }
                            value={rightLanguage}
                            renderInput={params => (
                                <TextField {...params} placeholder="Ex: English" variant="outlined" />
                            )}
                        />
                    </div>
                ) : null}
                {leftLanguage.code.length > 0 && rightLanguage.code.length > 0 ? (
                    <>
                        <div className={classes.actionsContainer}>
                            <Button
                                color="primary"
                                onClick={() => {
                                    setKeyId(null);
                                    setOpenKeyFormModal(true);
                                }}
                                startIcon={<AddIcon />}
                                variant="contained"
                            >
                                Add
                            </Button>
                        </div>
                        {screen?.screen.keys
                            .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                            .reverse()
                            .map(i => {
                                const filteredLeftTranslation = i.translations.filter(
                                    x => x.locale.id === leftLanguage.id,
                                );
                                const leftTranslation =
                                    filteredLeftTranslation.length > 0 ? filteredLeftTranslation[0] : null;

                                const filteredRightTranslation = i.translations.filter(
                                    x => x.locale.id === rightLanguage.id,
                                );
                                const rightTranslation =
                                    filteredRightTranslation.length > 0 ? filteredRightTranslation[0] : null;
                                return (
                                    <KeyItem
                                        key={i.id}
                                        k={i.name}
                                        plural={i.plural}
                                        leftTranslation={leftTranslation}
                                        rightTranslation={rightTranslation}
                                        onKeyClick={() => {
                                            setKeyId(i.id);
                                            setOpenKeyFormModal(true);
                                        }}
                                        leftLanguage={leftLanguage}
                                        rightLanguage={rightLanguage}
                                        onLeftLanguageClick={
                                            leftTranslation
                                                ? () => {
                                                      setKeyId(i.id);
                                                      setLocaleId(leftLanguage.id);
                                                      setTranslationId(leftTranslation.id);
                                                      setOpenTranslationFormModal(true);
                                                  }
                                                : () => {
                                                      setKeyId(i.id);
                                                      setLocaleId(leftLanguage.id);
                                                      setTranslationId(null);
                                                      setOpenTranslationFormModal(true);
                                                  }
                                        }
                                        onRightLanguageClick={
                                            rightTranslation
                                                ? () => {
                                                      setKeyId(i.id);
                                                      setLocaleId(rightLanguage.id);
                                                      setTranslationId(rightTranslation.id);
                                                      setOpenTranslationFormModal(true);
                                                  }
                                                : () => {
                                                      setKeyId(i.id);
                                                      setLocaleId(rightLanguage.id);
                                                      setTranslationId(null);
                                                      setOpenTranslationFormModal(true);
                                                  }
                                        }
                                        onDeleteKey={() => onDeleteKeyHandler(i)}
                                    />
                                );
                            })}
                    </>
                ) : null}
            </div>
            <KeyFormModal
                closeHandler={onCloseKeyFormModalHandler}
                keyId={keyId}
                open={openKeyFormModal}
                screenId={screenId}
                projectId={projectId}
            />
            <TranslationFormModal
                closeHandler={onCloseTranslationFormModalHandler}
                projectId={projectId}
                screenId={screenId}
                open={openTranslationFormModal}
                keyId={keyId}
                translationId={translationId}
                localeId={localeId}
            />
            {/* <Route exact path="/project/:projectId/screen/:screenId/translate/key" component={KeyFormModal} />
            <Route exact path="/project/:projectId/screen/:screenId/translate/key/:keyId" component={KeyFormModal} />
            <Route
                exact
                path="/project/:projectId/screen/:screenId/translate/key/:keyId/locale/:localeId/translation"
                component={TranslationFormModal}
            />
            <Route
                exact
                path="/project/:projectId/screen/:screenId/translate/key/:keyId/locale/:localeId/translation/:translationId"
                component={TranslationFormModal}
            /> */}
        </MainLayout>
    );
};

const KeyItem = ({
    k,
    leftTranslation,
    rightTranslation,
    rightLanguage,
    leftLanguage,
    plural,
    onKeyClick,
    onLeftLanguageClick,
    onRightLanguageClick,
    onDeleteKey,
}: any) => {
    const classes = useStyles();
    return (
        <div className={classes.keyItem}>
            <div className={classes.keyTitleContainer}>
                <Typography onClick={onKeyClick} className={classes.keyTitle}>
                    {k}
                </Typography>
                <div className={classes.spacer} />
                {plural ? <Chip label="PLURAL" color="secondary" /> : null}
                <IconButton onClick={onDeleteKey}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className={classes.translationsContainer}>
                <div
                    className={clsx(classes.translationContainer, classes.leftContainer)}
                    onClick={onLeftLanguageClick}
                >
                    {leftTranslation ? (
                        <Typography className={classes.translation}>{leftTranslation.value}</Typography>
                    ) : (
                        <Typography className={classes.noTranslation}>
                            Click to translate to {leftLanguage.name}
                        </Typography>
                    )}
                </div>
                <div
                    className={clsx(classes.translationContainer, classes.rightContainer)}
                    onClick={onRightLanguageClick}
                >
                    {rightTranslation ? (
                        <Typography className={classes.translation}>{rightTranslation.value}</Typography>
                    ) : (
                        <Typography className={classes.noTranslation}>
                            Click to translate to {rightLanguage.name}
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScreenPage;
