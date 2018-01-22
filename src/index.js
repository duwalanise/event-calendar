import React, { Component } from 'react';
import moment from 'moment';
import { View } from 'react-native';
import styles from './assets/styles';
import Calendar from './Calendar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      view: 'week'
    };
  }
  onDateChange = date => {
    this.setState(() => ({
      date
    }));
  };

  onViewChange = view => {
    this.setState(() => ({
      view
    }));
  };
  render() {
    return (
      <View style={styles.container}>
        <Calendar
          view={this.state.view}
          date={this.state.date}
          onDateChange={this.onDateChange}
        >
          <Calendar.Header onViewChange={this.onViewChange} />
          <Calendar.Body />
        </Calendar>
      </View>
    );
  }
}
