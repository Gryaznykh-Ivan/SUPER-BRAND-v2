import type { AppProps } from 'next/app'
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import '../styles/globals.css'

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);

    const router = useRouter()
    // const [checked, setChecked] = useState(false)

    // useEffect(() => {
    //     const checked = localStorage.getItem('checked')
    //     setChecked(checked === "true")
    // }, [])

    // const onClick = () => {
    //     localStorage.setItem("checked", "true");
    //     router.reload();
    // }

    return (
        <Provider store={store}>
            <Head>
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Component {...props.pageProps} />
            {/* {checked === true
                ? <Component {...props.pageProps} />
                : <div className="flex justify-center items-center w-full h-screen bg-gray-100 cursor-pointer" onClick={onClick}>Нажми на меня</div>
            } */}
        </Provider>
    )
}