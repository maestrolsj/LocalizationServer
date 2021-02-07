import { Dialog, List, ListItem, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 200,
    },
    item: {
        cursor: 'pointer',
    },
}));

interface IProps {
    screenId: string;
    projectId: string;
    open: boolean;
    closeHandler: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const ScreenOptionsModal: React.FC<IProps> = ({ screenId, projectId, open, closeHandler, onEdit, onDelete }) => {
    const router = useRouter();
    const classes = useStyles();

    return (
        <Dialog classes={{ paper: classes.root }} open={open} onClose={closeHandler} onExited={closeHandler}>
            <List>
                <ListItem
                    className={classes.item}
                    onClick={() => router.push(`/translate/${projectId}?screenId=${screenId}`)}
                >
                    Translate
                </ListItem>
                <ListItem className={classes.item} onClick={onEdit}>
                    Edit
                </ListItem>
                <ListItem className={classes.item} onClick={onDelete}>
                    Delete
                </ListItem>
            </List>
        </Dialog>
    );
};

export default ScreenOptionsModal;
