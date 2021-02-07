import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_SNACKBAR } from 'src/store/system';
import CustomModal from './common/CustomModal';
import CustomSnackBar from './common/CustomSnackBar';

interface IProps {
    sample?: string;
}

const SystemUtil: React.FC<IProps> = () => {
    const system = useSelector((state: RootState) => state.system);
    const dispatch = useDispatch();

    const onSnackBarCloseHandler = useCallback(() => {
        dispatch({ type: CLOSE_SNACKBAR });
    }, [dispatch]);

    return (
        <>
            <CustomSnackBar
                isOpen={system.snackBar.open}
                message={system.snackBar.message}
                handle={onSnackBarCloseHandler}
            />
            <CustomModal open={system.modal.open} body={system.modal.message} />
        </>
    );
};

export default SystemUtil;
