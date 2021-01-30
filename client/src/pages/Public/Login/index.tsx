import { gql, useApolloClient, useQuery } from "@apollo/client";
import {
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useURLQuery } from "../../../hooks/useURLQuery";
import loginQuery from "./gql";

const testQuery = gql`
  query TestQuery {
    test
  }
`;

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

const Login: React.FC<any> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const client = useApolloClient();
  const query = useURLQuery();

  const { loading, data } = useQuery(testQuery);

  const login = useCallback(
    async (e) => {
      e.preventDefault();
      try {
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
      } catch (err) {
        setErrorText(err?.graphQLErrors[0]?.message ?? "");
        console.log("Error>", err);
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

  return (
    <form onSubmit={login} className={classes.root}>
      <Typography className={classes.errorText}>{errorText}</Typography>
      <TextField
        className={classes.input}
        label="Email"
        placeholder="John.Doe@gmail.com"
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

      <Button className={classes.input} color="primary">
        Test
      </Button>
    </form>
  );
};

export default Login;
