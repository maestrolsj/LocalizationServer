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
import { screensQuery, upsertScreenMutation } from "./gql";
import {
  ScreenFormModal_ScreenQuery,
  ScreenFormModal_UpsertScreenMutation,
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

const ScreenFormModal = () => {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const {
    params: { screenId, projectId },
  } = useRouteMatch();
  const classes = useStyles();

  const [upsertScreen, { loading: upsertScreenLoading }] = useMutation<
    ScreenFormModal_UpsertScreenMutation
  >(upsertScreenMutation, { refetchQueries: ["Screen_project"] });

  const formik = useFormik({
    initialValues: {
      key: "",
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await upsertScreen({ variables: { ...values, id: screenId, projectId } });
      history.push(`/project/${projectId}/screens`);
    },
  });

  const { loading: screenLoading } = useQuery<ScreenFormModal_ScreenQuery>(
    screensQuery,
    {
      variables: { id: screenId },
      skip: !screenId,
      onCompleted: (data) => {
        if (data) {
          formik.setValues(data.screen);
        }
      },
    }
  );

  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={() => setOpen(false)}
      onExited={() => history.push(`/project/${projectId}/screens`)}
      disableBackdropClick={upsertScreenLoading}
      disableEscapeKeyDown={upsertScreenLoading}
    >
      <DialogTitle>Screen</DialogTitle>
      {screenLoading ? (
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
                disabled={upsertScreenLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={upsertScreenLoading}
              >
                {upsertScreenLoading ? (
                  <CircularProgress size={10} />
                ) : screenId ? (
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

export default ScreenFormModal;
