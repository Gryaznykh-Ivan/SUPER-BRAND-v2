import Head from 'next/head'
import { wrapper } from '../store'
import MainLayout from '../components/layouts/Main'

export default function Index() {
    return (
        <MainLayout>
            <Head>
                <title>Главная</title>
                <meta name="description" content="Главная страница сайта. Тут будет meta-description" />
            </Head>
            <div className="">
                test
            </div>
        </MainLayout>
    )
}