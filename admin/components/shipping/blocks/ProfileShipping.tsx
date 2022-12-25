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
            <h2 className="font-semibold p-5 border-b-[1px]">Регионы доставки</h2>
            <div className="flex space-x-4 p-5 border-b-[1px]">
                <SearchInput className="" placeholder="Поиск регионов" onChange={() => { }} />
                <button className="border-gray-500 border-[1px] text-gray-800 px-4 font-medium rounded-md" onClick={onPopupOpen}>Добавить</button>
            </div>
            <div className="divide-y-[1px]">
                <div className="p-5">
                    <div className="flex justify-between ">
                        <div className="">
                            <div className="font-medium">Московская область</div>
                            <div className="text-gray-500 text-sm">Россия</div>
                        </div>
                        <button className="px-4 rounded-md font-medium hover:bg-green-700 hover:stroke-white hover:text-white stroke-black flex items-center">
                            <div className="mr-2 hidden md:block text-sm">Добавить опцию</div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 7V10M10 10V13M10 10H13M10 10H7M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-4">
                        <div className="font-medium">Опции</div>
                        <div className="">
                            <div className="flex pr-2 py-2 bg-white">
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
                            <div className="flex pr-2 py-2 bg-white">
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
                            <div className="flex pr-2 py-2 bg-white">
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
                </div>
                <div className="p-5">
                    <div className="flex justify-between ">
                        <div className="">
                            <div className="font-medium">Ленинградская область</div>
                            <div className="text-gray-500 text-sm">Россия</div>
                        </div>
                        <button className="px-4 rounded-md font-medium hover:bg-green-700 hover:stroke-white hover:text-white stroke-black flex items-center">
                            <div className="mr-2 hidden md:block text-sm">Добавить опцию</div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 7V10M10 10V13M10 10H13M10 10H7M19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-4">
                        <div className="font-medium">Опции</div>
                        <div className="">
                            <div className="flex pr-2 py-2 bg-white">
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
                            <div className="flex pr-2 py-2 bg-white">
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
                            <div className="flex pr-2 py-2 bg-white">
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
                </div>
            </div>
            <div className="flex items-center justify-center p-5 space-x-4 border-t-[1px]">
                <button className="text-blue-700 hover:underline">Посмотреть еще</button>
            </div>
            {popup && <SelectRegion title="Выбор региона" onClose={onPopupClose} />}
        </div>
    )
}
