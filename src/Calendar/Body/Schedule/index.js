import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FlatList } from 'react-native';
import _ from 'lodash';
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
    const { eventDate, events } = this.props;
    this.state = {
      cachedEvents: [{ date: eventDate, events: generateEvents(events) }]
    };
  }

  viewableItemsChanged = evt => {};

  viewabilityConfig = { itemVisiblePercentThreshold: 20 };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.eventDate.isSame(this.props.eventDate)) {
      this.setState(state => ({
        cachedEvents: state.cachedEvents.concat({
          date: nextProps.eventDate,
          events: generateEvents(nextProps.events)
        })
      }));
    }
  }

  render() {
    const {
      events,
      onDateChange,
      nextPage,
      eventDate,
      headerCell,
      bodyCell,
      date,
      bodyStyle,
      headerStyle
    } = this.props;
    return (
      <FlatList
        style={styles.container}
        renderItem={Row}
        data={this.state.cachedEvents}
        keyExtractor={item => item._id}
        onEndReached={() => _.throttle(() => nextPage(), 100)()}
        onEndReachedThreshold={10}
        onViewableItemsChanged={this.viewableItemsChanged}
        viewabilityConfig={this.viewabilityConfig}
      />
    );
  }
}

export default ScheduleCalendar;

ScheduleCalendar.defaultProps = {
  nextPage: () => null
};
