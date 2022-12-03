import Link from 'next/link';
import React from 'react'


interface IProps {
    id?: string;
    offers?: string;
    name: string;
    zones: string;
}

export default function DeliveryProfile({ id, name, offers, zones }: IProps) {
    return (
        <div className="w-full flex justify-between border-[1px] rounded-md border-gray-400">
            <div className="flex-1 flex ">
                <div className="px-4 py-2">
                    <div className="font-medium text-md">{name}</div>
                    {offers && <div className="text-sm text-gray-500">{offers}</div>}
                    <div className="text-sm text-gray-500">{zones}</div>
                </div>
                <div className=""></div>
            </div>
            <div className="p-4">
                <Link href="#" className="text-blue-900 text-sm hover:underline">Управлять</Link>
            </div>
        </div>
    )
}
