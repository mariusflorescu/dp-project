import {
  showNotification,
  NotificationProps as MantineNotificationProps
} from '@mantine/notifications'
import { X } from 'tabler-icons-react'

type NotificationProps = Omit<MantineNotificationProps, 'icon' | 'color' | 'autoClose'>

const failureNotification = (props: NotificationProps) => {
  return showNotification({
    icon: <X size={18} />,
    color: 'red',
    autoClose: 3000,
    ...props
  })
}

export default failureNotification
