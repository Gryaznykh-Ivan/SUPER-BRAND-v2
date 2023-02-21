import React, { useEffect, useState } from 'react'
import { OrderCreateRequest } from '../../../types/api';
import Input from '../../inputs/Input'

interface IProps {
    note: string | null;
    onChange: (obj: OrderCreateRequest) => void;
}

export default function Note({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        note: data.note ?? "",
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
            <div className="p-5 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold">Заметка</h2>
            </div>
            <div className="p-5">
                <Input type="text" placeholder="Заметка" id="note" name="note" onChange={onInputChange} />
            </div>
        </div>
    )
}
