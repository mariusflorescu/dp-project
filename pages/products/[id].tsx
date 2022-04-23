import { useState, useRef, useContext } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ShoppingCart } from 'tabler-icons-react'
import {
  useMantineTheme,
  Box,
  Image,
  Text,
  Button,
  NumberInput,
  Group,
  ActionIcon,
  NumberInputHandlers
} from '@mantine/core'
import { CartContext } from '../../lib/cart'
import { successNotification } from '../../components/Notifications'

const ProductPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    isItemInCart,
    updateItemQuantity,
    addItemToCart,
    getProductQuantity
  } = useContext(CartContext)
  const { data: product, error } = useSWR(`/api/products/${id}`)
  const [selectedQuantity, setSelectedQuantity] = useState(
    getProductQuantity(product?.id)
  )
  const handlers = useRef<NumberInputHandlers>()
  const theme = useMantineTheme()

  const handleAddToCartClick = () => {
    if (isItemInCart(product.id)) {
      updateItemQuantity(product, selectedQuantity)
      successNotification({
        title: 'Cart updated successfully',
        message: `The quantity of ${product.name} has been successfully updated!`
      })
    } else {
      addItemToCart(product, selectedQuantity)
      successNotification({
        title: 'Cart updated successfully',
        message: `The item ${product.name} has been successfully added to the cart!`
      })
    }
  }

  if (!product) {
    return <></>
  }

  return (
    <Box>
      <Button size="sm" variant="default" onClick={() => router.back()}>
        Go back
      </Button>
      <Text weight={600} size="xl" my={theme.spacing.lg}>
        {product.name}
      </Text>
      {product.imageURL ? (
        <Image
          src={product.imageURL}
          width={240}
          height={240}
          alt={product.name}
          fit="cover"
        />
      ) : (
        <Image width={240} height={240} alt={product.name} withPlaceholder />
      )}
      <Text sx={{ color: theme.colors.dark[1] }} mt={theme.spacing.md}>
        {product.description}
      </Text>
      <Text
        size="sm"
        mt={theme.spacing.md}
        sx={{ color: theme.colors.dark[2] }}
      >
        Price: {product.price}$
      </Text>
      <Text size="sm" sx={{ color: theme.colors.dark[2] }}>
        Sold by: {product.user.name}
      </Text>
      <Box mt={theme.spacing.md}>
        <Group position="apart">
          <Group>
            <ActionIcon
              size={42}
              variant="default"
              onClick={() => handlers!.current!.decrement()}
            >
              –
            </ActionIcon>

            <NumberInput
              hideControls
              value={selectedQuantity}
              onChange={(val) => setSelectedQuantity(val as number)}
              handlersRef={handlers}
              max={product.quantity}
              min={0}
              disabled={product.quantity === 0}
              styles={{ input: { width: 54, textAlign: 'center' } }}
            />

            <ActionIcon
              size={42}
              variant="default"
              onClick={() => handlers!.current!.increment()}
            >
              +
            </ActionIcon>
          </Group>
          <Button
            leftIcon={<ShoppingCart size={18} />}
            color="teal"
            size="sm"
            disabled={product.quantity === 0 || selectedQuantity === 0}
            onClick={() => handleAddToCartClick()}
          >
            {!!product.quantity ? 'Add to Cart' : 'Out of stock'}
          </Button>
        </Group>
      </Box>
    </Box>
  )
}

export default ProductPage
