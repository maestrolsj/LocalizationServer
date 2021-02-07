/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom/extend-expect';
import { RootState as States } from '../store/reducer';

declare global {
    export type Store = StateType<typeof import('../store/store').default>;

    export type RootState = States;
}
