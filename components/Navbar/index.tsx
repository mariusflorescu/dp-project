import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import {
  useMantineTheme,
  Box,
  Container,
  Grid,
  Text,
  Button,
  Menu,
  Avatar,
  Badge,
  ActionIcon
} from '@mantine/core'
import { Home, Logout, ShoppingCart } from 'tabler-icons-react'
import { CartContext } from '../../lib/cart'

const Navbar = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const theme = useMantineTheme()
  const { totalNumberOfProducts } = useContext(CartContext)

  const goToHome = () => {
    router.push('/')
  }

  const goToCart = () => {
    router.push('/cart')
  }

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
            {status !== 'loading' && !session?.user && (
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
                Login
              </Button>
            )}

            {status !== 'loading' && session?.user && (
              <Menu
                control={
                  <ActionIcon>
                    <Avatar src={session?.user.image} />
                  </ActionIcon>
                }
              >
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                  icon={<Home size={14} />}
                  rightSection={
                    <Text size="xs" color="dimmed">
                      SHIFT + H
                    </Text>
                  }
                  onClick={() => goToHome()}
                >
                  Go Home
                </Menu.Item>
                <Menu.Item
                  icon={<ShoppingCart size={14} />}
                  rightSection={
                    <Badge color="red">{totalNumberOfProducts()}</Badge>
                  }
                  onClick={() => goToCart()}
                >
                  View Cart
                </Menu.Item>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                  icon={<Logout size={14} />}
                  onClick={() => goToLogout()}
                >
                  Logout
                </Menu.Item>
              </Menu>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  )
}

export default Navbar
