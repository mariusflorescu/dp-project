import React from 'react'
import { useRouter } from 'next/router'
import {
  useMantineTheme,
  Card,
  Image,
  Text,
  Group,
  Button
} from '@mantine/core'

type TProps = {
  product: any
}

const ProductCard: React.FC<TProps> = ({ product }) => {
  const router = useRouter()
  const theme = useMantineTheme()

  return (
    <Card shadow="lg" p="lg">
      <Card.Section>
        {product.imageURL ? (
          <Image
            src={product.imageURL}
            height={160}
            alt={product.name}
            fit="cover"
          />
        ) : (
          <Image height={160} alt={product.name} withPlaceholder />
        )}
      </Card.Section>

      <Text weight={500} sx={{ marginTop: theme.spacing.xs }}>
        {product.name}
      </Text>
      <Text
        size="sm"
        sx={{
          color: theme.colors.dark[1],
          lineHeight: 1.5,
          marginTop: theme.spacing.xs
        }}
      >
        {product.description}
      </Text>
      <Group position="apart" sx={{ marginTop: theme.spacing.md }}>
        <Text weight={500} size="sm" sx={{ color: theme.colors.dark[2] }}>
          {product.price}$
        </Text>
        <Button
          variant="subtle"
          size="xs"
          onClick={() => router.push(`/products/${product.id}`)}
        >
          View Details
        </Button>
      </Group>
    </Card>
  )
}

export default ProductCard
