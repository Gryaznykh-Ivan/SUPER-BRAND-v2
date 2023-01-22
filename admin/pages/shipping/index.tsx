import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import Profile from '../../components/shipping/cards/Profile'
import ProfileName from '../../components/shipping/popups/ProfileName'
import { useCreateDeliveryProfileMutation, useGetAllDeliveryProfileQuery } from '../../services/shippingService'
import { IErrorResponse } from '../../types/api'

function Index() {
    const [popup, setPopup] = useState(false)

    const { isError, isFetching, data, error } = useGetAllDeliveryProfileQuery()

    const [createProfile, { isSuccess: isCreateProfileSuccess, isError: isCreateProfileError, error: createProfileError }] = useCreateDeliveryProfileMutation()

    useEffect(() => {
        if (isCreateProfileSuccess) {
            toast.success("Профиль доставки создан")
        }

        if (isCreateProfileError) {
            if (createProfileError && "status" in createProfileError) {
                toast.error((createProfileError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateProfileSuccess, isCreateProfileError])

    const onPopupOpen = () => setPopup(true)
    const onPopupClose = () => setPopup(false)

    const onCreateProfile = (title: string) => {
        createProfile({ title })
    }

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Доставка</h1>
                </div>
                <div className="flex flex-col pb-4">
                    <div className="flex-1 space-y-4">
                        <div className="relative bg-white rounded-md">
                            <div className="flex justify-between items-center p-3 border-b-[1px]">
                                <h2 className="font-semibold pl-3">Профили доставки</h2>
                                <button className="text-gray-800 text-sm p-2 font-medium rounded-md hover:bg-gray-100 flex items-center" onClick={onPopupOpen}>
                                    <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="ml-2">Добавить</span>
                                </button>
                            </div>
                            {isError &&
                                <div className="flex flex-col items-center py-5">
                                    <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                                    {(error && "status" in error) &&
                                        <div className="text-gray-500">{(error.data as IErrorResponse).message}</div>
                                    }
                                </div>
                            }
                            {isFetching &&
                                <div className="flex justify-center absolute bg-white border-gray-100 border-2 inset-x-0 p-5 shadow-md z-10 rounded-md ">
                                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                            {data?.data &&
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
                                    {data.data.map(profile =>
                                        <Profile
                                            key={profile.id}
                                            id={profile.id}
                                            title={profile.title}
                                            offersCount={profile.offersCount}
                                            zonesCount={profile.zonesCount}
                                        />
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {popup && <ProfileName onClose={onPopupClose} onDone={onCreateProfile} />}
        </MainLayout>
    )
}

export default Index
