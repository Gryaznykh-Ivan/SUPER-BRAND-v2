import Link from 'next/link';
import React from 'react'


interface IProps {
    id?: string;
    offers?: string;
    name: string;
    zones: string;
}

export default function Profile({ id, name, offers, zones }: IProps) {
    return (
        <Link href="/shipping/profiles/example" >
            <div className="w-full flex items-center justify-center text-center rounded-md p-5 border-[1px]">
                <div className="flex flex-col">
                    <div className="font-medium text-md">{name}</div>
                    {offers && <div className="text-sm text-gray-500">{offers}</div>}
                    <div className="text-sm text-gray-500">{zones}</div>
                </div>
            </div>
        </Link>
    )
}
