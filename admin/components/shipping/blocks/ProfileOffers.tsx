/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Image from "next/image"
import SearchInput from '../../inputs/SearchInput'

import SelectOffers from '../../products/popups/SelectOffers'
import JSXAccordion from '../../accordions/JSXAccordion'

export default function ProfileProducts() {
    const [popup, setPopup] = useState(false)

    const onPopupOpen = () => {
        setPopup(true)
    }

    const onPopupClose = () => {
        setPopup(false)
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Офферы</h2>
            <div className="flex space-x-4 p-5 border-b-[1px]">
                <SearchInput className="" placeholder="Поиск офферов" onChange={() => { }} />
                <button className="border-gray-500 border-[1px] text-gray-800 px-4 font-medium rounded-md" onClick={onPopupOpen}>Добавить</button>
            </div>
            <div className="divide-y-[1px] max-h-96 overflow-y-auto">
                <div className="">
                    <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                        <div className="relative w-12 aspect-square border-[1px] rounded-md">
                            <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                        </div>
                        <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    </div>
                    <div className="divide-y-[1px]">
                        <JSXAccordion name="US 5" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 6" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 7" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                        <div className="relative w-12 aspect-square border-[1px] rounded-md">
                            <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                        </div>
                        <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    </div>
                    <div className="divide-y-[1px]">
                        <JSXAccordion name="US 5" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 6" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 7" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                        <div className="relative w-12 aspect-square border-[1px] rounded-md">
                            <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                        </div>
                        <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    </div>
                    <div className="divide-y-[1px]">
                        <JSXAccordion name="US 5" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 6" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 7" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                        <div className="relative w-12 aspect-square border-[1px] rounded-md">
                            <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                        </div>
                        <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    </div>
                    <div className="divide-y-[1px]">
                        <JSXAccordion name="US 5" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 6" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                        <JSXAccordion name="US 7" content={
                            <>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                                <div className="flex items-center pl-5 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                    <div className="text-sm flex-1">Вася Пупкин</div>
                                    <div className="text-sm">цена сайта</div>
                                    <button className="p-2 rounded-md hover:bg-gray-200">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </button>
                                </div>
                            </>
                        } />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-5 space-x-4 border-t-[1px]">
                <button className="text-blue-700 hover:underline">Посмотреть еще</button>
            </div>
            {popup && <SelectOffers title="Выбор офферов" onClose={onPopupClose} />}
        </div>
    )
}
