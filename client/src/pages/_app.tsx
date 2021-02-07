import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import client from 'src/apollo/client';
import { useStore } from '../store/store';
import '../styles/global.css';
import materialTheme from '../styles/theme/materialTheme';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const store = useStore(pageProps.initialReduxState);

    return (
        <>
            <Head>
                <title>Translation App</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=3.0, minimum-scale=1"
                />
            </Head>
            <ApolloProvider client={client}>
                <ThemeProvider theme={materialTheme}>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
};

export default App;
