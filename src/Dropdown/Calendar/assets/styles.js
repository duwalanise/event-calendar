import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection    : 'column',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dayBlock: {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
    padding       : 10
  },
  dayText: {
    fontWeight: 'bold'
  }
});

export default styles;
