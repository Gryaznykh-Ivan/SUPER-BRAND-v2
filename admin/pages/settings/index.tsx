import Link from 'next/link'
import React from 'react'
import SearchInput from '../../components/inputs/SearchInput'
import MainLayout from '../../components/layouts/Main'
import withAuth from '../../hoc/withAuth'

function Index() {
    return (
        <MainLayout>
            <div>Settings</div>
        </MainLayout>
    )
}

export default withAuth(Index)