import type { NextPage } from 'next'
import axios from 'axios'
import useSWR from 'swr'
import {
  useMantineTheme,
  Stack,
  Text,
  LoadingOverlay,
  Table
} from '@mantine/core'
import SelectRole from '../../components/SelectRole'
import {
  successNotification,
  failureNotification
} from '../../components/Notifications'

const AdminPage: NextPage = () => {
  const { data, error, mutate } = useSWR('/api/admin/users')
  const theme = useMantineTheme()

  const onRoleChange = async (user: any, value: string | null) => {
    if (user.role === value) return

    try {
      const { status } = await axios.patch('/api/admin/change-role', {
        id: user.id,
        role: value
      })
      if (status === 200) {
        successNotification({
          title: 'User updated successfully',
          message: `You have successfully updated ${
            user.email
          }'s role to ${value?.toLocaleLowerCase()}`
        })
        mutate()
      }
    } catch (err) {
      console.error(err)
      failureNotification({
        title: 'User could not be updated',
        message: `There was an error when trying to update ${
          user.email
        }'s role to ${value?.toLocaleLowerCase()}`
      })
    }
  }

  return (
    <Stack>
      <LoadingOverlay
        visible={!data && !error}
        loaderProps={{ color: 'teal', size: 'lg' }}
      />
      <Text size="lg" sx={{ fontWeight: 600 }}>
        Hello Admin
      </Text>
      <Table sx={{ marginTop: 24 }}>
        <thead style={{ backgroundColor: theme.colors.dark[8] }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        {data &&
          data.users.map((user: any) => (
            <tbody key={user.id}>
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <SelectRole
                    value={user.role}
                    onChange={(value) => onRoleChange(user, value)}
                  />
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </Stack>
  )
}

export default AdminPage
