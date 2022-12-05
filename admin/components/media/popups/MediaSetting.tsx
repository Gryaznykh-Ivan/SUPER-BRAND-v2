import React from 'react'
import Image from 'next/image'
import Modal from '../../portals/Modal'
import Input from '../../inputs/Input';

interface IProps {
    onClose: () => void;
}

export default function MediaSetting({ onClose }: IProps) {

    return (
        <Modal>
            <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-center" onClick={onClose}>
                <div className="w-full max-w-lg bg-white rounded-md" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-5 border-b-[1px]">
                        <h2 className="font-medium">Редактировать изображения</h2>
                        <button className="p-2" onClick={onClose}>
                            <svg className="rotate-45" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V12M12 12V20M12 12H20M12 12H4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-5 border-b-[1px] space-y-4">
                        <div className="relative w-full aspect-5/3">
                            <Image fill src="/assets/images/2.jpg" className="object-contain w-full" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="source" className="text-sm text-gray-600 mb-1">Media source</label>
                            <Input type="text" id="source" placeholder="Media source" onChange={() => { }} />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="alt" className="text-sm text-gray-600 mb-1">Media alt</label>
                            <Input type="text" id="alt" placeholder="Media alt" onChange={() => { }} />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between">
                            <div className="">
                                <button className="border-red-700 border-[1px] text-red-700 px-4 py-2 font-medium rounded-md hover:bg-red-700 hover:text-white">Удалить</button>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
