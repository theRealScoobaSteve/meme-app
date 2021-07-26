import 'bootstrap/dist/css/bootstrap.min.css';

import { Store } from 'redux';
import React from 'react';
import App, {AppInitialProps, AppContext} from 'next/app';
import { wrapper } from '../redux/store';
import AuthGuard from '../components/AuthGuard';

declare module 'next/dist/next-server/lib/utils' {
    export interface NextPageContext {
        store: Store<any>;
    }
}

class MyApp extends App<AppInitialProps> {

    public static getInitialProps = wrapper.getInitialAppProps((store: any) => async ({Component, ctx}: any) => {

        return {
            pageProps: {
                // Call page-level getInitialProps
                // DON'T FORGET TO PROVIDE STORE TO PAGE
                ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
                // Some custom thing for all pages
                pathname: ctx.pathname,
            },
        };

    });

    public render() {
        const { Component, pageProps } = this.props;

        return (
            <AuthGuard>
                <Component {...pageProps} />
            </AuthGuard>
        );
    }
}

export default wrapper.withRedux(MyApp);