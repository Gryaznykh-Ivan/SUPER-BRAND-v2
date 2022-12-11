import React from 'react'
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

export default function GeneralInfo() {
    return (
        <div className="rounded-md bg-white shadow-sm p-5">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm text-gray-600 mb-1">Название коллекции</label>
                    <Input type="text" id="title" placeholder="Название коллекции" onChange={() => { }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-600 mb-1">Описание</label>
                    <TextArea id="description" placeholder="Описание" onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
