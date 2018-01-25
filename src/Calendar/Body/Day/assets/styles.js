import { StyleSheet } from 'react-native';
import globalStyles from 'src/generics/assets/styles';

const DEVICE_WIDTH = globalStyles.DEVICE_WIDTH;

const styles = StyleSheet.create({
  container: {
    flexDirection    : 'column',
    flex             : 1,
    width            : DEVICE_WIDTH,
    backgroundColor  : '#fff',
    paddingHorizontal: 10,
    paddingVertical  : 5
  },
  row: {
    flexDirection: 'row'
  },
  hours: {
    width         : 75,
    justifyContent: 'center',
    alignItems    : 'center',
    height        : 50
  },
  events: {
    justifyContent: 'center',
    alignItems    : 'stretch',
    height        : 50,
    flex          : 1,
    padding       : 2
  },
  eventsContainer: {
    position: 'absolute',
    left    : 75,
    right   : 0,
    display : 'flex'
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
  line: {
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  fixedHeader: {
    width          : 75,
    alignItems     : 'center',
    backgroundColor: '#fff',
    marginBottom   : -50,
    marginTop      : -5,
    paddingTop     : 5,
    zIndex         : 1
  },
  date: {
    fontSize: 30
  },
  currentTime: {
    alignItems   : 'center',
    flexDirection: 'row'
  },
  currentTimeCircle: {
    width          : 8,
    height         : 8,
    borderRadius   : 4,
    backgroundColor: '#ff0000'
  },
  currentTimeLine: {
    flex       : 1,
    borderWidth: 0.5,
    borderColor: '#ff0000'
  },
  currentEvent: {
    borderRadius   : 3,
    backgroundColor: '#7D1FDD',
    height         : 50,
    paddingTop     : 5,
    paddingLeft    : 15,
    flex           : 1,
    shadowColor    : '#ccc',
    shadowOpacity  : 0.8,
    shadowRadius   : 2,
    shadowOffset   : {
      height: 1,
      width : 0
    }
  }
});

export default styles;
