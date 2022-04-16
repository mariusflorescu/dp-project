import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, Global } from "@mantine/core";
import Layout from "../layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
        <Global
          styles={(theme) => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
            },
          })}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </SessionProvider>
  );
}

export default MyApp;
