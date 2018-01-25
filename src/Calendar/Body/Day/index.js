import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import styles from './assets/styles';
import { lifecycle, compose, defaultProps } from 'recompose';
import { generateDayArray, findEventsInADay, getEventPosition } from 'src/generics/helpers/calendar';

const defaultHeader = currentDate => {
  const isToday = currentDate.isSame(moment(), 'day');
  return (
    <View style={styles.fixedHeader}>
      <Text style={isToday && { color: '#1F84DD' }}>{currentDate.format('ddd')}</Text>
      <Text style={[styles.date, isToday && { color: '#1F84DD' }]}>{currentDate.date()}</Text>
    </View>
  );
};

const defaultBody = () => <View style={styles.line} />;

const DailyCalendar = props => {
  const { headerCell, bodyCell, currentDate, bodyStyle, events } = props;
  return (
    <View style={styles.container}>
      {headerCell(currentDate)}
      <ScrollView style={{ flex: 1 }}>
        {generateDayArray(currentDate).map(hours => {
          return (
            <View style={styles.row}>
              <View style={styles.hours}>
                <Text>{hours.format('h A')}</Text>
              </View>
              <View style={[styles.events, bodyStyle]}>{bodyCell(hours)}</View>
            </View>
          );
        })}
        <View style={styles.eventsContainer}>
          {
            findEventsInADay(events, currentDate).map(event =>
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
      </ScrollView>
    </View>
  );
};

export default compose(
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return (!nextProps.currentDate.isSame(this.props.currentDate, 'day'));
    }
  }),
  defaultProps({
    headerCell : defaultHeader,
    title      : null,
    bodyCell   : defaultBody,
    bodyStyle  : {},
    headerStyle: {}
  })
)(DailyCalendar);

DailyCalendar.propTypes = {
  bodyCell   : PropTypes.func,
  bodyStyle  : PropTypes.object,
  currentDate: PropTypes.object,
  events     : PropTypes.object,
  headerCell : PropTypes.func,
  headerStyle: PropTypes.object,
  title      : PropTypes.func,
};
