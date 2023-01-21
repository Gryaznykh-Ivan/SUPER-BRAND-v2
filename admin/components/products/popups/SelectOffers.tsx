/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import JSXAccordion from '../../accordions/JSXAccordion';

interface IProps {
    title: string;
    onClose: () => void;
}

export default function SelectOffers({ title, onClose }: IProps) {
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
                        <div className="p-5 border-b-[1px] space-y-4">
                            <div className="flex flex-col">
                                <SearchInput placeholder="Поиск" onChange={() => { }} />
                            </div>
                        </div>
                        <div className="divide-y-[1px] max-h-96 overflow-y-auto">
                            <div className="flex items-center pl-5 pr-3 py-1 space-x-4 hover:bg-gray-100">
                                <div className="flex-1 text-sm py-1">
                                    <div className="">Air Jordan 4 Retro "Military Black" • US 5</div>
                                    <div className="text-gray-500">Вася Пупкин</div>
                                </div>
                                <div className="ml-2">45000₽</div>
                                <button className="p-2 rounded-md hover:bg-gray-200">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-end space-x-4">
                            <button className="border-gray-500 border-[1px] text-gray-800 px-4 py-2 font-medium rounded-md" onClick={onClose}>Отмена</button>
                            <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Готово</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
