import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, FlatList } from 'react-native';

import { API, Auth, graphqlOperation } from 'aws-amplify';

import { messagesByChatRoom } from '../src/graphql/queries';
import ChatMessage from '../components/ChatMessage';
import BG from '../assets/images/BG.png';
import InputBox from '../components/InputBox';

const ChatRoomScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState(null);
  const [myID, setMyID] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await API.graphql(
        graphqlOperation(messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: 'DESC',
        })
      );
      setMessages(messagesData.data.messagesByChatRoom.items);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    const getMyID = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setMyID(userInfo.attributes.sub);
    };
    getMyID();
  }, []);

  return (
    <ImageBackground source={BG} style={{ width: '100%', height: '100%' }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myID={myID} message={item} />}
        inverted
      />
      <InputBox chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
