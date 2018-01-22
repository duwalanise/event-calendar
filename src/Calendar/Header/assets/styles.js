import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
    zIndex: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightPanelText: {
    marginTop: -3,
    marginLeft: 12,
    fontSize: 16
  },
  dayBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  dayText: {
    fontWeight: 'bold'
  },
  list: {
    flexDirection: 'row',
    height: 65,
    paddingLeft: 20,
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  text: {
    marginTop: -3,
    marginLeft: 12,
    fontSize: 16
  }
});

export default styles;
