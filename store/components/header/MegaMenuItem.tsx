import Link from 'next/link'
import React from 'react'

interface IProps {
    className?: string;
    title: string;
    link: string;
    children: JSX.Element;
}


export default function MegaMenuItem({ className, title, link, children }: IProps) {
    return (
        <div className="flex items-center group hover:bg-gray-100 h-10">
            <Link href={link} className={`text-center font-semibold text-base tracking-wider whitespace-nowrap uppercase px-4 ${ className }`}>{title}</Link>
            <div className="absolute right-0 left-0 -bottom-6 bg-gray-100 invisible group-hover:visible transition-all duration-150">
                <div className="container px-3 md:px-10">
                    {children}
                </div>
            </div>
        </div>
    )
}
