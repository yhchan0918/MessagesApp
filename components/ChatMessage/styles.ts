import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: Colors.light.tint,
    marginRight: 50,
    borderRadius: 10,
    padding: 10,
    color: '#fff',
  },
  myMessageBox: {
    backgroundColor: '#e5e5e5',
    marginLeft: 50,
    borderRadius: 10,
    padding: 10,
    color: '#000',
  },
});

export default styles;
