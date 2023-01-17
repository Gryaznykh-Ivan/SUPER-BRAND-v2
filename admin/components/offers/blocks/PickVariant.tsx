/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React, { useState } from 'react'
import ImageLoader from '../../image/ImageLoader'
import SelectVariants from '../../products/popups/SelectVariants'

export default function PickVariant() {
    const [popup, setPopup] = useState(false)

    const onPopupOpen = () => {
        setPopup(true)
    }

    const onPopupClose = () => {
        setPopup(false)
    }

    return (
        <div className="flex rounded-md bg-white shadow-sm p-5 space-x-4 flex-col md:flex-row">
            <div className="relative w-64 aspect-5/3 border-[1px] border-dashed rounded-md border-gray-400 mx-auto">
                {false ?
                    <Image
                        className="object-contain"
                        loader={ImageLoader}
                        fill
                        sizes="200px"
                        src={""}
                        alt={""}
                    />
                    :
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                }
            </div>
            <div className="flex flex-col flex-1 space-y-2">
                <div className="">
                    <label className="text-sm text-gray-600 mb-1">Продукт</label>
                    <h2 className="font-medium">Не выбран</h2>
                    {/* <h2 className="font-medium">Yeezy 450 Kids "Dark Slate"</h2> */}
                </div>
                <div className="">
                    <label className="text-sm text-gray-600 mb-1">Вариант</label>
                    <h2 className="font-medium">Не выбран</h2>
                    {/* <h2 className="font-medium">US 5</h2> */}
                </div>
                <button className="border-blue-700 border-[1px] text-blue-700 px-4 py-2 font-medium rounded-md hover:bg-blue-700 hover:text-white" onClick={onPopupOpen}>Выбрать</button>
            </div>
            {popup && <SelectVariants title="Выбор варианта" onClose={onPopupClose} />}
        </div>
    )
}
