import React from 'react'

import CrossIcon from '../icons/Cross'

interface IProps {
    isActive: boolean;
    onSort: () => void;
    onClose: () => void;
}

export default function Sort({ isActive, onSort, onClose }: IProps) {
    return (
        <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex justify-end transition-all duration-300 z-30`} onClick={onClose}>
            <div className={`${isActive ? "w-5/6" : "w-0"} max-w-sm bg-white h-screen transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                <div className="flex flex-col h-screen transform transition-all duration-500 pt-16">
                    <div className="fixed inset-0 flex justify-between bg-white items-center px-2 h-16 border-b-[1px]">
                        <div className="text-xl font-semibold ml-2">Сортировка</div>
                        <button className="p-2 transform hover:scale-110" onClick={onClose}>
                            <CrossIcon />
                        </button>
                    </div>
                    <div className="flex flex-col divide-y-[1px] divide-gray-200 overflow-y-auto pb-20">
                        <button className="py-3 px-4 hover:bg-gray-200 text-start bg-gray-200">Рекомендуется</button>
                        <button className="py-3 px-4 hover:bg-gray-200 text-start">Лидер продаж</button>
                        <button className="py-3 px-4 hover:bg-gray-200 text-start">По возрастанию цены</button>
                        <button className="py-3 px-4 hover:bg-gray-200 text-start">По убыванию цены</button>
                        <button className="py-3 px-4 hover:bg-gray-200 text-start">Сначала новые</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
