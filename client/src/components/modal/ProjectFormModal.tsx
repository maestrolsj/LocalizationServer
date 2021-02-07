import { gql, OperationVariables, QueryLazyOptions, useMutation, useQuery } from '@apollo/client';
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
import { useRouter } from 'next/router';
import React from 'react';
import * as yup from 'yup';
import { ProjectFormModal_ProjectQuery, ProjectFormModal_UpsertProjectMutation } from '../../generated/graphql';
import { useDispatch } from 'react-redux';
import { openSnackBar, setSnackbarMessage } from 'src/store/system';

const validationSchema = yup.object({
    key: yup.string().min(1, 'Must be 1 characters or more').required('Required'),
    name: yup.string().min(3, 'Must be 3 characters or more').required('Required'),
});

const projectsQuery = gql`
    query ProjectFormModal_project($id: ID!) {
        project(where: { id: $id }) {
            id
            key
            name
            description
        }
    }
`;

const insertProjectMutation = gql`
    mutation ProjectFormModal_upsertProject($key: String!, $name: String!, $description: String!) {
        upsertProject(data: { key: $key, name: $name, description: $description }) {
            id
            key
            name
            description
        }
    }
`;

const upsertProjectMutation = gql`
    mutation ProjectFormModal_upsertProject($id: ID, $key: String!, $name: String!, $description: String!) {
        upsertProject(data: { key: $key, name: $name, description: $description }, where: { id: $id }) {
            id
            key
            name
            description
        }
    }
`;

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
    open: boolean;
    closeHandler: () => void;
    getProjectList: (options?: QueryLazyOptions<OperationVariables>) => void;
}

const ProjectFormModal: React.FC<IProps> = ({ id, open, closeHandler, getProjectList }) => {
    const router = useRouter();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [upsertProject, { loading: upsertProjectLoading }] = useMutation<ProjectFormModal_UpsertProjectMutation>(
        id ? upsertProjectMutation : insertProjectMutation,
        { refetchQueries: ['HomePage_projects'] },
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
                await upsertProject({ variables: { ...values, id } });
                await getProjectList();
                dispatch(setSnackbarMessage('Project is upserted successfully'));
                dispatch(openSnackBar());
            } catch (error) {
                dispatch(setSnackbarMessage(error.message));
                dispatch(openSnackBar());
            } finally {
                closeHandler();
            }
        },
    });

    const { loading: projectLoading } = useQuery<ProjectFormModal_ProjectQuery>(projectsQuery, {
        variables: { id },
        skip: !id,
        onCompleted: data => {
            if (data) {
                formik.setValues(data.project);
            }
        },
    });

    return (
        <Dialog
            classes={{ paper: classes.root }}
            open={open}
            onClose={closeHandler}
            onExited={() => router.push('/home')}
            disableBackdropClick={upsertProjectLoading}
            disableEscapeKeyDown={upsertProjectLoading}
        >
            <DialogTitle>Project</DialogTitle>
            {projectLoading ? (
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
                        <Button onClick={closeHandler} color="primary" disabled={upsertProjectLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" disabled={upsertProjectLoading}>
                            {upsertProjectLoading ? <CircularProgress size={10} /> : id ? 'Edit' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            )}
        </Dialog>
    );
};

export default ProjectFormModal;
