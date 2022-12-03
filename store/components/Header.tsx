import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import useSetBodyScroll from '../hooks/useSetBodyScroll'

import SearchIcon from './icons/Search'
import BurgerIcon from './icons/Burger'
import BagIcon from './icons/Bag'

import NavBar from './navigations/NavBar'
import Burger from './navigations/Burger'
import SearchBar from './navigations/SearchBar'

export default function Header() {
    const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false);
    const [isBurgerOpened, setIsBurgerOpened] = useState<boolean>(false);

    const setBodyScrollResize = useSetBodyScroll(true);
    const setBodyScroll = useSetBodyScroll(false);

    useEffect(() => {
        setBodyScrollResize(!isBurgerOpened);
    }, [isBurgerOpened]);

    useEffect(() => {
        setBodyScroll(!isSearchOpened);
    }, [isSearchOpened]);


    const onSearchClose = () => {
        setIsSearchOpened(false);
    }

    const onBurgerClose = () => {
        setIsBurgerOpened(false);
    }

    const onSearchToggle = () => {
        setIsSearchOpened(prev => !prev)
    }

    const onBurgerToggle = () => {
        setIsBurgerOpened(prev => !prev);
    }

    return (
        <div className="relative">
            <div className="fixed w-full z-20">
                <div className="h-16 border-b-[1px] bg-white">
                    <div className="container grid grid-cols-3 px-3 items-center h-full">
                        <div className="flex">
                            <button className="p-2 transform hover:scale-110 md:hidden" onClick={onBurgerToggle}>
                                <BurgerIcon />
                            </button>
                            <button className="p-2 transform hover:scale-110 hidden md:block" onClick={onSearchToggle}>
                                <SearchIcon />
                            </button>
                        </div>
                        <Link href="/" className="text-center text-xl font-bold whitespace-nowrap">
                            SUPER BRAND
                        </Link>
                        <div className="flex justify-self-end">
                            <button className="p-2 transform hover:scale-110 block md:hidden" onClick={onSearchToggle}>
                                <SearchIcon />
                            </button>
                            <Link href="/cart" className="p-2 transform hover:scale-110">
                                <BagIcon />
                            </Link>
                        </div>
                    </div>
                </div>
                <NavBar />
            </div>
            <Burger
                isActive={isBurgerOpened}
                onClose={onBurgerClose}
            />
            <SearchBar
                isActive={isSearchOpened}
                onClose={onSearchClose}
            />
        </div>
    )
}
