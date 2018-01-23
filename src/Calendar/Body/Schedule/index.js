import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FlatList } from 'react-native';
import Row from './Row';
import styles from './assets/styles';
import { groupEvents } from 'src/generics/helpers/calendar';

const generateEvents = events => {
  if (!events) return [];
  const dayGroup = groupEvents(events);
  return Object.Keys(dayGroup).map(value => ({
    date: moment(value),
    events: dayGroup[value]
  }));
};

class ScheduleCalendar extends Component {
  constructor(props) {
    super(props);
    const { date, events } = this.props;
    this.state = {
      cachedEvents: [{ date, events: generateEvents(events) }]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.date.isSame(this.props.date)) {
      this.setState(state => ({
        cachedEvents: state.cachedEvents.concat({
          date: nextProps.date,
          events: generateEvents(nextProps.events)
        })
      }));
    }
  }

  render() {
    const {
      events,
      onDateChange,
      headerCell,
      bodyCell,
      date,
      bodyStyle,
      headerStyle
    } = props;
    return (
      <FlatList
        style={styles.container}
        renderItem={Row}
        data={cachedEvents}
        keyExtractor={item => item._id}
        scrollEventThrottle={16}
        onEndReached={() =>
          _.throttle(onDateChange(date.clone().add(1, 'months')), 100)()
        }
        onEndReachedThreshold={200}
      />
    );
  }
}

export default ScheduleCalendar;
