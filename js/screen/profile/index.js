import React, {Component} from "react";
import {View, Platform, TouchableOpacity, Linking, BackHandler} from "react-native";

import {Container, Content, Button, Text, Icon, Header, Left, Right, Body} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import store from 'react-native-simple-store';
import RNExitApp from 'react-native-exit-app';

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';

class Profile extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        current_language: C_Const.EN_LANG_KEY,
        _language_info: {},
        is_changed_language: false
  		};
  	}
    //
    componentDidMount() {
      this._get_language_content();
      // BackHandler.addEventListener('hardwareBackPress', function() {
      //   Utils.dlog('111 BackHandler');
			// 		RNExitApp.exitApp();
			// 		return true;
      // }.bind(this));
      this.props.screenProps.addListener(C_Const.EMIT_KEY.CHANGE_LANGUAGE, (data)=>{
        if (data[C_Const.STORE_KEY.CURRENT_LANG_KEY] != null && data['lang_info'] != null){
          this.setState({
            current_language: data[C_Const.STORE_KEY.CURRENT_LANG_KEY],
  					_language_info: data['lang_info']
  				});
        }
      });
    }
    //get language translation from store
  	_get_language_content = () => {
  		store.get(C_Const.STORE_KEY.LANGUAGE)
  		.then(lang_info => {
  			if (lang_info != null){
  				this.setState({
            current_language: lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY],
  					_language_info: lang_info[C_Const.STORE_KEY.DATA_LANG_KEY][lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY]]
  				});
  			} else {
          //cannot get language
        }
  		});
  	};
    //
    _open_mail_app = () => {
      Linking.openURL('mailto:app@summitasia.com?subject=Feedback for Summit App');
    };
    //called when change language
    _on_go_back = () => {
      store.get(C_Const.STORE_KEY.LANGUAGE)
  		.then(lang_info => {
  			if (lang_info != null){
  				this.setState({
  					_language_info: lang_info[C_Const.STORE_KEY.DATA_LANG_KEY][lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY]]
  				}, () => {
            // this.props.screenProps.emit(C_Const.EMIT_KEY.CHANGE_LANGUAGE, {
            //   tab_label_home: this.state._language_info[C_MULTI_LANG.home],
            //   tab_label_course: this.state._language_info[C_MULTI_LANG.courses],
            //   tab_label_notification: this.state._language_info[C_MULTI_LANG.notifications],
            //   tab_label_profile: this.state._language_info[C_MULTI_LANG.profile]
            // });
          });
        }
      });
    };
    //
    _open_bookmark = () => {
      this.props.navigation.navigate('Bookmark', {
        current_language: this.state.current_language,
        lang_info: this.state._language_info
      });
    };
   //==========
    render() {

        return (
            <Container style={common_styles.grayBg}>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Body style={styles.headerBody}>
                  <Text uppercase={false} style={common_styles.bold}>{this.state._language_info[C_MULTI_LANG.profile]}</Text>
                </Body>
              </Header>
                {/* END header */}
              <Content>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('About')}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[styles.active_label]}>{this.state._language_info[C_MULTI_LANG.about_summit]}</Text>
                      </Left>
                      <Right>
                        <Icon name="ios-arrow-forward-outline" style={[common_styles.font_30, common_styles.grayColor]}/>
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._open_bookmark()}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text>{this.state._language_info[C_MULTI_LANG.my_saved_items]}</Text>
                      </Left>
                      <Right>
                        <Icon name="ios-arrow-forward-outline" style={[common_styles.font_30, common_styles.grayColor]}/>
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Setting', {onGoBack: this._on_go_back})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text>{this.state._language_info[C_MULTI_LANG.notification_settings]}</Text>
                      </Left>
                      <Right>
                        <Icon name="ios-arrow-forward-outline" style={[common_styles.font_30, common_styles.grayColor]}/>
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._open_mail_app()}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text>{this.state._language_info[C_MULTI_LANG.feedback]}</Text>
                      </Left>
                      <Right>
                        <Icon name="ios-arrow-forward-outline" style={[common_styles.font_30, common_styles.grayColor]}/>
                      </Right>
                  </View>
                </TouchableOpacity>
              </Content>
            </Container>
        );
    }
}

export default Profile;
