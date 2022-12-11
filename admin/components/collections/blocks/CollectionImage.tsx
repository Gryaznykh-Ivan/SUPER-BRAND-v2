import React from 'react'
import MediaCard from '../../media/cards/MediaCard'

export default function CollectionImage() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Изображение коллекции</h2>
            <div className="space-y-4 p-5">
                <MediaCard className="aspect-5/3" src={ "/assets/images/1.jpg" } alt="" />
            </div>
        </div>
    )
}
