import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import styles from './assets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Calendar from 'src/Calendar/Body';

export const viewList = [
  { id: 'schedule', icon: 'view-stream', label: 'Schedule' },
  { id: 'day', icon: 'view-day', label: 'Day' },
  { id: 'week', icon: 'view-week', label: 'Week' },
  { id: 'month', icon: 'view-module', label: 'Month' }
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationCalendar: new Animated.Value(0),
      animationView    : new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.state.animationCalendar.addListener(({ value }) => (this._value = value));
    this.state.animationView.addListener(({ value }) => (this._value = value));
  }

  toggleDropdownCalendar = () => {
    Animated.timing(this.state.animationView, {
      toValue : 0,
      duration: 300
    }).start();
    Animated.timing(this.state.animationCalendar, {
      toValue : this.state.animationCalendar._value ? 0 : 1,
      duration: 300
    }).start();
  };

  toggleDropdownView = () => {
    Animated.timing(this.state.animationCalendar, {
      toValue : 0,
      duration: 300
    }).start();
    Animated.timing(this.state.animationView, {
      toValue : this.state.animationView._value ? 0 : 1,
      duration: 300
    }).start();
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.view !== this.props.view ||
      !nextProps.date.isSame(this.props.date, 'month')
    );
  }

  render() {
    const { animationCalendar, animationView } = this.state;
    const { date, view, onDateChange, onViewChange } = this.props;
    const selectedView = _.find(viewList, { id: view });
    const displayDate = date.isSame(moment(), 'year') ? date.format('MMMM') : date.format('MMMM YYYY');
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    const spin = animationCalendar.interpolate({
      inputRange : [0, 1],
      outputRange: ['0 deg', '180 deg']
    });
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            style={styles.panel}
            onPress={() => this.toggleDropdownCalendar()}
            disabled={selectedView.id === 'month'}
          >
            <Text style={{ fontSize: 20 }}>{displayDate}</Text>
            {selectedView.id !== 'month' && (
              <AnimatedIcon
                name={'menu-down'}
                style={{
                  transform: [
                    {
                      rotate: spin
                    }
                  ]
                }}
                size={21}
                color="#939393"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.panel} onPress={() => this.toggleDropdownView()}>
            <Icon name={selectedView.icon} size={21} color="#939393" />
            <Text style={styles.rightPanelText}>{selectedView.label}</Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            overflow: 'hidden',
            height  : animationCalendar.interpolate({
              inputRange : [0, 1],
              outputRange: [0, 250]
            })
          }}
        >
          <Calendar
            date={date}
            view="month"
            onDateChange={onDateChange}
            bodyStyle={{}}
            headerCell={day => (
              <View style={styles.dayBlock}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            )}
            bodyCell={(day, currentDate) => {
              if(day.isSame(currentDate, 'month'))
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onDateChange(day);
                      this.toggleDropdownCalendar();
                    }}
                    style={styles.dayBlock}
                  >
                    <Text>{day.date()}</Text>
                  </TouchableOpacity>
                );

              return <View style={styles.dayBlock} />;
            }}
          />
        </Animated.View>
        <Animated.View
          style={{
            overflow: 'hidden',
            height  : animationView.interpolate({
              inputRange : [0, 1],
              outputRange: [0, 250]
            })
          }}
        >
          {viewList.map(viewObj => {
            const color = viewObj.id === selectedView.id ? '#1F84DD' : '#939393';
            return (
              <TouchableOpacity
                key={viewObj.id}
                style={styles.list}
                onPress={() => {
                  onViewChange(viewObj.id);
                  this.toggleDropdownView();
                }}
              >
                <Icon name={viewObj.icon} size={21} color={color} />
                <Text style={[styles.text, { color }]}>{viewObj.label}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}

export default Header;

Header.propTypes = {
  date        : PropTypes.object,
  onDateChange: PropTypes.func,
  onViewChange: PropTypes.func,
  view        : PropTypes.string,
};
