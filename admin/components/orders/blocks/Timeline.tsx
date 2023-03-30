import { time } from 'console';
import { userAgent } from 'next/server';
import React, { useEffect, useState } from 'react'
import { useLazyGetOrderTimelineBySearchQuery } from '../../../services/orderService';
import { IErrorResponse } from '../../../types/api';
import Input from '../../inputs/Input'

interface IProps {
    orderId: number;
}

export default function Timeline({ orderId }: IProps) {
    const itemPerPage = 5

    const [getTimeline, { isError, error, isFetching, data }] = useLazyGetOrderTimelineBySearchQuery()

    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
    })

    useEffect(() => {
        getTimeline({ orderId, ...query })
    }, [query])

    const onNextPage = () => {
        if (data?.data.length !== itemPerPage) return

        setQuery(prev => ({ ...prev, skip: prev.skip + prev.limit }))
    }

    const onPrevPage = () => {
        if (query.skip === 0) return

        setQuery(prev => ({ ...prev, skip: prev.skip - prev.limit }))
    }

    return (
        <div className="bg-white shadow-sm rounded-md">
            {/* <div className="p-3 flex items-center space-x-3 border-b-[1px]">
                <Input type="text" placeholder="Напишите сообщение" id="description" onChange={() => { }} />
                <button className="border-gray-400 border-[1px] px-4 py-2 font-medium rounded-md text-sm">Отправить</button>
            </div> */}
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">История заказа</h2>
            </div>
            <div className="p-3 space-y-4 border-b-[1px]">
                {isError &&
                    <div className="flex flex-col items-center py-5">
                        <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                        {(error && "status" in error) &&
                            <div className="text-gray-500">{(error.data as IErrorResponse).message}</div>
                        }
                    </div>
                }
                {isFetching &&
                    <div className="flex justify-center bg-white border-gray-100 border-2 p-5 shadow-md z-10 rounded-md ">
                        <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                }
                {data?.data &&
                    <>
                        {data.data.map(timeline =>
                            <div key={timeline.id} className="p-3 text-sm">
                                <div className="flex justify-between gap-4">
                                    <div className="text-gray-500">{new Date(timeline.createdAt).toLocaleString('ru-RU', { month: 'long', day: 'numeric' })} {timeline.user}</div>
                                    <div className="whitespace-nowrap text-gray-500">{new Date(timeline.createdAt).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                                <div className="text-lg font-medium">{timeline.title}</div>
                                <pre className="text-sm font-sans">{timeline.message}</pre>
                            </div>
                        )}
                    </>
                }
            </div>
            <div className="flex items-center justify-center py-3 w-full space-x-1">
                <button className={`p-2 font-bold border-[1px] rounded-md ${query.skip === 0 && "bg-gray-100 cursor-not-allowed"}`} onClick={onPrevPage} disabled={query.skip === 0 || isFetching === true}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className={`p-2 font-bold border-[1px] rounded-md ${data?.data.length !== itemPerPage && "bg-gray-100 cursor-not-allowed"}`} onClick={onNextPage} disabled={data?.data.length !== itemPerPage || isFetching === true}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
