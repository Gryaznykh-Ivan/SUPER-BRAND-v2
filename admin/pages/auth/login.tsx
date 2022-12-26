import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLoginMutation, useSendCodeMutation } from '../../services/authService'
import { IErrorResponse } from '../../types/api'
import AuthLayout from '../../components/layouts/Auth'
import { useTimer } from '../../hooks/useTimer'

export default function Login() {
    const router = useRouter()
    const [sendCodeButton, setSendCodeButton] = useState<boolean>(true)
    const { count, startTimer, clearTimer, resetTimer } = useTimer(() => setSendCodeButton(true))

    const [login, { isSuccess, error }] = useLoginMutation()
    const [sendCode, { isSuccess: isCodeSent, error: codeSentError }] = useSendCodeMutation()
    const [authData, setAuthData] = useState({
        login: "",
        code: ""
    })

    useEffect(() => {
        if (isSuccess === true) {
            router.push("/")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isCodeSent === true) {
            setSendCodeButton(false)
            startTimer(120)
        }
    }, [isCodeSent])

    const onSendCode = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()


        sendCode({ login: authData.login });
    }

    const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        login(authData)
    }

    const onAuthDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <AuthLayout>
            <div className="mt-10 w-80 m-auto">
                <form action="" className="space-y-4" onSubmit={onLogin}>
                    <div className="text-2xl font-medium">Вход</div>
                    <div className="space-y-2">
                        <div className="flex flex-col">
                            <label htmlFor="login" className="">Логин</label>
                            <div className="flex">
                                <input type="text" name="login" id="login" className="flex-1 text-sm border-gray-400 rounded-md" value={authData.login} onChange={onAuthDataChange} />
                                <button className={ `ml-2 text-white rounded-md ${ sendCodeButton ? "bg-green-700" : "bg-gray-300" } p-2` } disabled={ !sendCodeButton } onClick={onSendCode}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="login" className="">Код подтверждения</label>
                            <input type="text" name="code" id="code" className="text-sm border-gray-400 rounded-md" value={authData.code} onChange={onAuthDataChange} />
                        </div>
                    </div>
                    <button className="bg-green-700 rounded-md w-full text-white py-2">Войти</button>
                    {count > 0 && <div className="text-gray-500">До повторной отправки письма {count} сек.</div>}
                    {(error && "status" in error) &&
                        <div className="text-red-500 font-semibold">{(error.data as IErrorResponse).message}</div>
                    }
                    {(codeSentError && "status" in codeSentError) &&
                        <div className="text-red-500 font-semibold">{(codeSentError.data as IErrorResponse).message}</div>
                    }
                </form>
            </div>
        </AuthLayout>
    )
}
