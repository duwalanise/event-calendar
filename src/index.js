import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './assets/styles';
import Calendar from './Calendar';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Calendar view="week" />
      </View>
    );
  }
}
