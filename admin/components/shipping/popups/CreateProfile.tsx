/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import Input from '../../inputs/Input';
import { toast } from 'react-toastify';
import CountriesSmartInput from '../../inputs/CountriesSmartInput';

interface IProps {
    onClose: () => void;
    onDone: (title: string, location: string) => void;
}

export default function ProfileName({ onClose, onDone }: IProps) {
    const [state, setState] = useState({
        title: "",
        location: ""
    })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onDoneEvent = () => {
        if (state.title.length === 0) {
            return toast.error("Название не может быть пустым")
        }

        onDone(state.title, state.location)
        onClose();
    }

    return (
        <Modal>
            <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-center" onClick={onClose}>
                <div className="w-full max-w-lg bg-white rounded-md" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b-[1px]">
                        <h2 className="font-medium">Создание профиля</h2>
                        <button className="p-2" onClick={onClose}>
                            <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                        <div className="p-5 space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="title" className="text-sm text-gray-600 mb-1">Название профиля</label>
                                <Input placeholder="Название профиля" type="text" name="title" value={state.title} onChange={onInputChange} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="location" className="text-sm text-gray-600 mb-1">Местоположение</label>
                                <CountriesSmartInput id="location" placeholder="Местоположение" name="location" value={state.location} onChange={onInputChange} />
                            </div>
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
