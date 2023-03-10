import React, { useEffect, useState } from 'react'
import { OrderReturnUpdateRequest } from '../../../types/api';
import Select from '../../inputs/Select'

interface IProps {
    status: string;
    onChange: (obj: OrderReturnUpdateRequest) => void;
}

export default function ReturnStatus({ onChange, ...data }: IProps) {
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
                        RETURN_REQUESTED: { value: "Запрошен возврат", disabled: false },
                        RETURN_IN_PROGRESS: { value: "В процессе", disabled: false },
                        RETURNED: { value: "Обработан", disabled: false },
                    }}
                    name="status"
                    value={state.status}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}
