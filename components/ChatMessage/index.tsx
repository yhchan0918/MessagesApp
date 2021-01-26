import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Message } from '../../types';
import moment from 'moment';

export type ChatMessageProps = {
  message: Message;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message } = props;

  const isMyMsg = () => {
    return message.user.id === 'u1';
  };

  return (
    <View style={styles.container}>
      <View style={isMyMsg() ? styles.myMessageBox : styles.messageBox}>
        {!isMyMsg() && <Text style={styles.username}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={isMyMsg() ? styles.myTime : styles.time}>
          {moment(message.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
