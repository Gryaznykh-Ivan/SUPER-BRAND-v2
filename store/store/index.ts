import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authSlice from './slices/auth.slice'
import { api } from './api'

const reducers = {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer
};

const reducer = combineReducers<typeof reducers>(reducers);

const makeStore = () => configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });