/* eslint-disable react/no-unescaped-entities */
import React, { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import JSXAccordion from '../../accordions/JSXAccordion';
import { IDeliveryProfile, IErrorResponse, IOffer, IOfferSearch, IService } from '../../../types/api';
import { useLazyGetOffersBySearchQuery } from '../../../services/offerService';
import ImageLoader from '../../image/ImageLoader';
import Select from '../../inputs/Select';
import PickDelivery from '../blocks/PickDelivery';
import Input from '../../inputs/Input';
import { toast } from 'react-toastify';
import { Service } from '../../../types/store';

interface IProps {
    title: string;
    region: string | null;
    onClose: () => void;
    onDone: (obj: IService) => void;
}

export default function AddService({ title, onClose, onDone, ...data }: IProps) {
    const [state, setState] = useState<Omit<IService, "id">>({
        type: Service.DISCOUNT_AMOUNT,
        description: "",
        amount: ""
    })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = e.target.value.replace(/[^0-9]/g, "")
        setState(prev => ({ ...prev, [e.target.name]: price }))
    }

    const onPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const percent = e.target.value.replace(/[^0-9]/g, "")
        setState(prev => ({ ...prev, [e.target.name]: percent }))
    }

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(prev => ({
            ...prev,
            type: e.target.value as Service,
            description: "",
            amount: ""
        }))
    }

    const onSelectShipping = (service: Omit<IService, "id">) => {
        setState(prev => ({
            ...prev,
            type: service.type,
            description: service.description,
            amount: service.amount
        }))
    }

    const onDoneEvent = () => {
        if (state.amount?.length === 0) {
            return toast.error("Вы не указали сумму")
        }

        onDone({ ...state, id: `new${Math.random()}` })
        onClose()
    }

    return (
        <Modal>
            <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-center" onClick={onClose}>
                <div className="w-full max-w-lg bg-white rounded-md" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b-[1px]">
                        <h2 className="font-medium">{title}</h2>
                        <button className="p-2" onClick={onClose}>
                            <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative max-h-[60vh] overflow-y-auto">
                        <div className="max-h-96 overflow-y-auto p-5">
                            <div className="">
                                <label htmlFor="serviceType" className="text-sm">Тип</label>
                                <Select
                                    id="serviceType"
                                    options={{
                                        SHIPPING: { value: "Доставка", disabled: false },
                                        DISCOUNT_AMOUNT: { value: "Скидка в деньгах", disabled: false },
                                        DISCOUNT_PERCENT: { value: "Скидка в процентах", disabled: false },
                                    }}
                                    name="type"
                                    value={state.type}
                                    onChange={onSelectChange}
                                />
                            </div>
                            {state.type === Service.DISCOUNT_AMOUNT &&
                                <div className="mt-2 space-y-2">
                                    <div className="">
                                        <label htmlFor="description" className="text-sm">Описание</label>
                                        <Input type="text" placeholder="Описание" name="description" id="description" value={state.description} onChange={onInputChange} />
                                    </div>
                                    <div className="">
                                        <label htmlFor="amount" className="text-sm">Величина скидки</label>
                                        <Input type="text" placeholder="Величина скидки" name="amount" id="amount" value={state.amount} onChange={onPriceChange} />
                                    </div>
                                </div>
                            }
                            {state.type === Service.DISCOUNT_PERCENT &&
                                <div className="mt-2 space-y-2">
                                    <div className="">
                                        <label htmlFor="description" className="text-sm">Описание</label>
                                        <Input type="text" placeholder="Описание" name="description" id="description" value={state.description} onChange={onInputChange} />
                                    </div>
                                    <div className="">
                                        <label htmlFor="amount" className="text-sm">Величина скидки в процентах</label>
                                        <Input type="text" placeholder="Величина скидки в процентах" name="amount" id="amount" value={state.amount} onChange={onPercentChange} />
                                    </div>
                                </div>
                            }
                            {state.type === Service.SHIPPING &&
                                <>
                                    {
                                        data.region === null ?
                                            <div className="pt-5">
                                                <div className="text-center text-red-600">Доставка в указанную зону недоступна</div>
                                            </div>
                                            :
                                            <PickDelivery
                                                region={data.region}
                                                onSelectShipping={onSelectShipping}
                                            />
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-end space-x-4">
                            <button className="border-gray-500 border-[1px] text-gray-800 px-4 py-2 font-medium rounded-md" onClick={onClose}>Отмена</button>
                            <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md" onClick={onDoneEvent}>Готово</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
