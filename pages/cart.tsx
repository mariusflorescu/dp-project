import { useContext } from 'react'
import type { NextPage } from 'next'
import {
  useMantineTheme,
  Box,
  Text,
  Divider,
  Group,
  Stack
} from '@mantine/core'
import { CartContext } from '../lib/cart'
import CartItem from '../components/CartItem'

const Cart: NextPage = () => {
  const theme = useMantineTheme()
  const { cart } = useContext(CartContext)

  return (
    <Box>
      <Text weight={600} size="xl">
        My Cart
      </Text>
      <Stack mt={theme.spacing.lg} spacing="lg">
        {cart.items.map((cartItem: any) => (
          <CartItem key={cartItem.product.id} cartItem={cartItem} />
        ))}
      </Stack>
      <Divider mt={theme.spacing.xl} mb={theme.spacing.md} />
      <Group position="apart">
        <Text weight={500} size="md">
          Total
        </Text>
        <Text weight={600} size="md">
          {cart.total}$
        </Text>
      </Group>
    </Box>
  )
}

export default Cart
