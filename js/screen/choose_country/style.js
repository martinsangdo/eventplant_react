/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  content_wrapper: {marginTop: 100},
  picker_parent: {minWidth:200, backgroundColor: '#fff'},
  picker_country: {
    width: 170, alignSelf: 'center',
    borderColor: '#fff', padding: 10,
    borderWidth: 1, alignItems: 'center',
    backgroundColor: '#fff'
  },
  picker_arrow: {position: 'absolute', right:5, top: 12}
};
