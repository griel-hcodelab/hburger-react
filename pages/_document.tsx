import { Html, Head, Main, NextScript, } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="UTF-8" />
                
                <meta name="description" content="Projeto Hburger do Hcode Lab" />
                
                <link rel="shortcut icon" href="/images/logo-favicon-red.svg" type="image/x-icon" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}