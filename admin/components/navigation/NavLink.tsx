import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react'

type classNameProps = { isActive: boolean }

interface IProps {
    query?: Record<string, string | undefined>;
    href: string;
    children: ReactNode;
    className: ({ isActive }: classNameProps) => string;
}

export default function NavLink({ href, children, query, className }: IProps) {
    const router = useRouter()
    let isActive = href === "/"
        ? router.pathname === href
        : router.pathname.indexOf(href.split("?")[0]) !== -1
    
    if (query !== undefined) {
        if (Object.entries(query).some(c => router.query[c[0]] !== c[1])) {
            isActive = false
        }
    }

    return (
        <Link href={href} className={className({ isActive })}>{children}</Link>
    )
}
