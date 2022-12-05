import React from 'react'
import Select from '../../inputs/Select'

export default function Status() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Статус продукта</h2>
            <div className="space-y-4 p-5">
                <Select options={{ active: "active", draft: "draft" }} onChange={() => { }} />
            </div>
        </div>
    )
}
