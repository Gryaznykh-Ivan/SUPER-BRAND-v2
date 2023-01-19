import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useGetUserByIdQuery, useLazyGetUserByIdQuery, useLazyGetUsersBySearchQuery } from '../../../services/userService';
import { OfferCreateRequest } from '../../../types/api';
import SearchInput from '../../inputs/SearchInput'
import UsersSmartInput from '../../inputs/UsersSmartInput';

interface IProps {
    providerId: string | null;
    onChange: (obj: OfferCreateRequest) => void;
}

export default function Provider({ onChange, ...data }: IProps) {
    const [state, setState] = useState({
        isSelected: data.providerId !== null
    })

    const [getUser, { data: user }] = useLazyGetUserByIdQuery()

    useEffect(() => {
        if (state.isSelected !== null && data.providerId !== null) {
            getUser({ userId: data.providerId })
        }
    }, [data.providerId])

    const onRemoveUser = () => {
        setState({ isSelected: false })
        onChange({ userId: data.providerId === null ? undefined : null })
    }

    const onUserChange = async (id: string) => {
        const user = await getUser({ userId: id }).unwrap()
        if (user.success === true) {
            setState(prev => ({
                ...prev,
                isSelected: true
            }))
            onChange({ userId: data.providerId !== id ? id : undefined })
        }
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="flex justify-between border-b-[1px]">
                <h2 className="font-semibold p-5">Поставщик</h2>
            </div>
            {state.isSelected === false ?
                <div className="p-5">
                    <UsersSmartInput placeholder="Поиск по пользователям" value="" onChange={onUserChange} />
                </div>
                :
                <>
                    {user?.data !== undefined &&
                        <div className="relative px-5 py-3 text-sm">
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
                            <button className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-200" onClick={onRemoveUser}>
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6569 4.34315L10 10ZM10 10L4.34315 15.6569ZM10 10L15.6569 15.6569ZM10 10L4.34315 4.34315Z" fill="#D9D9D9" />
                                    <path d="M15.6569 4.34315L10 10M10 10L4.34315 15.6569M10 10L15.6569 15.6569M10 10L4.34315 4.34315" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    }
                </>
            }
        </div>
    )
}
