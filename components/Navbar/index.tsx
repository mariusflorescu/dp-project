import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import {
  useMantineTheme,
  Box,
  Container,
  Grid,
  Text,
  Button
} from '@mantine/core'

const Navbar = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const theme = useMantineTheme()

  const goToLogin = () => {
    router.push('/api/auth/signin')
  }

  const goToLogout = () => {
    router.push('/api/auth/signout')
  }

  return (
    <Box sx={{ backgroundColor: theme.colors.dark[8] }}>
      <Container>
        <Grid py={24} justify="center" align="center">
          <Grid.Col span={4}>
            <Text
              component="span"
              align="center"
              variant="gradient"
              gradient={{ from: 'cyan', to: 'green', deg: 45 }}
              size="xl"
              weight={700}
            >
              DP Ecommerce
            </Text>
          </Grid.Col>
          <Grid.Col
            span={4}
            offset={4}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            {status !== 'loading' && (
              <Button
                variant="light"
                color="teal"
                uppercase
                onClick={() => {
                  if (session?.user) {
                    return goToLogout()
                  }

                  return goToLogin()
                }}
              >
                {session?.user ? 'Logout' : 'Login'}
              </Button>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}

export default Navbar
