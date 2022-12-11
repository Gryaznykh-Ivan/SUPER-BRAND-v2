/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import Input from '../../inputs/Input';

interface IProps {
    title: string;
    onClose: () => void;
}

export default function EditAddress({ title, onClose }: IProps) {
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
                                <label htmlFor="country" className="text-sm text-gray-600 mb-1">Страна</label>
                                <Input type="text" id="country" placeholder="Страна" onChange={() => { }} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="region" className="text-sm text-gray-600 mb-1">Регион</label>
                                <Input type="text" id="region" placeholder="Регион" onChange={() => { }} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="city" className="text-sm text-gray-600 mb-1">Город</label>
                                <Input type="text" id="city" placeholder="Город" onChange={() => { }} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="address" className="text-sm text-gray-600 mb-1">Улица</label>
                                <Input type="text" id="address" placeholder="Улица" onChange={() => { }} />
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-between">
                            <div className="">
                                <button className="border-red-700 border-[1px] text-red-700 px-4 py-2 font-medium rounded-md hover:bg-red-700 hover:text-white">Удалить</button>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
