import { gql, useMutation, useQuery } from '@apollo/client';
import { Chip, makeStyles, Theme, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import MainLayout from 'src/layout/MainLayout';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';
import LocaleFormModal from '../../components/modal/LocaleFormModal';
import ScreenFormModal from '../../components/modal/ScreenFormModal';
import ScreenOptionsModal from '../../components/modal/ScreenOptionsModal';
import TranslationFormModal from '../../components/modal/TranslationFormModal';
import { Screen_ProjectQuery } from '../../generated/graphql';
import { useDispatch } from 'react-redux';
import { openSnackBar, setSnackbarMessage } from 'src/store/system';

const projectsQuery = gql`
    query Screen_project($id: ID!) {
        project(where: { id: $id }) {
            id
            key
            name
            description
            screens {
                id
                name
            }
            locales {
                id
                name
            }
        }
    }
`;

const deleteScreenMutation = gql`
    mutation TranslationFormModal_deleteScreen($id: ID!) {
        deleteScreen(data: { id: $id })
    }
`;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        height: 'calc(100% - 115px)',
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    projectNameContainer: {
        marginBottom: theme.spacing(3),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    screensContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        marginBottom: theme.spacing(3),
    },
    screenChip: {
        minWidth: 225,
        maxWidth: 225,
        width: 225,
        margin: theme.spacing(2),
        cursor: 'pointer',
    },
    addChip: {
        cursor: 'pointer',
        borderStyle: 'dashed',
        color: 'rgba(0, 0, 0, 0.6)',
        margin: theme.spacing(2),
    },
    screenLoading: {
        borderRadius: 16,
        minWidth: 225,
        maxWidth: 225,
        width: 225,
        marginRight: theme.spacing(3),
    },
}));

const ScreenPage = () => {
    const classes = useStyles();
    const [search, setSearch] = useState<string>('');
    const [openLocale, setOpenLocale] = useState<boolean>(false);
    const [openTranslation, setOpenTranslation] = useState<boolean>(false);
    const [openScreenOptions, setOpenScreenOptions] = useState<boolean>(false);
    const [openScreenForm, setOpenScreenForm] = useState<boolean>(false);
    const [screenId, setScreenId] = useState<string>(null);
    const [localeId, setLocaleId] = useState<string>(null);
    const dispatch = useDispatch();

    const [deleteScreen] = useMutation(deleteScreenMutation, {
        refetchQueries: ['Screen_project'],
    });

    const onCloseLocaleHandler = useCallback(() => {
        setOpenLocale(false);
    }, []);
    const onCloseTranslationHandler = useCallback(() => {
        setOpenTranslation(false);
    }, []);
    const onCloseScreenOptionHandler = useCallback(() => {
        setOpenScreenOptions(false);
    }, []);
    const onOpenScreenFormHandler = useCallback(() => {
        setOpenScreenOptions(false);
        setOpenScreenForm(true);
    }, []);
    const onCloseScreenFormHandler = useCallback(() => {
        setOpenScreenForm(false);
    }, []);

    const onDeleteHandler = useCallback(async () => {
        console.log(screenId);
        try {
            await deleteScreen({ variables: { id: screenId } });
            dispatch(setSnackbarMessage('Screen is deleted successfully'));
            dispatch(openSnackBar());
        } catch (error) {
            dispatch(setSnackbarMessage(error.message));
            dispatch(openSnackBar());
        }

        onCloseScreenOptionHandler();
    }, [deleteScreen, dispatch, onCloseScreenOptionHandler, screenId]);

    const router = useRouter();
    const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

    const { data: project, loading: projectLoading } = useQuery<Screen_ProjectQuery>(projectsQuery, {
        variables: { id },
    });

    return (
        <MainLayout>
            <div className={classes.root}>
                <CustomBreadcrumbs paths={[{ name: 'Projects', path: '/home' }, { name: 'Screens' }]} />
                <div className={classes.projectNameContainer}>
                    {projectLoading ? (
                        <Skeleton animation="wave" variant="rect" width={300} height={55} />
                    ) : (
                        <Typography variant="h3">{project?.project.name}</Typography>
                    )}
                </div>
                <div className={classes.screensContainer}>
                    {projectLoading ? (
                        <CustomChip loading />
                    ) : (
                        project?.project?.screens
                            ?.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                            .map(i => (
                                <CustomChip
                                    key={i?.id}
                                    name={i?.name}
                                    onClick={() => {
                                        setScreenId(i.id);
                                        console.log(screenId);
                                        setOpenScreenOptions(true);
                                    }}
                                />
                            ))
                    )}
                    <AddChip
                        onClick={() => {
                            setScreenId(null);
                            setOpenScreenForm(true);
                        }}
                    />
                </div>
                <Typography variant="h4" className={classes.title}>
                    Supported Locales
                </Typography>
                <div className={classes.screensContainer}>
                    {projectLoading ? (
                        <CustomChip loading />
                    ) : (
                        project?.project?.locales
                            ?.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                            .map(i => (
                                <CustomChip
                                    key={i?.id}
                                    name={i?.name}
                                    onClick={() => {
                                        setLocaleId(i.id);
                                        setOpenLocale(true);
                                    }}
                                />
                            ))
                    )}
                    <AddChip
                        onClick={() => {
                            setLocaleId(null);
                            setOpenLocale(true);
                        }}
                    />
                </div>
            </div>
            <LocaleFormModal open={openLocale} closeHandler={onCloseLocaleHandler} localeId={localeId} projectId={id} />
            <TranslationFormModal
                open={openTranslation}
                closeHandler={onCloseTranslationHandler}
                localeId={localeId}
                projectId={id}
                screenId={screenId}
                keyId={'1'}
                translationId={'1'}
            />
            <ScreenOptionsModal
                open={openScreenOptions}
                closeHandler={onCloseScreenOptionHandler}
                projectId={id}
                screenId={screenId}
                onEdit={onOpenScreenFormHandler}
                onDelete={onDeleteHandler}
            />
            <ScreenFormModal
                open={openScreenForm}
                closeHandler={onCloseScreenFormHandler}
                projectId={id}
                screenId={screenId}
            />
            {/* <Route exact path="/project/:projectId/screens/screen" component={ScreenFormModal} />
            <Route exact path="/project/:projectId/screens/screen/:screenId" component={ScreenFormModal} />
            <Route exact path="/project/:projectId/screens/screen/:screenId/options" component={ScreenOptionsModal} />
            <Route exact path="/project/:projectId/screens/locale" component={LocaleFormModal} />
            <Route exact path="/project/:projectId/screens/locale/:localeId" component={LocaleFormModal} /> */}
        </MainLayout>
    );
};

interface AddChipProps {
    onClick?: () => void;
}

const AddChip: React.FC<AddChipProps> = ({ onClick }) => {
    const classes = useStyles();

    return (
        <Chip
            className={classes.addChip}
            onClick={onClick}
            variant="outlined"
            avatar={<AddIcon style={{ color: 'rgba(0, 0, 0, 0.23)' }} />}
            label="Add"
        />
    );
};

interface CustomChipProps {
    name?: string;
    loading?: boolean;
    onClick?: () => void;
}

const CustomChip: React.FC<CustomChipProps> = ({ name, loading, onClick }) => {
    const classes = useStyles();
    return loading ? (
        <Skeleton className={classes.screenLoading} variant="rect" width={150} height={32} />
    ) : (
        <Chip onClick={onClick} className={classes.screenChip} label={name} deleteIcon={<DoneIcon />} />
    );
};

export default ScreenPage;
