import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './Header';
import Body from './Body';

class Calendar extends Component {
  static Header = Header;
  static Body = Body;

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        date: this.props.date,
        view: this.props.view,
        onDateChange: this.props.onDateChange
      })
    );
    return <View style={{ flex: 1 }}>{children}</View>;
  }
}

export default Calendar;
