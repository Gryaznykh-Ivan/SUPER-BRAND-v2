import React, { useEffect, useState } from 'react'
import { OfferCreateRequest } from '../../../types/api';
import Select from '../../inputs/Select'

interface IProps {
    status: string;
    onChange: (obj: OfferCreateRequest) => void;
}


export default function Status({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        status: data.status,
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
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Статус</h2>
            <div className="space-y-4 p-5">
                <Select
                    options={{
                        OFFERED: { value: "Предложено", disabled: false },
                        ACCEPTED: { value: "Ожидает принятия", disabled: false },
                        DECLINED: { value: "Отклонено", disabled: false },
                        ACTIVE: { value: "Активно", disabled: false },
                        SOLD: { value: "Продано", disabled: true },
                        NO_MATCH: { value: "Нет соответствия", disabled: true },
                    }}
                    name="status"
                    value={state.status}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}
