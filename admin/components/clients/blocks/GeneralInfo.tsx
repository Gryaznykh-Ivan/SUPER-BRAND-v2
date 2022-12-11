import React from 'react'
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

export default function GeneralInfo() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Основное</h2>
            <div className="space-y-4 p-5">
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="text-sm text-gray-600 mb-1">Фамилия</label>
                        <Input type="text" id="SKU" placeholder="Фамилия" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="text-sm text-gray-600 mb-1">Имя</label>
                        <Input type="text" id="firstName" placeholder="Имя" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="patronymic" className="text-sm text-gray-600 mb-1">Отчество</label>
                        <Input type="text" id="patronymic" placeholder="Отчество" onChange={() => { }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-gray-600 mb-1">Email</label>
                        <Input type="text" id="email" placeholder="Email" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-sm text-gray-600 mb-1">Телефон</label>
                        <Input type="text" id="phone" placeholder="Телефон" onChange={() => { }} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="comment" className="text-sm text-gray-600 mb-1">Комментарий</label>
                    <TextArea id="comment" placeholder="Комментарий" onChange={() => { }} />
                </div>
            </div>
        </div>
    )
}
