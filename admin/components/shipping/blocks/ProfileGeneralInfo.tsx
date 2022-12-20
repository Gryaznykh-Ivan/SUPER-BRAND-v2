import React from 'react'
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

export default function ProfileGeneralInfo() {
    return (
        <div className="rounded-md bg-white shadow-sm p-5">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm text-gray-600 mb-1">Название профиля</label>
                    <Input type="text" id="title" placeholder="Название профиля" onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
