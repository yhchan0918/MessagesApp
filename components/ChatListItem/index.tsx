import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { Auth } from 'aws-amplify';

import { ChatRoom } from '../../types';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const [otherUser, setOtherUser] = useState(null);
  const navigation = useNavigation();
  const user = chatRoom.chatRoomUsers.items[1].user;
  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    };
    getOtherUser();
  }, []);

  const onClick = () => {
    navigation.navigate('ChatRoom', { id: chatRoom.id, name: user.name });
  };
  if (!otherUser) return null;
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text style={styles.lastMsg}>
              {chatRoom.lastMessage ? chatRoom.lastMessage.content : ''}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>
          {chatRoom.lastMessage
            ? moment(chatRoom.lastMessage.createdAt).format('DD//MM/YYYY')
            : ''}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatListItem;
