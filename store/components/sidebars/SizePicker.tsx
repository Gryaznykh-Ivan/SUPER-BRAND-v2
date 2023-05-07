import React from 'react'
import Modal from '../portals/Modal';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function SizePicker({ isActive, onClose }: IProps) {


    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex items-end justify-end transition-all duration-300 z-20`} onClick={onClose}>
                <div className={`${isActive === false ? "translate-y-full translate-x-0 md:translate-x-full md:translate-y-0" : ""} w-full md:w-5/6 md:max-w-sm bg-white h-2/3 md:h-screen transform transition-all duration-300 overflow-hidden rounded-t-3xl md:rounded-none`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-full md:h-screen rounded-t-lg">
                        <div className="relative py-5 border-b-[1px] border-line-divider">
                            <div className="flex justify-center md:hidden">
                                <div className="w-11 h-1 bg-gray-300 rounded-full mb-4"></div>
                            </div>
                            <div className="flex justify-between px-4">
                                <div className="text-base">Выберите US размер</div>
                                <button className="text-base underline">Таблица размеров</button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <div className="flex items-center px-4 h-11 bg-main-gray space-x-2">
                                <span className="text-sm">Цена отличается от <span className="font-semibold">35 000 ₽</span>?</span>
                                <span className="text-sm underline">Узнайте почему. </span>
                            </div>
                            <div className="flex justify-between items-center px-5 h-11 hover:bg-main-gray cursor-pointer">
                                <div className=""><span className="font-medium">4</span> US</div>
                                <div className="flex gap-2">
                                    <div className="text-main-red">от 35 000 ₽</div>
                                    <div className="line-through">135 000 ₽</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-5 h-11 bg-gray-200 hover:bg-main-gray cursor-pointer">
                                <div className=""><span className="font-medium">5</span> US</div>
                                <div className="flex gap-2">
                                    <div className="">от 35 000 ₽</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-5 h-11 hover:bg-main-gray cursor-pointer">
                                <div className=""><span className="font-medium">6</span> US</div>
                                <div className="flex gap-2">
                                    <div className="">от 35 000 ₽</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-5 h-11 hover:bg-main-gray cursor-pointer">
                                <div className=""><span className="font-medium">7</span> US</div>
                                <div className="flex gap-2">
                                    <div className="">от 35 000 ₽</div>
                                    <div className="line-through">135 000 ₽</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-5 h-11 hover:bg-main-gray cursor-pointer">
                                <div className=""><span className="font-medium">8</span> US</div>
                                <div className="flex gap-2">
                                    <div className="text-text-gray">Продано</div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-5 py-5  border-t-[1px] border-line-divider">
                            <button className="w-full text-base text-white font-medium bg-black rounded-lg h-12">Выбрать</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
