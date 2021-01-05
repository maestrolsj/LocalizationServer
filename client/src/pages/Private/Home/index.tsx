import React from "react";

import AppBar from "../../../smartComponents/AppBar";
import {
  Typography,
  makeStyles,
  Theme,
  Card,
  CardHeader,
  Button,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory, Route } from "react-router-dom";
import ProjectFormModal from "../ProjectFormModal";
import { Skeleton } from "@material-ui/lab";
import { useQuery } from "@apollo/react-hooks";
import projectsQuery from "./gql";
import { HomePage_ProjectsQuery } from "../../../generated/graphql";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    height: "calc(100% - 115px)",
  },
  addCard: {
    width: 300,
    minWidth: 300,
    backgroundColor: theme.palette.background.default,
    boxShadow: "none",
    border: "dashed grey 1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: theme.spacing(3),
    minHeight: 167,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  projectsContainer: {
    display: "flex",
    flexFlow: "row wrap",
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

const HomePage = () => {
  const classes = useStyles();
  const history = useHistory();

  const { data: projects, loading: projectsLoading } = useQuery<
    HomePage_ProjectsQuery
  >(projectsQuery);
  return (
    <>
      <AppBar />
      <div className={classes.root}>
        <CustomBreadcrumbs paths={[{ name: "Projects" }]} />
        <div className={classes.projectsContainer}>
          {projectsLoading ? (
            <ProjectCard loading />
          ) : (
            projects?.projects?.map((i) => (
              <ProjectCard
                key={i?.id ?? ""}
                k={i?.key ?? ""}
                name={i?.name ?? ""}
                description={i?.description ?? ""}
                onEditClick={() => history.push(`/home/project/${i?.id}`)}
                onTranslateClick={() =>
                  history.push(`/project/${i?.id}/screens`)
                }
              />
            ))
          )}

          <AddCard onClick={() => history.push("/home/project")} />
        </div>
        <Route exact path="/home/project" component={ProjectFormModal} />
        <Route exact path="/home/project/:id" component={ProjectFormModal} />
      </div>
    </>
  );
};

interface AddCardProps {
  onClick: () => void;
}

const AddCard: React.SFC<AddCardProps> = ({ onClick, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.addCard} onClick={onClick}>
      <AddIcon />
    </Card>
  );
};

interface ProjectCardProps {
  k?: string;
  name?: string;
  description?: string;
  onEditClick?: () => void;
  onTranslateClick?: () => void;
  loading?: boolean;
}

const ProjectCard: React.SFC<ProjectCardProps> = ({
  k,
  name,
  description,
  onEditClick,
  onTranslateClick,
  loading,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.languageCard}>
      <CardHeader
        title={
          loading ? (
            <Skeleton animation="wave" variant="rect" width={200} height={32} />
          ) : (
            `${k} - ${name}`
          )
        }
        action={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={48}
              height={48}
            />
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
          <Button
            size="small"
            type="submit"
            color="primary"
            onClick={onTranslateClick}
          >
            Translate
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default HomePage;
