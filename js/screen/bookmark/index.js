import React, {Component} from "react";
import {Image, ImageBackground, View, StatusBar, Platform, TouchableOpacity, FlatList, ScrollView, Dimensions} from "react-native";

import {Container, Content, Button, H3, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import {API_URI} from '../../utils/api_uri';
import RequestData from '../../utils/https/RequestData';
import store from 'react-native-simple-store';
import Spinner from 'react-native-loading-spinner-overlay';

class Bookmark extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
  			data_list: [],
        isShowMore: false,
  			loading_indicator_state: true,
        current_language: C_Const.EN_LANG_KEY,
        _language_info: {},
        last_id: 0,
        jwt: ''
  		};
  	}
    //
    componentDidMount() {
      this.setState({
        current_language: this.props.navigation.state.params.current_language,
        _language_info: this.props.navigation.state.params.lang_info
      }, ()=> this._get_user_info());
    }
    //get userinfo from store
  	_get_user_info = () => {
      store.get(C_Const.STORE_KEY.USER_INFO)
      .then(user_info => {
        if (user_info != null){
          this.setState({
            jwt: C_Const.AUTHORIZATION_PREFIX_HEADER + user_info[C_Const.JSON_WEB_TOKEN]
          });
          //get data list
          this._get_data_list();
        } else {
          //cannot get user info
        }
      });
  	};
    //==========
    _get_data_list = () => {
      var params = {
        limit: C_Const.PAGE_LEN
      };
      if (this.state.last_id > 0){
        params['last_id'] = this.state.last_id;
      }
      var extra_headers = {
        Authorization: this.state.jwt,
        Language: this.state.current_language
      };
      if (!this.state.loading_indicator_state){
        this.setState({loading_indicator_state: true});
      }
      RequestData.sentPostRequestWithExtraHeaders(API_URI.GET_BOOKMARK_LIST, extra_headers, params, (response, error) => {
            if (Utils.isSuccessResponse(response) && !Utils.isEmpty(response.data) && !Utils.isEmpty(response.data.data_bookmarks)){
              //has some data
              Utils.xlog('bookmark list', response.data.data_bookmarks);
              var len = response.data.data_bookmarks.length;
      				if (len > 0){
      					for (var i=0; i<len; i++){
      						this.state.data_list.push(response.data.data_bookmarks[i]);
      					}
                // Utils.dlog(this.state.data_list);
                if (len < C_Const.PAGE_LEN){
                  //no more
                  this.setState({isShowMore: false, last_id: _list[_len - 1]['_id']});
                } else {
                  this.setState({isShowMore: true, last_id: _list[_len - 1]['_id']});  //maybe have more
                }
      				} else {
                //no More
                this.setState({isShowMore: false});
              }
            } else {
              //some errors
            }
            this.setState({loading_indicator_state: false});  //stop loading
          });
    };
    //
    _keyExtractor = (item) => item._id;
  	//render the list. MUST use "item" as param
  	_renderItem = ({item}) => (
      <TouchableOpacity onPress={() => this._open_detail(item.record_id)}>
        <View style={styles.item_row}>
          <View>
            <Image style={styles.thumb} source={{uri: Utils.isEmpty(item.img_src)?null:item.img_src}}/>
          </View>
          <View style={styles.text_label}>
            <Text numberOfLines={2}>{item.title}</Text>
            <Text style={styles.time_label}>{Utils.getDurationTime(item.created_time, this.state._language_info)}</Text>
          </View>
          <View style={styles.forward_ico}>
            <Icon name="ios-arrow-forward-outline" style={common_styles.darkGrayColor}/>
          </View>
        </View>
      </TouchableOpacity>
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
    //
    _refresh_list = () => {
      this.setState({
        offset: 0, data_list: [], loading_indicator_state: true
      }, () => this._get_data_list());
    };
    //
    _open_detail = (blog_id) => {
      this.props.navigation.navigate('ArticleDetail',
      {
        current_language: this.state.current_language,
        lang_info: this.state._language_info,
        jwt: this.state.jwt,
        id: blog_id,
        category_label: this.state._language_info[C_MULTI_LANG.my_saved_items],
        _on_update_bookmark: this._on_update_bookmark,
        is_from_bookmark_list: true
      });
    };
    //called from Artical detail
    _on_update_bookmark = (old_bookmark_id, new_bookmark_id) => {
      if (new_bookmark_id > 0){
        //just added it
        this._refresh_list();   //get newest bookmark list
      } else if (old_bookmark_id > 0){
        //removed it from the page
        var _list = this.state.data_list;
        var _len = _list.length;
        for (var i=0; i<_len; i++){
          if (_list[i]['_id'] == old_bookmark_id){
            this.state.data_list.splice(i, 1);    //remove it from the list
            break;
          }
        }
        if (this.state.data_list.length > 0){
          this.setState({last_id: this.state.data_list[this.state.data_list.length - 1]});
        } else {
          this.setState({last_id: 0});
        }
        this.setState({loading_indicator_state: false});    //must call for updating UI right away
      }
    };
   //==========
    render() {
      {/* define how to render country list */}

        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Left style={styles.left}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
                  <Text uppercase={false} style={[common_styles.bold, common_styles.margin_l_10]}>{this.state._language_info[C_MULTI_LANG.my_saved_items]}</Text>
                </Body>
                <Right style={styles.right}></Right>
              </Header>
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

              <View style={{flex:1}}>
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

export default Bookmark;
