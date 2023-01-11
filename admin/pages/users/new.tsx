import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import MainLayout from '../../components/layouts/Main'
import GeneralInfo from '../../components/users/blocks/GeneralInfo'
import Consignment from '../../components/users/blocks/Consignment'
import Roles from '../../components/users/blocks/Roles'
import Status from '../../components/users/blocks/Status'
import Addresses from '../../components/users/blocks/Addresses'
import Permissions from '../../components/users/blocks/Permissions'
import { useCreateUserMutation } from '../../services/userService'
import { toast } from 'react-toastify'
import { IErrorResponse, UserCreateRequest, UserUpdateRequest } from '../../types/api'
import { useRouter } from 'next/router'

export default function New() {
    const router = useRouter()

    const [createUser, { isSuccess: isCreateUserSuccess, isError: isCreateUserError, error: createUserError, data }] = useCreateUserMutation()

    const [changes, setChanges] = useState<UserCreateRequest>({})
    const onCollectChanges = (obj: UserCreateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isCreateUserSuccess) {
            setTimeout(() => toast.success("Пользователь создан"), 100)
        }

        if (isCreateUserError) {
            if (createUserError && "status" in createUserError) {
                toast.error((createUserError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateUserSuccess, isCreateUserError])

    const onSaveChanges = async () => {
        const result = await createUser(changes).unwrap()
        if (result.success === true) {
            router.push('/users/' + result.data)
        }
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/users" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-medium">Создание пользователя</h1>
                    </div>
                    <div className="flex justify-end">
                    </div>
                </div>

                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <GeneralInfo
                            firstName={null}
                            lastName={null}
                            phone={null}
                            email={null}
                            comment={null}
                            onChange={onCollectChanges}
                        />
                        <Consignment
                            account={null}
                            bic={null}
                            inn={null}
                            correspondentAccount={null}
                            passport={null}
                            onChange={onCollectChanges}
                        />
                        <Permissions
                            permissions={[]}
                            onChange={onCollectChanges}
                        />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <Roles
                            role={'GUEST'}
                            onChange={onCollectChanges}
                        />
                        <Status
                            isSubscribed={false}
                            isVerified={false}
                            onChange={onCollectChanges}
                        />
                        <Addresses
                            addresses={[]}
                            onChange={onCollectChanges}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className=""></div>
                    <div className="flex justify-end">
                        <button className={`${mustBeSaved ? "bg-green-600" : "bg-gray-300"} px-4 py-2 text-white font-medium rounded-md`} disabled={!mustBeSaved} onClick={onSaveChanges}>Создать</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}