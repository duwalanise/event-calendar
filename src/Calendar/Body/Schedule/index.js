import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FlatList } from 'react-native';
import _ from 'lodash';
import Row from './Row';
import styles from './assets/styles';
import { groupEvents } from 'src/generics/helpers/calendar';

const generateEvents = events => {
  if(!events)return [];
  const dayGroup = groupEvents(events);
  return Object.keys(dayGroup).map(value => ({
    date  : moment(value),
    events: dayGroup[value]
  }));
};

class ScheduleCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cachedEvents: []
    };
  }

  // viewableItemsChanged = evt => {};

  viewabilityConfig = { itemVisiblePercentThreshold: 20 };

  componentWillReceiveProps(nextProps) {
    if(nextProps.events && nextProps.events !== this.props.events) 
      this.setState(state => ({
        cachedEvents: state.cachedEvents.concat({
          date  : nextProps.eventDate.clone(),
          events: generateEvents(nextProps.events)
        })
      }));
  }

  shouldComponentUpdate(nextProps) {
    return (
      !nextProps.eventDate.isSame(this.props.eventDate) ||
      (nextProps.events && nextProps.events !== this.props.events)
    );
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        renderItem={Row}
        data={this.state.cachedEvents}
        keyExtractor={item => item._id}
        scrollEventThrottle={16}
        onEndReached={() => _.throttle(() => this.props.nextPage(), 100)()}
        onEndReachedThreshold={0}
        onViewableItemsChanged={this.viewableItemsChanged}
        
        // viewabilityConfig={this.viewabilityConfig}
      />
    );
  }
}

export default ScheduleCalendar;

ScheduleCalendar.defaultProps = {
  nextPage: () => null
};

ScheduleCalendar.propTypes = {
  eventDate: PropTypes.object,
  events   : PropTypes.object,
  nextPage : PropTypes.func
};
