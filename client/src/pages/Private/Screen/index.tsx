import React, { useState } from "react";

import AppBar from "../../../smartComponents/AppBar";
import { makeStyles, Theme, Typography, Chip } from "@material-ui/core";
import { projectsQuery } from "./gql";
import { Screen_ProjectQuery } from "../../../generated/graphql";
import { useQuery } from "@apollo/react-hooks";
import { useRouteMatch, Route, useHistory } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import ScreenFormModal from "../ScreenFormModal";
import LocaleFormModal from "../LocaleFormModal";
import ScreenOptionsModal from "../ScreenOptionsModal";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    height: "calc(100% - 115px)",
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  projectNameContainer: {
    marginBottom: theme.spacing(3),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  screensContainer: {
    display: "flex",
    flexFlow: "row wrap",
    marginBottom: theme.spacing(3),
  },
  screenChip: {
    minWidth: 225,
    maxWidth: 225,
    width: 225,
    margin: theme.spacing(2),
    cursor: "pointer",
  },
  addChip: {
    cursor: "pointer",
    borderStyle: "dashed",
    color: "rgba(0, 0, 0, 0.6)",
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
  const [search, setSearch] = useState("");
  const {
    params: { id },
  } = useRouteMatch();
  const history = useHistory();

  const { data: project, loading: projectLoading } = useQuery<
    Screen_ProjectQuery
  >(projectsQuery, {
    variables: { id },
  });

  return (
    <>
      <AppBar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      />
      <div className={classes.root}>
        <CustomBreadcrumbs
          paths={[{ name: "Projects", path: "/home" }, { name: "Screens" }]}
        />
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
              ?.filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((i) => (
                <CustomChip
                  key={i?.id}
                  name={i?.name}
                  onClick={() =>
                    history.push(
                      `/project/${id}/screens/screen/${i.id}/options`
                    )
                  }
                />
              ))
          )}
          <AddChip
            onClick={() => history.push(`/project/${id}/screens/screen`)}
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
              ?.filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((i) => (
                <CustomChip
                  key={i?.id}
                  name={i?.name}
                  onClick={() =>
                    history.push(`/project/${id}/screens/locale/${i.id}`)
                  }
                />
              ))
          )}
          <AddChip
            onClick={() => history.push(`/project/${id}/screens/locale`)}
          />
        </div>
      </div>
      <Route
        exact
        path="/project/:projectId/screens/screen"
        component={ScreenFormModal}
      />
      <Route
        exact
        path="/project/:projectId/screens/screen/:screenId"
        component={ScreenFormModal}
      />
      <Route
        exact
        path="/project/:projectId/screens/screen/:screenId/options"
        component={ScreenOptionsModal}
      />
      <Route
        exact
        path="/project/:projectId/screens/locale"
        component={LocaleFormModal}
      />
      <Route
        exact
        path="/project/:projectId/screens/locale/:localeId"
        component={LocaleFormModal}
      />
    </>
  );
};

interface AddChipProps {
  onClick?: () => void;
}

const AddChip: React.SFC<AddChipProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Chip
      className={classes.addChip}
      onClick={onClick}
      variant="outlined"
      avatar={<AddIcon style={{ color: "rgba(0, 0, 0, 0.23)" }} />}
      label="Add"
    />
  );
};

interface CustomChipProps {
  name?: string;
  loading?: boolean;
  onClick?: () => void;
}

const CustomChip: React.SFC<CustomChipProps> = ({ name, loading, onClick }) => {
  const classes = useStyles();
  return loading ? (
    <Skeleton
      className={classes.screenLoading}
      variant="rect"
      width={150}
      height={32}
    />
  ) : (
    <Chip onClick={onClick} className={classes.screenChip} label={name} />
  );
};

export default ScreenPage;
