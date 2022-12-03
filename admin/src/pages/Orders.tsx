import React from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../components/inputs/SearchInput'

export default function Orders() {
    return (
        <div className="px-6 my-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium">Заказы</h1>
                <div className="">
                    <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать</button>
                </div>
            </div>
            <div className="mt-4 px-4 bg-white rounded-md">
                <div className="flex space-x-2 border-b-[1px]">
                    <Link to="#" className="relative p-3 before:absolute hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Все</Link>
                    <Link to="#" className="relative p-3 text-gray-400 hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Новые</Link>
                    <Link to="#" className="relative p-3 text-gray-400 hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Неоплаченные</Link>
                </div>
                <div className="py-4 space-y-4">
                    <div className="">
                        <SearchInput placeholder="Поиск" onChange={() => { }} />
                    </div>
                    <div className="relative block overflow-x-auto">
                        <table className="table-auto block max-w-0 lg:table lg:w-full lg:max-w-none">
                            <thead>
                                <tr className="border-b-[1px] text-sm">
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Заказ</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Дата</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Покупатель</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Итог</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Статус оплаты</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Статус доставки</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Продукты</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Доставка</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer">
                                    <td className="px-3 py-2 font-medium">№3</td>
                                    <td className="px-3 py-2">27.11.2022 14:32</td>
                                    <td className="px-3 py-2">Мария Алексеевна</td>
                                    <td className="px-3 py-2">40,000₽</td>
                                    <td className="px-3 py-2">Оплачен</td>
                                    <td className="px-3 py-2">Неотправлен</td>
                                    <td className="px-3 py-2">2</td>
                                    <td className="px-3 py-2">Доставка почтовой службой</td>
                                </tr>
                                <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer">
                                    <td className="px-3 py-2 font-medium">№2</td>
                                    <td className="px-3 py-2">26.11.2022 14:32</td>
                                    <td className="px-3 py-2">Евгений Алексеевна</td>
                                    <td className="px-3 py-2">46,000₽</td>
                                    <td className="px-3 py-2">Оплачен</td>
                                    <td className="px-3 py-2">Неотправлен</td>
                                    <td className="px-3 py-2">3</td>
                                    <td className="px-3 py-2">Доставка почтовой службой</td>
                                </tr>
                                <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer">
                                    <td className="px-3 py-2 font-medium">№1</td>
                                    <td className="px-3 py-2">26.11.2022 14:32</td>
                                    <td className="px-3 py-2">Илья Алексеевна</td>
                                    <td className="px-3 py-2">32,000₽</td>
                                    <td className="px-3 py-2">Оплачен</td>
                                    <td className="px-3 py-2">Неотправлен</td>
                                    <td className="px-3 py-2">1</td>
                                    <td className="px-3 py-2">Доставка почтовой службой</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
