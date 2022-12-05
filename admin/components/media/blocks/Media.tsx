import { AnimatePresence } from 'framer-motion';
import Image from 'next/image'
import React, { useState } from 'react'
import MediaCard from '../cards/MediaCard';

interface DADItem {
    id: number;
    src: string;
    position: number;
}

export default function Media() {
    const [currentItem, setCurrentItem] = useState<DADItem | null>(null)
    const [items, setItems] = useState<DADItem[]>([{
        id: 1,
        src: "/assets/images/1.jpg",
        position: 1,
    }, {
        id: 2,
        src: "/assets/images/2.jpg",
        position: 2,
    }, {
        id: 3,
        src: "/assets/images/3.jpg",
        position: 3,
    }, {
        id: 4,
        src: "/assets/images/4.jpg",
        position: 4,
    }])

    const onDragStart = (e: React.DragEvent<HTMLDivElement>, item: DADItem) => {
        setCurrentItem(item)
    }

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {

    }

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {

    }

    const onDragOver = (e: React.DragEvent<HTMLDivElement>, item: DADItem) => {
        e.preventDefault()
    }

    const onDrop = (e: React.DragEvent<HTMLDivElement>, item: DADItem) => {
        e.preventDefault()

        let newItems = items.map((a) => {
            if (currentItem === null) return a

            if (a.id === item.id) {
                return { ...a, position: currentItem.position }
            }

            if (a.id === currentItem.id) {
                return { ...a, position: item.position }
            }

            return a
        })

        newItems.sort((a, b) => (a.position - b.position))

        setItems(newItems)
        setCurrentItem(null)
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Изображения</h2>
            <div className="space-y-4 p-5">
                <div className="grid grid-cols-4 gap-4 ">
                    {items.map((item, index) =>
                        <div key={item.id} className={`border-[1px] ${index === 0 && "col-span-2 row-span-2"} rounded-md border-gray-400`}
                            draggable={true}
                            onDragStart={(e) => onDragStart(e, item)}
                            onDragEnd={onDragEnd}
                            onDragLeave={onDragLeave}
                            onDragOver={(e) => onDragOver(e, item)}
                            onDrop={(e) => onDrop(e, item)}
                        >
                            <MediaCard src={item.src} alt="" />
                        </div>
                    )}

                    <label htmlFor="files" className="flex items-center justify-center cursor-pointer h-10 col-span-4 row-span-1 border-[1px] rounded-md border-gray-400">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.172 7L8.58602 13.586C8.395 13.7705 8.24264 13.9912 8.13782 14.2352C8.033 14.4792 7.97783 14.7416 7.97552 15.0072C7.97321 15.2728 8.02381 15.5361 8.12438 15.7819C8.22494 16.0277 8.37344 16.251 8.56123 16.4388C8.74902 16.6266 8.97232 16.7751 9.21811 16.8756C9.4639 16.9762 9.72726 17.0268 9.99282 17.0245C10.2584 17.0222 10.5208 16.967 10.7648 16.8622C11.0088 16.7574 11.2295 16.605 11.414 16.414L17.828 9.828C18.5567 9.07359 18.9598 8.06318 18.9507 7.01439C18.9416 5.9656 18.5209 4.96235 17.7793 4.22072C17.0377 3.47909 16.0344 3.05841 14.9856 3.0493C13.9368 3.04019 12.9264 3.44336 12.172 4.172L5.75702 10.757C4.63171 11.8823 3.99951 13.4086 3.99951 15C3.99951 16.5914 4.63171 18.1177 5.75702 19.243C6.88233 20.3683 8.40859 21.0005 10 21.0005C11.5915 21.0005 13.1177 20.3683 14.243 19.243L20.5 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="text-sm ml-2">Выберите файлы</div>
                        <input type="file" multiple id="files" className="w-0 h-0 focus:outline-none invisible" />
                    </label>
                </div>
            </div>
        </div>
    )
}
