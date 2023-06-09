import { SafeAreaView } from 'react-native'
import { useAuth } from '../../../hooks'
import { UserInfo, Options } from '../../../components/Settings'

export function SettingsScreen () {
  const { logout, user, accessToken, updateUser } = useAuth()
  return (
    <SafeAreaView>
      <UserInfo user={user} />
      <Options
        {...{ logout, user, accessToken, updateUser }}
      />
    </SafeAreaView>
  )
}
