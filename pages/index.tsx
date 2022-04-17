import type { NextPage } from 'next'
import useSWR from 'swr'
import { LoadingOverlay, Grid } from '@mantine/core'
import ProductCard from '../components/ProductCard'

const Home: NextPage = () => {
  const { data: products, error } = useSWR('api/products/get')

  return (
    <div>
      <LoadingOverlay
        visible={!products && !error}
        loaderProps={{ color: 'teal', size: 'lg' }}
      />
      <Grid>
        {products &&
          products.map((product: any) => (
            <Grid.Col key={product.id} span={4}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
      </Grid>
    </div>
  )
}

export default Home
