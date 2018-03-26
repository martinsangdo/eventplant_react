/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {

  headerBody: {
    flex: 0.6, justifyContent: "center", flexDirection: "row", alignItems: 'center'
  },
  item_row: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderColor: '#ccc', borderBottomWidth: 1},
  active_label: {fontWeight: 'bold'}
};
