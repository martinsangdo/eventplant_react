/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;

export default {
  left: {flex:0.22, flexDirection: 'row'},
  right: {flex:0.22},
  headerBody: {
    flex: 0.56, justifyContent: "center", flexDirection: "row", alignItems: 'center'
  },
  left_row: {flex:1, flexDirection: 'row'},
  item_row: {flex:1, flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', justifyContent: 'space-between'},
  picker_parent: {minWidth:200, backgroundColor: '#fff'},
  picker_language: {
    width: deviceWidth, alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 1, alignItems: 'center',
    backgroundColor: '#fff'
  },
  picker_arrow: {position: 'absolute', right:20, top: 12}
};
