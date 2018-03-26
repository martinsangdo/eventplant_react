import React, {Component} from "react";
import {Image, View, Platform, Alert, NetInfo, TextInput, TouchableOpacity} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right} from "native-base";
import BaseScreen from "../../base/BaseScreen.js";
import {API_URI} from '../../utils/api_uri';

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';
import Toast from 'react-native-root-toast';

const launchscreenLogo = require("../../../img/ep_logo.png");

class Login extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: ''
    };
  }
    //like onload event
    componentDidMount() {

    }
    //
  focusTextInput(ref) {
		if (this.refs[ref] != null){
			this.refs[ref].focus();
		}
  }
  //
  _begin_login = () => {
    if (Utils.isEmpty(this.state.id) && Utils.isEmpty(this.state.password)){
      Toast.show('로그인 실패! 확인 후 다시 로그인해주세요');
    } else {
      link = 'http://eventplant.cafe24.com/app/insert.php?b_id='+this.state.id+'&b_pw='+this.state.password;
      this.props.navigation.navigate('Home', {link: link});
    }
  }
   //==========
    render() {
        return (
            <Container>
              <Content>
                <View style={[styles.container]}>
                  <View style={styles.content_wrapper}>
                    <View style={{marginTop:100}} />
                    <View style={common_styles.view_align_center}>
                      <Image source={launchscreenLogo} style={styles.logo}/>
                    </View>
                    <View style={[common_styles.view_align_center, {marginTop:40}]}>
                      <Text>전시부스 전용 어플</Text>
                    </View>
                    <View style={[common_styles.view_align_center, {marginTop:10}]}>
                      <Text>ver. 1.4</Text>
                    </View>
                    <View style={[common_styles.view_align_center, {marginTop:10}]}>
                      <TextInput returnKeyType = {"next"} style={styles.text_input}
                      onSubmitEditing={() => this.focusTextInput('password')}
                       placeholder={'ID'} autoCapitalize="none" onChange={(event) => this.setState({id: event.nativeEvent.text})}/>
                    </View>
                    <View style={[common_styles.view_align_center, {marginTop:10}]}>
                      <TextInput ref='password' returnKeyType = {"done"} style={styles.text_input}
                       placeholder={'PW'} autoCapitalize="none" secureTextEntry={true} onChange={(event) => this.setState({password: event.nativeEvent.text})}/>
                    </View>
                    <View style={[common_styles.view_align_center, {marginTop:30}]}>
                      <TouchableOpacity onPress={()=>this._begin_login()}
                        style={[styles.btn_login]}>
                        <Text style={styles.label_login}>LOGIN</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[common_styles.view_align_center, {marginTop:30}]}>
                      <Text style={{width:300}}>* 이메일로 받으신 ID와 PW를 입력해주 세요.</Text>
                    </View>
                    <View style={[common_styles.view_align_center]}>
                      <Text style={{width:300}}>* Premium 버전에 관심이 있으신 분이나, ID와 PW를 분실하신 경우 관리자 (event@eventplant.co.kr)에게 연락해주세요.</Text>
                    </View>
                  </View>
                </View>
              </Content>
            </Container>
        );
    }
}

export default Login;
