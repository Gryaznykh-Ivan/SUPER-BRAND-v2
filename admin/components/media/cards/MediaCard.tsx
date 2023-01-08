import React, { useState } from 'react'
import Image from 'next/image'
import MediaSetting from '../popups/MediaSetting';

interface IProps {
    className: string;
    src: string;
    alt: string;
}

export default function MediaCard({ className, src, alt }: IProps) {
    const [popup, setPopup] = useState(false)

    const onPopupOpen = () => {
        console.log(123)
        setPopup(true)
    }

    const onPopupClose = () => {
        setPopup(false)
    }

    return (
        <div className={ `relative w-full flex justify-end group ${ className }` } onClick={ onPopupOpen }>
            <Image fill src={src} className="object-contain" alt={alt} draggable={false} />
            { popup && <MediaSetting onClose={ onPopupClose } /> }
        </div>
    )
}
