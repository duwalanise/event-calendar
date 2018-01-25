import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { lifecycle, compose, defaultProps } from 'recompose';

import { weekShort, generateMonthArray, findEventsInADay } from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const defaultBodyCell = (day, currentDate, events) => {
  const isSameMonth = day.isSame(currentDate, 'month');
  const isToday = day.isSame(moment(), 'day');
  const eventLength = events.length;
  return (
    <View style={styles.dayBlock}>
      <View style={isToday && styles.today}>
        <Text style={[{ color: !isSameMonth && '#939393' }, isToday && styles.todayText]}>{day.date()}</Text>
      </View>
      {!!eventLength && (events.slice(0,3)).map(event => (
        <View style={styles.eventBlock}>
          <Text style={styles.eventText}>{event.name}</Text>
        </View>
      ))}
    </View>
  );
};

const defaultHeaderCell = day => (
  <View style={styles.dayBlock}>
    <Text style={styles.dayText}>{day}</Text>
  </View>
);

const MonthlyCalendar = props => {
  const { headerCell, bodyCell, currentDate, title, bodyStyle, headerStyle, events } = props;
  return (
    <View key={currentDate} style={styles.container}>
      <View>{title && title(currentDate)}</View>
      <View style={[headerStyle, styles.header]}>{weekShort.map(day => headerCell(day))}</View>
      <View style={styles.body}>
        {generateMonthArray(currentDate).map(week => (
          <View key={week[0].format()} style={[bodyStyle, styles.weekBlock]}>
            {week.map(day => bodyCell(day, currentDate, findEventsInADay(events, day)))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default compose(
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return (
        !nextProps.currentDate.isSame(this.props.currentDate, 'month') ||
        nextProps.events !== this.props.events
      );
    }
  }),
defaultProps({
  headerCell : defaultHeaderCell,
  title      : null,
  bodyCell   : defaultBodyCell,
  bodyStyle  : { borderBottomWidth: 1, borderColor: '#ccc' },
  headerStyle: {}
})
)(MonthlyCalendar);

MonthlyCalendar.propTypes = {
  bodyCell   : PropTypes.func,
  bodyStyle  : PropTypes.object,
  currentDate: PropTypes.object,
  events     : PropTypes.object,
  headerCell : PropTypes.func,
  headerStyle: PropTypes.object,
  title      : PropTypes.func,
};
