import { Reducer } from 'redux';
import { SystemAction } from './actions';
import {
    CLOSE_SNACKBAR,
    OPEN_SNACKBAR,
    SET_SNACKBAR_MESSAGE,
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_MODAL_MESSAGE,
} from './constants';
import { initialState, InitialStateType } from './states';

const system: Reducer<InitialStateType, SystemAction> = function (state = initialState, action) {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return { ...state, snackBar: { ...state.snackBar, open: true } };
        case CLOSE_SNACKBAR:
            return { ...state, snackBar: { ...state.snackBar, open: false } };
        case SET_SNACKBAR_MESSAGE:
            return { ...state, snackBar: { ...state.snackBar, message: action.payload } };
        case OPEN_MODAL:
            return { ...state, modal: { ...state.modal, open: true } };
        case CLOSE_MODAL:
            return { ...state, modal: { ...state.modal, open: true } };
        case SET_MODAL_MESSAGE:
            return { ...state, modal: { ...state.modal, message: action.payload } };
        default:
            return { ...state };
    }
};

export default system;
