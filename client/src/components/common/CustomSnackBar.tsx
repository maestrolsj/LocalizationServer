import { makeStyles, Snackbar } from '@material-ui/core';
import React from 'react';

interface CumaSnackBarProps {
    isOpen: boolean;
    message: string;
    autoHideDuration?: number;
    handle: () => void;
}

const useStyles = makeStyles(() => ({
    root: {
        '& > .MuiSnackbarContent-root': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
}));

/**
 * @param isOpen 관리하는 state를 만들어서 사용하면 됨
 * @param message 스낵바 메세지
 * @param autoHideDuration 지속시간
 * @param handle 여닫이 핸들러
 * @example 스낵바를 오픈하고 싶으면 setIsOpen(true)
        const [isOpen, setIsOpen] = useState(false);
            handle = () => {
            setIsOpen(false);
        };
 */

const CumaSnackBar: React.FC<CumaSnackBarProps> = ({ isOpen, message, autoHideDuration = 2000, handle }) => {
    const classes = useStyles();

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        handle();
    };
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            classes={{
                root: classes.root,
            }}
            onClose={handleClose}
            open={isOpen}
            message={message}
            autoHideDuration={autoHideDuration}
            className={classes.root}
        />
    );
};

export default React.memo(CumaSnackBar);
