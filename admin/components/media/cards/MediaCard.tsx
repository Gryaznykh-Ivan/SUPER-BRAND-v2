import React, { useState } from 'react'
import Image from 'next/image'
import MediaSetting from '../popups/MediaSetting';
import ImageLoader from '../../image/ImageLoader';
import { IImage } from '../../../types/api';

interface IProps {
    className: string;
    image: IImage;
    onUpdate: (image: IImage) => void;
    onDelete: (id: string) => void;
}

export default function MediaCard({ className, image, onDelete, onUpdate }: IProps) {
    const [popup, setPopup] = useState(false)

    const onPopupOpen = () => setPopup(true)
    const onPopupClose = () => setPopup(false)

    const onUpdateEvent = (image: IImage) => {
        onPopupClose()
        onUpdate(image)
    }

    const onDeleteEvent = (id: string) => {
        onPopupClose()
        onDelete(id)
    }

    return (
        <div className={`relative w-full flex justify-end group ${className}`}>
            <Image
                loader={ImageLoader}
                className="object-contain"
                fill
                sizes="(max-width: 1200px) 200px, 1000px"
                src={image.src}
                alt={image.alt}
                draggable={false}
                onClick={onPopupOpen}
            />
            {popup && <MediaSetting image={image} onClose={onPopupClose} onUpdate={onUpdateEvent} onDelete={onDeleteEvent} />}
        </div>
    )
}
