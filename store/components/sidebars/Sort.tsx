import React from 'react'
import { useSwipeable } from 'react-swipeable';
import Modal from '../portals/Modal';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function Sort({ isActive, onClose }: IProps) {
    const handlers = useSwipeable({ onSwipedDown: () => onClose() })

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex items-end justify-end transition-all duration-300 z-20`} onClick={onClose}>
                <div className={`${isActive === false ? "translate-y-full translate-x-0 md:translate-x-full md:translate-y-0" : ""} w-full md:w-5/6 md:max-w-sm bg-white h-1/2 md:h-screen transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-full md:h-screen">
                        <div className="relative" { ...handlers }>
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2" onClick={onClose}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="h-14 flex justify-center items-center border-b-[1px] border-line-divider font-medium text-md">Сортировка</div>
                        </div>
                        <div className="flex-1 py-4 overflow-y-auto">
                            <button className="w-full h-10 font-medium text-md hover:bg-main-gray bg-main-gray">Наши рекомендации</button>
                            <button className="w-full h-10 font-medium text-md hover:bg-main-gray">Самое популярное</button>
                            <button className="w-full h-10 font-medium text-md hover:bg-main-gray">По возрастанию цены</button>

                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
