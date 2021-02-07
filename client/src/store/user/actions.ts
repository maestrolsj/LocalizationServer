import { Dispatch } from 'redux';
import { AppThunk } from '../actions';
import { LOGIN, LOGOUT } from './constants';

export const login = (loginData: any): AppThunk => async (dispatch: Dispatch) => {
    await dispatch({ type: LOGIN, payload: loginData });
};

export const logout = (): AppThunk => async (dispatch: Dispatch) => {
    await dispatch({ type: LOGOUT });
    localStorage.removeItem('access_token');
};

export type UserAction =
    | {
          type: typeof LOGIN;
          payload: any;
      }
    | {
          type: typeof LOGOUT;
          payload: any;
      };
