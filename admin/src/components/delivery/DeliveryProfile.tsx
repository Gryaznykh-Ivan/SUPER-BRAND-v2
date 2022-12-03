import React from 'react'
import { Link } from 'react-router-dom'

interface IProps {
    id?: string;
    name: string;
    offerCount?: number;
    zoneCount: number;
}

export default function DeliveryProfile({ id, name, offerCount, zoneCount }: IProps) {
    return (
        <div className="w-full flex justify-between border-[1px] rounded-md border-gray-400">
            <div className="flex-1 flex ">
                <div className="px-4 py-2">
                    <div className="font-medium text-md">{name}</div>
                    {offerCount && <div className="text-sm text-gray-500">{offerCount} offers</div>}
                    <div className="text-sm text-gray-500">Охвачено зон доставки: {zoneCount}</div>
                </div>
                <div className=""></div>
            </div>
            <div className="p-4">
                <Link to="#" className="text-blue-900 text-sm hover:underline">Управлять</Link>
            </div>
        </div>
    )
}
