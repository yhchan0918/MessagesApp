import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Fontisto,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';

import styles from './styles';

const InputBox = (props) => {
  const { chatRoomID } = props;
  const [msg, setMsg] = useState('');
  const [myUserID, setMyUserID] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyUserID(userInfo.attributes.sub);
    };
    fetchUser();
  }, []);

  const onMicrophonePress = () => {
    console.warn('microphone');
  };

  const updateLastMsg = async (messageID: string) => {
    try {
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: { id: chatRoomID, lastMessageID: messageID },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onSendPress = async () => {
    try {
      const newMsgData = await API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: msg,
            userID: myUserID,
            chatRoomID,
          },
        })
      );
      await updateLastMsg(newMsgData.data.createMessage.id);
    } catch (error) {}
    setMsg('');
  };
  const onPress = () => {
    if (!msg) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={85}
      style={{ width: '100%' }}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <FontAwesome5 name="laugh-beam" size={24} color="grey" />
          <TextInput
            placeholder={'Type a message'}
            style={styles.input}
            multiline
            value={msg}
            onChangeText={(text) => setMsg(text)}
          />
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {!msg && (
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
            />
          )}
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            {msg ? (
              <MaterialIcons name="send" size={26} color="white" />
            ) : (
              <MaterialCommunityIcons
                name="microphone"
                size={28}
                color="white"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputBox;
