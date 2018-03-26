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
  thumb: {width: deviceWidth, height: 185},
  btn_row: {flex:1, flexDirection: 'row'},
  tab_label_container: {height: 45},
  btn_tab_header: {
    justifyContent: 'center', backgroundColor: '#fff', width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc'
  },
  btn_tab_active: {borderBottomWidth: 3, borderBottomColor: '#008da9'},
  tab_label: {color: '#ccc'},
  tab_label_active: {color: '#000'},
  //contact Style
  contact_item_container: {padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'},
  contact_item_container_last: {borderBottomWidth: 0},
  btn_row_container: {flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10},
  btn_container: {width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center', marginRight: 20},
  webview: {
    width:'100%', minWidth:deviceWidth,
    minHeight: deviceHeight-160, //why 80???
    height:'80%'
  },
  bottom_container: {
    position:'absolute', backgroundColor: '#ff0',
    height: 50, bottom: 0, left: 0, right: 0
  }
};
