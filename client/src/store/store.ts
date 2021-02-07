import { useMemo } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import rootReducer, { rootSaga } from './reducer';

export let store: any;
// const logger: Middleware = createLogger();
const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

function initStore(initialState: any) {
    if (process.env.NODE_ENV === 'development') {
        const store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware)),
        );
        sagaMiddleware.run(rootSaga);
        return store;
    } else if (process.env.NODE_ENV === 'production') {
        const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware, sagaMiddleware));
        sagaMiddleware.run(rootSaga);
        return store;
    }
}

export const initializeStore = (preloadedState: any) => {
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState: any) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
