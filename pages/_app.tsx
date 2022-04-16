import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { MantineProvider, Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Layout from "../layout";
import fetcher from "../lib/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <SWRConfig
        value={{
          fetcher: fetcher,
          dedupingInterval: 20000,
        }}
      >
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
          <NotificationsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </MantineProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
