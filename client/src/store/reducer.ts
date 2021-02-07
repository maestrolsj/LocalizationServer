import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading/reducer';
import system from './system/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({
    loading,
    system,
    user,
});

// rootReducer & type of rootReducer
export default rootReducer;

export function* rootSaga() {
    yield all([]);
}

export type RootState = ReturnType<typeof rootReducer>;
