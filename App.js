/**
 * Event Plant
 * author: Martin SangDo
 */
import React, {Component} from 'react';
import {Root, Icon, Badge} from "native-base";
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';
import common_styles from "./css/common";
import {C_Const, C_MULTI_LANG} from './js/utils/constant';
import Utils from "./js/utils/functions";

import store from 'react-native-simple-store';
//define screens
import BaseScreen from "./js/base/BaseScreen";
import Login from "./js/screen/login";
import Home from "./js/screen/home";
import Statistic from "./js/screen/home/statistic";
import Camera from "./js/screen/home/camera";
import History from "./js/screen/home/history";

const AppNavigator = StackNavigator({
        BaseScreen: {screen: BaseScreen},
        Login: {screen: Login},
        Home: {screen: Home},
        Statistic: {screen: Statistic},
        Camera: {screen: Camera},
        History: {screen: History}
    },
    {
        initialRouteName: "Login",   //open this page first time
        headerMode: "none",
        cardStyle: {
          paddingTop: 20, //iOS
          backgroundColor: '#fff'
        }
    });

export default class App extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.ignoredYellowBox = ['Remote debugger'];   //don't show warning in app when debugging
  }
  //
  render() {
    return (
      <Root>
          <AppNavigator/>
      </Root>
    )
  }
}
