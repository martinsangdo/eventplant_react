import React, {Component} from "react";
import {View, TouchableOpacity, Linking, BackHandler} from "react-native";

import {Container, Content, Text, Header, Title, Body, Left, Right, Icon, Picker, Item} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import LabeledSwitch from '../../plugin/labelswitch';
import OpenSettings from 'react-native-open-settings';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import store from 'react-native-simple-store';
import {API_URI} from '../../utils/api_uri';
import Spinner from 'react-native-loading-spinner-overlay';
import RequestData from '../../utils/https/RequestData';

const PickerItem = Picker.Item;

class Setting extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
  			loading_indicator_state: true,
        language_list: [{id: '0', name: 'Language'}],		//init list, show first item in Render not work in iOS
        current_language_val: '0',		//default selected value in country list
        current_language: C_Const.EN_LANG_KEY,
        _language_info: {},
        jwt: '',
        loading_setting_first_time: true,   //prevent loop forever
        is_on_article: true,
        is_on_news: true
  		};
  	}
    //
    componentDidMount() {
      this._get_language_content();
      // BackHandler.addEventListener('hardwareBackPress', function() {
			// 		this._back_2_profile();
			// 		return true;
      // }.bind(this));
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
          //get user info & data list
          store.get(C_Const.STORE_KEY.USER_INFO)
      		.then(user_info => {
      			if (user_info != null){
      				this.setState({
      					jwt: C_Const.AUTHORIZATION_PREFIX_HEADER + user_info[C_Const.JSON_WEB_TOKEN],
                // loading_indicator_state: true
      				}, this._get_user_setting);
      			} else {
              //cannot get user info
            }
      		});
  			} else {
          //cannot get language
        }
  		});
  	};
    //
    _get_user_setting = () => {
      var extra_headers = {
        Authorization: this.state.jwt
      };
      RequestData.sentGetRequestWithExtraHeaders(API_URI.GET_NOTIF_SETTINGS, extra_headers, (response, error) => {
        // Utils.xlog('user_setting', response.data);
        if (!Utils.isEmpty(response) && !Utils.isEmpty(response.data)){
          this.setState({
            is_on_article: response.data.is_notif_blog > 0?true:false,
            is_on_news: response.data.is_notif_event > 0?true:false,
            loading_setting_first_time: false,
            loading_indicator_state: false
          });
        } else {
          //some errors
          this.setState({loading_setting_first_time: false, loading_indicator_state: false});
        }
      });
    };
    //
    _open_setting_app = () => {
      // Linking.openURL('app-settings:1'); //in iOS only
      OpenSettings.openSettings();
    };
    //
    _change_setting = (is_change_article) => {
      if (this.state.loading_setting_first_time || this.state.loading_indicator_state){
        return;
      }
      this.setState({loading_indicator_state: true});
      if (is_change_article){
        var params = {
          is_notif_blog: this.state.is_on_article?0:1,   //switch to new state
          is_notif_event: this.state.is_on_news?1:0     //keep old state
        };
      } else {
        var params = {
          is_notif_blog: this.state.is_on_article?1:0,  //keep old state
          is_notif_event: this.state.is_on_news?0:1    //switch to new state
        };
      }
      var extra_headers = {
        Authorization: this.state.jwt
      };
      RequestData.sentPutRequestWithExtraHeaders(API_URI.UPDATE_NOTIF_SETTINGS, extra_headers, params, (response, error) => {
        // Utils.dlog(response.data);
        if (Utils.isSuccessResponse(response)){
          //success
          if (is_change_article){
            this.setState({
              is_on_article: !this.state.is_on_article,
            });
          } else {
            this.setState({
              is_on_news: !this.state.is_on_news,
            });
          }
        } else {
          //some errors
        }
        this.setState({
          loading_indicator_state: false
        });
      });
    };
    //
    _change_setting_article = () => {
      this._change_setting(true);
    };
    //
    _change_setting_news = () => {
      this._change_setting(false);
    };
    //called when changed to new language
    _on_go_back = (is_changed_language, store_lang_info) => {
      // Utils.xlog('setting _on_go_back is_changed_language', is_changed_language);
      if (!is_changed_language){
        return;   //not change any lang
      }
      if (store_lang_info != null){
        // Utils.xlog('setting _on_go_back', store_lang_info);
        this.setState({
          current_language: store_lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY],
          _language_info: store_lang_info[C_Const.STORE_KEY.DATA_LANG_KEY][store_lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY]]
        }, () => this._trigger_change_language());
      }
    };
    //trigger event changed language
    _trigger_change_language = () => {
      // Utils.xlog('_trigger_change_language', this.state.current_language);
      this.props.screenProps.emit(C_Const.EMIT_KEY.CHANGE_LANGUAGE, {
        tab_label_home: this.state._language_info[C_MULTI_LANG.home],
        tab_label_course: this.state._language_info[C_MULTI_LANG.courses],
        tab_label_notification: this.state._language_info[C_MULTI_LANG.notifications],
        tab_label_profile: this.state._language_info[C_MULTI_LANG.profile],
        current_language: this.state.current_language,
        lang_info: this.state._language_info
      });
    };
    //
    _back_2_profile = () => {
      // if (this.state.is_changed_language){
        //must refresh all data in all screens
      //   this.props.navigation.navigate('Profile');
      // } else {
        this.props.navigation.goBack();
      // }
    };
   //==========
    render() {
      {/* define how to render language list */}
      let language_list = this.state.language_list.map( (detail) => {
        return <PickerItem key={detail.id} value={detail.id} label={detail.name} />
      });

        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Left style={styles.left}>
                  <TouchableOpacity onPress={() => this._back_2_profile()}>
                    <View style={styles.left_row}>
                      <View style={[common_styles.float_center]}>
                        <Icon name="ios-arrow-back-outline" style={common_styles.default_font_color}/>
                      </View>
                      <View style={[common_styles.margin_l_10, common_styles.float_center]}>
                        <Text uppercase={false} style={[common_styles.default_font_color]}>{this.state._language_info[C_MULTI_LANG.profile]}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Left>
                <Body style={styles.headerBody}>
                  <Text uppercase={false} style={[common_styles.bold, common_styles.margin_l_10]}>{this.state._language_info[C_MULTI_LANG.notification_settings]}</Text>
                </Body>
                <Right style={styles.right}></Right>
              </Header>

              <Content>
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

              <View style={styles.item_row}>
                  <Left>
                    <Text>{this.state._language_info[C_MULTI_LANG.latest_articles]}</Text>
                  </Left>
                  <Right>
                    <LabeledSwitch value={this.state.is_on_article} onValueChange={this._change_setting_article}/>
                  </Right>
              </View>
              <View style={[styles.item_row, common_styles.grayBg]}>
                  <Left>
                    <Text style={[common_styles.font_13, common_styles.darkGrayColor]}>{this.state._language_info[C_MULTI_LANG.latest_articles_note]}</Text>
                  </Left>
              </View>
              <View style={styles.item_row}>
                  <Left>
                    <Text>{this.state._language_info[C_MULTI_LANG.latest_news]}</Text>
                  </Left>
                  <Right>
                    <LabeledSwitch value={this.state.is_on_news} onValueChange={this._change_setting_news}/>
                  </Right>
              </View>
              <View style={[styles.item_row, common_styles.grayBg]}>
                  <Left>
                    <Text style={[common_styles.font_13, common_styles.darkGrayColor]}>{this.state._language_info[C_MULTI_LANG.latest_news_note]}</Text>
                  </Left>
              </View>
              <View style={styles.item_row}>
                <Left>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChangeLanguage', {from_setting: true, onGoBack: this._on_go_back})}>
                    <Text>{this.state._language_info[C_MULTI_LANG.language]}</Text>
                  </TouchableOpacity>
                </Left>
                <Right>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChangeLanguage', {from_setting: true, onGoBack: this._on_go_back})}>
                    <EvilIcons name="chevron-down" style={[common_styles.greenColor, common_styles.font_30]}/>
                  </TouchableOpacity>
                </Right>
              </View>
              <View style={[styles.item_row, common_styles.grayBg]}>
                  <Left>
                    <Text style={[common_styles.font_13, common_styles.darkGrayColor]}>{this.state._language_info[C_MULTI_LANG.language_note]}</Text>
                  </Left>
              </View>
              <View style={styles.item_row}>
                  <Left>
                    <TouchableOpacity onPress={()=>this._open_setting_app()}>
                      <Text style={[common_styles.default_font_color]}>{this.state._language_info[C_MULTI_LANG.open_setting_app]}</Text>
                    </TouchableOpacity>
                  </Left>
              </View>
              </Content>
            </Container>
        );
    }
}

export default Setting;
