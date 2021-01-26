import React, { useCallback, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Theme,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import upsertUserMutation from "./gql";
import { useMutation } from "@apollo/react-hooks";
import { RegisterPage_UpsertUserMutation } from "../../../generated/graphql";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 8,
    width: "80%",
  },
  password: {
    marginBottom: 0,
    width: "80%",
  },
  successText: {
    color: "darkgreen",
  },
  errorText: {
    color: "red",
  },

  forgotPassword: {
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 12,
    color: theme.palette.primary.main,
    margin: "4px 0",
    textAlign: "right",
    width: "80%",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Register: React.SFC<any> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [successText, setSuccessText] = useState("");
  const [errorText, setErrorText] = useState("");
  const history = useHistory();
  const [
    upsertUser,
    { loading: upsertUserLoading },
  ] = useMutation<RegisterPage_UpsertUserMutation>(upsertUserMutation);

  const login = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (
          email.split("").reverse().slice(0, 14).reverse().join("") !==
          "@softgarden.de"
        ) {
          setErrorText("Must be a softgarden email");
        } else {
          await upsertUser({ variables: { email, firstName, lastName } });
          setSuccessText("Check your email to set your password");
        }
      } catch (err) {
        if (err?.graphQLErrors[0]?.message) {
          setErrorText(
            err?.graphQLErrors[0]?.message ? "User already exists" : ""
          );
        } else {
          setErrorText("Server error");
        }
      }
    },
    [email, firstName, lastName, upsertUser]
  );

  const goTo = useCallback(
    (url) => {
      return () => history.push(url);
    },
    [history]
  );

  return (
    <form onSubmit={login} className={classes.root}>
      <Typography className={classes.successText}>{successText}</Typography>
      <Typography className={classes.errorText}>{errorText}</Typography>
      <TextField
        className={classes.input}
        label="First name"
        placeholder="John"
        variant="outlined"
        type="text"
        value={firstName}
        onChange={(e) => {
          setFirstname(e.target.value);
          setErrorText("");
          setSuccessText("");
        }}
      />
      <TextField
        className={classes.input}
        label="Last name"
        placeholder="Doe"
        variant="outlined"
        type="text"
        value={lastName}
        onChange={(e) => {
          setLastname(e.target.value);
          setErrorText("");
          setSuccessText("");
        }}
      />
      <TextField
        className={classes.input}
        label="Email"
        placeholder="John.Doe@softgarden.de"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrorText("");
          setSuccessText("");
        }}
      />
      <Button
        type="submit"
        className={classes.input}
        variant="contained"
        color="primary"
      >
        {upsertUserLoading ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          "Register"
        )}
      </Button>
      <Button
        onClick={goTo("/login")}
        className={classes.input}
        color="primary"
      >
        Go to Login
      </Button>
    </form>
  );
};

export default Register;
