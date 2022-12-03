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

    return (
        <Link href={href} className={className({ isActive: router.pathname === href })}>{children}</Link>
    )
}
