import React from 'react'
import Input from '../../inputs/Input'

export default function EditinalInfo() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Дополнительно</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <label htmlFor="vendor" className="text-sm text-gray-600 mb-1">Vendor</label>
                    <Input type="text" id="vendor" placeholder="Vendor" onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
