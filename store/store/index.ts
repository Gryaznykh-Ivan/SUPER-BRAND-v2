import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { AnyAction, configureStore, Reducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authSlice from './slices/auth.slice'
import { api } from './api'

const reducers = {
    [api.reducerPath]: api.reducer,
    auth: authSlice
};

const combinedReducer = combineReducers<typeof reducers>(reducers);
type combinedReducerType = typeof combinedReducer;

export const rootReducer: combinedReducerType = (
    state,
    action: AnyAction
) => {

    // if (action.type === HYDRATE) {
    //     delete action.payload.auth // не трогаем авторизацию auth при хидрации
    // } 

    return combinedReducer(state, action);
};

const makeStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });