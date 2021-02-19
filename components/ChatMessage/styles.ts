import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: '#fff',
    marginRight: 50,
    borderRadius: 10,
    padding: 10,
    color: '#fff',
  },
  myMessageBox: {
    backgroundColor: '#DCF8C5',
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
    color: 'grey',
  },
});

export default styles;
