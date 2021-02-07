import { Reducer } from 'redux';
import { UserAction } from './actions';
import { LOGIN, LOGOUT } from './constants';
import { initialState, InitialStateType } from './states';

const user: Reducer<InitialStateType, UserAction> = function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.payload };
        case LOGOUT:
            return { ...initialState };
        default:
            return { ...state };
    }
};

export default user;
