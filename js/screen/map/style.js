/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  left: {flex:0.3, flexDirection: 'row'},
  right: {flex:0.3},
  headerBody: {
    flex: 0.4, justifyContent: "center", flexDirection: "row", alignItems: 'center'
  },
  left_row: {flex:1, flexDirection: 'row'},
  //map
  map_container: {width: deviceWidth, height: deviceHeight - 100},
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: deviceWidth, height: 700
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
};
