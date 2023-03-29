import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layouts/Main'
import SEOSnippetProduct from '../../components/settings/blocks/SEOSnippetProduct'


function Index() {

    return (
        <MainLayout>
            <div className="px-6 my-4 max-w-3xl mx-auto space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Настройки</h1>
                </div>
                <div className="flex flex-col pb-4">
                    <SEOSnippetProduct />
                </div>
            </div>
        </MainLayout>
    )
}

export default Index
