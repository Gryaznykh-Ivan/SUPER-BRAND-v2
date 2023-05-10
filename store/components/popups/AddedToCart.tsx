/* eslint-disable react/no-unescaped-entities */
import useDraggableYAndClose from '@/hooks/useDraggableYAndClose';
import { IProductCard } from '@/types/api';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import Modal from '@/components/portals/Modal';
import blurHashToDataURL from '@/utils/blurhash';
import { convertToCurrencyFormat } from '@/utils/prices';
import ImageLoader from '../image/ImageLoader';

interface IProps {
    isActive: boolean;
    product: IProductCard;
    onClose: () => void;
}

export default function AddedToCart({ isActive, product, onClose }: IProps) {
    const { handle, deltaY } = useDraggableYAndClose({ onClose, triggerDelta: 50 })

    const format = (price: string) => `${price} ₽`
    const formatFrom = (price: string) => `От ${price} ₽`

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex items-end justify-end transition-all duration-300 z-20`} onClick={onClose}>
                <div className={`${isActive === false ? "translate-y-full translate-x-0 md:translate-x-full md:translate-y-0" : ""} w-full md:w-5/6 md:max-w-sm transform transition-all duration-300`}>
                    <div className="flex flex-col md:h-screen rounded-t-lg md:rounded-none bg-white" onClick={e => e.stopPropagation()}>
                        <div className="relative md:py-0">
                            <div className="flex justify-center md:hidden" ref={handle}>
                                <div className="w-11 h-1 bg-gray-300 rounded-full my-5"></div>
                            </div>
                        </div>
                        <div className="md:flex-1 md:mt-4 overflow-y-auto mx-5" style={{ height: `${124 - deltaY}px` }}>
                            <div className="text-base font-medium">Товар добавлен в корзину</div>
                            <div className="flex gap-3 my-5">
                                <div className="w-16 flex items-center">
                                    <div className="relative w-full aspect-5/3">
                                        {product.image !== null ?
                                            <Image
                                                loader={ImageLoader}
                                                fill
                                                placeholder="blur"
                                                blurDataURL={blurHashToDataURL(product.image.blurhash, 5, 3)}
                                                src={product.image.src}
                                                alt={product.image.alt}
                                                sizes="800px"
                                            />
                                            :
                                            <Image
                                                fill
                                                src="/placeholder.jpg"
                                                alt="placeholder"
                                                sizes="800px"
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="visible text-base line-clamp-2">Air Jordan 1 Retro High OG "Chicago Lost and Found"</div>
                                    <div className="text-base text-text-gray">US 4</div>
                                </div>
                                <div className="text-base whitespace-nowrap">175 000 ₽</div>
                            </div>
                        </div>
                        <div className="mx-5 py-5 space-y-2">
                            <Link href="/cart" className="flex justify-center items-center text-base text-white font-medium bg-main-blue rounded-lg h-12">Перейти в корзину</Link>
                            <button className="flex justify-center w-full items-center text-base text-white font-medium bg-black rounded-lg h-12" onClick={onClose}>Продолжить покупки</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}