/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React, { useState } from 'react'
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
        <div className="flex rounded-md bg-white shadow-sm p-5 space-x-4">
            <div className="relative w-64 aspect-5/3 border-[1px] border-dashed rounded-md border-gray-400">
                {/* <Image fill src={`/assets/images/air-force0.jpg`} className="object-contain" alt="" /> */}
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
                <button className="border-blue-700 border-[1px] text-blue-700 px-4 py-2 font-medium rounded-md hover:bg-blue-700 hover:text-white" onClick={ onPopupOpen }>Выбрать</button>
            </div>
            {popup && <SelectVariants title="Выбор варианта" onClose={onPopupClose} />}
        </div>
    )
}
