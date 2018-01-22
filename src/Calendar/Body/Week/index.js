import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';

import {
  weekShort,
  generateWeekArray,
  generateDayArray
} from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const defaultBodyCell = (day, hours, events) => {
  return (
    <View key={day.format()} style={[styles.hourBlock, styles.hourCell]} />
  );
};

const defaultHeaderCell = (day, currentDate) => {
  const isSameMonth = day.isSame(currentDate, 'month');
  const isToday = day.isSame(moment(), 'day');
  return (
    <View key={day.format()} style={styles.hourBlock}>
      <Text
        style={{
          color: isToday ? '#1F84DD' : isSameMonth ? '#000000' : '#939393'
        }}
      >
        {day.format('ddd')}
      </Text>
      <Text style={[styles.date, isToday && { color: '#1F84DD' }]}>
        {day.date()}
      </Text>
    </View>
  );
};

const WeeklyCalendar = props => {
  const { headerCell, bodyCell, currentDate, bodyStyle, headerStyle } = props;
  const currentWeek = generateWeekArray(currentDate);
  return (
    <View style={styles.container}>
      <View style={[headerStyle, styles.header]}>
        <View style={styles.blankCell} />
        {currentWeek.map(day => headerCell(day, currentDate))}
      </View>
      <ScrollView style={{ flex: 1 }}>
        {generateDayArray(currentDate).map((hours, idx) => (
          <View key={hours.format()} style={styles.row}>
            <View style={styles.hours}>
              <Text>{hours.format('h A')}</Text>
            </View>
            <View style={styles.events}>
              {currentWeek.map(day => bodyCell(day, hours))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default WeeklyCalendar;

WeeklyCalendar.propTypes = {
  headerCell: PropTypes.func,
  title: PropTypes.func,
  bodyCell: PropTypes.func,
  currentDate: PropTypes.object,
  bodyStyle: PropTypes.object,
  headerStyle: PropTypes.object
};

WeeklyCalendar.defaultProps = {
  headerCell: defaultHeaderCell,
  title: null,
  bodyCell: defaultBodyCell,
  bodyStyle: {},
  headerStyle: {}
};
