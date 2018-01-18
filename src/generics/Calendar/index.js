import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { weekShort, generateMonthArray } from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const Calendar = ({ renderHeader, renderDay, date, rowStyle = {}, headerStyle={} }) => (
  <View style={styles.container}>
    <View style={[headerStyle, styles.header]}>
      {weekShort.map(day => renderHeader(day))}
    </View>
    <View style={styles.body}>
      {generateMonthArray(date).map(week =>
        <View style={[rowStyle, styles.weekBlock]}>
          {week.map(day => renderDay(day))}
        </View>
      )}
    </View>
  </View>
);

export default Calendar;

Calendar.propTypes = {
  date        : PropTypes.object,
  headerStyle : PropTypes.object,
  renderDay   : PropTypes.func,
  renderHeader: PropTypes.func,
  rowStyle    : PropTypes.object
};
