import { gql, useMutation, useQuery } from '@apollo/client';
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    makeStyles,
    TextField,
    Theme,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbarMessage, openSnackBar } from 'src/store/system';
import * as yup from 'yup';
import { KeyFormModal_KeyQuery, KeyFormModal_UpsertKeyMutation } from '../../generated/graphql';

export const keyQuery = gql`
    query KeyFormModal_key($id: ID!) {
        key(where: { id: $id }) {
            id
            name
            plural
        }
    }
`;

export const upsertKeyMutation = gql`
    mutation KeyFormModal_upsertKey($id: ID, $name: String!, $plural: Boolean!, $screenId: ID!) {
        upsertKey(data: { name: $name, plural: $plural, screenId: $screenId }, where: { id: $id }) {
            id
            name
            plural
        }
    }
`;

export const addKeyMutation = gql`
    mutation KeyFormModal_upsertKey($name: String!, $plural: Boolean!, $screenId: ID!) {
        upsertKey(data: { name: $name, plural: $plural, screenId: $screenId }) {
            id
            name
            plural
        }
    }
`;

const validationSchema = yup.object({
    name: yup.string().min(1, 'Must be 1 characters or more').required('Required'),
});

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 400,
    },
    input: {
        marginBottom: theme.spacing(3),
    },
}));

const INITIAL_FORM_VALUES = {
    name: '',
    plural: false,
};

interface IProps {
    open: boolean;
    closeHandler: () => void;
    screenId: string;
    projectId: string;
    keyId: string;
}

const KeyFormModal: React.FC<IProps> = ({ screenId, projectId, keyId, open, closeHandler }) => {
    // const [open, setOpen] = useState(true);
    const [createAnother, setCreateAnother] = useState(false);
    const router = useRouter();
    // const {
    //     params: { screenId, projectId, keyId },
    // } = useRouteMatch();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [upsertKey, { loading: upsertKeyLoading }] = useMutation<KeyFormModal_UpsertKeyMutation>(
        keyId ? upsertKeyMutation : addKeyMutation,
        {
            refetchQueries: ['TranslatePage_screen'],
        },
    );

    const formik = useFormik({
        initialValues: INITIAL_FORM_VALUES,
        validationSchema,
        onSubmit: async values => {
            if (!createAnother) {
                try {
                    await upsertKey({ variables: { ...values, id: keyId, screenId } });
                    dispatch(setSnackbarMessage('Key is successfully added/edited'));
                    dispatch(openSnackBar());
                    closeHandler();
                } catch (error) {
                    dispatch(setSnackbarMessage(error.message));
                    dispatch(openSnackBar());
                }
            } else {
                try {
                    await upsertKey({ variables: { ...values, id: keyId, screenId } });
                    dispatch(setSnackbarMessage('Key is successfully added/edited'));
                    dispatch(openSnackBar());
                    formik.resetForm();
                } catch (error) {
                    dispatch(setSnackbarMessage(error.message));
                    dispatch(openSnackBar());
                }
            }
        },
    });

    const { loading: keyLoading } = useQuery<KeyFormModal_KeyQuery>(keyQuery, {
        variables: { id: keyId },
        skip: !keyId,
        onCompleted: data => {
            if (data) {
                formik.setValues(data.key);
            }
        },
    });
    return (
        <Dialog
            classes={{ paper: classes.root }}
            open={open}
            onClose={closeHandler}
            onExited={closeHandler}
            disableBackdropClick={upsertKeyLoading}
            disableEscapeKeyDown={upsertKeyLoading}
        >
            <DialogTitle>Key</DialogTitle>
            {keyLoading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <>
                        <DialogContent>
                            <TextField
                                id="name"
                                className={classes.input}
                                label="Name"
                                placeholder="name"
                                variant="outlined"
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                helperText={
                                    formik.touched.name ? formik.errors.name : 'No spaces and no periods please.'
                                }
                                error={formik.touched.name && Boolean(formik.errors.name)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="plural"
                                        value={formik.values.plural}
                                        onChange={formik.handleChange}
                                        checked={formik.values.plural}
                                    />
                                }
                                label="Plural"
                            />
                        </DialogContent>
                        <DialogActions>
                            {!keyId ? (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value={createAnother}
                                            onChange={() => setCreateAnother(!createAnother)}
                                            checked={createAnother}
                                        />
                                    }
                                    label="Create another"
                                />
                            ) : null}
                            <Button variant="contained" type="submit" color="primary" disabled={upsertKeyLoading}>
                                {upsertKeyLoading ? <CircularProgress size={10} /> : keyId ? 'Edit' : 'Add'}
                            </Button>
                            <Button onClick={closeHandler} color="primary" disabled={upsertKeyLoading}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </>
                </form>
            )}
        </Dialog>
    );
};

export default KeyFormModal;
