import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import useConfirm from '../../hooks/useConfirm'
import Modal from './Modal'

export default function Confirm() {
    const state = useAppSelector(state => state.confirm)
    const { onClose, onConfirm } = useConfirm()

    return (
        <Modal>
            <div className={`fixed inset-0 ${state.show ? "bg-black" : "h-0"} bg-opacity-30 transform transition-colors duration-300 z-30`} onClick={onClose}>
                {state.show &&
                    <div className="w-full h-full flex justify-center items-end sm:items-center">
                        <div className="w-full bg-white md:w-1/2 lg:w-1/3 xl:w-1/4 md:rounded" onClick={e => e.stopPropagation()}>
                            <div className="border-b-[1px] p-5 font-semibold">{state.title}</div>
                            <div className="p-5">{state.message}</div>
                            <div className="border-t-[1px] p-3 flex justify-between">
                                <button className="bg-red-500 text-white py-2 px-3 rounded-md" onClick={onClose}>Отмена</button>
                                <button className="bg-green-600 text-white py-2 px-3 rounded-md" onClick={onConfirm}>Подтвердить</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Modal>
    )
}
