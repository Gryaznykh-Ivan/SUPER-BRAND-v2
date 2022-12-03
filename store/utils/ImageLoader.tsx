import React, { useRef, useState } from 'react'
import Image from 'next/image';

import LoadingIcon from '../components/icons/Loading';

interface IProps {
    className?: string;
    src: string;
    alt: string;
    showLoading?: boolean;
}

export default function ImageLazyLoader({ className = "", src, alt, showLoading = true }: IProps) {
    const imgRef = useRef(null);

    const [imageLoading, setImageLoading] = useState(true)

    const onImageLoaded = () => {
        setImageLoading(false)
    }

    return (
        <div className={`flex items-center justify-center ${className}`} ref={imgRef}>
            <div className={(imageLoading && showLoading) ? "absolute inset-0 flex items-center justify-center" : "hidden"}>
                <LoadingIcon />
            </div>
            <Image src={src}
                fill
                sizes="100vw"
                alt={alt}
                onLoad={onImageLoaded}
            />
        </div>
    )
}
