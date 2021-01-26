import React, { useContext, useCallback, useState, useEffect } from "react";
import { TextField, Button, Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useApolloClient } from "@apollo/react-hooks";
import loginQuery from "./gql";
import { useURLQuery } from "../../../hooks/useURLQuery";
import gql from "graphql-tag";
import { Alert } from "@material-ui/lab";

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

const TEST_QUERY = gql`
  query LoginPage_test {
    test
  }
`;

const Login: React.FC<any> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const client = useApolloClient();
  const query = useURLQuery();

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
          const { data } = await client.query({
            query: loginQuery,
            variables: { email, password },
          });

          setUser({ ...data.login.user, accessToken: data.login.accessToken });
          const redirectUrl = query.get("redirectUrl");
          if (redirectUrl) {
            history.push(redirectUrl);
          } else {
            history.push("/home");
          }
        }
      } catch (err) {
        setErrorText(err?.graphQLErrors[0]?.message ?? "");
      }
    },
    [email, password, setUser, history, client, query]
  );

  const goTo = useCallback(
    (url) => {
      return () => history.push(url);
    },
    [history]
  );

  useEffect(() => {
    const startQuery = async () => {
      const { data: data2 } = await client.query({ query: TEST_QUERY });
      console.log(">>>>", data2);
    };
    startQuery();
  }, []);

  return (
    <form onSubmit={login} className={classes.root}>
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
        }}
      />
      <TextField
        className={clsx(classes.input, classes.password)}
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
      <Typography
        onClick={goTo("/forgotPassword")}
        className={classes.forgotPassword}
      >
        Forgot password?
      </Typography>

      <Button
        type="submit"
        className={classes.input}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      <Button
        onClick={goTo("/register")}
        className={classes.input}
        color="primary"
      >
        Register
      </Button>
    </form>
  );
};

export default Login;
