import { StyleSheet } from 'react-native';
import theme from 'app/constants/theme';

const styles = StyleSheet.create({
  container: {
    flex         : 1,
    flexDirection: 'row',
    paddingTop   : 15
  },
  dateColumn: {
    width     : 60,
    alignItems: 'center'
  },
  day: {
    color: theme.color.text.fade
  },
  date: {
    fontSize: 30
  },
  eventColumn: {
    flex             : 1,
    paddingHorizontal: 15
  },
  eventBlock: {
    borderRadius   : 3,
    backgroundColor: '#7D1FDD',
    height         : 50,
    paddingTop     : 5,
    paddingLeft    : 15,
    marginBottom   : 10
  },
  eventTitle: {
    color     : '#fff',
    fontWeight: 'bold'
  },
  eventTime: {
    color: '#fff'
  },
  noEvent: {
    paddingLeft: 75
  },
  noEventText: {
    fontSize: 14,
    color   : theme.color.text.fade
  },
  noEventMonth: {
    flex: 1,
  },
  noEventMonthHeader: {
    marginLeft       : 20,
    paddingVertical  : 20,
    borderBottomColor: theme.color.border.default,
    borderBottomWidth: 1
  },
  noEventMonthBody: {
    paddingVertical  : 40,
    paddingHorizontal: 20
  },
  noEventMonthText: {
    fontSize: 20
  }
});

export default styles;
