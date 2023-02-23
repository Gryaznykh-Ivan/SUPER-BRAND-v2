/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import Input from '../../inputs/Input';
import { IOrderAddress } from '../../../types/api';
import { toast } from 'react-toastify';
import CountriesSmartInput from '../../inputs/CountriesSmartInput';
import RegionsSmartInput from '../../inputs/RegionsSmartInput';
import CitiesSmartInput from '../../inputs/CitiesSmartInput';
import { useLazyGetUserAddressesQuery, useLazyGetUserByIdQuery } from '../../../services/userService';
import Select from '../../inputs/Select';

interface IProps {
    title: string;
    mailingCountry: string;
    mailingCity: string;
    mailingRegion: string;
    mailingAddress: string;
    userId: string | null;
    onClose: () => void;
    onDone: (obj: IOrderAddress) => void;
}

export default function ManageAddress({ title, onClose, onDone, ...data }: IProps) {
    const [state, setState] = useState({
        mailingCountry: data.mailingCountry,
        mailingCity: data.mailingCity,
        mailingRegion: data.mailingRegion,
        mailingAddress: data.mailingAddress
    })

    const [getUserAddresses, { isFetching, data: addresses }] = useLazyGetUserAddressesQuery()

    useEffect(() => {
        if (data.userId !== null) {
            getUserAddresses({ userId: data.userId })
        }
    }, [data.userId])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (addresses?.data === undefined) return

        const address = addresses.data.find(a => a.id === e.target.value)
        if (address === undefined) return

        setState(prev => ({
            ...prev,
            mailingAddress: address.address,
            mailingCity: address.city,
            mailingCountry: address.country,
            mailingRegion: address.region
        }))
    }

    const onDoneEvent = () => {
        if (onDone !== undefined) {
            if (Object.entries(state).some(a => a[1] === "")) {
                return toast.error("Одно из полей не заполнено")
            }

            onDone(state)
            onClose()
        }
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
                    <div className="max-h-[60vh] overflow-y-auto">
                        <div className="">
                            {isFetching &&
                                <div className="flex justify-center p-5">
                                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                            {addresses?.data !== undefined && addresses.data.length !== 0 &&
                                <div className="p-5 border-b-[1px]">
                                    <label htmlFor="mailingCountry" className="text-sm text-gray-600 mb-1">Адреса покупателя</label>
                                    <Select
                                        id="userAddress"
                                        options={
                                            addresses.data.reduce((a, c) => {
                                                a[c.id] = { value: `${c.country}, р-н ${c.region}, г. ${c.city}, ${c.address}`, disabled: false }

                                                return a
                                            }, { 0: { value: "Выберите адрес", disabled: false } } as { [keys: string]: Record<string, string | boolean> })
                                        }
                                        onChange={onSelectChange}
                                    />
                                </div>
                            }
                        </div>
                        <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
                            <div className="flex flex-col">
                                <label htmlFor="mailingCountry" className="text-sm text-gray-600 mb-1">Страна</label>
                                <CountriesSmartInput id="mailingCountry" placeholder="Страна" name="mailingCountry" value={state.mailingCountry} onChange={onInputChange} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="mailingRegion" className="text-sm text-gray-600 mb-1">Регион</label>
                                <RegionsSmartInput id="mailingRegion" country={state.mailingCountry || undefined} placeholder="Регион" name="mailingRegion" value={state.mailingRegion} onChange={onInputChange} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="mailingCity" className="text-sm text-gray-600 mb-1">Город</label>
                                <CitiesSmartInput id="mailingCity" region={state.mailingRegion || undefined} placeholder="Город" name="mailingCity" value={state.mailingCity} onChange={onInputChange} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="mailingAddress" className="text-sm text-gray-600 mb-1">Улица</label>
                                <Input type="text" id="mailingAddress" placeholder="Улица" name="mailingAddress" value={state.mailingAddress} onChange={onInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-between">
                            <div className=""></div>
                            <div className="flex justify-end">
                                <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md" onClick={onDoneEvent}>Готово</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
