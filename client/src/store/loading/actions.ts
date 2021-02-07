import { createAction } from 'typesafe-actions';
import { START_LOADING, FINISH_LOADING } from './constants';
import { ActionType } from 'typesafe-actions';

export const startLoading = createAction(START_LOADING, (requestType: string) => requestType)();
export const finishLoading = createAction(FINISH_LOADING, (requestType: string) => requestType)();
const actions = { startLoading, finishLoading };
export type LoadingAction = ActionType<typeof actions>;
