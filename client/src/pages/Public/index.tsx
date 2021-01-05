import React from "react";
import { makeStyles } from "@material-ui/core";
import { Route, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import RedefinePassword from "./RedefinePassword";
import { useEffect } from "react";
import { useURLQuery } from "../../hooks/useURLQuery";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  left: {
    width: "40%",
    height: "100%",
    float: "left",
  },
  right: {
    width: "60%",
    height: "100%",
    background: "linear-gradient(to right, #3a6073, #3a7bd5)",
    float: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    filter: "brightness(100)",
    width: 250,
  },
});

const PublicFrame: React.SFC<{}> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/redefinePassword" component={RedefinePassword} />
        <Route component={RedirectLink} />
      </div>
      <div className={classes.right}>
        <img className={classes.image} src="/softgarden_white.png" alt="" />
      </div>
    </div>
  );
};

const RedirectLink = () => {
  const history = useHistory();
  const query = useURLQuery();
  useEffect(() => {
    if (!query.get("redirectUrl")) {
      history.replace(`/login?redirectUrl=${window.location.pathname}`);
    } else {
      history.replace(`/login`);
    }
  }, []);
  return <></>;
};

export default PublicFrame;
