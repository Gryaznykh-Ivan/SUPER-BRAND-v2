import React from 'react'
import TextArea from '../../inputs/TextArea'

export default function Comment() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-5 border-b-[1px]">
                <h2 className="font-medium">Дополнительно</h2>
            </div>
            <div className="p-5">
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-600 mb-1">Комментарий к офферу</label>
                    <TextArea id="description" placeholder="Комментарий к офферу" name="description" value={"Создан парсером StockX"} onChange={() => { }} rows={2} />
                </div>
            </div>
        </div>
    )
}
