import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

interface IProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mt-16 md:mt-28">
                {children}
            </main>
            <Footer />
        </div>
    )
}
