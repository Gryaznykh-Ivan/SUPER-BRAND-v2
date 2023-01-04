import React, { useEffect, useState } from 'react'
import { UserCreateRequest, UserUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

interface IProps {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    comment: string | null;
    onChange: (obj: UserCreateRequest | UserUpdateRequest) => void;
}

export default function GeneralInfo({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        email: data.email ?? "",
        comment: data.comment ?? "",
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        phone: data.phone ?? ""
    })

    useEffect(() => {
        const localState = Object.entries(state)
        const changes = localState.map(([key, value]) => {
            if (data[key as keyof typeof data] === null && value === "") {
                return [key, undefined]
            }

            if (data[key as keyof typeof data] !== null && value === "") {
                return [key, null]
            }

            if (data[key as keyof typeof data] === value) {
                return [key, undefined]
            }

            return [key, value]
        })
        
        onChange(Object.fromEntries(changes))
    }, [state])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Основное</h2>
            <div className="space-y-4 p-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="text-sm text-gray-600 mb-1">Фамилия</label>
                        <Input type="text" id="SKU" name="lastName" placeholder="Фамилия" value={ state.lastName } onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="text-sm text-gray-600 mb-1">Имя</label>
                        <Input type="text" id="firstName" name="firstName" placeholder="Имя" value={ state.firstName } onChange={onInputChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-gray-600 mb-1">Email</label>
                        <Input type="text" id="email" name="email" placeholder="Email" value={ state.email } onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-sm text-gray-600 mb-1">Телефон</label>
                        <Input type="text" id="phone" name="phone" placeholder="Телефон" value={ state.phone } onChange={onInputChange} />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="comment" className="text-sm text-gray-600 mb-1">Комментарий</label>
                    <TextArea id="comment" placeholder="Комментарий" name="comment" value={ state.comment } onChange={onInputChange} />
                </div>
            </div>
        </div>
    )
}
