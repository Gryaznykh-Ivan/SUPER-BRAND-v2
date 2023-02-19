import React from 'react'
import Input from '../../inputs/Input'

export default function Timeline() {
    return (
        <div className="bg-white shadow-sm rounded-md">
            <div className="p-3 flex items-center space-x-3 border-b-[1px]">
                <Input type="text" placeholder="Напишите сообщение" id="description" onChange={() => { }} />
                <button className="border-gray-400 border-[1px] px-4 py-2 font-medium rounded-md text-sm">Отправить</button>
            </div>
            <div className="p-3 space-y-2 border-b-[1px]">
                <div className="px-1 text-sm">
                    <div className="text-gray-600">February 16</div>
                    <div className="flex justify-between gap-4">
                        <div className="text-base">Заказ создан</div>
                        <div className="whitespace-nowrap text-gray-600">5:48 PM</div>
                    </div>
                </div>
                <div className="px-1 text-sm">
                    <div className="text-gray-600">February 16</div>
                    <div className="flex justify-between gap-4">
                        <div className="text-base">Заказ создан</div>
                        <div className="whitespace-nowrap text-gray-600">5:48 PM</div>
                    </div>
                </div>
                <div className="px-1 text-sm">
                    <div className="text-gray-600">February 16</div>
                    <div className="flex justify-between gap-4">
                        <div className="text-base">Заказ создан</div>
                        <div className="whitespace-nowrap text-gray-600">5:48 PM</div>
                    </div>
                </div>
                <div className="px-1 text-sm">
                    <div className="text-gray-600">February 16</div>
                    <div className="text-gray-600">Грязных Иван</div>
                    <div className="flex justify-between gap-4">
                        <div className="text-base">Заказ создан</div>
                        <div className="whitespace-nowrap text-gray-600">5:48 PM</div>
                    </div>
                </div>
            </div>
            <div className="p-3 flex justify-center space-x-1">
                <button className={`p-2 font-bold border-[1px] rounded-md`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className={`p-2 font-bold border-[1px] rounded-md`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
