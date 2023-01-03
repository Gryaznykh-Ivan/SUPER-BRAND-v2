import React, { useEffect, useState } from 'react'
import { UserUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

interface IProps {
    passport: string | null;
    inn: string | null;
    bic: string | null;
    account: string | null;
    correspondentAccount: string | null;
    onChange: (obj: UserUpdateRequest) => void;
}


export default function Consignment({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        passport: data.passport || "",
        inn: data.inn || "",
        bic: data.bic || "",
        account: data.account || "",
        correspondentAccount: data.correspondentAccount || ""
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
            <h2 className="font-semibold p-5 border-b-[1px]">Консигнация</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <label htmlFor="passport" className="text-sm text-gray-600 mb-1">Паспорт</label>
                    <Input type="text" id="passport" name="passport" placeholder="Паспорт" value={ state.passport } onChange={onInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="inn" className="text-sm text-gray-600 mb-1">ИНН</label>
                        <Input type="text" id="inn" name="inn" placeholder="ИНН" value={ state.inn } onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="bic" className="text-sm text-gray-600 mb-1">БИК</label>
                        <Input type="text" id="bic" name="bic" placeholder="БИК" value={ state.bic } onChange={onInputChange} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="account" className="text-sm text-gray-600 mb-1">Банковский счет</label>
                        <Input type="text" id="account" name="account" placeholder="Банковский счет" value={ state.account } onChange={onInputChange} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="correspondentAccount" className="text-sm text-gray-600 mb-1">Счет корреспондента</label>
                        <Input type="text" id="correspondentAccount" name="correspondentAccount" placeholder="Счет корреспондента" value={ state.correspondentAccount } onChange={onInputChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}
