import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';

import { weekShort, generateWeekArray, generateDayArray } from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const defaultBodyCell = (day, currentDate, events) => {
  const isSameMonth = true;
  const isToday = false;
  return (
    <View style={styles.dayBlock}>
      <View style={isToday && styles.today}>
        <Text
          style={[{ color: !isSameMonth && '#939393' }, isToday && styles.todayText]}>{day.date()}</Text>
      </View>
      {
        (events || []).map( event =>
          <View style={styles.eventBlock}><Text style={styles.eventText}>{event.name}</Text></View>
        )
      }
  </View>);
}

const defaultHeaderCell = currentDate =>
  <View style={styles.dayBlock}>
    <Text style={styles.day}>{currentDate.format('ddd')}</Text>
    <Text style={styles.date}>{currentDate.date()}</Text>
  </View>;

const WeeklyCalendar = props => {
    const { headerCell, bodyCell, currentDate, title, bodyStyle, headerStyle } = props;
    const currentWeek = generateWeekArray(currentDate);
    return (
      <View style={styles.container}>
        <View style={[headerStyle, styles.header]}>
          <View style={styles.dayBlock} />
          {currentWeek.map(day => headerCell(day))}
        </View>
        <ScrollView style={{flex: 1}}>
        {
          generateDayArray(currentDate).map((hours, idx) =>
            <View style={styles.row}>
              <View style={styles.hours}><Text>{hours.format('h A')}</Text></View>
              <View style={styles.events}>
                {
                  currentWeek.map(day => defaultBodyCell(hours))
                }
              </View>
            </View>
          )
        }
        </ScrollView>
      </View>
    );
  };

export default WeeklyCalendar;

WeeklyCalendar.propTypes = {
  headerCell: PropTypes.element,
  title: PropTypes.element,
  bodyCell: PropTypes.element,
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
}
