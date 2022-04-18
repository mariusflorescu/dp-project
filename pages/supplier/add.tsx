import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import {
  Box,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  createStyles,
  useMantineTheme
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  successNotification,
  failureNotification
} from '../../components/Notifications'

const useStyles = createStyles((theme) => ({
  formRoot: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm
  }
}))

const AddNewProduct: NextPage = () => {
  const router = useRouter()
  const { mutate } = useSWR('/api/supplier/get-products')
  const theme = useMantineTheme()
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      imageURL: ''
    }
  })

  const handleSubmitForm = async (values: any) => {
    try {
      const { status } = await axios.post('/api/supplier/add-product', {
        ...values
      })
      if (status === 201) {
        mutate()
        successNotification({
          title: 'Success',
          message: `You have successfully created the product!`
        })
        router.push('/supplier')
      }
    } catch (err) {
      console.error(err)
      failureNotification({
        title: 'Failure',
        message: `There was a failure when trying to create the product.`
      })
    }
  }

  return (
    <Box>
      <h2>Add new Product</h2>
      <form
        onSubmit={form.onSubmit((values) => handleSubmitForm(values))}
        className={classes.formRoot}
      >
        <TextInput
          required
          label="Product name"
          placeholder="Big monitor..."
          {...form.getInputProps('name')}
        />

        <Textarea
          required
          label="Product description"
          placeholder="This is a monitor with a diagonal of 27 inch, a refresh rate of 144Hz and a response time of 1ms..."
          {...form.getInputProps('description')}
        />

        <NumberInput
          required
          label="Product quantity"
          placeholder="3"
          min={1}
          {...form.getInputProps('quantity')}
        />

        <NumberInput
          label="Price"
          parser={(value) => (value as string).replace(/\$\s?|(,*)/g, '')}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value as string))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '$ '
          }
          {...form.getInputProps('price')}
        />

        <TextInput
          label="Image URL"
          placeholder="https://..."
          {...form.getInputProps('imageURL')}
        />

        <Button type="submit" sx={{ marginTop: theme.spacing.md }}>
          Add Product
        </Button>
      </form>
    </Box>
  )
}

export default AddNewProduct
