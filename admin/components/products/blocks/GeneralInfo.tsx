import React from 'react'
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

export default function GeneralInfo() {
    return (
        <div className="rounded-md bg-white shadow-sm p-5">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-sm text-gray-600 mb-1">Название продукта</label>
                    <Input type="text" id="title" placeholder="Название продукта" onChange={() => { }} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-600 mb-1">Описание</label>
                    <TextArea id="description" placeholder="Описание" onChange={() => { }} />
                </div>
                {/* <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="SKU" className="text-sm text-gray-600 mb-1">SKU</label>
                        <Input type="text" id="SKU" placeholder="SKU" onChange={() => { }} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="barcode" className="text-sm text-gray-600 mb-1">Штрих-код</label>
                        <Input type="text" id="barcode" placeholder="Штрих-код" onChange={() => { }} />
                    </div>
                </div> */}
            </div>
        </div>
    )
}
