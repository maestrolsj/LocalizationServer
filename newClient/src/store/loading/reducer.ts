import { createReducer } from 'typesafe-actions';
import { LoadingAction } from './actions';
import { FINISH_LOADING, START_LOADING } from './constants';
import { initialState, InitialStateType } from './states';

const loading = createReducer<InitialStateType, LoadingAction>(initialState, {
    [START_LOADING]: (state, action) => ({ ...state, [action.payload]: true }),
    [FINISH_LOADING]: (state, action) => ({ ...state, [action.payload]: false }),
});

export default loading;
