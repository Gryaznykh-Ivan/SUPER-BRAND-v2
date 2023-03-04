import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import SEOSnippetProduct from '../../components/settings/blocks/SEOSnippetProduct'
import Profile from '../../components/shipping/cards/Profile'
import ProfileName from '../../components/shipping/popups/ProfileName'
import { useCreateDeliveryProfileMutation, useGetAllDeliveryProfileQuery } from '../../services/shippingService'
import { IErrorResponse } from '../../types/api'

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
