import Document, { Head, Html, Main, NextScript } from "next/document";

import { prefix } from "@Utilities/prefix";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href={`${prefix}/images/favicon.ico`} />
        </Head>
        <body className="bg-gray-100 ">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
