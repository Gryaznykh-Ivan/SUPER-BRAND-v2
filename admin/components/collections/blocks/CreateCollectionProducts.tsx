/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import SearchInput from '../../inputs/SearchInput'
import SelectProducts from '../popups/SelectProducts'
import { CollectionCreateRequest, CollectionUpdateRequest, ICollectionProduct, IErrorResponse, IProduct } from '../../../types/api';
import ImageLoader from '../../image/ImageLoader';
import { useLazyGetCollectionProductsQuery } from '../../../services/collectionService';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IProps {
    connectProducts: Pick<IProduct, "id">[] | undefined;
    onChange: (obj: CollectionCreateRequest | CollectionUpdateRequest) => void;
}

export default function CollectionProducts({ onChange, connectProducts }: IProps) {
    const router = useRouter()
    const [popup, setPopup] = useState(false)

    const [state, setState] = useState<ICollectionProduct[]>([])

    const onAddProduct = (item: ICollectionProduct) => {
        if (connectProducts?.find(c => c.id === item.id) !== undefined) {
            setState(prev => prev.filter(c => c.id !== item.id))

            const result = connectProducts?.filter(c => c.id !== item.id) ?? []
            onChange({
                connectProducts: result.length !== 0 ? result : undefined
            })
        } else {
            setState(prev => [...prev, item])

            onChange({
                connectProducts: [...connectProducts ?? [], { id: item.id }]
            })
        }
    }

    const onRemoveProduct = (item: ICollectionProduct) => {
        setState(prev => prev.filter(c => c.id !== item.id))

        const result = connectProducts?.filter(c => c.id !== item.id) ?? []
        onChange({
            connectProducts: result.length !== 0 ? result : undefined
        })
    }

    const onPopupOpen = () => setPopup(true)
    const onPopupClose = () => setPopup(false)

    return (
        <div className="rounded-md bg-white shadow-sm">
            <div className="p-3 border-b-[1px] flex justify-between items-center">
                <h2 className="font-semibold pl-3">Продукты</h2>
                <button className="text-gray-800 text-sm p-2 font-medium rounded-md hover:bg-gray-100 flex items-center" onClick={onPopupOpen}>
                    <svg className="stroke-blue-800" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="ml-2">Добавить</span>
                </button>
            </div>
            <div className="divide-y-[1px]">
                {state.map((product, index) =>
                    <div key={product.id} className="flex items-center px-5 py-2 space-x-4 hover:bg-gray-100">
                        <div className="">{index + 1}.</div>
                        <div className="relative w-12 aspect-square border-[1px] rounded-md">
                            {product.image !== null ?
                                <Image
                                    className="object-contain"
                                    loader={ImageLoader}
                                    fill
                                    sizes="200px"
                                    src={product.image.src}
                                    alt={product.image.alt}
                                />
                                :
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            }
                        </div>
                        <div className="flex-1">
                            <Link className="text-sm hover:underline" href={`/products/${product.id}`}>{product.title}</Link>
                        </div>
                        <div className="">
                            <span className={`${product.available ? "bg-green-600" : "bg-gray-400"} px-2 py-1 rounded-xl text-white text-sm`}>{product.available ? "Active" : "Draft"}</span>
                        </div>
                        <button className="p-2 rounded-md hover:bg-gray-200" onClick={() => onRemoveProduct(product)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11V17M14 11V17M4 7H20M19 7L18.133 19.142C18.0971 19.6466 17.8713 20.1188 17.5011 20.4636C17.1309 20.8083 16.6439 21 16.138 21H7.862C7.35614 21 6.86907 20.8083 6.49889 20.4636C6.1287 20.1188 5.90292 19.6466 5.867 19.142L5 7H19ZM15 7V4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V7H15Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>


                    </div>
                )}
            </div>
            {popup && <SelectProducts title="Добавить товары в коллекцию" connectProducts={connectProducts} onAddProduct={onAddProduct} onClose={onPopupClose} />}
        </div>
    )
}
