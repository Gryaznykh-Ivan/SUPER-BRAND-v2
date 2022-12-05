import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react'

type classNameProps = { isActive: boolean }

interface IProps {
    href: string;
    children: ReactNode;
    className: ({ isActive }: classNameProps) => string;
}

export default function NavLink({ href, children, className }: IProps) {
    const router = useRouter()
    const isActive = href === "/"
        ? router.pathname === href
        : router.pathname.indexOf(href) !== -1

    return (
        <Link href={href} className={className({ isActive })}>{children}</Link>
    )
}
