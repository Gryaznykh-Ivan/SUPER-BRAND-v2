import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/navigation/SideBar'

export default function Index() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 mt-16 bg-main-bg">
                <div className="w-64 hidden md:block border-r-[1px]">
                    <SideBar />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}
