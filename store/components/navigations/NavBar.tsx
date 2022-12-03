import React, { useState } from 'react'
import Link from 'next/link'
import { INavMenuState, NavMenuType } from '../../types'
import { NavData } from './NavData'

export default function NavBar() {
    const [menu, setMenu] = useState<INavMenuState>({
        activeIndex: -1,
        current: []
    })

    const onShowSubMenu = (menu: NavMenuType, index: number) => {
        setMenu(prev => ({ ...prev, current: menu, activeIndex: index }))
    }

    return (
        <div className="hidden md:block bg-white" onMouseLeave={() => onShowSubMenu([], -1)}>
            <div className="border-b-[1px]">
                <div className="container flex items-center px-3">
                    {NavData.map((item, i) => (
                        < Link key={item.title} href={item.link} className="relative group box-border text-xs mr-4 py-3 font-bold tracking-wide whitespace-nowrap" onMouseEnter={() => onShowSubMenu(item.menu, i)}>
                            {item.title}
                            <span className={`absolute bottom-0 left-1/2 w-0 h-[2px] bg-black group-hover:w-1/2 transition-all ${menu.activeIndex === i && "w-1/2"}`}></span>
                            <span className={`absolute bottom-0 right-1/2 w-0 h-[2px] bg-black group-hover:w-1/2 transition-all ${menu.activeIndex === i && "w-1/2"}`}></span>
                        </Link>
                    ))}
                </div>
            </div>
            {
                menu.current.length > 0 &&
                <div className="bg-white border-b-[1px]">
                    <div className="container grid grid-cols-6 gap-4 p-4">
                        {menu.current.map(item => (
                            <div key={item.title} className="text-xs tracking-wider space-y-1">
                                <Link href={item.link} className="block font-bold mb-3">{item.title}</Link>
                                {item.menu.map(item => (<Link key={item.title} href={item.link} className="block">{item.title}</Link>))}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div >

    )
}
