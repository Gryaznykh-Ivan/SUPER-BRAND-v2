import React, { ReactNode } from 'react'
import Header from '../Header'
import SideBar from '../navigation/SideBar'

interface IProps {
    children: ReactNode;
}

export default function MainLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 mt-16 bg-main-bg">
                <div className="w-64 hidden md:block border-r-[1px]">
                    <SideBar />
                </div>
                <div className="flex-1">
                    { children }
                </div>
            </div>
        </div>
    )
}
