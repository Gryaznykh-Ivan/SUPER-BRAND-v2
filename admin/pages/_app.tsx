import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { refresh } from '../services/authService';
import { useRouter } from 'next/router';

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const router = useRouter();
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        store.dispatch(refresh.initiate()).then(() => {
            authCheck(router.asPath)
            setShowContent(true)
        })

        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [])

    function authCheck(url: string) {
        const auth = store.getState().auth
        const path = url.split('?')[0];
        const publicPath = ['/auth/login']

        if (auth.isAuth === false && !publicPath.includes(path)) {
            router.replace({
                pathname: '/auth/login'
            })
        }
    }

    return (
        <Provider store={store}>
            {showContent &&
                <>
                    <Component {...props.pageProps} />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </>
            }
        </Provider>
    )
}