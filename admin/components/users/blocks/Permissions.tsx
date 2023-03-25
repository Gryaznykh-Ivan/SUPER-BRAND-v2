import React, { useEffect, useMemo, useState } from 'react'
import { IUserPermission, UserUpdateRequest } from '../../../types/api';
import { Right } from '../../../types/store';
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

interface IProps {
    permissions: IUserPermission[];
    onChange: (obj: UserUpdateRequest) => void;
}


export default function Permissions({ onChange, permissions }: IProps) {
    const initialState = useMemo(() => permissions.map(c => c.right), [permissions])
    const [state, setState] = useState(initialState)

    useEffect(() => {
        const createPermissions = state.filter(permission => !permissions.some(c => c.right === permission))
        const deletePermissions = permissions.filter(permission => !state.some(c => c === permission.right)).map(c => c.id)

        onChange({
            createPermissions: createPermissions.length !== 0 ? createPermissions : undefined,
            deletePermissions: deletePermissions.length !== 0 ? deletePermissions : undefined
        })
    }, [state])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked === true) {
            setState(prev => ([...prev, e.target.name as Right]))
        } else {
            setState(prev => ([...prev.filter(c => c !== e.target.name)]))
        }
    }

    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Контроль доступа</h2>
            <div className="p-5 grid grid-cols-4 gap-8">
                <div className="">
                    <div className=" text-gray-500 mb-2">Заказы</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="ORDER_READ" name="ORDER_READ" className="w-5 h-5 rounded-md" checked={state.some(c => c === "ORDER_READ")} onChange={onInputChange} />
                            <label htmlFor="ORDER_READ" className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="ORDER_UPDATE" name="ORDER_UPDATE" className="w-5 h-5 rounded-md" checked={state.some(c => c === "ORDER_UPDATE")} onChange={onInputChange} />
                            <label htmlFor="ORDER_UPDATE" className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Товары</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="PRODUCT_READ" name="PRODUCT_READ" className="w-5 h-5 rounded-md" checked={state.some(c => c === "PRODUCT_READ")} onChange={onInputChange} />
                            <label htmlFor="PRODUCT_READ" className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="PRODUCT_UPDATE" name="PRODUCT_UPDATE" className="w-5 h-5 rounded-md" checked={state.some(c => c === "PRODUCT_UPDATE")} onChange={onInputChange} />
                            <label htmlFor="PRODUCT_UPDATE" className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Офферы</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="OFFER_READ" name="OFFER_READ" className="w-5 h-5 rounded-md" checked={state.some(c => c === "OFFER_READ")} onChange={onInputChange} />
                            <label htmlFor="OFFER_READ" className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="OFFER_UPDATE" name="OFFER_UPDATE" className="w-5 h-5 rounded-md" checked={state.some(c => c === "OFFER_UPDATE")} onChange={onInputChange} />
                            <label htmlFor="OFFER_UPDATE" className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Коллекции</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="COLLECTION_READ" name="COLLECTION_READ" className="w-5 h-5 rounded-md" checked={state.some(c => c === "COLLECTION_READ")} onChange={onInputChange} />
                            <label htmlFor="COLLECTION_READ" className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="COLLECTION_UPDATE" name="COLLECTION_UPDATE" className="w-5 h-5 rounded-md" checked={state.some(c => c === "COLLECTION_UPDATE")} onChange={onInputChange} />
                            <label htmlFor="COLLECTION_UPDATE" className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Ползователи</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="USER_READ" name="USER_READ" className="w-5 h-5 rounded-md" checked={state.some(c => c === "USER_READ")} onChange={onInputChange} />
                            <label htmlFor="USER_READ" className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="USER_UPDATE" name="USER_UPDATE" className="w-5 h-5 rounded-md" checked={state.some(c => c === "USER_UPDATE")} onChange={onInputChange} />
                            <label htmlFor="USER_UPDATE" className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Доставка</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="SHIPPING_READ" name="SHIPPING_READ" className="w-5 h-5 rounded-md" checked={state.some(c => c === "SHIPPING_READ")} onChange={onInputChange} />
                            <label htmlFor="SHIPPING_READ" className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="SHIPPING_UPDATE" name="SHIPPING_UPDATE" className="w-5 h-5 rounded-md" checked={state.some(c => c === "SHIPPING_UPDATE")} onChange={onInputChange} />
                            <label htmlFor="SHIPPING_UPDATE" className="ml-3">Update</label>
                        </div>
                    </div>

                </div>
                <div className="col-span-2">
                    <div className="text-gray-500 mb-2">Работа с файлами</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="MEDIA_UPLOAD" name="MEDIA_UPLOAD" className="w-5 h-5 rounded-md" checked={state.some(c => c === "MEDIA_UPLOAD")} onChange={onInputChange} />
                            <label htmlFor="MEDIA_UPLOAD" className="ml-3">Upload</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="MEDIA_DELETE" name="MEDIA_DELETE" className="w-5 h-5 rounded-md" checked={state.some(c => c === "MEDIA_DELETE")} onChange={onInputChange} />
                            <label htmlFor="MEDIA_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
