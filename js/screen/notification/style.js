/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  headerBody: {
    flex: 0.6, justifyContent: "center", flexDirection: "row", alignItems: 'center'
  },
  list_item: {flex: 1, flexDirection: 'row', backgroundColor: '#008da9',borderRadius:4, margin:10, padding: 5, marginBottom:0},

};
