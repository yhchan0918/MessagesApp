import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { useNavigation } from '@react-navigation/native';
import { getUser } from '../../screens/queries';
import {
  createChatRoom,
  createChatRoomUser,
} from '../../src/graphql/mutations';
import { User } from '../../types';
import styles from './styles';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user: currentUser } = props;

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const myID = userInfo.attributes.sub;
      // Check is there is available chatroom with the clicked user
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: myID })
      );
      const isAvailable = userData.data.getUser.chatRoomUser.items.find(
        (item) => {
          const isFound = item.chatRoom.chatRoomUsers.items.find(
            (item) => item.user.id === currentUser.id
          );
          return isFound;
        }
      );
      if (isAvailable) {
        navigation.navigate('ChatRoom', {
          id: isAvailable.chatRoomID,
          name: currentUser.name,
        });
      } else {
        // Create a new chat room
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: { lastMessageID: '022af270-d0e9-4314-a83b-basd1942400a' },
          })
        );

        if (!newChatRoomData.data) {
          console.log('Failed to create a chatroom');
          return;
        }

        const newChatRoom = newChatRoomData.data.createChatRoom;
        // Add 'currentUser' to the chatroom
        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: currentUser.id,
              chatRoomID: newChatRoom.id,
            },
          })
        );
        // Add authenticated user to the chatroom

        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: myID,
              chatRoomID: newChatRoom.id,
            },
          })
        );
        navigation.navigate('ChatRoom', {
          id: newChatRoom.id,
          name: 'hardcoded name',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: currentUser.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{currentUser.name}</Text>
            <Text style={styles.status}>{currentUser.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
