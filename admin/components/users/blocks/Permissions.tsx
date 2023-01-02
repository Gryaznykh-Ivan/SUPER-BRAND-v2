import React from 'react'
import Input from '../../inputs/Input'
import TextArea from '../../inputs/TextArea'

export default function Permissions() {
    return (
        <div className="rounded-md bg-white shadow-sm">
            <h2 className="font-semibold p-5 border-b-[1px]">Контроль доступа</h2>
            <div className="p-5 grid grid-cols-2 gap-8">
                <div className="">
                    <div className=" text-gray-500 mb-2">Заказы</div>
                    <div className="grid gap-3">
                        <div className="">
                            <input type="checkbox" id="ORDER_READ" name="ORDER_READ" className="w-5 h-5 rounded-md" />
                            <label htmlFor="ORDER_READ" className="ml-3">Read</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="ORDER_CREATE" name="ORDER_CREATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="ORDER_CREATE" className="ml-3">Create</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="ORDER_UPDATE" name="ORDER_UPDATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="ORDER_UPDATE" className="ml-3">Update</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="ORDER_DELETE" name="ORDER_DELETE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="ORDER_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Товары</div>
                    <div className="grid gap-3">
                        <div className="">
                            <input type="checkbox" id="PRODUCT_READ" name="PRODUCT_READ" className="w-5 h-5 rounded-md" />
                            <label htmlFor="PRODUCT_READ" className="ml-3">Read</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="PRODUCT_CREATE" name="PRODUCT_CREATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="PRODUCT_CREATE" className="ml-3">Create</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="PRODUCT_UPDATE" name="PRODUCT_UPDATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="PRODUCT_UPDATE" className="ml-3">Update</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="PRODUCT_DELETE" name="PRODUCT_DELETE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="PRODUCT_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Офферы</div>
                    <div className="grid gap-3">
                        <div className="">
                            <input type="checkbox" id="OFFER_READ" name="OFFER_READ" className="w-5 h-5 rounded-md" />
                            <label htmlFor="OFFER_READ" className="ml-3">Read</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="OFFER_CREATE" name="OFFER_CREATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="OFFER_CREATE" className="ml-3">Create</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="OFFER_UPDATE" name="OFFER_UPDATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="OFFER_UPDATE" className="ml-3">Update</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="OFFER_DELETE" name="OFFER_DELETE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="OFFER_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Коллекции</div>
                    <div className="grid gap-3">
                        <div className="">
                            <input type="checkbox" id="COLLECTION_READ" name="COLLECTION_READ" className="w-5 h-5 rounded-md" />
                            <label htmlFor="COLLECTION_READ" className="ml-3">Read</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="COLLECTION_CREATE" name="COLLECTION_CREATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="COLLECTION_CREATE" className="ml-3">Create</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="COLLECTION_UPDATE" name="COLLECTION_UPDATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="COLLECTION_UPDATE" className="ml-3">Update</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="COLLECTION_DELETE" name="COLLECTION_DELETE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="COLLECTION_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Ползователи</div>
                    <div className="grid gap-3">
                        <div className="">
                            <input type="checkbox" id="USER_READ" name="USER_READ" className="w-5 h-5 rounded-md" />
                            <label htmlFor="USER_READ" className="ml-3">Read</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="USER_CREATE" name="USER_CREATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="USER_CREATE" className="ml-3">Create</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="USER_UPDATE" name="USER_UPDATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="USER_UPDATE" className="ml-3">Update</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="USER_DELETE" name="USER_DELETE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="USER_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Доставка</div>
                    <div className="grid gap-3">
                        <div className="">
                            <input type="checkbox" id="SHIPPING_READ" name="SHIPPING_READ" className="w-5 h-5 rounded-md" />
                            <label htmlFor="SHIPPING_READ" className="ml-3">Read</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="SHIPPING_CREATE" name="SHIPPING_CREATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="SHIPPING_CREATE" className="ml-3">Create</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="SHIPPING_UPDATE" name="SHIPPING_UPDATE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="SHIPPING_UPDATE" className="ml-3">Update</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="SHIPPING_DELETE" name="SHIPPING_DELETE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="SHIPPING_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>

                </div>
                <div className="">
                    <div className="text-gray-500 mb-2">Работа с файлами</div>
                    <div className="grid gap-3">
                        <div className="">
                            <input type="checkbox" id="MEDIA_UPLOAD" name="MEDIA_UPLOAD" className="w-5 h-5 rounded-md" />
                            <label htmlFor="MEDIA_UPLOAD" className="ml-3">Upload</label>
                        </div>
                        <div className="">
                            <input type="checkbox" id="MEDIA_DELETE" name="MEDIA_DELETE" className="w-5 h-5 rounded-md" />
                            <label htmlFor="MEDIA_DELETE" className="ml-3">Delete</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
