import { useMutation, useQuery } from '@apollo/client';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    TextField,
    Theme,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useFormik } from 'formik';
import gql from 'graphql-tag';
import iso from 'iso-639-1';
import { useRouter } from 'next/router';
import React from 'react';
import * as yup from 'yup';
import { LocaleFormModal_LocaleQuery, LocaleFormModal_UpsertLocaleMutation } from '../../generated/graphql';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage, openSnackBar } from 'src/store/system';

const localesQuery = gql`
    query LocaleFormModal_locale($id: ID!) {
        locale(where: { id: $id }) {
            id
            name
            code
            nativeName
        }
    }
`;

const upsertLocaleMutation = gql`
    mutation LocaleFormModal_upsertLocale(
        $id: ID
        $name: String!
        $nativeName: String!
        $code: String!
        $projectId: ID!
    ) {
        upsertLocale(
            data: { name: $name, nativeName: $nativeName, code: $code, projectId: $projectId }
            where: { id: $id }
        ) {
            id
            name
            nativeName
            code
        }
    }
`;

const addLocaleMutation = gql`
    mutation LocaleFormModal_upsertLocale($name: String!, $nativeName: String!, $code: String!, $projectId: ID!) {
        upsertLocale(data: { name: $name, nativeName: $nativeName, code: $code, projectId: $projectId }) {
            id
            name
            nativeName
            code
        }
    }
`;

const languages = iso.getAllNames().map(i => ({
    code: iso.getCode(i),
    name: i,
    nativeName: iso.getNativeName(iso.getCode(i)),
}));

const validationSchema = yup.object({
    code: yup.string().min(1, 'Required').required('Required'),
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 400,
    },
    input: {
        marginBottom: theme.spacing(3),
    },
}));

interface IProps {
    id?: string;
    localeId?: string;
    projectId?: string;
    open: boolean;
    closeHandler: () => void;
}

const LocaleFormModal: React.FC<IProps> = ({ open, closeHandler, localeId, projectId }) => {
    const router = useRouter();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [upsertLocale, { loading: upsertLocaleLoading }] = useMutation<LocaleFormModal_UpsertLocaleMutation>(
        localeId ? upsertLocaleMutation : addLocaleMutation,
        { refetchQueries: ['Screen_project'] },
    );

    const formik = useFormik({
        initialValues: {
            name: '',
            nativeName: '',
            code: '',
        },
        validationSchema,
        onSubmit: async values => {
            console.log({ ...values, id: localeId, projectId });
            try {
                await upsertLocale({ variables: { ...values, id: localeId, projectId } });
                dispatch(setSnackbarMessage('Locale is upserted successfully'));
                dispatch(openSnackBar());
                closeHandler();
            } catch (error) {
                dispatch(setSnackbarMessage(error.message));
                dispatch(openSnackBar());
                closeHandler();
            }
        },
    });

    const { loading: screenLoading } = useQuery<LocaleFormModal_LocaleQuery>(localesQuery, {
        variables: { id: localeId },
        skip: !localeId,
        onCompleted: data => {
            if (data) {
                formik.setValues(data.locale);
            }
        },
    });
    console.log(formik.values);
    return (
        <Dialog
            classes={{ paper: classes.root }}
            open={open}
            onClose={closeHandler}
            onExited={() => router.push(`/project/${projectId}`)}
            disableBackdropClick={upsertLocaleLoading}
            disableEscapeKeyDown={upsertLocaleLoading}
        >
            <DialogTitle>Locale</DialogTitle>
            {screenLoading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <>
                        <DialogContent>
                            <Autocomplete
                                options={[formik.initialValues, ...languages]}
                                getOptionLabel={option => option.name}
                                getOptionSelected={option => option.code === formik.values.code}
                                onChange={(e: React.ChangeEvent<unknown>, value: any) =>
                                    formik.setValues(value ? value : formik.initialValues)
                                }
                                value={formik.values}
                                autoSelect
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        placeholder="Ex: English"
                                        variant="outlined"
                                        helperText={formik.touched.code ? formik.errors.code : ''}
                                        error={formik.touched.code && Boolean(formik.errors.code)}
                                    />
                                )}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeHandler} color="primary" disabled={upsertLocaleLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" disabled={upsertLocaleLoading}>
                                {upsertLocaleLoading ? <CircularProgress size={10} /> : localeId ? 'Edit' : 'Add'}
                            </Button>
                        </DialogActions>
                    </>
                </form>
            )}
        </Dialog>
    );
};

export default LocaleFormModal;
