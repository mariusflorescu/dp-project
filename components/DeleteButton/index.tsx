import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Trash } from 'tabler-icons-react'
import {
  useMantineTheme,
  createStyles,
  Modal,
  Text,
  Group,
  Button
} from '@mantine/core'
import {successNotification, failureNotification} from '../Notifications'

type TProps = {
  product: any
  mutate: Function
}

const useStyles = createStyles(() => ({
  deleteButton: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const DeleteButton: React.FC<TProps> = ({ product, mutate }) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const theme = useMantineTheme()
  const { classes } = useStyles()

  const handleDeleteProduct = async () => {
    try {
      const { status } = await axios.delete('/api/supplier/delete-product', {
        data: {
          id: product.id,
          userId: product.userId
        }
      })

      if (status === 200) {
        mutate()
        successNotification({
          title: 'Success',
          message: `You have successfully deleted the product!`,
        })
        setOpen(() => false)
      }
    } catch (err) {
      console.error(err)
      failureNotification({
        title: 'Failure',
        message: `There was a failure when trying to delete the product.`,
      })
      setOpen(() => false)
    }
  }

  return (
    <>
      <Trash
        size={24}
        className={classes.deleteButton}
        onClick={() => setOpen(() => true)}
      />
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        centered
        title="Delete Product"
      >
        <Text>Are you sure you want to delete {product.name}?</Text>
        <Text>This action cannot be undone.</Text>
        <Group sx={{ marginTop: theme.spacing.xl }} position="right">
          <Button variant="default" size="xs" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="xs" color="red" onClick={handleDeleteProduct}>
            Proceed
          </Button>
        </Group>
      </Modal>
    </>
  )
}

export default DeleteButton
