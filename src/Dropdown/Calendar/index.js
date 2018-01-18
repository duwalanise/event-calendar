import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle } from 'recompose';
import { View, TouchableOpacity, Text } from 'react-native';
import Calendar from 'src/generics/Calendar';
import styles from './assets/styles';

const DropdownCalendar = ({ selectedDate, changeDate }) => (
    <View style={styles.container}>
      <Calendar
        date={selectedDate}
        renderHeader={day =>
          <View style={styles.dayBlock}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        }
        renderDay={(day, currentDate) => {
          if(day.isSame(currentDate, 'month'))
            return (
              <TouchableOpacity onPress={() => changeDate(day)} style={styles.dayBlock}>
                <Text>{day.date()}</Text>
              </TouchableOpacity>
            );
          
          return <View style={styles.dayBlock} />;
        }
        }
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
