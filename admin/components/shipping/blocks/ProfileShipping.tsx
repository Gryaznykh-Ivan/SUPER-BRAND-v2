import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Input from '../../inputs/Input'
import SearchInput from '../../inputs/SearchInput'
import SelectOffers from '../popups/SelectOffers'
import DeliveryDeliveryZone from '../cards/DeliveryZone'
import SelectRegion from '../popups/SelectRegion'
import { useCreateDeliveryZoneMutation, useDeleteDeliveryZoneMutation, useLazyGetDeliveryZonesQuery, useUpdateDeliveryZoneMutation } from '../../../services/shippingService'
import { DeliveryZoneUpdateRequest, IDeliveryZone, IErrorResponse } from '../../../types/api'
import DeliveryZone from '../cards/DeliveryZone'
import { toast } from 'react-toastify'
import useConfirm from '../../../hooks/useConfirm'

interface IProps {
    profileId: string;
}

export default function ProfileShipping({ profileId }: IProps) {
    const itemPerPage = 20

    const { show } = useConfirm()

    const [getDeliveryZones, { isError, error, isFetching, data }] = useLazyGetDeliveryZonesQuery()

    const [createDeliveryZone, { isSuccess: isCreateDeliveryZoneSuccess, isError: isCreateDeliveryZoneError, error: createDeliveryZoneError }] = useCreateDeliveryZoneMutation()
    const [updateDeliveryZone, { isSuccess: isUpdateDeliveryZoneSuccess, isError: isUpdateDeliveryZoneError, error: updateDeliveryZoneError }] = useUpdateDeliveryZoneMutation()
    const [removeDeliveryZone, { isSuccess: isRemoveDeliveryZoneSuccess, isError: isRemoveDeliveryZoneError, error: removeDeliveryZoneError }] = useDeleteDeliveryZoneMutation()

    const [popup, setPopup] = useState(false)
    const [state, setState] = useState<IDeliveryZone[]>([])
    const [query, setQuery] = useState({
        q: "",
        limit: itemPerPage,
        skip: 0,
    })

    useEffect(() => {
        const newResult = data?.data ?? []

        if (query.skip === 0) {
            setState(newResult)
        } else {
            setState(prev => [...prev, ...newResult])
        }
    }, [data])

    useEffect(() => {
        getDeliveryZones({ ...query, profileId, q: query.q })
    }, [query])


    useEffect(() => {
        if (isCreateDeliveryZoneSuccess) {
            toast.success("Зона доставки создана")
        }

        if (isCreateDeliveryZoneError) {
            if (createDeliveryZoneError && "status" in createDeliveryZoneError) {
                toast.error((createDeliveryZoneError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isCreateDeliveryZoneSuccess, isCreateDeliveryZoneError])

    useEffect(() => {
        if (isUpdateDeliveryZoneSuccess) {
            toast.success("Зона доставки обновлена")
        }

        if (isUpdateDeliveryZoneError) {
            if (updateDeliveryZoneError && "status" in updateDeliveryZoneError) {
                toast.error((updateDeliveryZoneError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isUpdateDeliveryZoneSuccess, isUpdateDeliveryZoneError])

    useEffect(() => {
        if (isRemoveDeliveryZoneSuccess) {
            setTimeout(() => toast.success("Зона доставки удалена"), 100)
        }

        if (isRemoveDeliveryZoneError) {
            if (removeDeliveryZoneError && "status" in removeDeliveryZoneError) {
                toast.error((removeDeliveryZoneError.data as IErrorResponse).message)
            } else {
                toast.error("Произошла неизвесная ошибка")
            }
        }
    }, [isRemoveDeliveryZoneSuccess, isRemoveDeliveryZoneError])

    const onSearch = (q: string) => {
        setQuery(prev => ({ ...prev, q, limit: itemPerPage, skip: 0 }))
    }

    const onNextPage = () => {
        if (data?.data.length !== itemPerPage) return

        setQuery(prev => ({ ...prev, skip: prev.skip + prev.limit }))
    }

    const onPopupOpen = () => setPopup(true)
    const onPopupClose = () => setPopup(false)

    const onCreateDeliveryZone = (zone: Pick<IDeliveryZone, "country" | "region">) => {
        createDeliveryZone({ profileId, ...zone })
    }

    const onRemoveDeliveryZone = async (zoneId: string) => {
        const isConfirmed = await show("Подтверждение", "Подтвердите удаление зоны")

        if (isConfirmed === true) {
            removeDeliveryZone({ profileId, zoneId })
        }
    }

    const onUpdateDeliveryZone = (zoneId: string, data: Omit<DeliveryZoneUpdateRequest, "profileId" | "zoneId">) => {
        updateDeliveryZone({ profileId, zoneId, ...data })
    }

    return (
        <div className="relative rounded-md bg-white shadow-sm">
            <div className="flex justify-between items-center p-3 border-b-[1px]">
                <h2 className="font-semibold pl-3">Регионы доставки</h2>
                <button className="text-gray-800 text-sm p-2 font-medium rounded-md hover:bg-gray-100 flex items-center" onClick={onPopupOpen}>
                    <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="ml-2">Добавить</span>
                </button>
            </div>
            <div className="flex space-x-4 p-5 border-b-[1px]">
                <SearchInput className="" placeholder="Поиск регионов" onChange={onSearch} />
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
            {state.length === 0 &&
                <div className="flex justify-center bg-white p-5">
                    Ничего не найдено
                </div>
            }
            <div className="divide-y-[1px]">
                {state.map(zone =>
                    <DeliveryZone
                        key={zone.id}
                        id={zone.id}
                        country={zone.country}
                        region={zone.region}
                        options={zone.options}
                        onChange={onUpdateDeliveryZone}
                        onRemoveDeliveryZone={onRemoveDeliveryZone}
                    />
                )}
            </div>
            <button className={`w-full py-3 text-blue-600 border-t-[1px] ${data?.data.length !== itemPerPage && "hidden"}`} onClick={onNextPage}>Загрузить еще</button>
            {popup && <SelectRegion title="Выбор региона" profileId={ profileId } onClose={onPopupClose} onDone={onCreateDeliveryZone} />}
        </div>
    )
}
