import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

const ChatRoomScreen = () => {
  const route = useRoute();

  return (
    <View>
      <Text>Chatroom</Text>
    </View>
  );
};

export default ChatRoomScreen;
