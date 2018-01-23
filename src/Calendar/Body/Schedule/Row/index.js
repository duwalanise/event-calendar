import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import routeConstants from 'app/constants/routeConstants';
import styles from './assets/styles';

// item = {
//   date: moment(),
//   events: [
//     {
//       date: moment(),
//       events: [
//         { startDate: moment(), endDate: moment(), _id: 'dfjd', name: '' }
//       ]
//     },
//     {
//       date: moment(),
//       events: [
//         { startDate: moment(), endDate: moment(), _id: 'dfjd', name: '' }
//       ]
//     },
//     {
//       date: moment(),
//       events: [
//         { startDate: moment(), endDate: moment(), _id: 'dfjd', name: '' }
//       ]
//     }
//   ]
// };

const ScheduleRow = ({ item }) => {
  if (!item.events)
    return (
      <View style={styles.noEventMonth}>
        <View style={styles.noEventMonthHeader}>
          <Text style={styles.noEventMonthText}>
            {item.date.format('MMMM YYYY')}
          </Text>
        </View>
        <View style={styles.noEventMonthBody}>
          <Text style={styles.noEventText}>No Events</Text>
        </View>
      </View>
    );

  return item.events.map(event => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateColumn}
        onPress={() =>
          Actions[routeConstants.EVENT]({
            entity: 'event',
            readonly: false
          })
        }
      >
        <Text style={styles.day}>{event.date.format('ddd')}</Text>
        <Text style={styles.date}>{event.date.date()}</Text>
      </TouchableOpacity>
      <View style={styles.eventColumn}>
        {(event.events || []).map((dayEvent, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.eventBlock}
            onPress={() =>
              Actions[routeConstants.EVENT]({
                entity: 'event',
                item: dayEvent,
                itemId: dayEvent._id,
                readonly: true
              })
            }
          >
            <Text style={styles.eventTitle}>{dayEvent.name}</Text>
            <Text style={styles.eventTime}>
              {moment(dayEvent.startDate).format('h:mma')} -
              {moment(dayEvent.endDate).format('h:mma')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ));
};

export default ScheduleRow;

ScheduleRow.propTypes = {
  item: PropTypes.object
};
