import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity} from "react-native";

import {Container, Content, Button, Picker, Item, Text, Icon} from "native-base";
import {NavigationActions} from "react-navigation";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import store from 'react-native-simple-store';

import BaseScreen from "../../base/BaseScreen.js";
import {API_URI} from '../../utils/api_uri';
import DeviceInfo from 'react-native-device-info';

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import Spinner from 'react-native-loading-spinner-overlay';
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';

const PickerItem = Picker.Item;
class ChooseCountry extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        loading_indicator_state: true,
        jwt: '',
        current_language: C_Const.EN_LANG_KEY,
        _language_info: {},   //translation of current language
        country_list: [],		//init list, show first item in Render not work in iOS
        current_country_code: '--',		//default selected value in country list
  		};
  	}
    //
    componentDidMount() {
      this._get_language_content();
    }
    //get language translation from store
  	_get_language_content = () => {
      store.get(C_Const.STORE_KEY.USER_INFO)
  		.then(user_info => {
  			if (user_info != null){
  				this.setState({
  					jwt: C_Const.AUTHORIZATION_PREFIX_HEADER + user_info[C_Const.JSON_WEB_TOKEN]
  				});
          //get notification list
          this._get_data_list();
  			}
  		});
      //
  		store.get(C_Const.STORE_KEY.LANGUAGE)
  		.then(lang_info => {
  			if (lang_info != null){
  				this.setState({
            current_language: lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY],
  					_language_info: lang_info[C_Const.STORE_KEY.DATA_LANG_KEY][lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY]]
  				});
  			}
  		});
  	};
    //
    _show_country_list = () => {
      this.setState({
        current_country_val: 0
      });
    };
    //
    _get_data_list = () => {
      RequestData.sentPostRequest(API_URI.GET_COUNTRY_LIST, {}, (country_list, error) => {
            //get current country
            RequestData.sentGetRequest(API_URI.GET_GEO_INFO, (timezone_info, error) => {
              var app_country_code = this.state.current_country_code;
              if (!Utils.isEmpty(timezone_info) && !Utils.isEmpty(timezone_info['time_zone'])){
                app_country_code = timezone_info['country_code'].toLowerCase();
              }
              // Utils.dlog(app_country_code);
              var country_len = country_list.data.length;
              for (var i=0; i<country_len; i++){
                this.state.country_list.push(country_list.data[i]);
              }
              this.setState({current_country_code: app_country_code, loading_indicator_state: false});    //set default
            });
        });
    };
    //handle actions when user changes country
    _country_list_change(itemValue, itemIndex){
    	this.setState({
    		current_country_code: itemValue
    	});
    }
    //when user wants to process next step
    _process_next = () => {
      this.setState({loading_indicator_state: true});
      //get country id of selected one
      var _country_list = this.state.country_list;
      var country_len = _country_list.length;
      var country_id = 0;
      for (var i=0; i<country_len; i++){
        if (this.state.current_country_code == _country_list[i]['code']){
          country_id = _country_list[i]['_id'];
        }
      }

      var extra_headers = {
        Authorization: this.state.jwt
      };
      //save chosen country to db
      RequestData.sentPutRequestWithExtraHeaders(API_URI.UPSERT_USER_COUNTRY, extra_headers,
        {country_id: country_id}, (response, error) => {
        // Utils.xlog('next country', response);
        if (Utils.isSuccessResponse(response)){
          this._navigateTo('Main');
        } else {
          //error?

        }
      });
    };
   //==========
    render() {
      {/* define how to render country list */}
		let country_list = this.state.country_list.map( (detail) => {
    	return <PickerItem key={detail._id} value={detail.code} label={detail.name} />
    });

        return (
            <Container style={common_styles.mainGreenBg}>
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

              <Content>
                <View style={[styles.container]}>
                  <View style={styles.content_wrapper}>
                    <View style={common_styles.view_align_center}><Text style={[common_styles.whiteColor, common_styles.mainTitle]}>{this.state._language_info[C_MULTI_LANG.you_are_almost_there]}</Text></View>
                    <View style={common_styles.margin_b_20} />
                    <View style={common_styles.view_align_center}><Text style={[common_styles.whiteColor]}>{this.state._language_info[C_MULTI_LANG.where_are_you_signing_in_from]}</Text></View>
                    <View style={common_styles.margin_b_20} />
                    <View style={[common_styles.view_align_center]}>
                      <View style={styles.picker_parent}>
                        <Picker
                          note
                          iosHeader={this.state._language_info[C_MULTI_LANG.select_country]}
                          mode="dropdown"
                          name="picker_country"
                          selectedValue={this.state.current_country_code}
                          onValueChange={this._country_list_change.bind(this)}
                          style={[styles.picker_country]}
                          >
                          {country_list}
                        </Picker>
                        <EvilIcons name="chevron-down" style={[common_styles.greenColor, common_styles.font_30, styles.picker_arrow]}/>
                      </View>
                    </View>
                    <View style={common_styles.margin_b_200} />
                    <View style={common_styles.view_align_center}>
                      <TouchableOpacity style={[common_styles.btn_rect]} onPress={()=>this._process_next()}>
                        <Icon name="ios-arrow-forward" style={[common_styles.whiteColor, common_styles.font_30]}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Content>
            </Container>
        );
    }
}

export default ChooseCountry;
