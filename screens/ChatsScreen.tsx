import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { getUser } from './queries';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from '../components/NewMessageButton';
import { View } from '../components/Themed';

export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        setChatRooms(userData.data.getUser.chatRoomUser.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchChatRooms();
  }, []);
  return (
    <View style={styles.container}>
      {chatRooms ? (
        <FlatList
          style={{ width: '100%' }}
          data={chatRooms}
          renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
          keyExtractor={({ id }) => id}
        />
      ) : (
        <Text>You have not chat with anyone yet</Text>
      )}
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
