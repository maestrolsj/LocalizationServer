import React, { useState } from "react";

import AppBar from "../../../smartComponents/AppBar";
import {
  makeStyles,
  Theme,
  TextField,
  IconButton,
  Button,
  Typography,
  Chip,
} from "@material-ui/core";
import { useRouteMatch, useHistory, Route } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { projectQuery, screenQuery, deleteKeyMutation } from "./gql";
import {
  TranslatePage_ProjectQuery,
  TranslatePage_ScreenQuery,
  TranslatePage_DeleteKeyMutation,
} from "../../../generated/graphql";
import { Autocomplete } from "@material-ui/lab";
import omit from "lodash/omit";
import CodeIcon from "@material-ui/icons/Code";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";

import KeyFormModal from "../KeyFormModal";
import TranslationFormModal from "../TranslationFormModal";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    height: "calc(100% - 115px)",
  },
  languages: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  languageField: {
    width: 300,
  },
  switchButton: {
    margin: theme.spacing(3),
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(3),
  },
  screenTitle: {
    width: "100%",
    textAlign: "center",
  },
  screenDescription: {
    margin: theme.spacing(3),
  },
  keyItem: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
  },
  keyTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 12,
  },
  keyTitle: {
    color: "cornflowerblue",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  translationsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  translationContainer: {
    width: "50%",
    height: "100%",
    cursor: "pointer",
  },
  translation: {
    padding: theme.spacing(1),
    cursor: "pointer",
  },
  leftContainer: { height: "100%" },
  rightContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  spacer: { flex: 2 },
  noTranslation: {
    color: "rgba(0,0,0,0.4)",
    padding: theme.spacing(1),
  },
}));

const INITIAL_LANGUAGE = {
  id: "",
  code: "",
  nativeName: "",
  name: "",
};

const ScreenPage = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [leftLanguage, setLeftLanguage] = useState(INITIAL_LANGUAGE);
  const [rightLanguage, setRightLanguage] = useState(INITIAL_LANGUAGE);
  const {
    params: { projectId, screenId },
  } = useRouteMatch();
  const history = useHistory();
  const { data: project, loading: projectLoading } = useQuery<
    TranslatePage_ProjectQuery
  >(projectQuery, {
    variables: { id: projectId },
  });

  const { data: screen } = useQuery<TranslatePage_ScreenQuery>(screenQuery, {
    variables: { id: screenId },
    skip: !screenId,
  });

  const [deleteKey] = useMutation<TranslatePage_DeleteKeyMutation>(
    deleteKeyMutation,
    { refetchQueries: ["TranslatePage_screen"] }
  );

  return (
    <>
      <AppBar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
      />
      <div className={classes.root}>
        <CustomBreadcrumbs
          paths={[
            { name: "Projects", path: "/home" },
            { name: "Screens", path: `/project/${projectId}/screens` },
            { name: "Translate" },
          ]}
        />
        <Typography className={classes.screenTitle} variant="h3">
          {screen?.screen?.name}
        </Typography>
        <Typography className={classes.screenDescription}>
          {screen?.screen?.description}
        </Typography>
        {!projectLoading ? (
          <div className={classes.languages}>
            <Autocomplete
              className={classes.languageField}
              disableClearable
              options={project?.project.locales ?? []}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option) =>
                leftLanguage ? option.code === leftLanguage.code : false
              }
              onChange={(e, value) =>
                setLeftLanguage(value ?? INITIAL_LANGUAGE)
              }
              value={leftLanguage}
              autoSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  placeholder="Ex: English"
                  variant="outlined"
                />
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
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option) => option.code === rightLanguage.code}
              onChange={(e, value) =>
                setRightLanguage(omit(value, "__typename") ?? INITIAL_LANGUAGE)
              }
              value={rightLanguage}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  placeholder="Ex: English"
                  variant="outlined"
                />
              )}
            />
          </div>
        ) : null}
        {leftLanguage.code.length > 0 && rightLanguage.code.length > 0 ? (
          <>
            <div className={classes.actionsContainer}>
              <Button
                color="primary"
                onClick={() =>
                  history.push(
                    `/project/${projectId}/screen/${screenId}/translate/key`
                  )
                }
                startIcon={<AddIcon />}
                variant="contained"
              >
                Add
              </Button>
            </div>
            {screen?.screen.keys
              .filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase())
              )
              .reverse()
              .map((i) => {
                const filteredLeftTranslation = i.translations.filter(
                  (x) => x.locale.id === leftLanguage.id
                );
                const leftTranslation =
                  filteredLeftTranslation.length > 0
                    ? filteredLeftTranslation[0]
                    : null;

                const filteredRightTranslation = i.translations.filter(
                  (x) => x.locale.id === rightLanguage.id
                );
                const rightTranslation =
                  filteredRightTranslation.length > 0
                    ? filteredRightTranslation[0]
                    : null;
                return (
                  <KeyItem
                    key={i.id}
                    k={i.name}
                    plural={i.plural}
                    leftTranslation={leftTranslation}
                    rightTranslation={rightTranslation}
                    onKeyClick={() =>
                      history.push(
                        `/project/${projectId}/screen/${screenId}/translate/key/${i.id}`
                      )
                    }
                    leftLanguage={leftLanguage}
                    rightLanguage={rightLanguage}
                    onLeftLanguageClick={() =>
                      leftTranslation
                        ? history.push(
                            `/project/${projectId}/screen/${screenId}/translate/key/${i.id}/locale/${leftLanguage.id}/translation/${leftTranslation.id}`
                          )
                        : history.push(
                            `/project/${projectId}/screen/${screenId}/translate/key/${i.id}/locale/${leftLanguage.id}/translation`
                          )
                    }
                    onRightLanguageClick={() =>
                      rightTranslation
                        ? history.push(
                            `/project/${projectId}/screen/${screenId}/translate/key/${i.id}/locale/${rightLanguage.id}/translation/${rightTranslation.id}`
                          )
                        : history.push(
                            `/project/${projectId}/screen/${screenId}/translate/key/${i.id}/locale/${rightLanguage.id}/translation`
                          )
                    }
                    onDeleteKey={async () =>
                      await deleteKey({ variables: { id: i.id } })
                    }
                  />
                );
              })}
          </>
        ) : null}
      </div>
      <Route
        exact
        path="/project/:projectId/screen/:screenId/translate/key"
        component={KeyFormModal}
      />
      <Route
        exact
        path="/project/:projectId/screen/:screenId/translate/key/:keyId"
        component={KeyFormModal}
      />
      <Route
        exact
        path="/project/:projectId/screen/:screenId/translate/key/:keyId/locale/:localeId/translation"
        component={TranslationFormModal}
      />
      <Route
        exact
        path="/project/:projectId/screen/:screenId/translate/key/:keyId/locale/:localeId/translation/:translationId"
        component={TranslationFormModal}
      />
    </>
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
            <Typography className={classes.translation}>
              {leftTranslation.value}
            </Typography>
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
            <Typography className={classes.translation}>
              {rightTranslation.value}
            </Typography>
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
