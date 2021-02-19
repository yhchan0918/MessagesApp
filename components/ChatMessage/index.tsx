import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Message } from '../../types';
import moment from 'moment';

export type ChatMessageProps = {
  message: Message;
  myID: String;
};

const ChatMessage = (props: ChatMessageProps) => {
  const { message, myID } = props;

  const isMyMsg = () => {
    return message.user.id === myID;
  };

  return (
    <View style={styles.container}>
      <View style={isMyMsg() ? styles.myMessageBox : styles.messageBox}>
        {!isMyMsg() && <Text style={styles.username}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={isMyMsg() ? styles.myTime : styles.time}>
          {moment(message.createdAt).format('LT')}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
