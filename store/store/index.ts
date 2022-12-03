import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import authSlice from './slices/auth.slice'

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

const makeStore = () => store;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore, { debug: false });