import React from 'react'
import FilterAccordion from '../accordions/FilterAccordion';
import SizeSelect from '../inputs/SizeSelect';
import Modal from '../portals/Modal';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function Filter({ isActive, onClose }: IProps) {
    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex justify-end transition-all duration-300 z-20`} onClick={onClose}>
                <div className={`${isActive === false ? "translate-x-full" : ""} w-5/6 max-w-sm bg-white h-screen transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-screen">
                        <div className="relative">
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2" onClick={onClose}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="h-14 flex justify-center items-center border-b-[1px] border-line-divider font-medium text-md">Фильтры</div>
                        </div>
                        <div className="flex-1 px-5 py-4 overflow-y-auto">
                            <FilterAccordion title="Размер">
                                <div className="py-4">
                                    <SizeSelect options={{ "size men": { value: "size men", disabled: false } }} onChange={() => { }} />
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                                        <div className="border-[1px] border-black h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                        <div className="border-[1px] border-line-divider h-10 flex justify-center items-center text-md font-medium">3.5 US</div>
                                    </div>
                                </div>
                            </FilterAccordion>
                            <FilterAccordion title="Бренд">
                                <div className="py-2">
                                    <label className="flex items-center gap-2 h-11 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 checked:bg-black accent-black rounded border-[1px] border-black" />
                                        <span className="text-md font-medium">Nike</span>
                                    </label>
                                    <label className="flex items-center gap-2 h-11 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 checked:bg-black accent-black rounded border-[1px] border-black" />
                                        <span className="text-md font-medium">Adidas</span>
                                    </label>
                                    <label className="flex items-center gap-2 h-11 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 checked:bg-black accent-black rounded border-[1px] border-black" />
                                        <span className="text-md font-medium">New Balance</span>
                                    </label>
                                </div>
                            </FilterAccordion>
                            <FilterAccordion title="Цена">
                                <div className="py-4 flex gap-6">
                                    <input type="text" className="w-full h-11 rounded px-3 py-4 border-[1px] border-line-divider text-md" placeholder="от 37 000 ₽" inputMode="numeric" />
                                    <input type="text" className="w-full h-11 rounded px-3 py-4 border-[1px] border-line-divider text-md" placeholder="до 67 000 ₽" inputMode="numeric" />
                                </div>
                            </FilterAccordion>
                            <label className="flex justify-between items-center h-11 cursor-pointer">
                                <div className="text-md font-medium">Товары со скидкой</div>
                                <div className="relative">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-[30px] h-4 bg-line-divider rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all peer-checked:bg-green-600"></div>
                                </div>
                            </label>
                            <label className="flex justify-between items-center h-11 cursor-pointer">
                                <div className="text-md font-medium">Доступна экспресс-доставка</div>
                                <div className="relative">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-[30px] h-4 bg-line-divider rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all peer-checked:bg-green-600"></div>
                                </div>
                            </label>
                        </div>
                        <div className="flex gap-2 pt-5 mx-5 mb-5 border-t-[1px] border-line-divider">
                            <button className="w-full h-10 border-[1px] border-black text-md box-border">Сбросить</button>
                            <button className="w-full h-10 text-white bg-black text-md">Применить</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}