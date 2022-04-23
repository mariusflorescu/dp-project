import React, { useRef, useContext } from 'react'
import {
  Box,
  Image,
  Group,
  Text,
  Stack,
  ActionIcon,
  NumberInput,
  NumberInputHandlers
} from '@mantine/core'
import { CartContext } from '../../lib/cart'

type TProps = {
  cartItem: {
    product: any
    quantity: number
  }
}

const CartItem: React.FC<TProps> = ({ cartItem }) => {
  const { updateItemQuantity } = useContext(CartContext)
  const { product, quantity } = cartItem
  const handlers = useRef<NumberInputHandlers>()

  return (
    <Group position="apart">
      <Group>
        <Image
          src={product.imageURL}
          withPlaceholder
          width={48}
          height={48}
          radius="md"
        />
        <Stack spacing={0}>
          <Text weight={600} size="lg">
            {product.name}
          </Text>
          <Text>{product.description}</Text>
        </Stack>
      </Group>
      <Box>
        {' '}
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
            value={quantity}
            onChange={(val) => updateItemQuantity(product, val)}
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
      </Box>
      <Box>{product.price}$</Box>
    </Group>
  )
}

export default CartItem
