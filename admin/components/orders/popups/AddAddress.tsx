/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import Input from '../../inputs/Input';
import { IOrderAddress } from '../../../types/api';
import { toast } from 'react-toastify';
import CountriesSmartInput from '../../inputs/CountriesSmartInput';
import RegionsSmartInput from '../../inputs/RegionsSmartInput';
import CitiesSmartInput from '../../inputs/CitiesSmartInput';

interface IProps {
    title: string;
    onClose: () => void;
    onDone: (obj: IOrderAddress) => void;
}

export default function AddAddress({ title, onClose, onDone }: IProps) {
    const [state, setState] = useState({
        mailingCountry: "",
        mailingRegion: "",
        mailingCity: "",
        mailingAddress: "",
    })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
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
