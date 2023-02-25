import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { OrderFulfillmentUpdateRequest } from '../../../types/api';
import Input from '../../inputs/Input'

interface IProps {
    tracking: string | null;
    carrier: string | null;
    onChange: (obj: OrderFulfillmentUpdateRequest) => void;
}

export default function TrackingInformation({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        tracking: data.tracking ?? "",
        carrier: data.carrier ?? "",
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
                <h2 className="font-semibold">Информаций для отслеживания</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
                <div className="">
                    <label htmlFor="tracking" className="text-sm">Трек-номер</label>
                    <Input type="text" placeholder="Трек-номер" id="tracking" name="tracking" value={state.tracking} onChange={onInputChange} />
                </div>
                <div className="">
                    <label htmlFor="carrier" className="text-sm">Перевозчик</label>
                    <Input type="text" placeholder="Перевозчик" id="carrier" name="carrier" value={state.carrier} onChange={onInputChange} />
                </div>
            </div>
        </div>
    )
}
