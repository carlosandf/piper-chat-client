import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'native-base'
import { isEmpty } from 'lodash'
import { DateTime } from 'luxon'
import { useAuth } from '../../../../hooks'
import { ChatMessage } from '../../../../api/chatMessage'
import { ENV, formatDate } from '../../../../utils'
import { Styles } from './ChatItem.styles'

const messageController = new ChatMessage()

export function ChatItem (props) {
  const styles = Styles()
  const { chat } = props
  const { member_one, member_two } = chat
  const { user, accessToken } = useAuth()
  const [lastMessage, setLastMessage] = useState(null)
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(1)

  const userChat = user.id !== member_one.id ? member_one : member_two

  useEffect(() => {
    (async () => {
      try {
        const response = await messageController.getLastMessage(accessToken, chat._id)

        if (!isEmpty(response)) setLastMessage(response)
      } catch (error) {

      }
    })()
  }, [chat._id])
  const openChat = () => {
    console.log('Abrir chat ->', chat._id)
  }

  return (
    <>
      <TouchableOpacity style={styles.item} onPress={openChat}>
        <View style={{ paddingVertical: 7 }}>
          <Avatar
            style={styles.avatar}
            bg={'lightBlue.600'}
            marginRight={4}
            marginX={2}
            size='lg'
            source={{ uri: userChat?.avatar && `${ENV.IMAGES_URL}/${userChat.avatar}` }}
            // source={{ uri: user.avatar && `${ENV.IMAGES_URL}/${user.avatar}` }}
          >
            {userChat?.email.substring(0, 2).toUpperCase()}
          </Avatar>
        </View>
        <View style={styles.infoContent}>
          <View style={styles.info}>
            <Text style={styles.identity} numberOfLines={1}>
              {
                (userChat?.firstName || userChat?.lastName)
                  ? `${userChat?.firstName} ${userChat?.lastName}`
                  : userChat?.email
              }
            </Text>
            <Text style={[styles.message, totalUnreadMessages > 0 && styles.unread]} numberOfLines={2}>
              {lastMessage?.message || ''}
            </Text>
          </View>
          <View style={styles.details}>
            {lastMessage !== null && (
              <Text style={[styles.time, totalUnreadMessages === 0 && styles.noNewMessages]}>
                {formatDate(lastMessage?.createdAt)}
              </Text>
            )}
            {totalUnreadMessages > 0 && (
              <View style={[styles.totalUnreadMessagesContainer]}>
                <Text style={styles.totalUnreadMessages}>
                  {totalUnreadMessages < 99 ? totalUnreadMessages : '99'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}