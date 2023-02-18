import React from 'react'
import Select from '../../inputs/Select'

export default function FulfillmentStatus() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Статус</h2>
            </div>
            <div className="p-5">
                <Select
                    options={{
                        OFFERED: "Предложено",
                        ACCEPTED: "Ожидает принятия",
                        DECLINED: "Отклонено",
                        ACTIVE: "Активно",
                        SOLD: "Продано",
                    }}
                    onChange={() => { }}
                />
            </div>
        </div>
    )
}
