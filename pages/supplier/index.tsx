import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { createStyles, Button } from '@mantine/core'

const useStyles = createStyles(() => ({
  addProductWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

const SupplierPage: NextPage = () => {
  const router = useRouter()
  const { classes } = useStyles()

  const handleAddNewProductClick = () => {
    router.push('/supplier/add')
  }

  return (
    <div>
      <h2>Supplier page</h2>
      <div className={classes.addProductWrapper}>
        <Button color="teal" onClick={handleAddNewProductClick}>
          Add new Product
        </Button>
      </div>
    </div>
  )
}

export default SupplierPage
