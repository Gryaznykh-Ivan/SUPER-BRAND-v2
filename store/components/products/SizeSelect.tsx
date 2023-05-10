import React, { useEffect, useState } from 'react'
import useSetBodyScroll from '@/hooks/useSetBodyScroll'
import SizePicker from '../sidebars/SizePicker'

export default function SizeSelect() {
    const [isSizePickerOpen, setIsSizePickerOpen] = useState(false)

    const setBodyScroll = useSetBodyScroll()

    useEffect(() => {
        setBodyScroll(isSizePickerOpen === false)
    }, [isSizePickerOpen])

    const onToggleSizePicker = () => {
        setIsSizePickerOpen(prev => !prev)
    }

    return (
        <div className="">
            <div className="flex justify-between items-center h-12 border-[1px] border-line-divider rounded-lg px-5 cursor-pointer" onClick={onToggleSizePicker}>
                <div className="text-base">US 11</div>
                <div className="px-1">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.75 1L5 5L1.25 1" stroke="black" strokeLinecap="square" />
                    </svg>
                </div>
            </div>
            <SizePicker
                isActive={isSizePickerOpen}
                onClose={onToggleSizePicker}
            />
        </div>
    )
}
