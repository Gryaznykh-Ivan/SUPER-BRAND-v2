import jwtDecode from "jwt-decode";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Redirect from "../components/navigation/Redirect";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { IJwtDecode } from "../types/store";

export default function withAuth<T>(Component: NextComponentType<T>) {
    const Auth = (props: T) => {
        const router = useRouter()
        const dispatch = useAppDispatch()
        const auth = useAppSelector(state => state.auth)

        useEffect(() => {
            if (auth.isAuth === false) {
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const jwt: IJwtDecode = jwtDecode(token);

                        const now = Math.floor(Date.now() / 1000);
                        if (jwt.exp - now <= 0) {
                            localStorage.removeItem("token")
                        } else {
                            dispatch({ type: "auth/login", payload: { token, decode: jwt } });
                        }
                    } catch (e) {
                        dispatch({ type: "auth/logout" });
                    }
                } else {
                    router.push("/auth/login")
                }
            }
        }, [auth.isAuth])

        return <Component {...(props as T)} />
    }

    return Auth
}
