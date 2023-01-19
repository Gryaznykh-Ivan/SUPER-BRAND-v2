/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useLazyGetVariantPreviewQuery } from '../../../services/variantService';
import { OfferCreateRequest } from '../../../types/api';
import ImageLoader from '../../image/ImageLoader'
import SelectVariants from '../../products/popups/SelectVariants'


interface IProps {
    variantId: string | null;
    onChange: (obj: OfferCreateRequest) => void;
}

export default function PickVariant({ onChange, ...data }: IProps) {
    const [state, setState] = useState(data.variantId)
    const [popup, setPopup] = useState(false)

    const onPopupOpen = () => setPopup(true)
    const onPopupClose = () => setPopup(false)

    const [getPreview, { data: variant }] = useLazyGetVariantPreviewQuery()

    useEffect(() => {
        if (data.variantId !== null) {
            getPreview({ variantId: data.variantId })
        }
    }, [data.variantId])

    const onVariantChange = async (id: string) => {
        setState(id)
    }

    const onDone = async () => {
        if (state === null) return

        const variant = await getPreview({ variantId: state }).unwrap()
        if (variant.success === true) {
            onChange({ variantId: data.variantId !== state ? state : undefined })
        }
    }

    return (
        <div className="flex rounded-md bg-white shadow-sm p-5 space-x-4 flex-col md:flex-row">
            <div className={`relative w-64 aspect-5/3 border-[1px] rounded-md border-gray-400 mx-auto`}>
                {variant?.data.image ?
                    <Image
                        className="object-contain"
                        loader={ImageLoader}
                        fill
                        sizes="200px"
                        src={variant?.data.image.src}
                        alt={variant?.data.image.alt}
                    />
                    :
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                }
            </div>
            <div className="flex flex-col flex-1">
                <div className="space-y-2 flex-1">
                    <div className="">
                        <div className="text-sm text-gray-600">Товар</div>
                        {variant?.data.product ?
                            <Link href={`/products/${ variant?.data.productId }`} target="_blank" className="font-medium hover:underline">{variant?.data.product}</Link>
                            :
                            <div className="font-medium">Не выбран</div>
                        }
                    </div>
                    <div className="">
                        <div className="text-sm text-gray-600">Вариант</div>
                        {variant?.data.variant ?
                            <div className="font-medium">{variant?.data.variant}</div>
                            :
                            <div className="font-medium">Не выбран</div>
                        }
                    </div>
                </div>
                <button className="border-blue-700 border-[1px] text-blue-700 px-4 py-2 font-medium rounded-md hover:bg-blue-700 hover:text-white justify-items-end" onClick={onPopupOpen}>Выбрать</button>
            </div>
            {popup && <SelectVariants title="Выбор варианта" variantId={state} onVariantChange={onVariantChange} onClose={onPopupClose} onDone={onDone} />}
        </div>
    )
}
