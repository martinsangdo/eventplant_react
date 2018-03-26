import React, {Component} from "react";
import {Image, View, TouchableOpacity, Share, Dimensions, Platform} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import AutoHTML from 'react-native-autoheight-webview';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import store from 'react-native-simple-store';
import RequestData from '../../utils/https/RequestData';
import {API_URI} from '../../utils/api_uri';
import Spinner from 'react-native-loading-spinner-overlay';
import {setting} from "../../utils/config";

class ArticleDetail extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        current_language: C_Const.EN_LANG_KEY,
        _language_info: {},
        jwt: '',
  			loading_indicator_state: true,
        title: '',
        content: '',
        sub_heading: '',
        link: setting.HOME_PAGE,
        img_thumb_url: '',
        bookmark_id: 0
  		};
  	}
    //
    componentDidMount() {
      this.setState({
        current_language: this.props.navigation.state.params.current_language,
        _language_info: this.props.navigation.state.params.lang_info,
        jwt: this.props.navigation.state.params.jwt
      }, ()=> this._get_data_detail());
    }
    //get notification list
    _get_data_detail = () => {
      var params = {
        blog_id: C_Const.PAGE_LEN
      };
      var extra_headers = {
        language: this.state.current_language
      };
      // Utils.dlog(params);
      RequestData.sentGetRequestWithExtraHeaders(API_URI.GET_BLOG_DETAIL+this.props.navigation.state.params.id, extra_headers, (detail, error) => {
        // Utils.xlog('article detail', detail);
        if (detail != null && detail.data != null){
          var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="content-type" content="text/html; charset=UTF-8"></head><body>'+
            detail.data.content+'</body></html>';
            //must set baseUrl = '' too

          this.setState({
            title: detail.data.title,
            sub_heading: detail.data.sub_heading,
            content: html,
            link: detail.data.link_url,
            img_thumb_url: detail.data.img_src,
            bookmark_id: detail.data.bookmark_id
          });
        } else {
          //cannot get detail
        }
        this.setState({loading_indicator_state: false});
      });
    };
    //==========
    _share_link = () => {
      if (this.state.link == '#'){
        this.state.link = Utils.getHomepageLanguage(this.state.current_language);
      }
        Share.share({
          title: this.state.title,
          message: this.state.link,
          // url: link,   //not work in FB app
          subject: 'Share Link' //  for email
        }, {
          // Android only:
          dialogTitle: 'Choose app'
      });
    };
    //save/unsave bookmark
    _toggle_bookmark = () => {
      this.setState({loading_indicator_state: true});
      var extra_headers = {
        Authorization: this.state.jwt,
        Language: this.state.current_language
      };
      if (Utils.isEmpty(this.state.bookmark_id) || this.state.bookmark_id == 0){
        //wanna bookmark this one
        var params = {
          record_id: this.props.navigation.state.params.id,
          type: C_Const.ARTICLE_TYPE
        };
        RequestData.sentPostRequestWithExtraHeaders(API_URI.UPSERT_BOOKMARK, extra_headers, params, (response, error) => {
          if (Utils.isSuccessResponse(response) && !Utils.isEmpty(response.data)){
            this.setState({bookmark_id: response.data['bookmark_id']});
            if (this.props.navigation.state.params.is_from_bookmark_list){
              this.props.navigation.state.params._on_update_bookmark(0, response.data['bookmark_id']);
              //trigger event to Home list
              this.props.screenProps.emit(C_Const.EMIT_KEY.CHANGE_BOOKMARK_FLAG, {
                record_id: this.props.navigation.state.params.id,
                bookmark_id: response.data['bookmark_id']
              });
            } else {
              //called from list or search
              this.props.navigation.state.params._on_update_bookmark(this.props.navigation.state.params.id, response.data['bookmark_id']);
            }
          } else {
            //failed
          }
          this.setState({loading_indicator_state: false});
        });
      } else {
        //wanna remove bookmark
        var params = {
          bookmark_id: this.state.bookmark_id
        };
        RequestData.sentPostRequestWithExtraHeaders(API_URI.DELETE_BOOKMARK, extra_headers, params, (response, error) => {
          if (Utils.isSuccessResponse(response)){
            if (this.props.navigation.state.params.is_from_bookmark_list){
              this.props.navigation.state.params._on_update_bookmark(this.state.bookmark_id, 0);
              //trigger event to Home list
              this.props.screenProps.emit(C_Const.EMIT_KEY.CHANGE_BOOKMARK_FLAG, {
                record_id: this.props.navigation.state.params.id,
                bookmark_id: 0
              });
            } else {
              //called from list or search
              this.props.navigation.state.params._on_update_bookmark(this.props.navigation.state.params.id, 0);
            }
            this.setState({bookmark_id: 0});
          } else {
            //failed
          }
          this.setState({loading_indicator_state: false});
        });
      }
    };
    //
    _on_go_back = () => {
      this.props.navigation.goBack();
    }
   //==========
    render() {
      const img_thumb_url = this.state.img_thumb_url;
      let img_thumb = null;
      if (img_thumb_url == ''){
        img_thumb = require('../../../img/default_thumb.png');
      } else {
        img_thumb = {uri: img_thumb_url};
      }

      {/* define how to render country list */}

        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Left style={styles.left}>
                  <TouchableOpacity onPress={() => this._on_go_back()}>
                    <View style={styles.left_row}>
                      <View style={[common_styles.float_center]}>
                        <Icon name="ios-arrow-back-outline" style={common_styles.default_font_color}/>
                      </View>
                      <View style={[common_styles.margin_l_10, common_styles.float_center]}>
                        <Text uppercase={false} style={[common_styles.default_font_color]}>{this.props.navigation.state.params.category_label}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Left>
                <Right style={[common_styles.headerRight]}>
                  <TouchableOpacity style={common_styles.margin_r_10} onPress={() => this._share_link()} style={{marginRight:10, justifyContent: 'flex-start', marginBottom:3}}>
                    <SimpleLineIcons name="share" style={[common_styles.default_font_color, {fontSize:21}]}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._toggle_bookmark()}>
                    <MaterialIcons name={this.state.bookmark_id > 0?'star':'star-border'} style={[common_styles.default_font_color, {fontSize:27}]}/>
                  </TouchableOpacity>
                </Right>
              </Header>
              {/* END header */}
              <Content>
                <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

                {/* fake webview to auto calculate height */}
                <View>
                    <AutoHTML
                      autoHeight={true}
                      scalesPageToFit={true}
                      source={{html:''}} />
                </View>
                <View style={[common_styles.padding_20]}>
                  <Text style={[common_styles.bold]}>{this.state.title}</Text>
                </View>
                <Image style={styles.thumb} source={img_thumb}/>
                <View style={[!Utils.isEmpty(this.state.sub_heading)?common_styles.padding_20:'']}>
                  <Text>{this.state.sub_heading}</Text>
                </View>
                <View style={{margin:10}}>
                  <AutoHTML
                    scalesPageToFit={Platform.OS === 'android' ? true : false}
                    autoHeight={true}
                    style={{ width: Dimensions.get('window').width - 10 }}
                    source={{baseUrl: '', html: this.state.content}} />
                </View>
              </Content>
            </Container>
        );
    }
}

export default ArticleDetail;
