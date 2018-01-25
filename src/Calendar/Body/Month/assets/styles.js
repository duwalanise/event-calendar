import { StyleSheet } from 'react-native';
import globalStyles from 'src/generics/assets/styles';

const DEVICE_WIDTH = globalStyles.DEVICE_WIDTH;

const styles = StyleSheet.create({
  container: {
    flex         : 1,
    width        : DEVICE_WIDTH,
    flexDirection: 'column'
  },
  header: {
    flexDirection  : 'row',
    paddingVertical: 5
  },
  body: {
    flex      : 1,
    alignItems: 'stretch'
  },
  weekBlock: {
    flex         : 1,
    flexDirection: 'row'
  },
  dayText: {
    fontWeight: 'bold'
  },
  dayBlock: {
    flex    : 1,
    padding : 3,
    overflow: 'scroll'
  },
  today: {
    width          : 22,
    height         : 22,
    alignSelf      : 'flex-start',
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: '#1f84dd',
    borderRadius   : 11
  },
  todayText: {
    color   : '#fff',
    fontSize: 13
  },
  eventBlock: {
    borderRadius   : 3,
    backgroundColor: '#7D1FDD',
    height         : 20,
    padding        : 2,
    marginBottom   : 5,
    overflow       : 'hidden'
  },
  eventText: {
    color: '#fff'
  }
});

export default styles;
