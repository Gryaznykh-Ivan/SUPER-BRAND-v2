import Link from 'next/link';
import React from 'react'


interface IProps {
    id: string;
    title: string;
    zonesCount: number;
    offersCount: number;
}

export default function Profile({ id, title, zonesCount, offersCount }: IProps) {
    return (
        <Link href={`/shipping/profiles/${id}`} >
            <div className="w-full flex items-center justify-center text-center rounded-md p-5 border-[1px]">
                <div className="flex flex-col">
                    <div className="font-medium text-md">{title}</div>
                    <div className="text-sm text-gray-500">Активных офферов: {offersCount}</div>
                    <div className="text-sm text-gray-500">Охвачено зон доставки: {zonesCount}</div>
                </div>
            </div>
        </Link>
    )
}
