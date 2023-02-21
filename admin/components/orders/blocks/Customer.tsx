import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useLazyGetUserByIdQuery } from '../../../services/userService';
import { OrderCreateRequest } from '../../../types/api';
import UsersSmartInput from '../../inputs/UsersSmartInput';

interface IProps {
    userId: string | null;
    onChange: (obj: OrderCreateRequest) => void;
}

export default function Customer({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        canChangeUser: data.userId === null
    })

    const [getUser, { data: user }] = useLazyGetUserByIdQuery()

    useEffect(() => {
        if (data.userId !== null) {
            getUser({ userId: data.userId })
        }
    }, [data.userId])

    const onChangeUser = () => {
        setState({ canChangeUser: true })
    }

    const onUserChange = async (id: string) => {
        const user = await getUser({ userId: id }).unwrap()
        if (user.success === true) {
            setState(prev => ({
                ...prev,
                canChangeUser: false
            }))
            onChange({ userId: data.userId !== id ? id : undefined })
        }
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="flex justify-between border-b-[1px]">
                <h2 className="font-semibold p-5">Покупатель</h2>
            </div>
            <div className="px-5 py-3">

                {state.canChangeUser === true &&
                    <div className="py-2 mb-1">
                        <UsersSmartInput placeholder="Поиск по пользователям" value="" onChange={onUserChange} />
                    </div>
                }
                {user?.data !== undefined &&
                    <div className="relative text-sm">
                        <div className="flex justify-between">
                            <div className="flex">
                                <Link href={`/users/${user.data.id}`}>
                                    <div className="hover:underline">{user.data.fullName}</div>
                                </Link>
                                {user.data.isVerified === true &&
                                    <div className="ml-2">
                                        <svg className="stroke-green-800" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 13L9 17L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="">{user.data.phone}</div>
                        <div className="">{user.data.email}</div>
                        {state.canChangeUser === false &&
                            <button className="absolute top-0 right-0 p-1.5 rounded-md hover:bg-gray-200" onClick={onChangeUser}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 21L15 15M17 10C17 10.9193 16.8189 11.8295 16.4672 12.6788C16.1154 13.5281 15.5998 14.2997 14.9497 14.9497C14.2997 15.5998 13.5281 16.1154 12.6788 16.4672C11.8295 16.8189 10.9193 17 10 17C9.08075 17 8.1705 16.8189 7.32122 16.4672C6.47194 16.1154 5.70026 15.5998 5.05025 14.9497C4.40024 14.2997 3.88463 13.5281 3.53284 12.6788C3.18106 11.8295 3 10.9193 3 10C3 8.14348 3.7375 6.36301 5.05025 5.05025C6.36301 3.7375 8.14348 3 10 3C11.8565 3 13.637 3.7375 14.9497 5.05025C16.2625 6.36301 17 8.14348 17 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
