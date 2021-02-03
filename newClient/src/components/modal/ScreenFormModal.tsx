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
import { useRouter } from 'next/router';
import React from 'react';
import * as yup from 'yup';
import { ScreenFormModal_ScreenQuery, ScreenFormModal_UpsertScreenMutation } from '../../generated/graphql';
import { useDispatch } from 'react-redux';
import { openSnackBar, setSnackbarMessage } from 'src/store/system';

const screensQuery = gql`
    query ScreenFormModal_screen($id: ID!) {
        screen(where: { id: $id }) {
            id
            key
            name
            description
        }
    }
`;

const upsertScreenMutation = gql`
    mutation ScreenFormModal_upsertScreen(
        $id: ID
        $key: String!
        $name: String!
        $description: String!
        $projectId: ID!
    ) {
        upsertScreen(
            data: { key: $key, name: $name, description: $description, projectId: $projectId }
            where: { id: $id }
        ) {
            id
            key
            name
            description
        }
    }
`;

const validationSchema = yup.object({
    key: yup.string().min(1, 'Must be 1 characters or more').required('Required'),
    name: yup.string().min(3, 'Must be 3 characters or more').required('Required'),
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
    open: boolean;
    closeHandler: () => void;
}

const ScreenFormModal: React.FC<IProps> = ({ screenId, projectId, open, closeHandler }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [upsertScreen, { loading: upsertScreenLoading }] = useMutation<ScreenFormModal_UpsertScreenMutation>(
        upsertScreenMutation,
        { refetchQueries: ['Screen_project'] },
    );

    const formik = useFormik({
        initialValues: {
            key: '',
            name: '',
            description: '',
        },
        validationSchema,
        onSubmit: async values => {
            try {
                await upsertScreen({ variables: { ...values, id: screenId, projectId } });
                dispatch(setSnackbarMessage('Screen is upserted successfully'));
                dispatch(openSnackBar());
            } catch (error) {
                dispatch(setSnackbarMessage(error.message));
                dispatch(openSnackBar());
            } finally {
                closeHandler();
            }
        },
    });

    const { loading: screenLoading } = useQuery<ScreenFormModal_ScreenQuery>(screensQuery, {
        variables: { id: screenId },
        skip: !screenId,
        onCompleted: data => {
            if (data) {
                formik.setValues(data.screen);
            }
        },
    });

    return (
        <Dialog
            classes={{ paper: classes.root }}
            open={open}
            onClose={closeHandler}
            onExited={closeHandler}
            disableBackdropClick={upsertScreenLoading}
            disableEscapeKeyDown={upsertScreenLoading}
        >
            <DialogTitle>Screen</DialogTitle>
            {screenLoading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            id="key"
                            className={classes.input}
                            label="Key"
                            placeholder="A serious key."
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.key}
                            helperText={formik.touched.key ? formik.errors.key : ''}
                            error={formik.touched.key && Boolean(formik.errors.key)}
                        />
                        <TextField
                            id="name"
                            className={classes.input}
                            label="Name"
                            placeholder="My awesome project!"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            helperText={formik.touched.name ? formik.errors.name : ''}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                        />
                        <TextField
                            id="description"
                            className={classes.input}
                            multiline
                            rows={3}
                            label="Description"
                            placeholder="I'm awesome thats all."
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            helperText={formik.touched.description ? formik.errors.description : ''}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeHandler} color="primary" disabled={upsertScreenLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={upsertScreenLoading}>
                            {upsertScreenLoading ? <CircularProgress size={10} /> : screenId ? 'Edit' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
};

export default ScreenFormModal;
