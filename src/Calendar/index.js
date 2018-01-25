import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Header from './Header';
import Body from './Body';

class Calendar extends Component {
  static Header = Header;
  static Body = Body;

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        date        : this.props.date,
        view        : this.props.view,
        onDateChange: this.props.onDateChange,
        events      : this.props.events
      })
    );
    return <View style={{ flex: 1, backgroundColor: '#fff' }}>{children}</View>;
  }
}

export default Calendar;

Calendar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  
  date        : PropTypes.object,
  events      : PropTypes.object,
  onDateChange: PropTypes.func,
  view        : PropTypes.string,
};
