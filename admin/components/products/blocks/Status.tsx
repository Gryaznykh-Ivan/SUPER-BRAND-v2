import React, { useEffect, useState } from 'react'
import { ProductCreateRequest } from '../../../types/api';
import Select from '../../inputs/Select'

interface IProps {
    available: boolean;
    onChange: (obj: ProductCreateRequest) => void;
}

export default function Status({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        available: data.available,
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
            <h2 className="font-semibold p-5 border-b-[1px]">Статус</h2>
            <div className="space-y-4 p-5">
                <Select options={{ true: "Active", false: "Draft" }} name="available" value={state.available.toString()} onChange={onInputChange} />
            </div>
        </div>
    )
}
