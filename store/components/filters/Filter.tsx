import Modal from '../portals/Modal';
import CrossIcon from '../icons/Cross'
import FilterAccordion from '../accordions/FilterAccordion';

interface IProps {
    isActive: boolean;
    onFilter: () => void;
    onClose: () => void;
}

export default function Filter({ isActive, onFilter, onClose }: IProps) {

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex justify-end transition-all duration-300 z-30`} onClick={onClose}>
                <div className={`${isActive ? "w-5/6" : "w-0"} max-w-sm bg-white h-screen transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-screen transform transition-all duration-500 pt-16">
                        <div className="fixed inset-0 flex justify-between bg-white items-center px-2 h-16 border-b-[1px]">
                            <div className="text-xl font-semibold ml-2">Фильтры</div>
                            <button className="p-2 transform hover:scale-110" onClick={onClose}>
                                <CrossIcon />
                            </button>
                        </div>
                        <div className="flex flex-col divide-gray-200 overflow-y-auto pb-20">
                            <FilterAccordion
                                title="Размеры"
                                content={
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 2</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 3</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 4</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 5</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 6</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 7</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 8</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 9</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 10</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 11</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 12</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 13</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 14</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 14</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 14</div>
                                        <div className="px-2 py-2 bg-gray-100 text-center rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">US 14</div>
                                    </div>
                                }
                            />
                            <FilterAccordion
                                title="Цена"
                                content={
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label htmlFor="min" className="text-gray-600 outline-none">Цена min</label>
                                            <input type="number" name="min" id="min" className="border-0 border-b-2 focus:border-black py-2 focus:ring-0 px-0" inputMode="numeric" placeholder="Введите min" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="max" className="text-gray-600 outline-none">Цена max</label>
                                            <input type="number" name="max" id="max" className="border-0 border-b-2 focus:border-black py-2 focus:ring-0 px-0" inputMode="numeric" placeholder="Введите max" />
                                        </div>
                                    </div>
                                }
                            />
                            <FilterAccordion
                                title="Бренд"
                                content={
                                    <div className="">
                                        <label className="flex items-center py-2 cursor-pointer">
                                            <input type="checkbox" name="nike" id="" className="cursor-pointer border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-0" />
                                            <h2 className="text-xl ml-4 flex-1">
                                                Nike
                                            </h2>
                                        </label>
                                        <label className="flex items-center py-2 cursor-pointer">
                                            <input type="checkbox" name="nike" id="" className="cursor-pointer border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-0" />
                                            <h2 className="text-xl ml-4 flex-1">
                                                Adidas
                                            </h2>
                                        </label>
                                        <label className="flex items-center py-2 cursor-pointer">
                                            <input type="checkbox" name="nike" id="" className="cursor-pointer border-gray-300 border-2 text-black focus:border-gray-300 focus:ring-0" />
                                            <h2 className="text-xl ml-4 flex-1">
                                                Apple
                                            </h2>
                                        </label>
                                    </div>
                                }
                            />
                            <FilterAccordion
                                title="Цвета"
                                content={
                                    <div className="space-y-2">
                                        <label className="block rounded-lg overflow-hidden cursor-pointer">
                                            <input type="checkbox" name="" id="" className="peer hidden" />
                                            <div className="flex items-center peer-checked:bg-gray-100 p-2">
                                                <div className="rounded-full w-8 h-8 bg-black border-[1px]"></div>
                                                <div className="ml-4 font-semibold">Черный</div>
                                            </div>
                                        </label>
                                        <label className="block rounded-lg overflow-hidden cursor-pointer">
                                            <input type="checkbox" name="" id="" className="peer hidden" />
                                            <div className="flex items-center peer-checked:bg-gray-100 p-2">
                                                <div className="rounded-full w-8 h-8 bg-white border-[1px]"></div>
                                                <div className="ml-4 font-semibold">Белый</div>
                                            </div>
                                        </label>
                                        <label className="block rounded-lg overflow-hidden cursor-pointer">
                                            <input type="checkbox" name="" id="" className="peer hidden" />
                                            <div className="flex items-center peer-checked:bg-gray-100 p-2">
                                                <div className="rounded-full w-8 h-8 bg-red-900 border-[1px]"></div>
                                                <div className="ml-4 font-semibold">Красный</div>
                                            </div>
                                        </label>

                                    </div>
                                }
                            />
                            <div className="px-4 mt-6">
                                <label htmlFor="sale" className="inline-flex relative items-center cursor-pointer">
                                    <input type="checkbox" value="" id="sale" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    <span className="ml-3">Товары со скидкой</span>
                                </label>
                            </div>
                            <div className="px-4 mt-2">
                                <label htmlFor="fast-delivery" className="inline-flex relative items-center cursor-pointer">
                                    <input type="checkbox" value="" id="fast-delivery" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    <span className="ml-3">Быстрая доставка</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
