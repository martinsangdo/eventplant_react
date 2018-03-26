/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;

export default {
  left: {flex:0.5, flexDirection: 'row', minWidth: 200},
  right: {flex:0.4},
  headerBody: {
    flex: 0.1, justifyContent: "center", flexDirection: "row", alignItems: 'center'
  },
  left_row: {flex:1, flexDirection: 'row'},
  thumb: {width: deviceWidth, height: 185}
};
