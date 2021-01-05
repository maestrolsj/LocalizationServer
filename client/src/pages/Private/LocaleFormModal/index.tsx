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
import { localesQuery, upsertLocaleMutation } from "./gql";
import {
  LocaleFormModal_LocaleQuery,
  LocaleFormModal_UpsertLocaleMutation,
} from "../../../generated/graphql";
import { Autocomplete } from "@material-ui/lab";
import iso from "iso-639-1";

const languages = iso.getAllNames().map((i) => ({
  code: iso.getCode(i),
  name: i,
  nativeName: iso.getNativeName(iso.getCode(i)),
}));

const validationSchema = yup.object({
  code: yup.string().min(1, "Required").required("Required"),
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 400,
  },
  input: {
    marginBottom: theme.spacing(3),
  },
}));

const LocaleFormModal = () => {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const {
    params: { localeId, projectId },
  } = useRouteMatch();
  const classes = useStyles();

  const [upsertLocale, { loading: upsertLocaleLoading }] = useMutation<
    LocaleFormModal_UpsertLocaleMutation
  >(upsertLocaleMutation, { refetchQueries: ["Screen_project"] });

  const formik = useFormik({
    initialValues: {
      name: "",
      nativeName: "",
      code: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log({ ...values, id: localeId, projectId });
      await upsertLocale({ variables: { ...values, id: localeId, projectId } });
      history.push(`/project/${projectId}/screens`);
    },
  });

  const { loading: screenLoading } = useQuery<LocaleFormModal_LocaleQuery>(
    localesQuery,
    {
      variables: { id: localeId },
      skip: !localeId,
      onCompleted: (data) => {
        if (data) {
          formik.setValues(data.locale);
        }
      },
    }
  );
  console.log(formik.values);
  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={() => setOpen(false)}
      onExited={() => history.push(`/project/${projectId}/screens`)}
      disableBackdropClick={upsertLocaleLoading}
      disableEscapeKeyDown={upsertLocaleLoading}
    >
      <DialogTitle>Locale</DialogTitle>
      {screenLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <>
            <DialogContent>
              <Autocomplete
                options={[formik.initialValues, ...languages]}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option) =>
                  option.code === formik.values.code
                }
                onChange={(e, value) =>
                  formik.setValues(value ? value : formik.initialValues)
                }
                value={formik.values}
                autoSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    placeholder="Ex: English"
                    variant="outlined"
                    helperText={formik.touched.code ? formik.errors.code : ""}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                color="primary"
                disabled={upsertLocaleLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={upsertLocaleLoading}
              >
                {upsertLocaleLoading ? (
                  <CircularProgress size={10} />
                ) : localeId ? (
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

export default LocaleFormModal;
