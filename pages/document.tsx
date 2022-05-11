import { Html, Head, Main, } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Projeto Hburger do Hcode Lab" />
                <title>HBurguer</title>
                <link rel="shortcut icon" href="/images/logo-favicon-red.svg" type="image/x-icon" />
            </Head>
            <body>
                <Main />
            </body>
        </Html>
    )
}