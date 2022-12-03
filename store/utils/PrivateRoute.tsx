import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";
import { AppState } from "../store";

interface IProps {
    redirectTo?: string;
    outlet: JSX.Element;
}

const PrivateRoute = ({ redirectTo = "/", outlet }: IProps) => {
    const auth = useSelector((state: AppState) => state.auth);
    const router = useRouter()

    if (auth.isAuth === true) {
        return outlet
    } else {
        return router.push(redirectTo)
    }
};

export default PrivateRoute;