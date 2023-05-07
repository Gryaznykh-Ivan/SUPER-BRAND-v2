import Link from 'next/link';
import React from 'react'
import { IBreadcrumb } from '../types';

interface IProps {
    className: string;
    crumbs: IBreadcrumb[];
}

export default function Breadcrumb({ className, crumbs }: IProps) {
    return (
        <ul className={`text-text-gray text-base font-normal ${className}`} itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope
                itemType="https://schema.org/ListItem">
                <Link itemProp="item" href="/">
                    <span className="capitalize" itemProp="name">Главная</span>
                </Link>
                <meta itemProp="position" content="0" />
            </li>
            {crumbs.map((crumb, index) =>
                <React.Fragment key={ crumb.title }>
                    <li><span>/</span></li>
                    <li itemProp="itemListElement" itemScope
                        itemType="https://schema.org/ListItem">
                        <Link itemProp="item" href={crumb.link}>
                            <span className={`capitalize ${crumb.active === true ? "text-black" : ""}`} itemProp="name">{crumb.title}</span>
                        </Link>
                        <meta itemProp="position" content={(index + 1).toString()} />
                    </li>
                </React.Fragment>
            )}
        </ul>
    )
}
