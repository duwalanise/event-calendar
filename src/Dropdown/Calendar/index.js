import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import { View, TouchableOpacity, Text } from 'react-native';
import Calendar from 'src/Calendar';
import styles from './assets/styles';

const DropdownCalendar = ({ selectedDate, changeDate }) => (
    <View style={styles.container}>
      <Calendar
        date={selectedDate}
      />
    </View>
);

export default lifecycle({
  shouldComponentUpdate(nextProps) {
    return !nextProps.selectedDate.isSame(this.props.selectedDate);
  }
})(DropdownCalendar);

DropdownCalendar.propTypes = {
  changeDate  : PropTypes.func,
  selectedDate: PropTypes.object,
};
