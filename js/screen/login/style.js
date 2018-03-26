/**
 * author: Martin SD
 */
const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%'
  },
  // content_wrapper: {height: 500},
  logo: {
    width: 300, height: 80, resizeMode: 'contain'
  },
  margin_b_10: {marginBottom:10},
  margin_b_60: {marginBottom:60},
  margin_b_20: {marginBottom:20},
  margin_b_40: {marginBottom:40},

  text_input: {width:300, fontSize:18, borderBottomWidth:1, borderBottomColor:'#5499C7'},
  label_login: {color: '#fff', fontWeight: 'bold'},
  btn_login: {width:300, height: 50, backgroundColor: '#ccc',justifyContent: 'center',
  alignItems: 'center'}
};
