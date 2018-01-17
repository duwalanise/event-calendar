import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection    : 'column',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  list: {
    flexDirection    : 'row',
    height           : 65,
    paddingLeft      : 20,    
    alignItems       : 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  text: {
    marginTop : -3,
    marginLeft: 12,
    fontSize  : 16,
  }
});

export default styles;
