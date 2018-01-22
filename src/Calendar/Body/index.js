import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ScrollView, Dimensions } from 'react-native';

import DailyCalendar from './Day';
import WeeklyCalendar from './Week';
import MonthlyCalendar from './Month';

const { width } = Dimensions.get('window');

class Calendar extends Component {
  static propTypes = {
    view: PropTypes.string,
    date: PropTypes.instanceOf(moment)
  };

  static defaultProps = {
    date: moment()
  };

  scrollToCenter = () => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: 0, x: width, animated: false });
    }
  };

  onSwipe = (nativeEvent, unit) => {
    const offsetX = nativeEvent.contentOffset.x;
    const { view, date, onDateChange } = this.props;
    switch (offsetX / width) {
      case 0:
        onDateChange(date.clone().subtract(1, unit));
        this.scrollToCenter();
        return;
      case 2:
        onDateChange(date.clone().add(1, unit));
        this.scrollToCenter();
        return;
      default:
        return;
    }
  };

  generateCalendar(view) {
    switch (view) {
      case 'daily':
      case 'day':
        return {
          unit: 'days',
          Calendar: DailyCalendar
        };
      case 'weekly':
      case 'week':
        return {
          unit: 'weeks',
          Calendar: WeeklyCalendar
        };
      default:
        return {
          unit: 'months',
          Calendar: MonthlyCalendar
        };
    }
  }

  render() {
    const { view, date } = this.props;
    const currentView = this.generateCalendar(view);
    const previous = date.clone().subtract(1, currentView.unit);
    return (
      <ScrollView
        ref={c => {
          this.scrollView = c;
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentOffset={{ x: width }}
        onMomentumScrollEnd={({ nativeEvent }) =>
          this.onSwipe(nativeEvent, currentView.unit)
        }
      >
        {[0, 1, 2].map(swipeIndex => {
          const currentDate = previous
            .clone()
            .add(swipeIndex, currentView.unit);
          return (
            <currentView.Calendar {...this.props} currentDate={currentDate} />
          );
        })}
      </ScrollView>
    );
  }
}

export default Calendar;
