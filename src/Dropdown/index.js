import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './assets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      isDropdownCalendar: false,
    }
  }

  toggleDropdown = isDropdownCalendar => {
    this.setState(state =>
      ({
        showDropdown: !state.showDropdown,
        isDropdownCalendar,
      })
    );
  }

  render() {
    const {isDropdownCalendar, showDropdown} = this.state;
    const {selectedDate, selectedView} = this.props;
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.panel}
          onPress={() => this.toggleDropdown(true)}
        >
          <Text style={{ fontSize: 20 }}>
            {selectedDate.format('MMMM')}
          </Text>
          <Icon name={isDropdownCalendar && showDropdown? 'menu-up' : 'menu-down'} size={21} color="#939393" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panel}
          onPress={() => this.toggleDropdown(false)}
        >
          <Icon name={selectedView.icon} size={21} color="#939393" />
          <Text style={styles.rightPanelText}>{selectedView.label}</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default Dropdown;

Dropdown.propTypes = {
  isDropdownCalendar: PropTypes.bool,
  selectedDate      : PropTypes.object,
  selectedView      : PropTypes.object,
  toggleDropdown    : PropTypes.func
};
