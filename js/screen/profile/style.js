/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;

export default {
  left: {flex:0.3, flexDirection: 'row'},
  right: {flex:0.3},
  headerBody: {
    flex: 1, justifyContent: "center", flexDirection: "row", alignItems: 'center'
  },
  left_row: {flex:1, flexDirection: 'row'},
  item_row: {flex:1, flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'space-between', backgroundColor: '#fff'},
  text_label: {marginLeft: 10, width: deviceWidth - 140, marginRight:10},
  thumb: {width: 80, height: 80},
  forward_ico: {width: 20, justifyContent: 'center'},
  time_label: {fontSize:12, color: '#777'}
};
