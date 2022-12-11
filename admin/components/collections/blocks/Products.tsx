/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import Image from 'next/image'
import SearchInput from '../../inputs/SearchInput'
import SelectProducts from '../../products/popups/SelectProducts'

export default function Products() {
    const [popup, setPopup] = useState(false)

    const onPopupOpen = () => {
        setPopup(true)
    }

    const onPopupClose = () => {
        setPopup(false)
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Продукты</h2>
            <div className="flex space-x-4 p-5 border-b-[1px]">
                <SearchInput className="" placeholder="Поиск по коллекции" onChange={() => { }} />
                <button className="border-gray-500 border-[1px] text-gray-800 px-4 font-medium rounded-md" onClick={ onPopupOpen }>Добавить</button>
            </div>
            <div className="divide-y-[1px]">
                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                    <div className="">1.</div>
                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                    </div>
                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => { }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                    <div className="">2.</div>
                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                    </div>
                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => { }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                    <div className="">3.</div>
                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                    </div>
                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => { }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                    <div className="">4.</div>
                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                    </div>
                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                    <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => { }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-center p-5 space-x-4">
                    <button className="text-blue-700 hover:underline">Посмотреть еще</button>
                </div>
            </div>
            { popup && <SelectProducts title="Продукты коллекции" onClose={ onPopupClose } /> }
        </div>
    )
}
