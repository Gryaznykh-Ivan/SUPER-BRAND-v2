import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { IErrorResponse, UserUpdateRequest } from '../../../types/api'
import Addresses from '../../../components/users/blocks/Addresses'
import Consignment from '../../../components/users/blocks/Consignment'
import GeneralInfo from '../../../components/users/blocks/GeneralInfo'
import Status from '../../../components/users/blocks/Status'
import MainLayout from '../../../components/layouts/Main'
import Permissions from '../../../components/users/blocks/Permissions'
import Roles from '../../../components/users/blocks/Roles'
import { useRouter } from 'next/router'
import { useDeleteUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from '../../../services/userService'
import { toast } from 'react-toastify'

export default function Index() {
    const router = useRouter()

    const { isError, error, isLoading, data } = useGetUserByIdQuery({ userId: router.query.userId as string })

    const [updateUser, { isSuccess: isUpdateUserSuccess, isError: isUpdateUserError, error: updateUserError }] = useUpdateUserMutation()
    const [deleteUser, { isSuccess: isDeleteUserSuccess, isError: isDeleteUserError, error: deleteUserError }] = useDeleteUserMutation()

    const [changes, setChanges] = useState<UserUpdateRequest>({})
    const onCollectChanges = (obj: UserUpdateRequest) => {
        setChanges(prev => ({ ...prev, ...obj }))
    }

    useEffect(() => {
        if (isUpdateUserSuccess) {
            toast.success("Пользователь обновлен")
        }

        if (isUpdateUserError) {
            if (updateUserError && "status" in updateUserError) {
                toast.error((updateUserError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isUpdateUserSuccess, isUpdateUserError])

    useEffect(() => {
        if (isDeleteUserSuccess) {
            setTimeout(() => toast.success("Пользователь удален"), 100)
        }

        if (isDeleteUserError) {
            if (deleteUserError && "status" in deleteUserError) {
                toast.error((deleteUserError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isDeleteUserSuccess, isDeleteUserError])

    const onSaveChanges = async () => {
        const result = await updateUser({ userId: router.query.userId as string, ...changes }).unwrap()
        if (result.success === true) {
            setChanges({})
        }
    }

    const mustBeSaved = useMemo(() => {
        return Object.values(changes).some(c => c !== undefined)
    }, [changes])

    const onUserDelete = async () => {
        const result = await deleteUser({ userId: router.query.userId as string }).unwrap();
        if (result.success === true) {
            router.push("/users")
        }
    }

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                {isError &&
                    <div className="flex flex-col items-center py-5">
                        <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                        {(error && "status" in error) &&
                            <div className="text-gray-500">{(error.data as IErrorResponse).message}</div>
                        }
                        <button className="text-blue-500 underline text-sm mt-4" onClick={() => router.back()}>Вернуться назад</button>
                    </div>
                }
                {isLoading &&
                    <div className="">Загрузка</div>
                }
                {!isLoading && data?.data &&
                    <>
                        <div className="flex justify-between">
                            <div className="flex items-center space-x-4">
                                <Link href="/users" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <h1 className="text-xl font-medium">{data.data.fullName}</h1>
                            </div>
                            <div className="flex justify-end">
                                <Link href="/offers" className="p-2 hover:bg-gray-200 rounded-md stroke-black">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                            <div className="flex-1 space-y-4">
                                <GeneralInfo
                                    firstName={data.data.firstName}
                                    lastName={data.data.lastName}
                                    phone={data.data.phone}
                                    email={data.data.email}
                                    comment={data.data.comment}
                                    onChange={onCollectChanges}
                                />
                                <Consignment
                                    account={data.data.account}
                                    bic={data.data.bic}
                                    inn={data.data.inn}
                                    correspondentAccount={data.data.correspondentAccount}
                                    passport={data.data.passport}
                                    onChange={onCollectChanges}
                                />
                                <Permissions
                                    permissions={data.data.permissions}
                                    onChange={onCollectChanges}
                                />
                            </div>
                            <div className="space-y-4 lg:w-80">
                                <Roles
                                    role={data.data.role}
                                    onChange={onCollectChanges}
                                />
                                <Status
                                    isSubscribed={data.data.isSubscribed}
                                    isVerified={data.data.isVerified}
                                    onChange={onCollectChanges}
                                />
                                <Addresses
                                    addresses={data.data.addresses}
                                    onChange={onCollectChanges}
                                />
                            </div>
                        </div>
                        <div className={`flex justify-between rounded-md ${mustBeSaved && "sticky left-10 right-0 bottom-4 bg-gray-800 p-4 transition-colors duration-200"}`}>
                            <div className="">
                                <button className="border-red-600 border-[1px] text-red-600 px-4 py-2 font-medium rounded-md hover:bg-red-700 hover:text-white" onClick={onUserDelete}>Удалить</button>
                            </div>
                            <div className="flex justify-end">
                                <button className={`${mustBeSaved ? "bg-green-600" : "bg-gray-300"} px-4 py-2 text-white font-medium rounded-md`} disabled={!mustBeSaved} onClick={onSaveChanges}>Сохранить</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </MainLayout >
    )
}
