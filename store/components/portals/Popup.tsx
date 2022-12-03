import React, { ReactNode } from 'react'
import Modal from './Modal';

interface IProps {
    isActive: boolean;
    children: ReactNode;
    onClose: () => void;
}

export default function Popup({ isActive, children, onClose }: IProps) {
    return (
        <Modal>
            <div className={`fixed inset-0 ${isActive ? "bg-black" : "h-0"} bg-opacity-30 transform transition-colors duration-300 z-30`} onClick={onClose}>
                <div className="w-full h-full" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </Modal>
    )
}
