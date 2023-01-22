import { profile } from 'console';
import React, { useEffect, useMemo, useState } from 'react'
import { useDeliveryProfilesQuery } from '../../../services/suggestionService';
import { OfferCreateRequest } from '../../../types/api';
import Select from '../../inputs/Select'

interface IProps {
    deliveryProfileId: string;
    onChange: (obj: OfferCreateRequest) => void;
}

export default function DeliveryProfile({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        deliveryProfileId: data.deliveryProfileId ?? "default",
    })

    const { data: deliveryProfiles } = useDeliveryProfilesQuery()
    const profiles = useMemo(() => {
        const p: Record<any, string> = {}

        deliveryProfiles?.data.forEach((profile) => {
            p[profile.id] = profile.title
        })

        return p
    }, [deliveryProfiles])

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
            <h2 className="font-semibold p-5 border-b-[1px]">Профиль доставки</h2>
            <div className="space-y-4 p-5">
                <Select
                    options={profiles}
                    name="deliveryProfileId"
                    value={state.deliveryProfileId}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}
