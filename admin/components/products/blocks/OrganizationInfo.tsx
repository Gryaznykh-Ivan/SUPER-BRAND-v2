import React, { useEffect, useMemo, useState } from 'react'
import { ICollection, ProductCreateRequest, ProductUpdateRequest } from '../../../types/api';
import CollectionsSmartInput from '../../inputs/CollectionsSmartInput'
import Input from '../../inputs/Input'
import ProductTypesSmartInput from '../../inputs/ProductTypesSmartInput';
import VendorsSmartInput from '../../inputs/VendorsSmartInput';

interface IProps {
    type: string | null;
    vendor: string | null;
    collections: Pick<ICollection, "id" | "title">[];
    onChange: (obj: ProductCreateRequest | ProductUpdateRequest) => void;
}

export default function OrganizationInfo({ onChange, ...data }: IProps) {
    const [collections, setCollections] = useState(data.collections)
    const [state, setState] = useState({
        type: data.type ?? "",
        vendor: data.vendor ?? "",
    })

    useEffect(() => {
        const localState = Object.entries(state)
        const changes = localState.map(([key, value]) => {
            if (data[key as keyof typeof data] === null && value === "") {
                return [key, undefined]
            }

            if (data[key as keyof typeof data] !== null && value === "") {
                return [key, null]
            }

            if (data[key as keyof typeof data] === value) {
                return [key, undefined]
            }

            return [key, value]
        })

        onChange(Object.fromEntries(changes))
    }, [state])

    useEffect(() => {
        const connectCollections = collections.filter(collection => !data.collections.some(c => c.id === collection.id)).map(c => ({ id: c.id }))
        const disconnectCollections = data.collections.filter(collection => !collections.some(c => c.id === collection.id)).map(c => ({ id: c.id }))

        onChange({
            connectCollections: connectCollections.length !== 0 ? connectCollections : undefined,
            disconnectCollections: disconnectCollections.length !== 0 ? disconnectCollections : undefined
        })
    }, [collections])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onCollectionsChange = (collections: Pick<ICollection, "id" | "title">[]) => {
        setCollections(collections)
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Организация</h2>
            <div className="space-y-4 p-5">
                <div className="flex flex-col">
                    <label htmlFor="type" className="text-sm text-gray-600 mb-1">Тип</label>
                    <ProductTypesSmartInput id="type" placeholder="Тип" name="type" value={state.type} onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="vendor" className="text-sm text-gray-600 mb-1">Производитель</label>
                    <VendorsSmartInput id="vendor" placeholder="Производитель" name="vendor" value={state.vendor} onChange={onInputChange} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="collection" className="text-sm text-gray-600 mb-1">Коллекция</label>
                    <CollectionsSmartInput id="collections" placeholder="Коллекция" collections={collections} onChange={onCollectionsChange} />
                </div>
            </div>
        </div>
    )
}
