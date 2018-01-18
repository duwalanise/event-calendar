import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import { weekShort, generateMonthArray } from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const defaultBodyCell = (day, currentDate) => {
  if(day.isSame(currentDate, 'month'))
    return (
      <View style={styles.dayBlock}>
        <Text>{day.date()}</Text>
      </View>
    );
  return <View style={styles.dayBlock} />;
}

const defaultHeaderCell = day =>
  <View style={styles.dayBlock}>
    <Text style={styles.dayText}>{day}</Text>
  </View>;

const MonthlyCalendar = props => {
    const { headerCell, bodyCell, RNCurrentDate, title, bodyStyle, headerStyle } = props;
    const previousMonth = RNCurrentDate.clone().subtract(1, 'months');
    return [0,1,2].map(count => {
      const currentDate = previousMonth.clone().add(count,'months');
      return (
        <View key={currentDate} style={styles.container}>
          <View>{title && title(currentDate)}</View>
          <View style={[headerStyle, styles.header]}>
            {weekShort.map(day => headerCell(day))}
          </View>
          <View style={styles.body}>
            {generateMonthArray(currentDate).map(week =>
              <View style={[bodyStyle, styles.weekBlock]}>
                {week.map(day => bodyCell(day, currentDate))}
              </View>
            )}
          </View>
        </View>
      );
    }
    );
  };

export default MonthlyCalendar;

MonthlyCalendar.propTypes = {
  headerCell: PropTypes.element,
  title: PropTypes.element,
  bodyCell: PropTypes.element,
  RNCurrentDate: PropTypes.object,
  bodyStyle: PropTypes.object,
  headerStyle: PropTypes.object
};

MonthlyCalendar.defaultProps = {
  headerCell: defaultHeaderCell,
  title: null,
  bodyCell: defaultBodyCell,
  bodyStyle: {},
  headerStyle: {}
}