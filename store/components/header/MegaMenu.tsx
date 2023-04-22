import Link from 'next/link'
import React from 'react'
import MegaMenuItem from './MegaMenuItem'

export default function MegaMenu() {
    return (
        <div className="border-b-[1px] bg-white hidden md:block">
            <div className="container px-3 md:px-6 flex">
                <MegaMenuItem title="nike" link="/collections/nike">
                    <div className="">1</div>
                </MegaMenuItem>
                <MegaMenuItem title="Adidas" link="/collections/adidas">
                    <div className="">2</div>
                </MegaMenuItem>
                <MegaMenuItem title="new Balance" link="/collections/new-balance">
                    <div className="">3</div>
                </MegaMenuItem>
                <MegaMenuItem title="одежда" link="/collections/clothes">
                    <div className="">4</div>
                </MegaMenuItem>
                <MegaMenuItem title="детское" link="/collections/for-kids">
                    <div className="">5</div>
                </MegaMenuItem>
                <MegaMenuItem title="Black Friday" link="/collections/black-friday">
                    <div className="">6</div>
                </MegaMenuItem>
                <MegaMenuItem className="text-main-red" title="Sale" link="/collections/sale">
                    <div className="">7</div>
                </MegaMenuItem>
            </div>
        </div>
    )
}
