import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

interface IProps {
    children: React.ReactNode;
}

export default function Modal({ children }: IProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => setMounted(false)
    }, [])

    return mounted ? createPortal(
        children,
        document.querySelector('#modal-root') as HTMLElement
    ) : null
}
