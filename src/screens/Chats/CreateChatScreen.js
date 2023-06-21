import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CreateChat } from '../../components/Chat'
import { User } from '../../api'
import { useAuth } from '../../hooks'

const userController = new User()

export function CreateChatScreen () {
  const { accessToken } = useAuth()
  const [users, setUsers] = useState([])
  const [userResult, setUserResult] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getAll(accessToken)
        setUsers(response)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <View>
      <Text>CreateChatScreen</Text>
      <CreateChat.UsersList users={users} />
    </View>
  )
}
