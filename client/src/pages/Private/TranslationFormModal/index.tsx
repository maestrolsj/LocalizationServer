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
import { translationQuery, upsertTranslationMutation } from "./gql";
import {
  TranslationFormModal_TranslationQuery,
  TranslationFormModal_UpsertTranslationMutation,
} from "../../../generated/graphql";

const validationSchema = yup.object({
  value: yup
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

const TranslationFormModal = () => {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const {
    params: { screenId, projectId, keyId, translationId, localeId },
  } = useRouteMatch();
  const classes = useStyles();

  const [
    upsertTranslation,
    { loading: upsertTranslationLoading },
  ] = useMutation<TranslationFormModal_UpsertTranslationMutation>(
    upsertTranslationMutation,
    { refetchQueries: ["TranslatePage_screen"] }
  );
  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await upsertTranslation({
        variables: { ...values, id: translationId, keyId, localeId },
      });
      history.push(`/project/${projectId}/screen/${screenId}/translate`);
    },
  });

  const { loading: translationLoading } = useQuery<
    TranslationFormModal_TranslationQuery
  >(translationQuery, {
    variables: { id: translationId },
    skip: !translationId,
    onCompleted: (data) => {
      if (data) {
        formik.setValues(data.translation);
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
      disableBackdropClick={upsertTranslationLoading}
      disableEscapeKeyDown={upsertTranslationLoading}
    >
      <DialogTitle>Translation</DialogTitle>
      {translationLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <>
            <DialogContent>
              <TextField
                id="value"
                className={classes.input}
                autoFocus
                rows={4}
                multiline
                label="Value"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.value}
                helperText={formik.touched.value ? formik.errors.value : ""}
                error={formik.touched.value && Boolean(formik.errors.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                color="primary"
                disabled={upsertTranslationLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={upsertTranslationLoading}
              >
                {upsertTranslationLoading ? (
                  <CircularProgress size={10} />
                ) : translationId ? (
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

export default TranslationFormModal;
