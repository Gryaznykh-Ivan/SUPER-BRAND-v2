import Link from 'next/link'
import React from 'react'
import Profile from '../cards/Profile'

export default function Profiles() {
    return (
        <div className="bg-white rounded-md">
            <div className="p-4 border-b-[1px]">
                <h2 className="font-medium">Профили доставки</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
                <Profile
                    name="Основной"
                    offers="Все офферы без профиля"
                    zones="Охвачено зон доставки: 98"
                />
                <Profile
                    name="В наличии"
                    offers="200 offers"
                    zones="Охвачено зон доставки: 98"
                />
            </div>
            <div className="p-5 border-t-[1px]">
                <div className="flex justify-end space-x-4">
                    <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать профиль</button>
                </div>
            </div>
        </div>
    )
}
