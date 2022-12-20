import Link from 'next/link'
import React from 'react'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import Profiles from '../../components/shipping/blocks/Profiles'

import withAuth from '../../hoc/withAuth'

function Index() {
    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-5xl mx-auto space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center h-10">
                        <h1 className="text-xl font-medium">Доставка</h1>
                    </div>
                    <div className="flex justify-end">
                        {/* <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Создать профиль</button> */}
                    </div>
                </div>
                <div className="flex flex-col pb-4">
                    <div className="flex-1 space-y-4">
                        <Profiles />
                    </div>
                </div>
                {/* <div className="flex justify-between">
                    <div className=""></div>
                    <div className="flex justify-end">
                        <button className="bg-green-700 px-4 py-2 text-white font-medium rounded-md">Сохранить</button>
                    </div>
                </div> */}
            </div>

        </MainLayout>
    )
}

export default withAuth(Index)
