import React, { useState } from 'react'
import axios from 'axios'
import { Edit } from 'tabler-icons-react'
import {
  useMantineTheme,
  createStyles,
  Drawer,
  Button,
  TextInput,
  Textarea,
  NumberInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { successNotification, failureNotification } from '../Notifications'

type TProps = {
  product: any
  mutate: Function
}

const useStyles = createStyles((theme) => ({
  editButton: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm
  }
}))

const EditButton: React.FC<TProps> = ({ product, mutate }) => {
  const [open, setOpen] = useState(false)

  const theme = useMantineTheme()
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      imageURL: product.imageURL
    }
  })

  const handleEditClick = async (values: any) => {
    try {
      const { status } = await axios.put('/api/supplier/update-product', {
        id: product.id,
        userId: product.userId,
        ...values
      })

      if (status === 200) {
        mutate()
        successNotification({
          title: 'Success',
          message: `You have successfully updated the product!`
        })
        setOpen(() => false)
      }
    } catch (err) {
      console.error(err)
      failureNotification({
        title: 'Failure',
        message: `There was a failure when trying to update the product.`
      })
      setOpen(() => false)
    }
  }

  return (
    <>
      <Edit
        size={24}
        className={classes.editButton}
        onClick={() => setOpen(() => true)}
      />
      <Drawer
        opened={open}
        onClose={() => setOpen(() => false)}
        position="right"
        title="Update Product"
        padding="xl"
        size="xl"
      >
        <form
          onSubmit={form.onSubmit((values) => handleEditClick(values))}
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
            {...form.getInputProps('quantity')}
          />

          <TextInput
            label="Image URL"
            placeholder="https://..."
            {...form.getInputProps('imageURL')}
          />

          <Button type="submit" sx={{ marginTop: theme.spacing.md }}>
            Update Product
          </Button>
        </form>
      </Drawer>
    </>
  )
}

export default EditButton
