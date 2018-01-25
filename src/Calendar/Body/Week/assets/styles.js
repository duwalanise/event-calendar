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
    flexDirection    : 'row',
    paddingVertical  : 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row'
  },
  events: {
    height       : 50,
    flex         : 1,
    flexDirection: 'row'
  },
  eventsContainer: {
    position     : 'absolute',
    left         : 60,
    right        : 0,
    top          : 0,
    bottom       : 0,
    display      : 'flex',
    flexDirection: 'row'
  },
  eventBlock: {
    backgroundColor: '#7D1FDD',
    borderWidth    : 1,
    borderColor    : '#fff',
    padding        : 2,
    overflow       : 'hidden',
    position       : 'absolute',
    left           : 0,
    right          : 0
  },
  eventText: {
    color: '#fff'
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
  hourBlock: {
    flex   : 1,
    padding: 3
  },
  hourCell: {
    borderBottomWidth: 1,
    borderRightWidth : 1,
    borderColor      : '#ccc'
  },
  hours: {
    width            : 60,
    paddingHorizontal: 8,
    justifyContent   : 'center',
    borderColor      : '#ccc',
    borderRightWidth : 1
  },
  blankCell: {
    width: 60
  },
  date: {
    fontSize: 20
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
