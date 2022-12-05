import React from 'react'
import Select from '../../inputs/Select'

export default function DeliveryProfile() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Профиль доставки</h2>
            <div className="space-y-4 p-5">
                <Select options={{ general: "Общий", inStoke: "В наличии" }} onChange={() => { }} />
            </div>
        </div>
    )
}
