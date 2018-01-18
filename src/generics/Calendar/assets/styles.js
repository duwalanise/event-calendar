import { StyleSheet, Dimensions } from 'react-native';

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex         : 1,
    width,
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row'
  },
  body: {
    flex      : 1,
    alignItems: 'stretch'
  },
  weekBlock: {
    flex         : 1,
    flexDirection: 'row'
  }
});

export default styles;
