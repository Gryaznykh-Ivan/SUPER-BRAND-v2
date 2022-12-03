import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";

import AuthTemplate from './templates/Auth';
import IndexTemplate from './templates/Index'

import Collections from './pages/Collections';
import Delivery from './pages/Delivery';
import Index from './pages/Index';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Sellers from './pages/Sellers';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './utils/PrivateRoute';
import Customers from './pages/Customers';




export default function App() {
    return (
        <Routes>
            <Route path="/" element={<IndexTemplate />}>
                <Route path="/" element={<PrivateRoute outlet={<Index />} />} />
                <Route path="/products" element={<PrivateRoute outlet={<Products />} />} />
                <Route path="/orders" element={<PrivateRoute outlet={<Orders />} />} />
                <Route path="/collections" element={<PrivateRoute outlet={<Collections />} />} />
                <Route path="/customers" element={<PrivateRoute outlet={<Customers />} />} />
                <Route path="/sellers" element={<PrivateRoute outlet={<Sellers />} />} />
                <Route path="/delivery" element={<PrivateRoute outlet={<Delivery />} />} />
                <Route path="/settings" element={<PrivateRoute outlet={<Settings />} />} />
            </Route>
            <Route path="/auth" element={<AuthTemplate />}>
                <Route path="/auth/login" element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
