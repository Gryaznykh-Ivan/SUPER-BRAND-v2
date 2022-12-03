import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";

interface IProps {
    redirectTo?: string;
    outlet: JSX.Element;
}

const PrivateRoute = ({ redirectTo = "/auth/login", outlet }: IProps) => {
    const auth = useSelector((state: AppState) => state.auth);

    if (auth.isAuth === true) {
        return outlet
    } else {
        return <Navigate to={ redirectTo } />
    }
};

export default PrivateRoute;