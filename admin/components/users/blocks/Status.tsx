import React from 'react'
import Select from '../../inputs/Select'

export default function Status() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Статусы</h2>
            <div className="p-5 space-y-4">
                <div className="">
                    <h2 className="font-semibold text-sm mb-2">Верификация</h2>
                    <Select options={{ true: "Подтвержден", false: "Не подтвержден" }} onChange={() => { }} />
                </div>
                <div className="">
                    <h2 className="font-semibold text-sm mb-2">Подписка на новости</h2>
                    <Select options={{ true: "Подписан", false: "Не подписан" }} onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
