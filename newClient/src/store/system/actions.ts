import { AppThunk } from '../actions';
import {
    CLOSE_MODAL,
    CLOSE_SNACKBAR,
    OPEN_MODAL,
    OPEN_SNACKBAR,
    SET_MODAL_MESSAGE,
    SET_SNACKBAR_MESSAGE,
} from './constants';

export const openSnackBar = (): AppThunk => async dispatch => {
    dispatch({ type: OPEN_SNACKBAR });
};

export const setSnackbarMessage = (message: string): AppThunk => async dispatch => {
    dispatch({ type: SET_SNACKBAR_MESSAGE, payload: message });
};

export const openModalBar = (): AppThunk => async dispatch => {
    dispatch({ type: OPEN_MODAL });

    setTimeout(() => {
        dispatch({ type: CLOSE_MODAL });
    }, 2000);
};

export const setModalMessage = (message: string): AppThunk => async dispatch => {
    dispatch({ type: SET_MODAL_MESSAGE, payload: message });
};

export type SystemAction =
    | {
          type: typeof OPEN_SNACKBAR;
      }
    | {
          type: typeof CLOSE_SNACKBAR;
      }
    | {
          type: typeof SET_SNACKBAR_MESSAGE;
          payload: string;
      }
    | {
          type: typeof OPEN_MODAL;
      }
    | {
          type: typeof CLOSE_MODAL;
      }
    | {
          type: typeof SET_MODAL_MESSAGE;
          payload: string;
      };
