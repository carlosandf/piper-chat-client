import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateChatScreen, ChatsListScreen } from '../../screens/Chats'
import { screens } from '../../utils/screens'
import { IconBack } from '../../components/Navigation'
import { Styles } from '../Styles.styles'

const Stack = createNativeStackNavigator()

export function ChatsNavigation () {
  const styles = Styles()
  return (
    <Stack.Navigator
      screenOptions={{
        ...styles.stackNavigationStyles
      }}
    >
      <Stack.Screen
        name={screens.tab.chats.chatScreen}
        component={ChatsListScreen}
        options={{ title: 'Chats' }}
      />

      <Stack.Screen
        name={screens.tab.chats.createChatScreem}
        component={CreateChatScreen}
        options={{
          title: 'Nuevo Chat',
          presentation: 'modal',
          headerLeft: IconBack
          // ...styles.modalStyles
        }}
      />
    </Stack.Navigator>
  )
}
