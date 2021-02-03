import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type AppThunk = ThunkAction<Promise<void>, RootState, unknown, Action<string>>;
