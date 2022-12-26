import Link from 'next/link'
import React from 'react'
import Addresses from '../../../components/clients/blocks/Addresses'
import Consignment from '../../../components/clients/blocks/Consignment'
import GeneralInfo from '../../../components/clients/blocks/GeneralInfo'
import Status from '../../../components/clients/blocks/Status'
import MainLayout from '../../../components/layouts/Main'

export default function Index() {
    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/users" className="p-2 font-bold border-[1px] border-gray-400 rounded-md">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19L3 12M3 12L10 5M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1 className="text-xl font-medium">Иван Иванов</h1>
                    </div>
                    <div className="flex justify-end">
                        <Link href="/offers" className="p-2 hover:bg-gray-200 rounded-md stroke-black">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="inherit" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="my-4 flex flex-col space-y-4 pb-4 border-b-[1px] lg:flex-row lg:space-x-4 lg:space-y-0">
                    <div className="flex-1 space-y-4">
                        <GeneralInfo />
                        <Consignment />
                    </div>
                    <div className="space-y-4 lg:w-80">
                        <Status />
                        <Addresses />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="">
                        <button className="border-red-700 border-[1px] text-red-700 px-4 py-2 font-medium rounded-md hover:bg-red-700 hover:text-white">Удалить</button>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Сохранить</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
