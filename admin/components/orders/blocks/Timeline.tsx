import React from 'react'
import Input from '../../inputs/Input'

export default function Timeline() {
    return (
        <div className="">
            <div className="rounded-md bg-white shadow-sm">
                <div className="p-3 border-b-[1px] flex items-center">
                    <Input type="text" placeholder="Напишите сообщение" id="description" onChange={() => { }} />
                </div>
                <div className="px-3 py-2 flex justify-end">
                    <button className="border-gray-400 border-[1px] px-4 py-2 font-medium rounded-md text-sm">Отправить</button>
                </div>
            </div>
            <div className="py-5 space-y-2">
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
        </div>
    )
}
