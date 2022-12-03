import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './App';

import './index.css';

import { store } from './store';
import { IJwtDecode } from './types/store';
import jwt_decode from 'jwt-decode'

(() => {
    try {
        const token = localStorage.getItem("token");
        if (token !== null) {
            const decode = jwt_decode(token) as IJwtDecode;

            const now = Math.floor(Date.now() / 1000);
            if (decode.exp - now <= 0) {
                return localStorage.removeItem("token")
            }

            store.dispatch({ type: "auth/login", payload: { token, decode } });
        }
    } catch (e) {
        localStorage.removeItem("token")
    }
})();


const root = ReactDOM.createRoot(
    document.getElementById('app-root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
