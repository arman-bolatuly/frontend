import "../styles/globals.css";
import Layout from "../components/layout";
import { SWRConfig } from "swr";
import axios from "axios";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          featch(resource, init).then((res) => res.json()),
      }}
    >
      <Head>
        <link
          rel="stylesheet"
          href="path_to_attricss_file.css"
          type="text/css"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
