import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { lifecycle } from 'recompose';

import { weekShort, generateMonthArray } from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const defaultBodyCell = (day, currentDate, events) => {
  const isSameMonth = day.isSame(currentDate, 'month');
  const isToday = day.isSame(moment(), 'day');
  return (
    <View style={styles.dayBlock}>
      <View style={isToday && styles.today}>
        <Text
          style={[
            { color: !isSameMonth && '#939393' },
            isToday && styles.todayText
          ]}
        >
          {day.date()}
        </Text>
      </View>
      {(events || []).map(event => (
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
  const {
    headerCell,
    bodyCell,
    currentDate,
    title,
    bodyStyle,
    headerStyle
  } = props;
  return (
    <View key={currentDate} style={styles.container}>
      <View>{title && title(currentDate)}</View>
      <View style={[headerStyle, styles.header]}>
        {weekShort.map(day => headerCell(day))}
      </View>
      <View style={styles.body}>
        {generateMonthArray(currentDate).map(week => (
          <View key={week[0].format()} style={[bodyStyle, styles.weekBlock]}>
            {week.map(day => bodyCell(day, currentDate))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default lifecycle({
  shouldComponentUpdate(nextProps) {
    if (!nextProps.currentDate.isSame(this.props.currentDate, 'month')) {
      return true;
    }
    return false;
  }
})(MonthlyCalendar);

MonthlyCalendar.propTypes = {
  headerCell: PropTypes.func,
  title: PropTypes.func,
  bodyCell: PropTypes.func,
  currentDate: PropTypes.object,
  bodyStyle: PropTypes.object,
  headerStyle: PropTypes.object
};

MonthlyCalendar.defaultProps = {
  headerCell: defaultHeaderCell,
  title: null,
  bodyCell: defaultBodyCell,
  bodyStyle: { borderBottomWidth: 1, borderColor: '#ccc' },
  headerStyle: {}
};
