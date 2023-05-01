import useDraggableYAndClose from '@/hooks/useDraggableYAndClose';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Modal from '../portals/Modal';

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function Sort({ isActive, onClose }: IProps) {
    const router = useRouter();
    const { pathname, query } = router;

    const { handle, deltaY } = useDraggableYAndClose({ onClose, triggerDelta: 50 })
    const [sort, setSort] = useState<string>("");

    useEffect(() => {
        const sort = query.sort ?? "relevance"
        setSort(sort as string)
    }, [query.sort])


    const onSortChange = (sort: string) => {
        const currentQuery = { ...query };
        currentQuery.sort = sort;
        router.push({ pathname, query: currentQuery });

        onClose()
    }

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex items-end justify-end transition-all duration-300 z-20`} onClick={onClose}>
                <div className={`${isActive === false ? "translate-y-full translate-x-0 md:translate-x-full md:translate-y-0" : ""} w-full md:w-5/6 md:max-w-sm transform transition-all duration-300`}>
                    <div className="flex flex-col md:h-screen bg-white" onClick={e => e.stopPropagation()}>
                        <div className="relative border-b-[1px] border-line-divider">
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2" onClick={onClose}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="h-14 flex justify-center items-center font-medium text-md" ref={handle}>Сортировка</div>
                        </div>
                        <div className="py-4 overflow-y-auto" style={{ height: `${280 - deltaY}px` }}>
                            <button className={`w-full h-10 font-medium text-md hover:bg-main-blue hover:bg-opacity-10 ${ sort === "relevance" ? "bg-main-blue bg-opacity-10" : ""}`} onClick={() => onSortChange("relevance")}>По релевантности</button>
                            <button className={`w-full h-10 font-medium text-md hover:bg-main-blue hover:bg-opacity-10 ${ sort === "popular" ? "bg-main-blue bg-opacity-10" : ""}`} onClick={() => onSortChange("popular")}>Популярные</button>
                            <button className={`w-full h-10 font-medium text-md hover:bg-main-blue hover:bg-opacity-10 ${ sort === "priceAsc" ? "bg-main-blue bg-opacity-10" : ""}`} onClick={() => onSortChange("priceAsc")}>Сначала недорогие</button>
                            <button className={`w-full h-10 font-medium text-md hover:bg-main-blue hover:bg-opacity-10 ${ sort === "priceDesc" ? "bg-main-blue bg-opacity-10" : ""}`} onClick={() => onSortChange("priceDesc")}>Сначала дорогие</button>
                            <button className={`w-full h-10 font-medium text-md hover:bg-main-blue hover:bg-opacity-10 ${ sort === "newProduct" ? "bg-main-blue bg-opacity-10" : ""}`} onClick={() => onSortChange("new")}>Новинки</button>
                            <button className={`w-full h-10 font-medium text-md hover:bg-main-blue hover:bg-opacity-10 ${ sort === "oldProduct" ? "bg-main-blue bg-opacity-10" : ""}`} onClick={() => onSortChange("old")}>Старые товары</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

// bg-main-blue bg-opacity-10