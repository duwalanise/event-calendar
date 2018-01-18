import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ScrollView, Dimensions } from 'react-native';

//import DailyCalendar from './Day';
//import WeeklyCalendar from './Week';
import MonthlyCalendar from './Month';

const {width} = Dimensions.get("window");

class Calendar extends Component {
  static propTypes = {
    view: PropTypes.string,
    date: PropTypes.instanceOf(moment),
  };

  static defaultProps = {
    date: moment(),
  }

  constructor(props) {
    super(props);
    this.state = {
      RNCurrentDate: this.props.date
    };
  }

  scrollToCenter = () => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: 0, x: width, animated: false });
    }
  };

  onSwipe = ({nativeEvent}) => {
    const offsetX = nativeEvent.contentOffset.x;
    switch(offsetX/width) {
      case 0:
        this.setState((state) => ({
          RNCurrentDate: state.RNCurrentDate.clone().subtract(1, 'months')
        }), this.scrollToCenter());
        return;
      case 2:
        this.setState((state) => ({
          RNCurrentDate: state.RNCurrentDate.clone().add(1, 'months')
        }), this.scrollToCenter());
        return;
      default: 
        return;
    }
  }

  generateCalendar() {
    const {view} = this.props;
    const {RNCurrentDate} = this.state;
    switch(view) {
      case 'daily':
      case 'day':
        return <DailyCalendar {...this.props} RNCurrentDate={RNCurrentDate} />;
      case 'weekly':
      case 'week':
          return <WeeklyCalendar {...this.props} RNCurrentDate={RNCurrentDate} />;
      default: 
        return <MonthlyCalendar {...this.props} RNCurrentDate={RNCurrentDate} />;
    }
  }

  render() {
    return (
      <ScrollView
        ref={(c) => { this.scrollView = c; }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentOffset={{ x: width}}
        onMomentumScrollEnd={this.onSwipe}
      >
        {this.generateCalendar()}
      </ScrollView>
    );
  }
}

export default Calendar;
