import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../services/authService'
import { IErrorResponse } from '../../types/api'

export default function Login() {
    const navigate = useNavigate()
    const [login, { isSuccess, error }] = useLoginMutation()
    const [authData, setAuthData] = useState({
        login: "",
        password: ""
    })

    useEffect(() => {
        if (isSuccess === true) {
            navigate("/")
        }
    }, [isSuccess])

    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        login(authData)
    }

    const onAuthDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="mt-10 w-72 m-auto">
            <form action="" className="space-y-4" onSubmit={onLogin}>
                <div className="text-2xl font-medium">Вход</div>
                <div className="space-y-2">
                    <div className="flex flex-col">
                        <label htmlFor="login" className="">Login</label>
                        <input type="text" name="login" id="login" className="text-sm border-gray-400 rounded-md" value={authData.login} onChange={onAuthDataChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="login" className="">Password</label>
                        <input type="password" name="password" id="password" className="text-sm border-gray-400 rounded-md" value={authData.password} onChange={onAuthDataChange} />
                    </div>
                </div>
                {(error && "status" in error) &&
                    <div className="text-red-500 font-semibold">{(error.data as IErrorResponse).message}</div>
                }
                <button className="bg-green-700 rounded-md w-full text-white py-2">Войти</button>
            </form>
        </div>
    )
}
