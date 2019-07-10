import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <style>{`body { heigth: 100% }`}</style>
          <link rel='stylesheet' href='/static/css/nprogress.css' />
          <link rel="icon"  href="/static/images/logo.png"></link>
          <title>Quản lý nguồn thải</title>
        </Head>
        <body >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;