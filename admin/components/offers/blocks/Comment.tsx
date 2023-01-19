import React, { useEffect, useState } from 'react'
import { OfferCreateRequest } from '../../../types/api';
import TextArea from '../../inputs/TextArea'

interface IProps {
    comment: string | null;
    onChange: (obj: OfferCreateRequest) => void;
}

export default function Comment({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        comment: data.comment ?? "",
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
            <div className="p-5 border-b-[1px]">
                <h2 className="font-medium">Дополнительно</h2>
            </div>
            <div className="p-5">
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-600 mb-1">Комментарий к офферу</label>
                    <TextArea id="description" placeholder="Комментарий к офферу" name="comment" value={state.comment} onChange={onInputChange} rows={2} />
                </div>
            </div>
        </div>
    )
}
