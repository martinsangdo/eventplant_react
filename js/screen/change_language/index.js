import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
import {NavigationActions} from "react-navigation";
import store from 'react-native-simple-store';

import BaseScreen from "../../base/BaseScreen.js";
import Spinner from 'react-native-loading-spinner-overlay';

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';
import {API_URI} from '../../utils/api_uri';

class ChangeLanguage extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
  			active_lang: C_Const.EN_LANG_KEY,    //default activating language in UI
        loading_indicator_state: false,
        _language_info: {},   //translation of current language
        _all_language_info: {}
  		};
  	}
    //
    componentDidMount() {
      this._get_language_content();
    }
    //get language translation from store
  	_get_language_content = () => {
  		store.get(C_Const.STORE_KEY.LANGUAGE)
  		.then(lang_info => {
  			if (lang_info != null){
  				this.setState({
            active_lang: lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY],
  					_language_info: lang_info[C_Const.STORE_KEY.DATA_LANG_KEY][lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY]],
            _all_language_info: lang_info
  				});
  			}
  		});
  	};
    //when touch on each item
    _change_language = (new_lang) => {
      this.setState({active_lang: new_lang});
    };
    //when user wants to process next step
    _process_next = () => {
      var new_store_lang_info = this.state._all_language_info;

      if (this.state.active_lang != new_store_lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY]){
        this.setState({loading_indicator_state: true});
        //user chose another language than English, request to server to get its translation
        RequestData.sentGetRequestWithExtraHeaders(API_URI.GET_LANGUAGE_KEY, {Language: this.state.active_lang}, (response, error) => {
              // Utils.dlog(response);
              if (Utils.isSuccessResponse(response) && !Utils.isEmpty(response.data) && response.data.length > 0){
                  //there is some data of translation
                  var lang_data = response.data;
                  var len = lang_data.length;
                  var lang_key_obj = {
                    'en': {},    //translation of English
                    'vn': {},    //translation of Vietnamese
                    'cn': {},    //translation of Chinese
                    'th': {},    //translation of Thailand
                  };		//save translated content of ALL languages
                  for (var i=0; i<len; i++){
                    if (!Utils.isEmpty(lang_data[i]['code']) && !Utils.isEmpty(lang_data[i]['keyword'])){
                      lang_key_obj[lang_data[i]['code']][lang_data[i]['keyword']] = lang_data[i]['_content'];
                    }
                  }
                  //save language into store
                  var store_lang_info = {
                    'current_language': this.state.active_lang,
                    'data_obj': lang_key_obj   //all translations of chosen language
                  };
                  store.update(C_Const.STORE_KEY.LANGUAGE, store_lang_info); //save to Store
                  store.update(C_Const.STORE_KEY.CHOSEN_LANGUAGE_KEY, this.state.active_lang); //save to Store
                  //wait to save into Store
                  setTimeout( () => {
                    // Utils.xlog('new store_lang_info', store_lang_info);
                    this._move_2_next_page(true, store_lang_info);
                  }, 1000);
                } else {
                  //cannot get language keywords from server
                }
            });
       } else {
         //user chose same language (EN)
         store.update(C_Const.STORE_KEY.CHOSEN_LANGUAGE_KEY, this.state.active_lang); //save to Store
         this._move_2_next_page(false);
       }
    };
    //move to next page
    _move_2_next_page = (is_changed_language, store_lang_info) => {
      if (Utils.isEmpty(this.props.navigation.state.params) || Utils.isEmpty(this.props.navigation.state.params.from_setting)){
        //this page called from Splash
        this._navigateTo('ChooseCountry');
      } else {
        //this page called from Setting
        this.props.navigation.state.params.onGoBack(is_changed_language, store_lang_info);
        this.props.navigation.goBack();
      }
    };
   //==========
    render() {
        return (
            <Container style={common_styles.mainGreenBg}>
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

                <View style={[styles.container]}>
                  <View style={styles.content_wrapper}>
                    <View style={common_styles.view_align_center}><Text style={[common_styles.whiteColor, common_styles.mainTitle]}>{this.state._language_info[C_MULTI_LANG.select_language]}</Text></View>
                    <View style={common_styles.margin_b_10} />
                    <View style={common_styles.view_align_center}><Text style={[common_styles.whiteColor]}>{this.state._language_info[C_MULTI_LANG.choose_your_preferred_language]}</Text></View>
                    <View style={common_styles.margin_b_10} />
                    <View style={common_styles.view_align_center}>
                      <TouchableOpacity onPress={()=>this._change_language(C_Const.EN_LANG_KEY)}
                        style={[common_styles.btn_rect, this.state.active_lang == C_Const.EN_LANG_KEY && common_styles.btn_rect_active]}>
                        <Text style={this.state.active_lang == C_Const.EN_LANG_KEY?common_styles.greenColor:common_styles.whiteColor}>English</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={common_styles.margin_b_20} />
                    <View style={common_styles.view_align_center}>
                      <TouchableOpacity onPress={()=>this._change_language(C_Const.CN_LANG_KEY)}
                        style={[common_styles.btn_rect, this.state.active_lang == C_Const.CN_LANG_KEY && common_styles.btn_rect_active]}>
                        <Text style={this.state.active_lang == C_Const.CN_LANG_KEY?common_styles.greenColor:common_styles.whiteColor}>中文</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={common_styles.margin_b_20} />
                    <View style={common_styles.view_align_center}>
                      <TouchableOpacity onPress={()=>this._change_language(C_Const.VI_LANG_KEY)}
                        style={[common_styles.btn_rect, this.state.active_lang == C_Const.VI_LANG_KEY && common_styles.btn_rect_active]}>
                        <Text style={this.state.active_lang == C_Const.VI_LANG_KEY?common_styles.greenColor:common_styles.whiteColor}>Tiếng Việt</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={common_styles.margin_b_20} />
                    <View style={common_styles.view_align_center}>
                      <TouchableOpacity onPress={()=>this._change_language(C_Const.THAI_LANG_KEY)}
                        style={[common_styles.btn_rect, this.state.active_lang == C_Const.THAI_LANG_KEY && common_styles.btn_rect_active]}>
                        <Text style={this.state.active_lang == C_Const.THAI_LANG_KEY?common_styles.greenColor:common_styles.whiteColor}>ไทย</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={common_styles.margin_b_20} />
                    <View style={common_styles.view_align_center}>
                      <TouchableOpacity style={[common_styles.btn_rect]} onPress={()=>this._process_next()}>
                        <Icon name="ios-arrow-forward" style={[common_styles.whiteColor, common_styles.font_30]}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

            </Container>
        );
    }
}

export default ChangeLanguage;
