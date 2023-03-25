import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import { api } from './api';
import authSlice from './slices/auth.slice'

const reducers = {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);
type combinedReducerType = typeof combinedReducer;

export const rootReducer: combinedReducerType = (
    state,
    action: AnyAction
) => {
    if (action.type === HYDRATE) {
        delete action.payload.auth // не трогаем авторизация auth при хидрации

        const nextState = {
            ...state,
            ...action.payload,
        }

        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });