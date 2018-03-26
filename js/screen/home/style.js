/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  headerBody: {
    flex: 0.7, justifyContent: "center", flexDirection: "row", alignItems: 'center'
  },
  header_icon: {color: '#008da9'},
  left_row: {flex:1, flexDirection: 'row'},
  search_bar: {width: deviceWidth - 120, height: 40, borderRadius: 4, backgroundColor: '#eee', justifyContent: 'center', marginTop: 2},
  search_cancel: {width:100, justifyContent: 'center'},
  list_item: {marginBottom:20},
  btn_row: {flex:1, flexDirection: 'row', justifyContent: 'space-between', marginLeft:20, marginRight:20},
  btn_active: {backgroundColor: '#008da9'},
  item_row: {flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'space-between'},
  text_label: {marginLeft: 10, width: deviceWidth - 140, marginRight:10},
  thumb: {width: 80, height: 80},
  forward_ico: {width: 20, justifyContent: 'center'},
  time_label: {fontSize:12, color: '#777'}
};
