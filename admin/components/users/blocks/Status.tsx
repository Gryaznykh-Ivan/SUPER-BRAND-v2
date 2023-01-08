import React, { useEffect, useState } from 'react'
import { UserUpdateRequest } from '../../../types/api';
import Select from '../../inputs/Select'

interface IProps {
    isVerified: boolean;
    isSubscribed: boolean;
    onChange: (obj: UserUpdateRequest) => void;
}


export default function Status({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        isVerified: data.isVerified,
        isSubscribed: data.isSubscribed,
    })

    useEffect(() => {
        const localState = Object.entries(state)
        const changes = localState.map(([key, value]) => {
            if (data[key as keyof typeof data] === value) {
                return [key, undefined]
            }

            return [key, value]
        })

        onChange(Object.fromEntries(changes))
    }, [state])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value === 'true' }))
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Статусы</h2>
            <div className="p-5 space-y-4">
                <div className="">
                    <h2 className="text-sm text-gray-600 mb-1">Верификация</h2>
                    <Select options={{ true: "Подтвержден", false: "Не подтвержден" }} name="isVerified" value={ state.isVerified.toString() } onChange={onInputChange} />
                </div>
                <div className="">
                    <h2 className="text-sm text-gray-600 mb-1">Подписка на новости</h2>
                    <Select options={{ true: "Подписан", false: "Не подписан" }} name="isSubscribed" value={ state.isSubscribed.toString() } onChange={onInputChange} />
                </div>
            </div>
        </div>
    )
}
