/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';
import JSXAccordion from '../../accordions/JSXAccordion';
import { IDeliveryProfile, IErrorResponse, IOffer, IOfferSearch } from '../../../types/api';
import { useLazyGetOffersBySearchQuery } from '../../../services/offerService';
import ImageLoader from '../../image/ImageLoader';
import Select from '../../inputs/Select';
import PickDelivery from '../blocks/PickDelivery';
import Input from '../../inputs/Input';

interface IProps {
    title: string;
    onClose: () => void;
}

export default function AddService({ title, onClose }: IProps) {


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
                                <Select id="serviceType" options={{ DELIVERY: "Доставка", DISCOUNT: "Скидка" }} onChange={() => { }} />
                            </div>
                            {/* <PickDelivery /> */}
                            <div className="mt-2 space-y-2">
                                <div className="">
                                    <label htmlFor="description" className="text-sm">Описание</label>
                                    <Input type="text" placeholder="Описание" id="description" onChange={() => { }} />
                                </div>
                                <div className="">
                                    <label htmlFor="discount" className="text-sm">Цена</label>
                                    <Input type="text" placeholder="Цена" id="discount" onChange={() => { }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-end space-x-4">
                            <button className="border-gray-500 border-[1px] text-gray-800 px-4 py-2 font-medium rounded-md" onClick={onClose}>Отмена</button>
                            <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md" onClick={onClose}>Готово</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
