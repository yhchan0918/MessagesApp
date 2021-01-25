import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ChatMessage from '../components/ChatMessage';

import chats from '../data/Chats';

const ChatRoomScreen = () => {
  const route = useRoute();

  return (
    <View>
      <FlatList
        data={chats.messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
      />
    </View>
  );
};

export default ChatRoomScreen;
