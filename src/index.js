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
      view: 'schedule',
      eventDate: moment()
    };
  }
  onDateChange = date => {
    this.setState(() => ({
      date
    }));
  };

  nextPage = () => {
    this.setState(state => ({
      eventDate: state.eventDate.clone().add(1, 'months')
    }));
  };

  onViewChange = view => {
    this.setState(() => ({
      view
    }));
  };
  render() {
    const events = [
      {
        startDate: moment().set('hour', 4),
        endDate: moment().set('hour', 6),
        name: 'Test Event'
      }
    ];
    return (
      <View style={styles.container}>
        <Calendar
          view={this.state.view}
          date={this.state.date}
          events={events}
          onDateChange={this.onDateChange}
        >
          <Calendar.Header onViewChange={this.onViewChange} />
          <Calendar.Body
            nextPage={this.nextPage}
            eventDate={this.state.eventDate}
          />
        </Calendar>
      </View>
    );
  }
}
