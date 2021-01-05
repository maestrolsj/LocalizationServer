import React, { useCallback, useState, useContext } from "react";
import { TextField, Button, Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useURLQuery } from "../../../hooks/useURLQuery";
import redefinePasswordMutation from "./gql";
import { useMutation } from "@apollo/react-hooks";
import { UserContext } from "../../../context/UserContext";
import { RedefinePasswordPage_ResetPasswordMutation } from "../../../generated/graphql";

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

const RedefinePassword: React.SFC<any> = (props) => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const history = useHistory();
  const query = useURLQuery();
  const [redefinePassword] = useMutation<
    RedefinePasswordPage_ResetPasswordMutation
  >(redefinePasswordMutation);
  const { setUser } = useContext(UserContext);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (password === repeatPassword) {
        try {
          const { data } = await redefinePassword({
            variables: {
              password,
              token: query.get("token"),
            },
          });
          if (data?.resetPassword) {
            setUser({
              ...data.resetPassword.user,
              accessToken: data.resetPassword.accessToken,
            });
            history.push("/home");
          } else {
            setSuccessText("Password defined");
          }
        } catch (err) {
          setErrorText("Server error");
        }
      } else {
        setErrorText("Passwords do not match");
      }
    },
    [password, query, setUser, history, redefinePassword, repeatPassword]
  );

  const goTo = useCallback(
    (url) => {
      return () => history.push(url);
    },
    [history]
  );

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <Typography className={classes.successText}>{successText}</Typography>
      <Typography className={classes.errorText}>{errorText}</Typography>
      <TextField
        className={classes.input}
        label="Password"
        placeholder="*******"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorText("");
        }}
      />
      <TextField
        className={classes.input}
        label="Repeat password"
        placeholder="*******"
        variant="outlined"
        type="password"
        value={repeatPassword}
        onChange={(e) => {
          setRepeatPassword(e.target.value);
          setErrorText("");
        }}
      />
      <Button
        type="submit"
        className={classes.input}
        variant="contained"
        color="primary"
      >
        Redefine password
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

export default RedefinePassword;
