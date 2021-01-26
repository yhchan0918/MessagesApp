import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: '#e5e5e5',
    marginRight: 50,
    borderRadius: 10,
    padding: 10,
    color: '#fff',
  },
  myMessageBox: {
    backgroundColor: '#95dffc',
    marginLeft: 50,
    borderRadius: 10,
    padding: 10,
    color: '#000',
  },
  username: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  message: {
    marginBottom: 2,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
  },
  myTime: {
    alignSelf: 'flex-end',
    color: '#37afe2',
  },
});

export default styles;
