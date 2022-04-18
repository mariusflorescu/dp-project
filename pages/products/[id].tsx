import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { ShoppingCart } from 'tabler-icons-react'
import { useMantineTheme, Box, Image, Text, Button } from '@mantine/core'

const ProductPage: NextPage = () => {
  const theme = useMantineTheme()
  const router = useRouter()
  const { id } = router.query

  const { data: product, error } = useSWR(`/api/products/${id}`)

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
        <Button
          leftIcon={<ShoppingCart size={18} />}
          color="teal"
          size="sm"
          disabled={product.quantity === 0}
        >
          {!!product.quantity ? 'Add to Cart' : 'Out of stock'}
        </Button>
      </Box>
    </Box>
  )
}

export default ProductPage
