/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
  header: {padding: 20},
  webview: {
    flex:1, width:'100%', minWidth:deviceWidth,
    minHeight:deviceHeight-80, //why 80???
    height:'100%'
  },
  header_table: {backgroundColor: '#ccc', flexDirection: 'row'},
  list_item: {flexDirection: 'row'},
  data_table: {flexDirection: 'row'}
};
