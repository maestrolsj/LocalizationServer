import React from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
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
  progress: {
    color: "white",
  },
});

const LoadingPage: React.SFC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.image} src="/softgarden_white.png" alt="" />
      <CircularProgress className={classes.progress} size={22} />
    </div>
  );
};

export default LoadingPage;
