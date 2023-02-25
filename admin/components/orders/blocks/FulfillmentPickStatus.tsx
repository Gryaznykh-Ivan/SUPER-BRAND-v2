import React, { useEffect, useState } from 'react'
import { OrderFulfillmentUpdateRequest } from '../../../types/api';
import Select from '../../inputs/Select'

interface IProps {
    status: string;
    onChange: (obj: OrderFulfillmentUpdateRequest) => void;
}

export default function FulfillmentStatus({ onChange, ...data }: IProps) {
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
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Статус</h2>
            </div>
            <div className="p-5">
                <Select
                    options={{
                        SENT: { value: "Отправлено", disabled: false },
                        DELIVERED: { value: "Доставлено", disabled: false }
                    }}
                    name="status"
                    value={state.status}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}
