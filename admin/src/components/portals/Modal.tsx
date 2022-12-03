import React from 'react'
import { createPortal } from 'react-dom';

interface IProps {
    children: React.ReactNode;
}

export default function Modal({ children }: IProps) {
    return createPortal(
        children,
        document.getElementById('modal-root') as HTMLElement
    )
}
