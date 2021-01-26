import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground, FlatList } from 'react-native';
import ChatMessage from '../components/ChatMessage';

import BG from '../assets/images/BG.png';
import chats from '../data/Chats';
import InputBox from '../components/InputBox';

const ChatRoomScreen = () => {
  const route = useRoute();

  return (
    <ImageBackground source={BG} style={{ width: '100%', height: '100%' }}>
      <FlatList
        data={chats.messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        inverted
      />
      <InputBox />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
