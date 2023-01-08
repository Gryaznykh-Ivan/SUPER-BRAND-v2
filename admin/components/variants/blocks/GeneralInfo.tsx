import React from 'react'
import Input from '../../inputs/Input'

export default function GeneralInfo() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px]">
                <h2 className="font-medium">Основное</h2>
            </div>
            <div className="p-5">
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm text-gray-600 mb-1">Размер</label>
                        <Input type="text" id="title" placeholder="Размер" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm text-gray-600 mb-1">Цвет</label>
                        <Input type="text" id="title" placeholder="Цвет" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm text-gray-600 mb-1">Материал</label>
                        <Input type="text" id="title" placeholder="Материал" onChange={() => { }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="SKU" className="text-sm text-gray-600 mb-1">SKU</label>
                            <Input type="text" id="SKU" placeholder="SKU" onChange={() => { }} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="barcode" className="text-sm text-gray-600 mb-1">Штрих-код</label>
                            <Input type="text" id="barcode" placeholder="Штрих-код" onChange={() => { }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
