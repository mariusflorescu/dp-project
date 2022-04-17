import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import {
  useMantineTheme,
  createStyles,
  LoadingOverlay,
  Table,
  Button,
  Anchor
} from '@mantine/core'

const useStyles = createStyles(() => ({
  addProductWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const SupplierPage: NextPage = () => {
  const { data: products, error } = useSWR('/api/supplier/get-products')
  const router = useRouter()
  const theme = useMantineTheme()
  const { classes } = useStyles()

  const handleAddNewProductClick = () => {
    router.push('/supplier/add')
  }

  return (
    <div>
      <LoadingOverlay
        visible={!products && !error}
        loaderProps={{ color: 'teal', size: 'lg' }}
      />
      <h2>Supplier page</h2>
      <div className={classes.addProductWrapper}>
        <Button color="teal" onClick={handleAddNewProductClick}>
          Add new Product
        </Button>
      </div>
      <Table sx={{ marginTop: theme.spacing.xl }}>
        <thead style={{ backgroundColor: theme.colors.dark[8] }}>
          <tr>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Quantity</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        {products &&
          products.map((product: any) => (
            <tbody key={product.id}>
              <tr>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <Anchor target="_blank" href={product.imageURL}>
                    {product.imageURL}
                  </Anchor>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  )
}

export default SupplierPage
