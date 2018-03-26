import React, {Component} from "react";
import {Image, View, Platform, Alert, NetInfo} from "react-native";

import {Container, Button, Text, Header, Title, Body, Left, Right} from "native-base";
import BaseScreen from "../../base/BaseScreen.js";
import {API_URI} from '../../utils/api_uri';

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';

class Login extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      chosen_language: '',    //indicate user chose language in second screen
      current_language: C_Const.EN_LANG_KEY,
      user_info: {},
      is_got_firebase_token: false,   //firebase token
      is_got_translate_keys: false    //translation key/data
    };
  }
    //like onload event
    componentDidMount() {
    }
   //==========
    render() {
        return (
            <Container>
                <View style={[common_styles.mainGreenBg, styles.container]}>
                    <Text>hello</Text>
                </View>
            </Container>
        );
    }
}

export default Login;
