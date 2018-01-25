import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { lifecycle, compose, defaultProps } from 'recompose';

import { generateWeekArray, generateDayArray, findEventsInADay, getEventPosition } from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const defaultBodyCell = day => {
  return <View key={day.format()} style={[styles.hourBlock, styles.hourCell]} />;
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
      <Text style={[styles.date, isToday && { color: '#1F84DD' }]}>{day.date()}</Text>
    </View>
  );
};

const WeeklyCalendar = props => {
  const { headerCell, bodyCell, currentDate, bodyStyle, headerStyle, events } = props;
  const currentWeek = generateWeekArray(currentDate);
  return (
    <View style={styles.container}>
      <View style={[headerStyle, styles.header]}>
        <View style={styles.blankCell} />
        {currentWeek.map(day => headerCell(day, currentDate))}
      </View>
      <ScrollView style={{ flex: 1 }}>
        {generateDayArray(currentDate).map(hours => (
          <View key={hours.format()} style={styles.row}>
            <View style={styles.hours}>
              <Text>{hours.format('h A')}</Text>
            </View>
            <View style={[styles.events, bodyStyle]}>{currentWeek.map(day => bodyCell(day, hours))}</View>
          </View>
        ))}
        <View style={styles.eventsContainer}>
          {
            currentWeek.map(day =>
              <View style={{ flex: 1 }}>
                {
                  findEventsInADay(events, day).map(event =>
                    <View
                      style={[
                        styles.eventBlock,
                        getEventPosition(moment(event.startDate), moment(event.endDate))
                      ]}>
                      <Text style={styles.eventText}>{event.name}</Text>
                    </View>
                  )
                }
              </View>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default compose(
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return (!nextProps.currentDate.isSame(this.props.currentDate, 'week'));
    }
  }),
  defaultProps({
    headerCell : defaultHeaderCell,
    title      : null,
    bodyCell   : defaultBodyCell,
    bodyStyle  : {},
    headerStyle: {}
  })
)(WeeklyCalendar);

WeeklyCalendar.propTypes = {
  bodyCell   : PropTypes.func,
  bodyStyle  : PropTypes.object,
  currentDate: PropTypes.object,
  events     : PropTypes.object,
  headerCell : PropTypes.func,
  headerStyle: PropTypes.object,
  title      : PropTypes.func
};

