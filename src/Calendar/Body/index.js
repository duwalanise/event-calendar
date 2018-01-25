import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ScrollView } from 'react-native';

import DailyCalendar from './Day';
import WeeklyCalendar from './Week';
import MonthlyCalendar from './Month';
import ScheduleCalendar from './Schedule';
import globalStyles from 'src/generics/assets/styles';

const DEVICE_WIDTH = globalStyles.DEVICE_WIDTH;

class Calendar extends Component {
  static propTypes = {
    date        : PropTypes.instanceOf(moment),
    onDateChange: PropTypes.func,
    view        : PropTypes.string,
  };

  static defaultProps = {
    date: moment()
  };

  scrollToCenter = () => {
    if(this.scrollView) 
      this.scrollView.scrollTo({ y: 0, x: DEVICE_WIDTH, animated: false });
  };

  onSwipe = (nativeEvent, unit) => {
    const offsetX = nativeEvent.contentOffset.x;
    const { date, onDateChange } = this.props;
    switch(offsetX / DEVICE_WIDTH) {
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
    switch(view) {
    case'daily':
    case'day':
      return {
        unit    : 'days',
        Calendar: DailyCalendar
      };
    case'weekly':
    case'week':
      return {
        unit    : 'weeks',
        Calendar: WeeklyCalendar
      };
    default:
      return {
        unit    : 'months',
        Calendar: MonthlyCalendar
      };
    }
  }

  render() {
    const { view, date } = this.props;
    if(view === 'schedule')return <ScheduleCalendar {...this.props} />;
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
        contentOffset={{ x: DEVICE_WIDTH }}
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
