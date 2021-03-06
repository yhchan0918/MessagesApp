import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import ContactListItem from '../components/ContactListItem';
import { View } from '../components/Themed';
import { listUsers } from '../src/graphql/queries';

export default function ContactsScreen() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const usersData = await API.graphql(graphqlOperation(listUsers));
        const myFriends = usersData.data.listUsers.items.filter(
          (user) => user.id !== userInfo.attributes.sub
        );
        setUsers(myFriends);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={({ id }) => id}
      />
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
