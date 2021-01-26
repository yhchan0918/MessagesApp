import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Fontisto,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';

import styles from './styles';

const InputBox = () => {
  const [msg, setMsg] = useState('');

  const onMicrophonePress = () => {
    console.warn('microphone');
  };

  const onSendPress = () => {
    console.warn(`Sending ${msg}`);
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
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder={'Type a message'}
          style={styles.input}
          multiline
          onChangeText={(text) => setMsg(text)}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!msg && (
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {msg ? (
            <MaterialIcons name="send" size={26} color="white" />
          ) : (
            <MaterialCommunityIcons name="microphone" size={28} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
