import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screens } from '../../utils/screens'
import { IconBack } from '../../components/Navigation'
import {
  AuthStartScreen,
  RegisterScreen,
  LoginScreen
} from '../../screens/Auth'

const Stack = createNativeStackNavigator()

export function AuthNavigation () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: IconBack
      }}
    >
      <Stack.Screen
        name={screens.auth.authStartScreen}
        component={AuthStartScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={screens.auth.loginScreen}
        component={LoginScreen}
        options={{ title: 'Iniciar sesión' }}
      />

      <Stack.Screen
        name={screens.auth.registerScreen}
        component={RegisterScreen}
        options={{ title: 'Registro' }}
      />
    </Stack.Navigator>
  )
}
