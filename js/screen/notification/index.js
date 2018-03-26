import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, Alert} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import Spinner from 'react-native-loading-spinner-overlay';
import store from 'react-native-simple-store';
import RequestData from '../../utils/https/RequestData';
import {API_URI} from '../../utils/api_uri';
import FCM from 'react-native-fcm';

class Notification extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        last_id: 0,
  			data_list: [],
  			loading_indicator_state: false,
  			isShowMore: false,
        _language_info: {},
        jwt: ''
  		};
  	}
    //
    componentDidMount() {
      this._get_language_content();
      var me = this;
      this.props.screenProps.addListener(C_Const.EMIT_KEY.CHANGE_NOTIF_NUM_FROM_PUSH, (data)=>{
        if (data.new_badge != null){
          //received Push
          if (data.new_badge == 0){
            me.setState({data_list: []});
          } else {
            this.setState({
              last_id: 0, data_list: []
            }, () => this._get_data_list());
          }
        }
      });
      this.props.screenProps.addListener(C_Const.EMIT_KEY.CHANGE_LANGUAGE, (data)=>{
        if (data[C_Const.STORE_KEY.CURRENT_LANG_KEY] != null && data['lang_info'] != null){
          // Utils.xlog('notif change language', data['lang_info']);
          this.setState({
            current_language: data[C_Const.STORE_KEY.CURRENT_LANG_KEY],
  					_language_info: data['lang_info']
  				}, () => {
            setTimeout( () => {
              //refresh the list
              this.setState({
                last_id: 0, data_list: []
              }, () => this._get_data_list());
            }, 1500);
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
  					_language_info: lang_info[C_Const.STORE_KEY.DATA_LANG_KEY][lang_info[C_Const.STORE_KEY.CURRENT_LANG_KEY]]
  				});
          //get user info & data list
          store.get(C_Const.STORE_KEY.USER_INFO)
      		.then(user_info => {
      			if (user_info != null){
      				this.setState({
      					jwt: C_Const.AUTHORIZATION_PREFIX_HEADER + user_info[C_Const.JSON_WEB_TOKEN]
      				});
              //get notification list
              this._get_data_list();
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
    _keyExtractor = (item) => item._id;
  	//render the list. MUST use "item" as param
  	_renderItem = ({item}) => (
  			<View style={styles.list_item}>
          <Body style={[common_styles.padding_10, common_styles.min_w_70p]}>
            <Text style={[common_styles.whiteColor, common_styles.float_left]}>{item._content}</Text>
          </Body>
          <Right style={common_styles.min_w_80}>
              <View style={common_styles.float_center}><Text style={[common_styles.whiteColor, common_styles.font_10]}>{Utils.getDurationTime(item.create_time, this.state._language_info)}</Text></View>
              <View style={common_styles.float_center}>
                <TouchableOpacity onPress={()=> this._show_confirm_delete(item._id)}>
                  <Icon name="ios-close-circle-outline" style={common_styles.whiteColor}/>
                </TouchableOpacity>
              </View>
          </Right>

  			</View>
    );
  	//load more item
  	_load_more = () => {
      setTimeout(() => {
        if (this.state.isShowMore && !this.state.loading_indicator_state){
          this.setState({loading_indicator_state: true});
    			this._get_data_list();
        }
      }, 500);
  	};
    //get notification list
    _get_data_list = () => {
      var params = {
        limit: C_Const.PAGE_LEN
      };
      if (this.state.last_id > 0){
        params['last_id'] = this.state.last_id;
      }
      var extra_headers = {
        Authorization: this.state.jwt
      };
      // Utils.dlog(params);
      RequestData.sentPostRequestWithExtraHeaders(API_URI.GET_NOTIF_LIST, extra_headers, params, (data_list, error) => {
        // Utils.xlog('notif data', data_list);
        if (!Utils.isEmpty(data_list) && !Utils.isEmpty(data_list.data) && !Utils.isEmpty(data_list.data.data_notification)){
          var _list = data_list.data.data_notification;
          var _len = _list.length;
          for (var i=0; i<_len; i++){
            this.state.data_list.push(_list[i]);
          }
          if (_len > 0){
            this.setState({last_id: _list[_len - 1]['_id']});
          }
          this.setState({loading_indicator_state: false, isShowMore: _len < C_Const.PAGE_LEN?false:true});

          FCM.setBadgeNumber(data_list.data.total);   //set icon app badge
          //change no. in tab bar
          this.props.screenProps.emit(C_Const.EMIT_KEY.CHANGE_NOTIF_NUM, {
            tab_label_notif_num: data_list.data.total
          });
        } else {
          //empty or error

        }
      });
    };
    //delete last notification
    _show_confirm_delete = (del_notif_id) => {
      Alert.alert(
          this.state._language_info[C_MULTI_LANG.confirmation],
          this.state._language_info[C_MULTI_LANG.confirm_del_notif],
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () => this._delete_notif(del_notif_id)},
          ],
          { cancelable: false }
      );
    };
    //delete notification
    _delete_notif = (del_notif_id) => {
      var params = {
        notification_id: del_notif_id
      };
      var extra_headers = {
        Authorization: this.state.jwt
      };
      this.setState({loading_indicator_state: true});
      RequestData.sentPostRequestWithExtraHeaders(API_URI.DELETE_NOTIF_BY_ID, extra_headers, params, (response, error) => {
        if (!Utils.isEmpty(response) && !Utils.isEmpty(response.data)){
          var new_total = response.data.total;
          //clear delete item in the list
          var _list = this.state.data_list;
          var _len = _list.length;
          for (var i=_len - 1; i>=0; i--){
            if (_list[i]['_id'] == del_notif_id){
              this.state.data_list.splice(i, 1);
            }
          }
          if (this.state.data_list.length > 0){
            this.setState({last_id: this.state.data_list[this.state.data_list.length - 1]['_id']});
          } else {
            this.setState({last_id: 0});  //removed all
          }
          //
          FCM.setBadgeNumber(new_total);   //set icon app badge
          //change no. in tab bar
          this.props.screenProps.emit(C_Const.EMIT_KEY.CHANGE_NOTIF_NUM, {
            tab_label_notif_num: new_total
          });
        } else {
          //error
        }
        this.setState({loading_indicator_state: false});
      });
    };
    //
    _refresh_list = () => {
      this.setState({
        last_id: 0, data_list: [], loading_indicator_state: true
      }, () => this._get_data_list());
    };
   //==========
    render() {
        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Body style={styles.headerBody}>
                  <Text uppercase={false} style={common_styles.bold}>{this.state._language_info[C_MULTI_LANG.notifications]}</Text>
                </Body>
              </Header>
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

              <View>
                <FlatList
                  data={this.state.data_list}
                  renderItem={this._renderItem}
                  refreshing={false}
                  initialNumToRender={10}
                  onRefresh={() => this._refresh_list()}
                  onEndReachedThreshold={0.5}
                  bounces={false}
                  keyExtractor={this._keyExtractor}
                  onEndReached={({ distanceFromEnd }) => this._load_more()}
                />
              </View>
            </Container>
        );
    }
}

export default Notification;
