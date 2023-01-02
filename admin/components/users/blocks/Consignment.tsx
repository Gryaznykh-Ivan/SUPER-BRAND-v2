import React from 'react'
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

export default function Consignment() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Консигнация</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <label htmlFor="pasport" className="text-sm text-gray-600 mb-1">Паспорт</label>
                    <Input type="text" id="pasport" placeholder="Паспорт" onChange={() => { }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="inn" className="text-sm text-gray-600 mb-1">ИНН</label>
                        <Input type="text" id="inn" placeholder="ИНН" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="bic" className="text-sm text-gray-600 mb-1">БИК</label>
                        <Input type="text" id="bic" placeholder="БИК" onChange={() => { }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="account" className="text-sm text-gray-600 mb-1">Банковский счет</label>
                        <Input type="text" id="account" placeholder="Банковский счет" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="correspondentAccount" className="text-sm text-gray-600 mb-1">Счет корреспондента</label>
                        <Input type="text" id="correspondentAccount" placeholder="Счет корреспондента" onChange={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
