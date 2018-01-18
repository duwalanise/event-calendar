import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Dimensions } from 'react-native';
import { weekShort, generateMonthArray } from 'src/generics/helpers/calendar';
import styles from './assets/styles';

const {width} = Dimensions.get("window");

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.props.date
    };
  }

  getCalendarArray = date => {
    const { renderHeader, renderDay, rowStyle = {}, headerStyle={} } = this.props;
    const start = date.clone().subtract(1, 'months');
    return [0,1,2].map(count => {
      const currentDate = start.clone().add(count,'months');
      return (<View style={styles.container}>
        <View style={[headerStyle, styles.header]}>
          {weekShort.map(day => renderHeader(day))}
        </View>
        <View style={styles.body}>
          {generateMonthArray(currentDate).map(week =>
            <View style={[rowStyle, styles.weekBlock]}>
              {week.map(day => renderDay(day, currentDate))}
            </View>
          )}
        </View>
      </View>);
    }
    );
  };

  scrollToMiddle = () => {
    if (this.scrollView) {
      this.scrollView.scrollTo({ y: 0, x: width, animated: false });
    }
  };

  onPageChange = ({nativeEvent}) => {
    const offsetX = nativeEvent.contentOffset.x;
    switch(offsetX/width) {
      case 0:
        this.setState((state) => ({
          selectedDate: state.selectedDate.clone().subtract(1, 'months')
        }), this.scrollToMiddle());
        return;
      case 2:
        this.setState((state) => ({
          selectedDate: state.selectedDate.clone().add(1, 'months')
        }), this.scrollToMiddle());
        return;
      default: 
        return;
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
        onMomentumScrollEnd={this.onPageChange}
      >
        {this.getCalendarArray(this.state.selectedDate)}
      </ScrollView>
    );
  }
}

export default Calendar;

Calendar.propTypes = {
  date        : PropTypes.object,
  headerStyle : PropTypes.object,
  renderDay   : PropTypes.func,
  renderHeader: PropTypes.func,
  rowStyle    : PropTypes.object
};
