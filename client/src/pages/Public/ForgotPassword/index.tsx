import React, { useCallback, useState } from "react";
import { TextField, Button, Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  errorText: {
    color: "red",
  },
  successText: {
    color: "darkgreen",
  },
}));

const ForgotPassword: React.SFC<any> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const history = useHistory();

  const sendEmail = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (
          email.split("").reverse().slice(0, 14).reverse().join("") !==
          "@softgarden.de"
        ) {
          setErrorText("Must be a softgarden email");
        } else {
          await axios.post("http://localhost:4000/forgotPassword", {
            email,
          });
          setSuccessText("Check your email please!");
        }
      } catch (err) {
        setErrorText("Server error");
      }
    },
    [email]
  );

  const goTo = useCallback(
    (url) => {
      return () => history.push(url);
    },
    [history]
  );

  return (
    <form onSubmit={sendEmail} className={classes.root}>
      <Typography className={classes.successText}>{successText}</Typography>
      <Typography className={classes.errorText}>{errorText}</Typography>
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
        Send email
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

export default ForgotPassword;
