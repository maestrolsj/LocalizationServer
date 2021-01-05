import React, { useState } from "react";

import {
  makeStyles,
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { projectsQuery, upsertProjectMutation } from "./gql";
import {
  ProjectFormModal_ProjectQuery,
  ProjectFormModal_UpsertProjectMutation,
} from "../../../generated/graphql";

const validationSchema = yup.object({
  key: yup.string().min(1, "Must be 1 characters or more").required("Required"),
  name: yup
    .string()
    .min(3, "Must be 3 characters or more")
    .required("Required"),
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 400,
  },
  input: {
    marginBottom: theme.spacing(3),
  },
}));

const ProjectFormModal = () => {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const {
    params: { id },
  } = useRouteMatch();
  const classes = useStyles();

  const [upsertProject, { loading: upsertProjectLoading }] = useMutation<
    ProjectFormModal_UpsertProjectMutation
  >(upsertProjectMutation, { refetchQueries: ["HomePage_projects"] });

  const formik = useFormik({
    initialValues: {
      key: "",
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await upsertProject({ variables: { ...values, id } });
      history.push("/home");
    },
  });

  const { loading: projectLoading } = useQuery<ProjectFormModal_ProjectQuery>(
    projectsQuery,
    {
      variables: { id },
      skip: !id,
      onCompleted: (data) => {
        if (data) {
          formik.setValues(data.project);
        }
      },
    }
  );

  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={() => setOpen(false)}
      onExited={() => history.push("/home")}
      disableBackdropClick={upsertProjectLoading}
      disableEscapeKeyDown={upsertProjectLoading}
    >
      <DialogTitle>Project</DialogTitle>
      {projectLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <>
            <DialogContent>
              <TextField
                id="key"
                className={classes.input}
                autoFocus
                label="Key"
                placeholder="A serious key."
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.key}
                helperText={formik.touched.key ? formik.errors.key : ""}
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
                helperText={formik.touched.name ? formik.errors.name : ""}
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
                helperText={
                  formik.touched.description ? formik.errors.description : ""
                }
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                color="primary"
                disabled={upsertProjectLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={upsertProjectLoading}
              >
                {upsertProjectLoading ? (
                  <CircularProgress size={10} />
                ) : id ? (
                  "Edit"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogActions>
          </>
        </form>
      )}
    </Dialog>
  );
};

export default ProjectFormModal;
