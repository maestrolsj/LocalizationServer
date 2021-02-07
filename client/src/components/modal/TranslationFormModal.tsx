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
import { useFormik } from 'formik';
import gql from 'graphql-tag';
import React from 'react';
import * as yup from 'yup';
import {
    TranslationFormModal_TranslationQuery,
    TranslationFormModal_UpsertTranslationMutation,
} from '../../generated/graphql';
import { useDispatch } from 'react-redux';
import { openSnackBar, setSnackbarMessage } from 'src/store/system';

export const translationQuery = gql`
    query TranslationFormModal_translation($id: ID!) {
        translation(where: { id: $id }) {
            id
            value
        }
    }
`;

export const upsertTranslationMutation = gql`
    mutation TranslationFormModal_upsertTranslation($id: ID, $value: String!, $keyId: ID!, $localeId: ID!) {
        upsertTranslation(data: { value: $value, keyId: $keyId, localeId: $localeId }, where: { id: $id }) {
            id
            value
        }
    }
`;
export const addTranslationMutation = gql`
    mutation TranslationFormModal_upsertTranslation($value: String!, $keyId: ID!, $localeId: ID!) {
        upsertTranslation(data: { value: $value, keyId: $keyId, localeId: $localeId }) {
            value
        }
    }
`;

const validationSchema = yup.object({
    value: yup.string().min(1, 'Must be 1 characters or more').required('Required'),
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
    screenId: string;
    projectId: string;
    keyId: string;
    translationId: string;
    localeId: string;
    open: boolean;
    closeHandler: () => void;
}

const TranslationFormModal: React.FC<IProps> = ({ keyId, translationId, localeId, open, closeHandler }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [
        upsertTranslation,
        { loading: upsertTranslationLoading },
    ] = useMutation<TranslationFormModal_UpsertTranslationMutation>(
        translationId ? upsertTranslationMutation : addTranslationMutation,
        {
            refetchQueries: ['TranslatePage_screen'],
        },
    );

    const formik = useFormik({
        initialValues: {
            value: '',
        },
        validationSchema,
        onSubmit: async values => {
            try {
                await upsertTranslation({
                    variables: { ...values, id: translationId, keyId, localeId },
                });
                dispatch(setSnackbarMessage('Translation is upserted successfully'));
                dispatch(openSnackBar());
            } catch (error) {
                dispatch(setSnackbarMessage(error.message));
                dispatch(openSnackBar());
            } finally {
                closeHandler();
            }
        },
    });

    const { loading: translationLoading } = useQuery<TranslationFormModal_TranslationQuery>(translationQuery, {
        variables: { id: translationId },
        skip: !translationId,
        onCompleted: data => {
            if (data) {
                formik.setValues(data.translation);
            }
        },
    });
    return (
        <Dialog
            classes={{ paper: classes.root }}
            open={open}
            onClose={closeHandler}
            onExited={closeHandler}
            disableBackdropClick={upsertTranslationLoading}
            disableEscapeKeyDown={upsertTranslationLoading}
        >
            <DialogTitle>Translation</DialogTitle>
            {translationLoading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            id="value"
                            className={classes.input}
                            rows={4}
                            multiline
                            label="Value"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.value}
                            helperText={formik.touched.value ? formik.errors.value : ''}
                            error={formik.touched.value && Boolean(formik.errors.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeHandler} color="primary" disabled={upsertTranslationLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={upsertTranslationLoading}>
                            {upsertTranslationLoading ? <CircularProgress size={10} /> : translationId ? 'Edit' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
};

export default TranslationFormModal;
