import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/store';
import useSetBodyScroll from '../hooks/useSetBodyScroll';
import { useLogoutMutation } from '../services/authService';
import Burger from './navigation/Burger';

export default function Header() {
    const router = useRouter()
    const auth = useAppSelector(state => state.auth)

    const [logout] = useLogoutMutation()
    const [isBurgerOpened, setIsBurgerOpened] = useState<boolean>(false);

    const setBodyScrollResize = useSetBodyScroll(true);

    useEffect(() => {
        setBodyScrollResize(!isBurgerOpened);
    }, [isBurgerOpened]);

    const onLogout = async () => {
        await logout()
    }

    const onBurgerClose = () => {
        setIsBurgerOpened(false);
    }

    const onBurgerToggle = () => {
        setIsBurgerOpened(prev => !prev);
    }

    return (
        <div className="relative">
            <div className="fixed w-full z-20">
                <div className="h-16 border-b-[1px] bg-white">
                    <div className="grid grid-cols-2 px-3 items-center h-full">
                        <div className="flex items-center">
                            <button className="p-2 hover:bg-gray-200 rounded-md md:hidden" onClick={onBurgerToggle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 18H20M4 6H20H4ZM4 12H20H4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <Link href="/" className="text-lg font-bold whitespace-nowrap ml-2 md:ml-0">
                                SUPER BRAND PARSER
                            </Link>
                        </div>
                        <div className="flex justify-self-end">
                            {auth.isAuth === true &&
                                <div className="flex items-center space-x-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.121 17.804C7.21942 16.6179 9.58958 15.9963 12 16C14.5 16 16.847 16.655 18.879 17.804M15 10C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7956 13 12 13C11.2044 13 10.4413 12.6839 9.87868 12.1213C9.31607 11.5587 9 10.7956 9 10C9 9.20435 9.31607 8.44129 9.87868 7.87868C10.4413 7.31607 11.2044 7 12 7C12.7956 7 13.5587 7.31607 14.1213 7.87868C14.6839 8.44129 15 9.20435 15 10ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="">
                                        <div className="whitespace-nowrap hidden sm:block text-md">{auth.payload?.name}</div>
                                        <div className="whitespace-nowrap hidden sm:block text-sm text-gray-400 leading-4 tracking-wide">{auth.payload?.role}</div>
                                    </div>
                                    <button className="p-2 hover:bg-gray-200 rounded-md" onClick={onLogout}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 16L21 12M21 12L17 8M21 12H7M13 16V17C13 17.7956 12.6839 18.5587 12.1213 19.1213C11.5587 19.6839 10.7956 20 10 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17V7C3 6.20435 3.31607 5.44129 3.87868 4.87868C4.44129 4.31607 5.20435 4 6 4H10C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7V8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Burger isActive={isBurgerOpened} onClose={onBurgerClose} />
        </div>
    )
}
