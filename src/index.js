import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import moment from 'moment';
import styles from './assets/styles';
import Dropdown from './Dropdown';
import Calendar from './Calendar';

export const viewList = [
  { id: 1, icon: 'view-stream', label: 'Schedule' },
  { id: 2, icon: 'view-day', label: 'Day' },
  { id: 3, icon: 'view-week', label: 'Week' },
  { id: 4, icon: 'view-module', label: 'Month' }
];

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Calendar view="day" />
      </View>
    );
  }
}

