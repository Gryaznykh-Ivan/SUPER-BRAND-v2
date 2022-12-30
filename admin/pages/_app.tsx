import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { refresh } from '../services/authService';
import { useRouter } from 'next/router';

export default function App({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const router = useRouter();

    useEffect(() => {
        store.dispatch(refresh.initiate())
            .then(authCheck)

        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }
    }, [])

    function authCheck() {
        const isAuth = store.getState().auth.isAuth
        const path = router.asPath.split('?')[0]
        const publicPath = ['/auth/login']

        if (isAuth === false && !publicPath.includes(path)) {
            router.push('/auth/login')
        }
    }

    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    )
}