import Footer from '../footer/Footer'
import Header from '../header/Header'

interface IProps {
    children: React.ReactNode
}
export default function MainLayout({ children }: IProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mt-14 md:mt-24">
                {children}
            </main>
            <Footer />
        </div>
    )
}
