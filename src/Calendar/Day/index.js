import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text } from 'react-native';
import styles from './assets/styles';
import { generateDayArray, groupEvents } from 'src/generics/helpers/calendar';

const defaultHeader = currentDate =>
  <View style={styles.fixedHeader}>
    <Text style={styles.day}>{currentDate.format('ddd')}</Text>
    <Text style={styles.date}>{currentDate.date()}</Text>
  </View>;

const defaultBody = currentDate => <View style={styles.line} />

const DailyCalendar = props => {
  const { headerCell, bodyCell, currentDate, title, bodyStyle, headerStyle } = props;
  return (
    <View style={styles.container}>
      {headerCell(currentDate)}
      <ScrollView style={{flex: 1}}>
        {
          generateDayArray(currentDate).map((hours, idx) => {
            return (
              <View style={styles.row}>
                <View style={styles.hours}><Text>{hours.format('h A')}</Text></View>
                <View style={styles.events}>
                  {bodyCell(hours)}
                </View>
              </View>
            );
          }
          )
        }
      </ScrollView>
    </View>
  );
}

export default DailyCalendar;

DailyCalendar.propTypes = {
  headerCell: PropTypes.element,
  title: PropTypes.element,
  bodyCell: PropTypes.element,
  currentDate: PropTypes.object,
  bodyStyle: PropTypes.object,
  headerStyle: PropTypes.object
};

DailyCalendar.defaultProps = {
  headerCell: defaultHeader,
  title: null,
  bodyCell: defaultBody,
  bodyStyle: {},
  headerStyle: {}
}
