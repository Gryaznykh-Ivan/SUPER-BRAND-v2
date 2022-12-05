import React from 'react'
import Input from '../../inputs/Input'

export default function Prices() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px]">
                <h2 className="font-medium">Цены</h2>
            </div>
            <div className="p-5">
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="sPrice" className="text-sm text-gray-600 mb-1">Цена поставщика</label>
                        <Input type="number" id="sPrice" placeholder="Цена поставщика" onChange={() => { }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="price" className="text-sm text-gray-600 mb-1">Цена на сайте</label>
                            <Input type="number" id="price" placeholder="Цена на сайте" onChange={() => { }} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="compareAtPrice" className="text-sm text-gray-600 mb-1">Цена до скидки</label>
                            <Input type="number" id="compareAtPrice" placeholder="Цена до скидки" onChange={() => { }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
