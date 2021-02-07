/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ServerStyleSheets } from '@material-ui/styles';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<{
        styles: JSX.Element;
        html: string;
        head?: JSX.Element[];
    }> {
        const styledComponentsSheet = new ServerStyleSheet();
        const materialSheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />)),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <React.Fragment>
                        {initialProps.styles}
                        {materialSheets.getStyleElement()}
                        {styledComponentsSheet.getStyleElement()}
                    </React.Fragment>
                ),
            };
        } finally {
            styledComponentsSheet.seal();
        }
    }

    render() {
        return (
            <Html lang="kr">
                <Head>
                    <meta charSet="utf-8" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:400,500,600,700&display=swap"
                    />
                    <meta name="theme-color" content="#3f51b5" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
