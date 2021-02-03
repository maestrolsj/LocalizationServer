import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Skeleton } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import MainLayout from 'src/layout/MainLayout';
import { openSnackBar, setSnackbarMessage } from 'src/store/system';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';
import ProjectFormModal from '../../components/modal/ProjectFormModal';
import { HomePage_ProjectsQuery, ProjectFormModal_UpsertProjectMutation } from '../../generated/graphql';
import { useDispatch } from 'react-redux';

const deleteProjectMutation = gql`
    mutation ProjectFormModal_deleteProject($id: ID!) {
        deleteProject(data: { id: $id }) {
            id
            key
            name
            description
        }
    }
`;

export const readProjectsQuery = gql`
    query HomePage_projects {
        projects {
            id
            key
            name
            description
        }
    }
`;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        height: 'calc(100% - 115px)',
    },
    addCard: {
        width: 300,
        minWidth: 300,
        backgroundColor: theme.palette.background.default,
        boxShadow: 'none',
        border: 'dashed grey 1px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        margin: theme.spacing(3),
        minHeight: 167,
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    projectsContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    languageCard: {
        maxHeight: 200,
        width: 300,
        minWidth: 300,
        margin: theme.spacing(3),
    },
    languageCardSkeleton: {
        maxHeight: 200,
        width: 300,
        minWidth: 300,
        margin: theme.spacing(3),
    },
}));

const HomePageIndex: React.FC = () => {
    const classes = useStyles();
    const router = useRouter();
    const [getProjectList, { data: projects, loading: projectsLoading }] = useLazyQuery<HomePage_ProjectsQuery>(
        readProjectsQuery,
    );
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState('');

    const onCloseHandler = useCallback(() => {
        setOpen(false);
    }, []);

    useEffect(() => {
        getProjectList();
    }, [getProjectList]);

    return (
        <MainLayout>
            <div className={classes.root}>
                <CustomBreadcrumbs paths={[{ name: 'Projects' }]} />
                <div className={classes.projectsContainer}>
                    {projectsLoading ? (
                        <ProjectCard loading />
                    ) : (
                        projects?.projects?.map(i => (
                            <ProjectCard
                                key={i?.id ?? ''}
                                k={i?.key ?? ''}
                                id={i.id}
                                name={i?.name ?? ''}
                                description={i?.description ?? ''}
                                onEditClick={() => {
                                    setId(i.id);
                                    setOpen(true);
                                }}
                                onTranslateClick={() => router.push(`/project/${i?.id}`)}
                            />
                        ))
                    )}
                    <AddCard
                        onClick={() => {
                            setId('');
                            setOpen(true);
                        }}
                    />
                </div>
            </div>
            <ProjectFormModal open={open} closeHandler={onCloseHandler} id={id} getProjectList={getProjectList} />
        </MainLayout>
    );
};

interface AddCardProps {
    onClick: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ onClick }) => {
    const classes = useStyles();

    return (
        <Card className={classes.addCard} onClick={onClick}>
            <AddIcon />
        </Card>
    );
};

interface ProjectCardProps {
    k?: string;
    id?: string;
    name?: string;
    description?: string;
    onEditClick?: () => void;
    onTranslateClick?: () => void;
    loading?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    id,
    k,
    name,
    description,
    onEditClick,
    onTranslateClick,
    loading,
}) => {
    const classes = useStyles();
    const [deleteProject] = useMutation<ProjectFormModal_UpsertProjectMutation>(deleteProjectMutation, {
        refetchQueries: ['HomePage_projects'],
    });
    const dispatch = useDispatch();

    const onDeleteProjectHandler = useCallback(async () => {
        try {
            await deleteProject({ variables: { id } });
            dispatch(setSnackbarMessage('Project is deleted successfully'));
            dispatch(openSnackBar());
        } catch (error) {
            dispatch(setSnackbarMessage(error.message));
            dispatch(openSnackBar());
        }
    }, [deleteProject, dispatch, id]);

    return (
        <Card className={classes.languageCard}>
            <CardHeader
                title={
                    loading ? <Skeleton animation="wave" variant="rect" width={200} height={32} /> : `${k} - ${name}`
                }
                action={
                    loading ? (
                        <Skeleton animation="wave" variant="circle" width={48} height={48} />
                    ) : (
                        <IconButton onClick={onEditClick}>
                            <EditIcon />
                        </IconButton>
                    )
                }
            />
            <CardContent>
                {loading ? (
                    <Skeleton animation="wave" variant="rect" width={230} height={25} />
                ) : (
                    <Typography noWrap>{description}</Typography>
                )}
            </CardContent>
            <CardActions>
                {loading ? (
                    <Skeleton animation="wave" variant="rect" width={90} height={20} />
                ) : (
                    <>
                        <Button size="small" type="submit" color="primary" onClick={onTranslateClick}>
                            Translate
                        </Button>
                        <Button size="small" type="submit" color="primary" onClick={onDeleteProjectHandler}>
                            Delete
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default HomePageIndex;
