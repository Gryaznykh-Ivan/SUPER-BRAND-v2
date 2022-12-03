import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';

import CrossIcon from '../icons/Cross'
import SearchIcon from '../icons/Search'
import Modal from '../portals/Modal';
import SearchProductPreview from './SearchProductPreview';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function SearchBar({ isActive, onClose }: IProps) {
    const search = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isActive === true) {
            setTimeout(() => {
                if (search.current !== null) {
                    search.current.focus()
                }
            }, 50)
        }
    }, [isActive])

    const onLinkClick = () => {
        onClose();
    }

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} transition-all duration-300 z-30`} onClick={onClose}>
                <div className={`${isActive ? "h-auto" : "h-0"} w-full bg-white transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col justify-center items-center transform transition-all duration-300 border-b-[1px] px-3 h-16 md:h-20">
                        <div className="relative flex w-full max-w-2xl">
                            <div className="absolute bottom-0 top-0 left-2 flex items-center">
                                <SearchIcon />
                            </div>
                            <input type="text" className="flex-1 pl-10 py-2 focus:ring-0 pr-2 border-0 border-b-2 focus:border-black mr-11 md:mr-0" placeholder="Поиск по товарам" ref={search} />
                        </div>
                        <div className="fixed right-2 top-0 bottom-0 flex justify-between bg-white items-center">
                            <button className="p-2 transform hover:scale-110" onClick={onClose}>
                                <CrossIcon />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col w-full max-w-2xl p-3 md:px-0 space-y-3">
                            <div className="text-center text-gray-700 font-semibold">Результаты поиска</div>
                            <SearchProductPreview onClick={ onLinkClick } />
                            <SearchProductPreview onClick={ onLinkClick } />
                            <SearchProductPreview onClick={ onLinkClick } />
                            <SearchProductPreview onClick={ onLinkClick } />
                            <Link href="/search" className="py-1 bg-black text-white font-semibold rounded-md text-sm flex items-center justify-center h-10" onClick={ onLinkClick }>Расширенный поиск</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
