import React, { useState } from "react";

import { makeStyles, Theme, Dialog, List, ListItem } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 200,
  },
  item: {
    cursor: "pointer",
  },
}));

const ScreenOptionsModal = () => {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const {
    params: { screenId, projectId },
  } = useRouteMatch();
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={() => setOpen(false)}
      onExited={() => history.push(`/project/${projectId}/screens`)}
    >
      <List>
        <ListItem
          className={classes.item}
          onClick={() =>
            history.push(`/project/${projectId}/screen/${screenId}/translate`)
          }
        >
          Translate
        </ListItem>
        <ListItem
          className={classes.item}
          onClick={() =>
            history.push(`/project/${projectId}/screens/screen/${screenId}`)
          }
        >
          Edit
        </ListItem>
      </List>
    </Dialog>
  );
};

export default ScreenOptionsModal;
