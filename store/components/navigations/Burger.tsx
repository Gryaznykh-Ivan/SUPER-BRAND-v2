import React, { useState } from 'react'
import Link from 'next/link';
import Modal from '../portals/Modal'

import { IBurgerNavMenuState, NavMenuType } from '../../types';

import CrossIcon from '../icons/Cross'
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import { BurgerNavData } from './NavData';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function Burger({ isActive, onClose }: IProps) {
    const [menu, setMenu] = useState<IBurgerNavMenuState>({
        current: BurgerNavData,
        history: []
    });

    const onResetMenu = () => {
        setMenu({
            current: BurgerNavData,
            history: []
        });

        onClose();
    }

    const onBackMenu = () => {
        const history = menu.history;
        const current = history.at(-1)?.menu || BurgerNavData;
        history.pop();
        setMenu(prev => ({ ...prev, history, current }))
    }

    const onSelectMenu = (menu: NavMenuType, title: string) => {
        setMenu(prev => ({ ...prev, current: menu, history: [...prev.history, { title, menu: prev.current }] }));
    }

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} transition-all duration-300 md:hidden z-30`} onClick={onClose}>
                <div className={`${isActive ? "w-5/6" : "w-0"} max-w-sm bg-white h-screen transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-screen transform transition-all duration-500 pt-12">
                        <div className="fixed inset-0 flex bg-white items-center px-2 shadow-lg shadow-white h-12">
                            <button className="p-2 transform hover:scale-110" onClick={onClose}>
                                <CrossIcon />
                            </button>
                        </div>
                        <div className="flex-1 divide-y-[1px] divide-gray-200 h-full overflow-y-auto pb-20">
                            {menu.history.length > 0 &&
                                <div className="flex items-center text-sm font-semibold pl-3 py-2 h-10 cursor-pointer whitespace-nowrap" onClick={onBackMenu}>
                                    <ArrowLeft w={16} h={16} />
                                    <span className="ml-2">{menu.history.at(-1)?.title}</span>
                                </div>
                            }
                            {menu.current.map(item => {
                                if (item.menu.length !== 0) {
                                    return (
                                        <div key={item.title} className="flex items-center justify-between text-sm font-semibold pl-4 pr-2 py-2 h-10 cursor-pointer hover:text-gray-600 whitespace-nowrap" onClick={() => onSelectMenu(item.menu, item.title)}>
                                            {item.title}
                                            <ArrowRight w={16} h={16} />
                                        </div>
                                    )
                                }

                                return (
                                    <Link href={item.link} key={item.title} className="block text-sm font-semibold pl-4 py-2 h-10 hover:text-gray-600 whitespace-nowrap" onClick={(onResetMenu)}>
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
