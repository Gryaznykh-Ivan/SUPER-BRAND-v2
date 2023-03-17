/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import { useLazyDeliveryZonesQuery } from '../../../services/suggestionService';
import { IDeliveryZone, IErrorResponse } from '../../../types/api';
import { toast } from 'react-toastify';

interface IProps {
    profileId: string;
    title: string;
    onClose: () => void;
    onDone: (zone: Pick<IDeliveryZone, "country" | "region">) => void;
}

export default function SelectRegion({ profileId, title, onClose, onDone }: IProps) {

    const itemPerPage = 20

    const [getDeliveryZone, { isError, error, isFetching, data }] = useLazyDeliveryZonesQuery()

    const [state, setState] = useState<Pick<IDeliveryZone, "country" | "region">[]>([])
    const [selected, setSelected] = useState<Pick<IDeliveryZone, "country" | "region"> | null>(null)
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0
    })

    useEffect(() => {
        const newResult = data?.data ?? []

        if (query.skip === 0) {
            setState(newResult)
        } else {
            setState(prev => [...prev, ...newResult])
        }
    }, [data])

    useEffect(() => {
        getDeliveryZone({ ...query, profileId })
    }, [query])

    const onSelectProfileZone = (zone: Pick<IDeliveryZone, "country" | "region">) => {
        if (selected === null) {
            setSelected(zone)
        } else {
            if (selected.country !== zone.country || selected.region !== zone.region) {
                setSelected(zone)
                return
            }

            setSelected(null)
        }
    }

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, limit: itemPerPage, skip: 0 }))
    }

    const onNextPage = () => {
        if (data?.data.length !== itemPerPage) return

        setQuery(prev => ({ ...prev, skip: prev.skip + prev.limit }))
    }

    const onDoneEvent = () => {
        if (selected === null) {
            return toast.error("Зона не выбрана")
        }

        onClose()
        onDone(selected)
    }

    return (
        <Modal>
            <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-center" onClick={onClose}>
                <div className="w-full max-w-lg bg-white rounded-md" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b-[1px]">
                        <h2 className="font-medium">{title}</h2>
                        <button className="p-2" onClick={onClose}>
                            <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative max-h-[60vh] overflow-y-auto">
                        <div className="p-5 border-b-[1px] space-y-4">
                            <div className="flex flex-col">
                                <SearchInput placeholder="Поиск зоны" onChange={onSearch} />
                            </div>
                        </div>
                        <div className="divide-y-[1px] max-h-96 overflow-y-auto">
                            {
                                isError &&
                                <div className="flex flex-col items-center py-5">
                                    <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                                    {(error && "status" in error) &&
                                        <div className="text-gray-500">{(error.data as IErrorResponse).message}</div>
                                    }
                                </div>
                            }
                            {
                                isFetching &&
                                <div className="flex justify-center absolute bg-white border-gray-100 border-2 inset-x-0 p-5 shadow-md z-10 rounded-md ">
                                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                            {
                                isFetching === false && state.length === 0 &&
                                <div className="text-center py-5">
                                    <div className="">Все доступные регионы добавлены</div>
                                </div>
                            }
                            {state.map(zone =>
                                <label key={zone.region} htmlFor={zone.region} className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                                    <input type="checkbox" name="" id={zone.region} className="rounded" checked={selected?.country === zone.country && selected.region === zone.region} onChange={() => onSelectProfileZone(zone)} />
                                    <div className="text-sm flex-1">
                                        <div className="text-gray-500">{zone.country}</div>
                                        <div className="">{zone.region}</div>
                                    </div>
                                </label>
                            )}
                            <button className={`w-full py-3 text-blue-600 ${data?.data.length !== itemPerPage && "hidden"}`} onClick={onNextPage}>Загрузить еще</button>

                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-end space-x-4">
                            <button className="border-gray-500 border-[1px] text-gray-800 px-4 py-2 font-medium rounded-md" onClick={onClose}>Отмена</button>
                            <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md" onClick={onDoneEvent}>Готово</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
