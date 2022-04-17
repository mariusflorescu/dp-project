import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { MantineProvider, Global } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import Layout from '../layout'
import fetcher from '../lib/fetcher'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useHotkeys([['shift+H', () => router.push('/')]])

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <SWRConfig
        value={{
          fetcher: fetcher,
          dedupingInterval: 20000
        }}
      >
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
          <Global
            styles={(theme) => ({
              '*, *::before, *::after': {
                boxSizing: 'border-box',
                margin: 0,
                padding: 0
              }
            })}
          />
          <NotificationsProvider limit={3}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </MantineProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
