import Link from 'next/link';
import React from 'react'

import Modal from '../portals/Modal'
import SideBar from './SideBar';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function Burger({ isActive, onClose }: IProps) {
    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} transition-all duration-300 md:hidden z-30`} onClick={onClose}>
                <div className={`${isActive ? "w-5/6" : "w-0"} max-w-sm bg-white h-screen transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-screen transform transition-all duration-500 pt-16">
                        <div className="fixed inset-0 flex bg-white items-center px-3 border-b-[1px] h-16">
                            <div className="flex items-center">
                                <button className="p-2 hover:bg-gray-200 rounded-md md:hidden" onClick={onClose}>
                                    <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <Link href="/" className="text-lg font-bold whitespace-nowrap ml-2 md:ml-0">
                                    SUPER BRAND
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 divide-y-[1px] divide-gray-200 h-full overflow-y-auto pb-20">
                            <SideBar onClick={ onClose } />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
