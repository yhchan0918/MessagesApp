import React from 'react';
import { View, Text } from 'react-native';

import { ChatRoom } from '../../types';
import styles from './styles';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  return (
    <View>
      <Text>{chatRoom.lastMessage.content}</Text>
    </View>
  );
};

export default ChatListItem;
