import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './assets/styles';

export const viewList = [
  { id: 1, icon: 'view-stream', label: 'Schedule' },
  { id: 2, icon: 'view-day', label: 'Day' },
  { id: 3, icon: 'view-week', label: 'Week' },
  { id: 4, icon: 'view-module', label: 'Month' }
];

const DropdownView = ({ selectedView, changeView }) => (
    <View style={styles.container}>
      {
        viewList.map(view => {
          const color = view.id === selectedView.id ? '#1F84DD' : '#939393';
          return (<TouchableOpacity
            key={view.id}
            style={styles.list}
            onPress={() => changeView(view)}
          >
            <Icon
              name={view.icon}
              size={21}
              color={color}
            />
            <Text
              style={[styles.text,{ color }]}
            >
              {view.label}
            </Text>
          </TouchableOpacity>);
        })
      }
    </View>
);

export default DropdownView;

DropdownView.propTypes = {
  changeView  : PropTypes.func,
  selectedView: PropTypes.object,
};
