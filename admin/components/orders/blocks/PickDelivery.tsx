/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useMemo, useState } from 'react'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IDeliveryOption, IErrorResponse, IProduct, IService } from '../../../types/api';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Select from '../../inputs/Select';
import { useDeliveryProfilesQuery, useLazyDeliveryOptionsQuery } from '../../../services/suggestionService';


interface IProps {
    region: string;
    onSelectShipping: (service: Omit<IService, "id">) => void;
}

export default function PickDelivery({ onSelectShipping, region }: IProps) {
    const [state, setState] = useState({
        deliveryProfileId: "default",
        selectedOption: ""
    })

    const { data: deliveryProfiles } = useDeliveryProfilesQuery()
    const profiles = useMemo(() => {
        const p: Record<any, Record<string, string | boolean>> = {}

        deliveryProfiles?.data.forEach((profile) => {
            p[profile.id] = { value: profile.title, disabled: false }
        })

        return p
    }, [deliveryProfiles])

    const [getDeliveryOptions, { error: deliveryOptionsError, isFetching: isDeliveryOptionsFetching, isError: isDeliveryOptionsError, data: deliveryOptions }] = useLazyDeliveryOptionsQuery()

    useEffect(() => {
        getDeliveryOptions({ region, deliveryProfileId: state.deliveryProfileId })
    }, [state.deliveryProfileId])

    useEffect(() => {
        if (deliveryOptions?.data[0]) {
            onSelectOption(deliveryOptions.data[0])
        }
    }, [deliveryOptions])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSelectOption = (option: IDeliveryOption) => {
        if (state.selectedOption === option.id) return

        onSelectShipping({ type: "SHIPPING", description: option.title, price: option.price })
        setState(prev => ({ ...prev, selectedOption: option.id }))
    }

    return (
        <div className="">
            <div className="mt-2">
                <label htmlFor="deliveryProfile" className="text-sm">Профиль</label>
                <Select
                    options={profiles}
                    name="deliveryProfileId"
                    value={state.deliveryProfileId}
                    onChange={onInputChange}
                />
            </div>
            {!isDeliveryOptionsFetching && (deliveryOptionsError && "status" in deliveryOptionsError) &&
                <div className="pt-5">
                    <div className="text-center text-red-600">{(deliveryOptionsError.data as IErrorResponse).message}</div>
                </div>
            }
            {isDeliveryOptionsFetching &&
                <div className="flex justify-center pt-5">
                    <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            }
            {!isDeliveryOptionsError && deliveryOptions?.data !== undefined && deliveryOptions.data.length !== 0 &&
                <div className="mt-4 space-y-2">
                    {deliveryOptions.data.map(option =>
                        <label key={option.id} className="block border-[1px] rounded-md p-3 text-sm" onClick={() => onSelectOption(option)}>
                            <div className="flex items-center">
                                <input type="checkbox" readOnly name="" checked={state.selectedOption === option.id} className="rounded" />
                                <div className="flex-1 ml-3">{option.title}</div>
                                <div className="flex space-x-4 text-gray-500">
                                    <div className="">{option.duration <= 1 ? "В течении дня" : `до ${option.duration} дней`}</div>
                                    <div className="">{Number(option.price) === 0 ? "Бесплатно" : `${option.price}₽`}</div>
                                </div>
                            </div>
                        </label>
                    )}
                </div>
            }
        </div>
    )
}
