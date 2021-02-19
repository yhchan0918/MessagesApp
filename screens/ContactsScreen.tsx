import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';

import ContactListItem from '../components/ContactListItem';
import { View } from '../components/Themed';
import users from '../data/Users';
import { listUsers } from '../src/graphql/queries';

export default function ContactsScreen() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        console.log(usersData);
      } catch (e) {}
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
