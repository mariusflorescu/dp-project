import type { NextPage } from 'next'
import { useState, useMemo, useContext } from 'react'
import { useDebouncedValue } from '@mantine/hooks'
import {
  useMantineTheme,
  LoadingOverlay,
  Grid,
  TextInput,
  Text
} from '@mantine/core'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../lib/cart'

const Home: NextPage = () => {
  const theme = useMantineTheme()
  const { products: data, loadingProducts: loading } = useContext(CartContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500)
  const products = useMemo(
    () =>
      data && data.filter((el: any) => el.name.includes(debouncedSearchTerm)),
    [data, debouncedSearchTerm]
  )

  return (
    <div>
      <LoadingOverlay
        visible={loading}
        loaderProps={{ color: 'teal', size: 'lg' }}
      />
      <TextInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        label="Search for a product"
        placeholder="Search product by title..."
      />
      <Text size="lg" mt={theme.spacing.md} sx={{ fontWeight: 600 }}>
        Product list:
      </Text>
      {products && products.length ? (
        <Grid mt={theme.spacing.sm}>
          {products.map((product: any) => (
            <Grid.Col key={product.id} span={4}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Text mt={theme.spacing.sm}>
          There are no results for your search...
        </Text>
      )}
    </div>
  )
}

export default Home
