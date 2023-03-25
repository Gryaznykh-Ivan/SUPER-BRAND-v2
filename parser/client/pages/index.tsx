/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import BotAction from '../components/bot/BotAction'
import BotStatus from '../components/bot/BotStatus'
import MainLayout from '../components/layouts/Main'
import { useAppSelector } from '../hooks/store'
import { useGetBotByIdQuery, useBotStartMutation } from '../services/botService'
import { IErrorResponse } from '../types/api'


export default function Index() {
    const auth = useAppSelector(state => state.auth)
    const { data } = useGetBotByIdQuery({ botId: process.env.NEXT_PUBLIC_BOT_ID as string }, { pollingInterval: 5000 })
    const [botStart, { isSuccess, isError, error }] = useBotStartMutation()

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => toast.success("Парсер запущен"), 100)
        }

        if (isError) {
            if (error && "status" in error) {
                toast.error((error.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isSuccess, isError])

    const onBotStart = () => {
        if (data?.data.status === "ACTIVE") {
            return toast.error("Робот еще работает. Принудительный запуск недоступен")
        }

        botStart()
    }

    return (
        <MainLayout>
            <Head>
                <title>Главная</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="px-6 my-4 max-w-3xl mx-auto space-y-4">
                <div className="text-xl font-medium">Парсер</div>
                <div className="">Состояние робота:</div>
                <div className="flex flex-col divide-y-[1px] divide-gray-300 bg-white p-4 rounded-lg md:flex-row md:divide-x-[1px] md:divide-y-0">
                    <div className="flex-1 flex justify-center items-center py-2 px-1">
                        <div className="text-lg font-medium text-center">
                            {data?.data.status ? <BotStatus status={data.data.status} /> : "..."}
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center py-2 px-1">
                        <div className="text-lg font-medium text-center">
                            {data?.data.action ? <BotAction action={data.data.action} /> : "..."}
                        </div>
                    </div>
                </div>
                {auth.isAuth &&
                    <div className="flex justify-center py-3 space-x-4">
                        <button className="px-4 py-2 bg-green-600 rounded text-white" onClick={onBotStart}>Запустить</button>
                    </div>
                }
            </div>
        </MainLayout>
    )
}
