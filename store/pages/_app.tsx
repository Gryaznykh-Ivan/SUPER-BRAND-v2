import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function App({ Component, ...rest }: AppProps) {
    const router = useRouter()
    const { store, props } = wrapper.useWrappedStore(rest);
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const checked = localStorage.getItem('checked')
        setChecked(checked === "true")
    }, [])

    const onClick = () => {
        if (typeof window !== undefined) {
            localStorage.setItem("checked", "true");
            router.reload();
        }
    }

    return (
        <Provider store={store}>
            <Head>
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            {checked === true
                ? <Component {...props.pageProps} />
                : <div className="flex justify-center items-center w-full h-screen bg-gray-100 cursor-pointer" onClick={onClick}>Нажми на меня</div>}
        </Provider>
    )
}