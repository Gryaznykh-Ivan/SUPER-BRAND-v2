/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import SearchInput from '../../inputs/SearchInput';

interface IProps {
    title: string;
    onClose: () => void;
}

export default function SelectVariants({ title, onClose }: IProps) {
    return (
        <Modal>
            <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-center" onClick={onClose}>
                <div className="w-full max-w-lg bg-white rounded-md" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b-[1px]">
                        <h2 className="font-medium">{title}</h2>
                        <button className="p-2" onClick={onClose}>
                            <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto">
                        <div className="p-5 border-b-[1px] space-y-4">
                            <div className="flex flex-col">
                                <SearchInput placeholder="Поиск" onChange={() => { }} />
                            </div>
                        </div>
                        <div className="divide-y-[1px] max-h-96 overflow-y-auto">
                            <div className="">
                                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                                    <div className="">
                                        <input type="checkbox" name="" id="test" className="rounded" />
                                    </div>
                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                    </div>
                                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                                </div>
                                <div className="divide-y-[1px]">
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 5</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 6</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 7</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                                    <div className="">
                                        <input type="checkbox" name="" id="test" className="rounded" />
                                    </div>
                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                    </div>
                                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                                </div>
                                <div className="divide-y-[1px]">
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 5</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 6</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 7</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                                    <div className="">
                                        <input type="checkbox" name="" id="test" className="rounded" />
                                    </div>
                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                    </div>
                                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                                </div>
                                <div className="divide-y-[1px]">
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 5</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 6</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 7</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                                    <div className="">
                                        <input type="checkbox" name="" id="test" className="rounded" />
                                    </div>
                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                    </div>
                                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                                </div>
                                <div className="divide-y-[1px]">
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 5</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 6</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 7</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                                    <div className="">
                                        <input type="checkbox" name="" id="test" className="rounded" />
                                    </div>
                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                    </div>
                                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                                </div>
                                <div className="divide-y-[1px]">
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 5</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 6</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 7</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                                    <div className="">
                                        <input type="checkbox" name="" id="test" className="rounded" />
                                    </div>
                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                    </div>
                                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                                </div>
                                <div className="divide-y-[1px]">
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 5</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 6</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 7</div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100 border-b-[1px]">
                                    <div className="">
                                        <input type="checkbox" name="" id="test" className="rounded" />
                                    </div>
                                    <div className="relative w-12 aspect-square border-[1px] rounded-md">
                                        <Image fill src={`/assets/images/air-force1.jpg`} className="object-contain" alt="" />
                                    </div>
                                    <div className="text-sm flex-1">Air Jordan 1 Low "Shattered Backboard"</div>
                                </div>
                                <div className="divide-y-[1px]">
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 5</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 6</div>
                                    </div>
                                    <div className="flex items-center pl-10 pr-5 py-3 space-x-4 hover:bg-gray-100">
                                        <div className="">
                                            <input type="checkbox" name="" id="test" className="rounded" />
                                        </div>
                                        <div className="text-sm flex-1">US 7</div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div className="p-5 border-t-[1px]">
                        <div className="flex justify-end space-x-4">
                            <button className="border-gray-500 border-[1px] text-gray-800 px-4 py-2 font-medium rounded-md" onClick={onClose}>Отмена</button>
                            <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Готово</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}