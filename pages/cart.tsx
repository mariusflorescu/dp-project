import { useContext, useCallback } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  useMantineTheme,
  Box,
  Text,
  Divider,
  Group,
  Stack,
  Button
} from '@mantine/core'
import axios from 'axios'
import { CartContext } from '../lib/cart'
import CartItem from '../components/CartItem'
import {
  successNotification,
  failureNotification
} from '../components/Notifications'

const Cart: NextPage = () => {
  const router = useRouter()
  const theme = useMantineTheme()
  const { cart, cleanCart } = useContext(CartContext)

  const formatCart = useCallback(() => {
    const total = cart.total
    const items = cart.items.map((item: any) => ({
      id: item.product.id,
      productMaxQuantity: item.product.quantity,
      quantity: item.quantity
    }))

    return {
      items,
      total
    }
  }, [cart])

  const handleClickOrder = async () => {
    try {
      const order = formatCart()
      const res = await axios.post('/api/create-order', { order })

      if (res.status === 201) {
        successNotification({
          title: 'Success',
          message: `You have successfully created the product!`
        })
        cleanCart()
        router.push('/')
      }
    } catch (err) {
      console.error(err)
      failureNotification({
        title: 'Failure',
        message: `There was a failure when trying to place the order.`
      })
    }
  }

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
      <Group position="right" sx={{ marginTop: theme.spacing.md }}>
        <Button onClick={() => handleClickOrder()}>Order</Button>
      </Group>
    </Box>
  )
}

export default Cart
