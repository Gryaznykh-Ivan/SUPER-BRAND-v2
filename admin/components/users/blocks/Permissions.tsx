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
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="">
                    <div className=" text-gray-500 mb-2">Заказы</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.ORDER_READ} name={Right.ORDER_READ} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.ORDER_READ)} onChange={onInputChange} />
                            <label htmlFor={Right.ORDER_READ} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.ORDER_UPDATE} name={Right.ORDER_UPDATE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.ORDER_UPDATE)} onChange={onInputChange} />
                            <label htmlFor={Right.ORDER_UPDATE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Товары</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.PRODUCT_READ} name={Right.PRODUCT_READ} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.PRODUCT_READ)} onChange={onInputChange} />
                            <label htmlFor={Right.PRODUCT_READ} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.PRODUCT_UPDATE} name={Right.PRODUCT_UPDATE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.PRODUCT_UPDATE)} onChange={onInputChange} />
                            <label htmlFor={Right.PRODUCT_UPDATE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Офферы</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.OFFER_READ} name={Right.OFFER_READ} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.OFFER_READ)} onChange={onInputChange} />
                            <label htmlFor={Right.OFFER_READ} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.OFFER_UPDATE} name={Right.OFFER_UPDATE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.OFFER_UPDATE)} onChange={onInputChange} />
                            <label htmlFor={Right.OFFER_UPDATE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Коллекции</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.COLLECTION_READ} name={Right.COLLECTION_READ} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.COLLECTION_READ)} onChange={onInputChange} />
                            <label htmlFor={Right.COLLECTION_READ} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.COLLECTION_UPDATE} name={Right.COLLECTION_UPDATE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.COLLECTION_UPDATE)} onChange={onInputChange} />
                            <label htmlFor={Right.COLLECTION_UPDATE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Ползователи</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.USER_READ} name={Right.USER_READ} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.USER_READ)} onChange={onInputChange} />
                            <label htmlFor={Right.USER_READ} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.USER_UPDATE} name={Right.USER_UPDATE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.USER_UPDATE)} onChange={onInputChange} />
                            <label htmlFor={Right.USER_UPDATE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Доставка</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.SHIPPING_READ} name={Right.SHIPPING_READ} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.SHIPPING_READ)} onChange={onInputChange} />
                            <label htmlFor={Right.SHIPPING_READ} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.SHIPPING_UPDATE} name={Right.SHIPPING_UPDATE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.SHIPPING_UPDATE)} onChange={onInputChange} />
                            <label htmlFor={Right.SHIPPING_UPDATE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Страницы</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.PAGE_READ} name={Right.PAGE_READ} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.PAGE_READ)} onChange={onInputChange} />
                            <label htmlFor={Right.PAGE_READ} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.PAGE_UPDATE} name={Right.PAGE_UPDATE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.PAGE_UPDATE)} onChange={onInputChange} />
                            <label htmlFor={Right.PAGE_UPDATE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Файлы</div>
                    <div className="grid md:grid-cols-1 gap-3">
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.MEDIA_UPLOAD} name={Right.MEDIA_UPLOAD} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.MEDIA_UPLOAD)} onChange={onInputChange} />
                            <label htmlFor={Right.MEDIA_UPLOAD} className="ml-3">Read</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id={Right.MEDIA_DELETE} name={Right.MEDIA_DELETE} className="w-5 h-5 rounded-md" checked={state.some(c => c === Right.MEDIA_DELETE)} onChange={onInputChange} />
                            <label htmlFor={Right.MEDIA_DELETE} className="ml-3">Update</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
