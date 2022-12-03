import Link from 'next/link'
import React from 'react'

import ShieldIcon from '../../components/icons/Shield'

interface IProps {
    children: React.ReactNode
}

export default function CheckoutLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex justify-between items-center h-14 bg-white border-b-[1px] px-4">
                <Link href="/" className="text-2xl font-bold whitespace-nowrap">SUPER BRAND</Link>
                <div className="flex items-center h-full">
                    <div className="text-green-600 font-bold whitespace-nowrap hidden md:block">Безопасная оплата</div>
                    <ShieldIcon className="stroke-green-600 ml-2" w={20} h={20} />
                </div>
            </div>
            <main className="flex-1 my-4">
                {children}
            </main>
        </div>
    )
}
