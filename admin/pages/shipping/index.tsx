import Link from 'next/link'
import React from 'react'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import DeliveryProfile from '../../components/shipping/DeliveryProfile'
import withAuth from '../../hoc/withAuth'

function Index() {
    return (
        <MainLayout>
            <div className="px-6 my-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Доставки</h1>
                </div>
                <div className="mt-4 bg-white rounded-md">
                    <div className="p-4 border-b-[1px]">
                        <h2 className="font-medium">Профили доставки</h2>
                        <div className="text-sm text-gray-500">Choose where you ship and how much you charge for shipping at checkout.</div>
                    </div>
                    <div className="p-4 max-w-4xl mx-auto">
                        <div className="mb-4 text-xs font-medium uppercase">Основной профиль</div>
                        <div className="">
                            <DeliveryProfile
                                name="Основной"
                                offers="Все офферы без профиля"
                                zones="Охвачено зон доставки: 98"
                            />
                        </div>
                        <div className="my-4 text-xs font-medium uppercase">Созданные профили</div>
                        <div className="space-y-3">
                            <DeliveryProfile
                                name="В наличии"
                                offers="2000 offers"
                                zones="Охвачено зон доставки: 98"
                            />
                            <Link href="#" className="block text-center w-full py-4 border-dashed border-[1px] border-gray-500 rounded-md text-blue-900 underline hover:font-medium">Создать новый профиль</Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default withAuth(Index)
