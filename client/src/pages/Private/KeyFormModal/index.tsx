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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { keyQuery, upsertKeyMutation } from "./gql";
import {
  KeyFormModal_KeyQuery,
  KeyFormModal_UpsertKeyMutation,
} from "../../../generated/graphql";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(1, "Must be 1 characters or more")
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

const INITIAL_FORM_VALUES = {
  name: "",
  plural: false,
};

const KeyFormModal = () => {
  const [open, setOpen] = useState(true);
  const [createAnother, setCreateAnother] = useState(false);
  const history = useHistory();
  const {
    params: { screenId, projectId, keyId },
  } = useRouteMatch();
  const classes = useStyles();

  const [upsertKey, { loading: upsertKeyLoading }] = useMutation<
    KeyFormModal_UpsertKeyMutation
  >(upsertKeyMutation, { refetchQueries: ["TranslatePage_screen"] });

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema,
    onSubmit: async (values) => {
      if (!createAnother) {
        await upsertKey({ variables: { ...values, id: keyId, screenId } });
        history.push(`/project/${projectId}/screen/${screenId}/translate`);
      } else {
        await upsertKey({ variables: { ...values, id: keyId, screenId } });
        formik.resetForm();
      }
    },
  });

  const { loading: keyLoading } = useQuery<KeyFormModal_KeyQuery>(keyQuery, {
    variables: { id: keyId },
    skip: !keyId,
    onCompleted: (data) => {
      if (data) {
        formik.setValues(data.key);
      }
    },
  });
  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={() => setOpen(false)}
      onExited={() =>
        history.push(`/project/${projectId}/screen/${screenId}/translate`)
      }
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
                  formik.touched.name
                    ? formik.errors.name
                    : "No spaces and no periods please."
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
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={upsertKeyLoading}
              >
                {upsertKeyLoading ? (
                  <CircularProgress size={10} />
                ) : keyId ? (
                  "Edit"
                ) : (
                  "Add"
                )}
              </Button>
              <Button
                onClick={() => setOpen(false)}
                color="primary"
                disabled={upsertKeyLoading}
              >
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
