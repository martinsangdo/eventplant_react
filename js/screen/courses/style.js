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
  search_bar: {width: deviceWidth - 120, height: 40, borderRadius: 4, backgroundColor: '#eee', justifyContent: 'center', marginTop: 2},
  search_cancel: {width:100, justifyContent: 'center'},
  left_row: {flex:1, flexDirection: 'row'},
  list_item: {marginBottom:20},
  view_inside_img: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  full_overlay: {
    position: 'absolute',
    top: 0, right: 0, left: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  btn_row_container: {height: 45, borderTopWidth:1, borderTopColor: '#ccc'},
  btn_row: {flex:1, flexDirection: 'row'},
  thumb: {width: deviceWidth, height: 200},
  header_icon: {color: '#008da9'},
  country_label: {minWidth: 40, padding: 5},
  btn_share_left: {
    justifyContent: 'center', width: '100%'
  },
  btn_share_right: {
    justifyContent: 'center', width: '100%'
  },
  webview: {
    flex:1, width:'100%', minWidth:deviceWidth,
    minHeight:deviceHeight-80, //why 80???
    height:'100%'
  },
  load_more: {
    height: 80, justifyContent: 'center', alignItems: 'center', flex: 1
  }
};
