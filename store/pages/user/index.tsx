import MainLayout from '@/components/layouts/Main'
import UserAddress from '@/components/user/UserAddress'
import UserEmail from '@/components/user/UserEmail'
import UserName from '@/components/user/UserName'
import UserPhone from '@/components/user/UserPhone'
import Head from 'next/head'
import React from 'react'

export default function User() {
    return (
        <MainLayout>
            <Head>
                <title>Личные данные</title>
                <meta name="description" content="Личные данные" />
            </Head>
            <div className="py-8 container px-4 md:px-10">
                <div className="space-y-10">
                    <div className="text-xl font-medium">Личные данные</div>
                    <UserName />
                    <UserEmail />
                    <UserPhone />
                    <UserAddress />
                </div>
            </div>
        </MainLayout>
    )
}
