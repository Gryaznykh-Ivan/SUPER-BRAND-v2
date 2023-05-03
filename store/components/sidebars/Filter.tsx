import { useGetCollectionFiltersByHandleQuery } from '@/services/collectionService';
import { IErrorResponse } from '@/types/api';
import { convertToCurrencyFormat } from '@/utils/prices';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import FilterAccordion from '../accordions/FilterAccordion';
import Checkbox from '../inputs/Checkbox';
import FilterSizeSelect from '../inputs/FilterSizeSelect';
import Toggle from '../inputs/Toggle';
import Modal from '../portals/Modal';

interface IFilter {
    sizes: string[],
    brands: string[],
    minPrice: string;
    maxPrice: string;
    expressDelivery: boolean;
    salesOnly: boolean;
}

interface IProps {
    isActive: boolean;
    onClose: () => void;
}

export default function Filter({ isActive, onClose }: IProps) {
    const router = useRouter();
    const { pathname, query } = router;

    const [sizeTable, setSizeTable] = useState<number>(0)
    const [skip, setSkip] = useState(true)
    const [filter, setFilter] = useState<IFilter>({
        sizes: [],
        brands: [],
        minPrice: "",
        maxPrice: "",
        expressDelivery: false,
        salesOnly: false
    });

    const { isFetching: isCollectionFiltersFetching, isError: isCollectionFiltersError, data: collectionFiltersData, error: collectionFiltersError } = useGetCollectionFiltersByHandleQuery({ ...query, handle: query.handle as string }, { skip })

    useEffect(() => {
        if (isActive === true) {
            setSkip(false)
        }
    }, [isActive])

    useEffect(() => {
        const filter = {
            sizes: query.sizes !== undefined ? (query.sizes as string).split(",") : [],
            brands: query.brands !== undefined ? (query.brands as string).split(",") : [],
            minPrice: query.minPrice as string ?? "",
            maxPrice: query.maxPrice as string ?? "",
            salesOnly: Boolean(query.salesOnly ?? false),
            expressDelivery: Boolean(query.expressDelivery ?? false),
        }

        setFilter(prev => ({ ...prev, ...filter }))
    }, [query.salesOnly, query.expressDelivery, query.minPrice, query.maxPrice, query.brands, query.sizes])


    const onFilterChange = () => {
        const { page, ...currentQuery } = query

        Object.keys(filter).forEach(key => delete currentQuery[key])

        if (filter.sizes.length !== 0) currentQuery.sizes = filter.sizes.join(",")
        if (filter.brands.length !== 0) currentQuery.brands = filter.brands.join(",")
        if (filter.minPrice !== "") currentQuery.minPrice = filter.minPrice
        if (filter.maxPrice !== "") currentQuery.maxPrice = filter.maxPrice
        if (filter.salesOnly !== false) currentQuery.salesOnly = filter.salesOnly.toString()
        if (filter.expressDelivery !== false) currentQuery.expressDelivery = filter.expressDelivery.toString()

        router.push({ pathname, query: currentQuery })

        onClose()
    }

    const onFilterReset = () => {
        const currentQuery = { ...query }
        Object.keys(filter).forEach(key => delete currentQuery[key])
        router.push({ pathname, query: currentQuery })

        onClose()
    }

    const onToggleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({ ...prev, [e.target.name]: e.target.checked }))
    }

    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = parseInt(e.target.value, 10);
        setFilter(prev => ({ ...prev, [e.target.name]: isNaN(numValue) === false ? numValue.toString() : "" }));
    }

    const onSizesChange = (size: string) => {
        if (filter.sizes.includes(size) === true) {
            setFilter(prev => ({ ...prev, sizes: prev.sizes.filter(c => c !== size) }))
        } else {
            setFilter(prev => ({ ...prev, sizes: [...prev.sizes, size] }))
        }
    }

    const onBrandsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (filter.brands.includes(e.target.name) === true) {
            setFilter(prev => ({ ...prev, brands: prev.brands.filter(c => c !== e.target.name) }))
        } else {
            setFilter(prev => ({ ...prev, brands: [...prev.brands, e.target.name] }))
        }
    }

    const onSizeTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (collectionFiltersData?.data !== undefined) {
            setSizeTable(prev => collectionFiltersData.data.sizes.findIndex(c => c.title === e.target.value))
        }
    }

    const priceFromFormat = (price: string) => `От ${price} ₽`
    const priceToFormat = (price: string) => `До ${price} ₽`

    return (
        <Modal>
            <div className={`fixed inset-0 bg-black ${isActive ? "bg-opacity-30 visible" : "bg-opacity-0 invisible"} flex justify-end transition-all duration-300 z-20`} onClick={onClose}>
                <div className={`${isActive === false ? "translate-x-full" : ""} w-5/6 max-w-sm bg-white h-full transform transition-all duration-300 overflow-hidden`} onClick={e => e.stopPropagation()}>
                    <div className="flex flex-col h-full">
                        <div className="relative">
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2" onClick={onClose}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="h-14 flex justify-center items-center border-b-[1px] border-line-divider font-medium text-md">Фильтры</div>
                        </div>
                        {isCollectionFiltersFetching === true &&
                            <div className="flex justify-center p-5 z-10 ">
                                <svg className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        }
                        {isCollectionFiltersFetching === false && isCollectionFiltersError === true &&
                            <div className="flex flex-col items-center py-5">
                                <div className="text-2xl font-bold text-red-600">Что-то пошло не так</div>
                                {(collectionFiltersError && "status" in collectionFiltersError) &&
                                    <div className="text-gray-500">{(collectionFiltersError.data as IErrorResponse)?.message}</div>
                                }
                            </div>
                        }
                        <div className="flex-1 px-5 py-4 overflow-y-auto">
                            {isCollectionFiltersFetching === false && isCollectionFiltersError === false && collectionFiltersData?.data &&
                                <>
                                    {collectionFiltersData.data.sizes.length > 1 &&
                                        <FilterAccordion title="Размер">
                                            <div className="py-4">
                                                <FilterSizeSelect options={Object.fromEntries(collectionFiltersData.data.sizes.map(size => ([size.title, { value: size.title, disabled: false }])))} onChange={onSizeTableChange} />
                                                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                                                    {collectionFiltersData.data.sizes[sizeTable].values.map(size =>
                                                        <button key={size} className={`border-[1px] h-10 text-md font-medium ${filter.sizes.some(c => c === size) === true ? "border-main-blue bg-main-blue/10" : "border-line-divider"}`} name={ size } onClick={() => onSizesChange(size)}>{ size }</button>
                                                    )}
                                                </div>
                                            </div>
                                        </FilterAccordion>
                                    }
                                    {collectionFiltersData.data.brands.length > 1 &&
                                        <FilterAccordion title="Бренд">
                                            <div className="py-2">
                                                {collectionFiltersData.data.brands.map(brand =>
                                                    <label key={brand} className="flex items-center gap-2 h-10 cursor-pointer">
                                                        <Checkbox name={brand} checked={filter.brands.some(c => c === brand) === true} onChange={onBrandsChange} />
                                                        <span className="text-md font-medium">{brand}</span>
                                                    </label>
                                                )}
                                            </div>
                                        </FilterAccordion>
                                    }
                                    {collectionFiltersData.data.prices.min !== null && collectionFiltersData.data.prices.max !== null &&
                                        <FilterAccordion title="Цена">
                                            <div className="py-4 flex gap-6">
                                                <input type="text" className="w-full h-11 rounded-lg px-3 py-4 border-[1px] border-line-divider text-md" placeholder={convertToCurrencyFormat(priceFromFormat, collectionFiltersData.data.prices.min.toString())} inputMode="numeric" name="minPrice" value={filter.minPrice} onChange={onPriceChange} />
                                                <input type="text" className="w-full h-11 rounded-lg px-3 py-4 border-[1px] border-line-divider text-md" placeholder={convertToCurrencyFormat(priceToFormat, collectionFiltersData.data.prices.max.toString())} inputMode="numeric" name="maxPrice" value={filter.maxPrice} onChange={onPriceChange} />
                                            </div>
                                        </FilterAccordion>
                                    }
                                    <label className="flex justify-between items-center h-11 cursor-pointer">
                                        <div className="text-md font-medium">Товары со скидкой</div>
                                        <Toggle name="salesOnly" checked={filter.salesOnly} onChange={onToggleChecked} />
                                    </label>
                                    <label className="flex justify-between items-center h-11 cursor-pointer">
                                        <div className="text-md font-medium">Доступна экспресс-доставка</div>
                                        <Toggle name="expressDelivery" checked={filter.expressDelivery} onChange={onToggleChecked} />
                                    </label>
                                </>
                            }
                        </div>
                        <div className="flex gap-2 pt-5 mx-5 mb-5 border-t-[1px] border-line-divider">
                            <button className="w-full h-12 rounded-md border-[1px] border-black text-md box-border" onClick={onFilterReset}>Сбросить</button>
                            <button className="w-full h-12 rounded-md text-white bg-black text-md" onClick={onFilterChange}>Применить</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
