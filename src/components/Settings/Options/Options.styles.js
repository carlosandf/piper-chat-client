import { StyleSheet } from 'react-native'
import { Variables } from '../../../styles/variables.styles'

export function Styles () {
  const variables = Variables()

  return StyleSheet.create({
    content: {
      marginTop: 30,
      marginHorizontal: 20,
      position: 'relative'
    },
    item: {
      backgroundColor: variables.secundaryBackground,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 3,
      width: '100%'
    },
    text: {
      color: variables.textColorOpacity,
      fontSize: 16
    },
    logout: {
      marginTop: 100
    },
    textLogout: {
      textAlign: 'center',
      color: variables.dangerColor,
      fontSize: 20
    }
  })
}
