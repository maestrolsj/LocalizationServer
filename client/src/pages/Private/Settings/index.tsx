import React, { useContext } from "react";

import AppBar from "../../../smartComponents/AppBar";
import { UserContext } from "../../../context/UserContext";
import { makeStyles, Theme, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    height: "calc(100% - 115px)",
  },
}));

const SettingsPage = () => {
  const classes = useStyles();
  const { setUser } = useContext(UserContext);

  return (
    <>
      <AppBar />
      <div className={classes.root}>
        <Button
          onClick={() => {
            setUser({});
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default SettingsPage;
