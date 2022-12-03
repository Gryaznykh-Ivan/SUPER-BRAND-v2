import React, { ReactNode } from 'react'
import Header from '../Header'

interface IProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 mt-16 bg-main-bg">
                <div className="flex-1">
                    { children }
                </div>
            </div>
        </div>
    )
}
