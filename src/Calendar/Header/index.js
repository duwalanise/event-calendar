import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Text, View, TouchableOpacity } from 'react-native';
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
      showDropdown: false,
      isDropdownCalendar: false
    };
  }

  toggleDropdown = isDropdownCalendar => {
    this.setState(state => ({
      showDropdown: !state.showDropdown,
      isDropdownCalendar
    }));
  };

  render() {
    const { showDropdown, isDropdownCalendar } = this.state;
    const { date, view, onDateChange, onViewChange } = this.props;
    const selectedView = _.find(viewList, { id: view });
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.panel}
            onPress={() => this.toggleDropdown(true)}
          >
            <Text style={{ fontSize: 20 }}>{date.format('MMMM')}</Text>
            <Icon
              name={
                isDropdownCalendar && showDropdown ? 'menu-up' : 'menu-down'
              }
              size={21}
              color="#939393"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panel}
            onPress={() => this.toggleDropdown(false)}
          >
            <Icon name={selectedView.icon} size={21} color="#939393" />
            <Text style={styles.rightPanelText}>{selectedView.label}</Text>
          </TouchableOpacity>
        </View>
        {showDropdown &&
          (isDropdownCalendar ? (
            <View style={{ height: 300 }}>
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
                  if (day.isSame(currentDate, 'month'))
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          onDateChange(day);
                          this.toggleDropdown();
                        }}
                        style={styles.dayBlock}
                      >
                        <Text>{day.date()}</Text>
                      </TouchableOpacity>
                    );

                  return <View style={styles.dayBlock} />;
                }}
              />
            </View>
          ) : (
            <View style={{ height: 300 }}>
              {viewList.map(view => {
                const color =
                  view.id === selectedView.id ? '#1F84DD' : '#939393';
                return (
                  <TouchableOpacity
                    key={view.id}
                    style={styles.list}
                    onPress={() => {
                      onViewChange(view.id);
                      this.toggleDropdown();
                    }}
                  >
                    <Icon name={view.icon} size={21} color={color} />
                    <Text style={[styles.text, { color }]}>{view.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
      </View>
    );
  }
}

export default Header;
