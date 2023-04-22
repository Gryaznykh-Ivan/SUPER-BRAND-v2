import Head from 'next/head'
import { wrapper } from '../store'
import MainLayout from '../components/layouts/Main'

export default function Index() {
    const content = '<p>Привет! Как настроение,</p><p>Вот ссылка <a href="https://google.com" rel="noopener noreferrer" target="_blank" class="ql-size-huge">тут</a></p>'

    return (
        <MainLayout>
            <Head>
                <title>Главная</title>
                <meta name="description" content="Главная страница сайта. Тут будет meta-description" />
            </Head>
            <div className="">
                {/* <div className="prose text-md" dangerouslySetInnerHTML={{ __html: content }} ></div> */}
            </div>
        </MainLayout>
    )
}