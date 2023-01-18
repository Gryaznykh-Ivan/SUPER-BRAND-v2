import Link from 'next/link'
import React, { useState } from 'react'
import Input from '../../inputs/Input'
import SearchInput from '../../inputs/SearchInput'
import SelectOffers from '../../products/popups/SelectOffers'
import SelectRegion from '../popups/SelectRegion'

export default function ProfileShipping() {
    const [popup, setPopup] = useState(false)

    const onPopupOpen = () => {
        setPopup(true)
    }

    const onPopupClose = () => {
        setPopup(false)
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="flex justify-between items-center p-3 border-b-[1px]">
                <h2 className="font-semibold pl-3">Регионы доставки</h2>
                <button className="text-gray-800 text-sm p-2 font-medium rounded-md hover:bg-gray-100 flex items-center" onClick={onPopupOpen}>
                    <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="ml-2">Добавить</span>
                </button>
            </div>
            <div className="flex space-x-4 p-5 border-b-[1px]">
                <SearchInput className="" placeholder="Поиск регионов" onChange={() => { }} />
            </div>
            <div className="divide-y-[1px]">
                <div className="">
                    <div className="flex justify-between px-5 pt-5">
                        <div className="">
                            <div className="font-medium">Московская область</div>
                            <div className="text-gray-500 text-sm">Россия</div>
                        </div>
                        <div className=""></div>
                    </div>
                    <div className="mt-4 px-5 pb-5">
                        <div className="font-medium">Опции</div>
                        <div className="">
                            <div className="flex py-2 bg-white">
                                <div className="flex-1 flex space-x-2">
                                    <Input type="text" onChange={() => { }} placeholder="Название" />
                                    <Input className="md:w-20" type="text" onChange={() => { }} placeholder="Срок" />
                                    <Input className="md:w-40" type="text" onChange={() => { }} placeholder="Цена" />
                                </div>
                                <button className="ml-2 p-2 rounded-md hover:bg-gray-100">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex py-2 bg-white">
                                <div className="flex-1 flex space-x-2">
                                    <Input type="text" onChange={() => { }} placeholder="Название" />
                                    <Input className="md:w-20" type="text" onChange={() => { }} placeholder="Срок" />
                                    <Input className="md:w-40" type="text" onChange={() => { }} placeholder="Цена" />
                                </div>
                                <button className="ml-2 p-2 rounded-md hover:bg-gray-100">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex py-2 bg-white">
                                <div className="flex-1 flex space-x-2">
                                    <Input type="text" onChange={() => { }} placeholder="Название" />
                                    <Input className="md:w-20" type="text" onChange={() => { }} placeholder="Срок" />
                                    <Input className="md:w-40" type="text" onChange={() => { }} placeholder="Цена" />
                                </div>
                                <button className="ml-2 p-2 rounded-md hover:bg-gray-100">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="w-full space-y-4 p-2 border-t-[1px]">
                        <div className="flex p-2 text-blue-800 rounded-md">
                            <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="ml-2">Добавить опцию</span>
                        </div>
                    </button>
                </div>
            </div>
            <button className="w-full p-5 space-x-4 border-t-[1px]">
                <div className="text-blue-700">Посмотреть еще</div>
            </button>
            {popup && <SelectRegion title="Выбор региона" onClose={onPopupClose} />}
        </div>
    )
}
