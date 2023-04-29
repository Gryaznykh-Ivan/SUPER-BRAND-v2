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

    const [filter, setFilter] = useState<IFilter>({
        sizes: [],
        brands: [],
        minPrice: "",
        maxPrice: "",
        expressDelivery: false,
        salesOnly: false
    });

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
                        <div className="flex-1 px-5 py-4 overflow-y-auto">
                            <FilterAccordion title="Размер">
                                <div className="py-4">
                                    <FilterSizeSelect options={{ "size men": { value: "size men", disabled: false } }} onChange={() => { }} />
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                                        {/* <div className="border-[1px] border-main-blue bg-main-blue/10 h-10 flex justify-center items-center text-md font-medium">3.5 US</div> */}
                                        <button className={`border-[1px] h-10 text-md font-medium ${ filter.sizes.some(c => c === "3.5 US") === true ? "border-main-blue bg-main-blue/10" : "border-line-divider" }`} name="3.5 US" onClick={ () => onSizesChange("3.5 US") }>3.5 US</button>
                                        <button className={`border-[1px] h-10 text-md font-medium ${ filter.sizes.some(c => c === "4.5 US") === true ? "border-main-blue bg-main-blue/10" : "border-line-divider" }`} name="4.5 US" onClick={ () => onSizesChange("4.5 US") }>4.5 US</button>
                                        <button className={`border-[1px] h-10 text-md font-medium ${ filter.sizes.some(c => c === "5.5 US") === true ? "border-main-blue bg-main-blue/10" : "border-line-divider" }`} name="5.5 US" onClick={ () => onSizesChange("5.5 US") }>5.5 US</button>
                                    </div>
                                </div>
                            </FilterAccordion>
                            <FilterAccordion title="Бренд">
                                <div className="py-2">
                                    <label className="flex items-center gap-2 h-11 cursor-pointer">
                                        <Checkbox name="Nike" checked={filter.brands.some(c => c === "Nike") === true} onChange={onBrandsChange} />
                                        <span className="text-md font-medium">Nike</span>
                                    </label>
                                    <label className="flex items-center gap-2 h-11 cursor-pointer">
                                        <Checkbox name="Adidas" checked={filter.brands.some(c => c === "Adidas") === true} onChange={onBrandsChange} />
                                        <span className="text-md font-medium">Adidas</span>
                                    </label>
                                    <label className="flex items-center gap-2 h-11 cursor-pointer">
                                        <Checkbox name="New Balance" checked={filter.brands.some(c => c === "New Balance") === true} onChange={onBrandsChange} />
                                        <span className="text-md font-medium">New Balance</span>
                                    </label>
                                </div>
                            </FilterAccordion>
                            <FilterAccordion title="Цена">
                                <div className="py-4 flex gap-6">
                                    <input type="text" className="w-full h-11 rounded-lg px-3 py-4 border-[1px] border-line-divider text-md" placeholder="от 37 000 ₽" inputMode="numeric" name="minPrice" value={filter.minPrice} onChange={onPriceChange} />
                                    <input type="text" className="w-full h-11 rounded-lg px-3 py-4 border-[1px] border-line-divider text-md" placeholder="до 67 000 ₽" inputMode="numeric" name="maxPrice" value={filter.maxPrice} onChange={onPriceChange} />
                                </div>
                            </FilterAccordion>
                            <label className="flex justify-between items-center h-11 cursor-pointer">
                                <div className="text-md font-medium">Товары со скидкой</div>
                                <Toggle name="salesOnly" checked={filter.salesOnly} onChange={onToggleChecked} />
                            </label>
                            <label className="flex justify-between items-center h-11 cursor-pointer">
                                <div className="text-md font-medium">Доступна экспресс-доставка</div>
                                <Toggle name="expressDelivery" checked={filter.expressDelivery} onChange={onToggleChecked} />
                            </label>
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
