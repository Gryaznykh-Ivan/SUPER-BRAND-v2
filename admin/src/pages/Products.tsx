import React from 'react'
import { Link } from 'react-router-dom'
import SearchInput from '../components/inputs/SearchInput'

export default function Products() {
    return (
        <div className="px-6 my-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium">Продукты</h1>
                <div className="">
                    <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать</button>
                </div>
            </div>
            <div className="mt-4 px-4 bg-white rounded-md">
                <div className="flex space-x-2 border-b-[1px]">
                    <Link to="#" className="relative p-3 before:absolute hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Все</Link>
                    <Link to="#" className="relative p-3 text-gray-400 hover:before:absolute hover:before:bg-gray-500 before:left-0 before:bottom-0 before:rounded-lg before:bg-green-700 before:w-full before:h-[3px]">Неактивные</Link>
                </div>
                <div className="py-4 space-y-4">
                    <div className="">
                        <SearchInput placeholder="Поиск" onChange={() => { }} />
                    </div>
                    <div className="relative block overflow-x-auto">
                        <table className="table-auto block max-w-0 md:table md:w-full md:max-w-none">
                            <thead>
                                <tr className="border-b-[1px] text-sm">
                                    <th className="font-medium text-gray-500 text-start px-3 py-2 min-w-[80px] w-20"></th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Продукт</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Статус</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Наличие</th>
                                    <th className="font-medium text-gray-500 text-start px-3 py-2">Производитель</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer">
                                    <td className="px-3 py-2">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/air-force0.jpg`} className="" alt="" />
                                    </td>
                                    <td className="font-medium px-3 py-2">1906R "White Gold"</td>
                                    <td className="px-3 py-2">Active</td>
                                    <td className="px-3 py-2">50 offers</td>
                                    <td className="px-3 py-2">Air Force</td>
                                </tr>
                                <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer">
                                    <td className="px-3 py-2">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/air-force1.jpg`} className="" alt="" />
                                    </td>
                                    <td className="font-medium px-3 py-2">1906R "White Gold"</td>
                                    <td className="px-3 py-2">Active</td>
                                    <td className="px-3 py-2">50 offers</td>
                                    <td className="px-3 py-2">Air Force</td>
                                </tr>
                                <tr className="border-b-[1px] hover:bg-gray-100 cursor-pointer">
                                    <td className="px-3 py-2">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/air-force0.jpg`} className="" alt="" />
                                    </td>
                                    <td className="font-medium px-3 py-2">574 YURT "Salehe Bembury - Universal Communication Workwear White"</td>
                                    <td className="px-3 py-2">Active</td>
                                    <td className="px-3 py-2">50 offers</td>
                                    <td className="px-3 py-2">Air Force</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
