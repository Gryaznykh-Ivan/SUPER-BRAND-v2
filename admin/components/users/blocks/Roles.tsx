import React, { useEffect, useState } from 'react'
import { UserUpdateRequest } from '../../../types/api';
import { Role } from '../../../types/store';
import Select from '../../inputs/Select'

interface IProps {
    role: Role;
    onChange: (obj: UserUpdateRequest) => void;
}


export default function Roles({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        role: data.role,
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
            <h2 className="font-semibold p-5 border-b-[1px]">Роль</h2>
            <div className="space-y-4 p-5">
                <Select
                    options={{
                        CUSTOMER: { value: "Покупатель", disabled: false },
                        GUEST: { value: "Гость", disabled: false },
                        MANAGER: { value: "Менеджер", disabled: false },
                        ADMIN: { value: "Администратор", disabled: false },
                    }}
                    name="role"
                    value={state.role}
                    onChange={onInputChange}
                />
            </div>
        </div>
    )
}
