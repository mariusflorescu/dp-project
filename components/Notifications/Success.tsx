import {
  showNotification,
  NotificationProps as MantineNotificationProps
} from '@mantine/notifications'
import { Check } from 'tabler-icons-react'

type NotificationProps = Omit<
  MantineNotificationProps,
  'icon' | 'color' | 'autoClose'
>

const successNotification = (props: NotificationProps) => {
  return showNotification({
    icon: <Check size={18} />,
    color: 'teal',
    autoClose: 3000,
    ...props
  })
}

export default successNotification
