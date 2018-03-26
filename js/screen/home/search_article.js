import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Share, Dimensions, Alert} from "react-native";

import {Container, Content, Button, H3, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import {API_URI} from '../../utils/api_uri';
import store from 'react-native-simple-store';

import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SearchBar from 'react-native-material-design-searchbar';

const deviceWidth = Dimensions.get("window").width;

class SearchArticle extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        offset: 0,
  			data_list: [],
  			loading_indicator_state: false,
  			isShowMore: false,
        keyword: '',
        _language_info: {},
        current_language: C_Const.EN_LANG_KEY,
        jwt: '',
        is_searching: false
  		};
  	}
    //
    componentDidMount() {
      //get language
      this.setState({
        current_language: this.props.navigation.state.params.current_language,
        _language_info: this.props.navigation.state.params.lang_info,
        jwt: this.props.navigation.state.params.jwt
      });
    }
    //==========
    _get_data_list = () => {
      var params = {
        keyword: this.state.keyword,
        offset: this.state.offset,
        limit: C_Const.PAGE_LEN
      };
      var extra_headers = {
        Authorization: this.state.jwt,
        Language: this.state.current_language
      };
      // Utils.xlog('article keyword', params);
      RequestData.sentPostRequestWithExtraHeaders(API_URI.SEARCH_BLOG, extra_headers, params, (response, error) => {
            // Utils.dlog(response);
            if (response != null && !Utils.isEmpty(response.data)){
              //has some data
              var len = response.data.length;
      				if (len > 0){
      					for (var i=0; i<len; i++){
      						this.state.data_list.push(response.data[i]);
      					}
                // Utils.dlog(this.state.data_list);
                if (len < C_Const.PAGE_LEN){
                  //no more
                  this.setState({isShowMore: false, offset: this.state.offset + len});
                } else {
                  this.setState({isShowMore: true, offset: this.state.offset + len});  //maybe have more
                }
      				} else {
                //no More
                this.setState({isShowMore: false});
              }
            } else {
              //some errors
            }

            this.setState({loading_indicator_state: false, is_searching: false},    //stop loading
            () => {
              if (this.state.data_list.length == 0){
                setTimeout(() => {
                  Alert.alert(
                    'Alert',
                    'Keyword not found',
                    [
                      {text: 'OK'},
                    ],
                    { cancelable: false }
                  );
                }, 500);
              }
            });
          });
    };
    //==========
    //https://react-native.canny.io/feature-requests/p/share-api-doesnt-populate-the-message-for-facebook
    //https://developers.facebook.com/docs/react-native/sharing
    _share_link = (title, link) => {
      if (link == '#'){
        link = Utils.getHomepageLanguage(this.state.current_language);
      }
        Share.share({
          title: title,
          message: link,
          // url: link,   //not work in FB app
          subject: 'Share Link' //  for email
        }, {
          // Android only:
          dialogTitle: 'Choose app',
          // iOS only:
          // excludedActivityTypes: [
          //   'com.apple.UIKit.activity.PostToTwitter'
          // ]
      });
    };
    //
    _keyExtractor = (item) => item._id;
  	//render the list. MUST use "item" as param
  	_renderItem = ({item}) => (
  			<View style={styles.list_item}>
            <Image style={styles.thumb} source={{uri: item.img_src}}/>
          <View style={[common_styles.margin_20, common_styles.margin_b_0]}>
            <TouchableOpacity onPress={()=>this._open_detail(item._id)}>
              <Text style={[common_styles.bold, common_styles.margin_b_10]}>{item.title}</Text>
            </TouchableOpacity>
          </View>
          <View>
              <Text uppercase={false} style={common_styles.margin_20}>{item.sub_heading}</Text>
          </View>
          <View style={styles.btn_row}>
            <TouchableOpacity>
              <Button transparent style={common_styles.btn_share} onPress={() => this._share_link(item.title, item.link_url)}>
                  <SimpleLineIcons name="share" style={[common_styles.darkGrayColor, common_styles.font_20]}/>
                  <Text uppercase={false} style={common_styles.darkGrayColor}>{this.state._language_info[C_MULTI_LANG.share]}</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button transparent style={[common_styles.btn_share, common_styles.view_align_center, !Utils.isEmpty(item.bookmark_id) && styles.btn_active]}
               onPress={() => this._toggle_bookmark(item._id, item.bookmark_id)}>
                <View>
                  <Icon name="ios-star" style={[common_styles.darkGrayColor, common_styles.float_center, !Utils.isEmpty(item.bookmark_id) && common_styles.whiteColor]}/>
                </View>
                <View>
                  <Text uppercase={false} style={[common_styles.darkGrayColor, common_styles.float_center, !Utils.isEmpty(item.bookmark_id) && common_styles.whiteColor]}>{this.state._language_info[C_MULTI_LANG.save]}</Text>
                </View>
              </Button>
            </TouchableOpacity>
          </View>
  			</View>
    );
  	//load more item
  	_load_more = () => {
      setTimeout(() => {
        if (this.state.isShowMore && !this.state.loading_indicator_state){
          Utils.dlog('_load_more');
          this.setState({loading_indicator_state: true});
    			this._get_data_list();
        }
      }, 500);
  	};
    //save/unsave bookmark
    _toggle_bookmark = (record_id, bookmark_id) => {
      this.setState({loading_indicator_state: true});
      var extra_headers = {
        Authorization: this.state.jwt,
        Language: this.state.current_language
      };
      if (Utils.isEmpty(bookmark_id)){
        //wanna bookmark this one
        var params = {
          record_id: record_id,
          type: C_Const.ARTICLE_TYPE
        };
        RequestData.sentPostRequestWithExtraHeaders(API_URI.UPSERT_BOOKMARK, extra_headers, params, (response, error) => {
          if (Utils.isSuccessResponse(response) && !Utils.isEmpty(response.data)){
            //update to UI
            var _list = this.state.data_list;
            var _len = _list.length;
            for (var i=0; i<_len; i++){
              if (_list[i]['_id'] == record_id){
                this.state.data_list[i]['bookmark_id'] = response.data.bookmark_id;    //update to the list
                this.props.navigation.state.params._on_update_bookmark(record_id, response.data['bookmark_id']);
                break;
              }
            }
          } else {
            //failed
          }
          this.setState({loading_indicator_state: false});
        });
      } else {
        //wanna remove bookmark
        var params = {
          bookmark_id: bookmark_id
        };
        RequestData.sentPostRequestWithExtraHeaders(API_URI.DELETE_BOOKMARK, extra_headers, params, (response, error) => {
          if (Utils.isSuccessResponse(response)){
            //update to UI
            var _list = this.state.data_list;
            var _len = _list.length;
            for (var i=0; i<_len; i++){
              if (_list[i]['_id'] == record_id){
                this.state.data_list[i]['bookmark_id'] = '';    //clear it
                this.props.navigation.state.params._on_update_bookmark(record_id, 0);
                break;
              }
            }
          } else {
            //failed
          }
          this.setState({loading_indicator_state: false});
        });
      }
    };
    //
    _open_detail = (blog_id) => {
      this.props.navigation.navigate('ArticleDetail', {
        current_language: this.state.current_language,
        lang_info: this.state._language_info,
        jwt: this.state.jwt,
        id: blog_id,
        category_label: this.state._language_info[C_MULTI_LANG.search],
        _on_update_bookmark: this._on_update_bookmark});
    };
    //
    _refresh_list = () => {
      Utils.dlog('_refresh_list');
      this.setState({
        offset: 0, data_list: [], loading_indicator_state: true
      }, () => this._get_data_list());
    };
    //called from Artical detail
    _on_update_bookmark = (record_id, bookmark_id) => {
      var _list = this.state.data_list;
      var _len = _list.length;
      for (var i=0; i<_len; i++){
        if (_list[i]['_id'] == record_id){
          this.state.data_list[i]['bookmark_id'] = bookmark_id;    //update it
          break;
        }
      }
      this.setState({loading_indicator_state: false});    //must call for updating UI right away
    };
    //when user clicks Search icon in keyboard
    _on_submit_search = (event) => {
      var _keyword = Utils.trim(event.nativeEvent.text);
      if (this.state.is_searching){
        return;
      } else {
        if (_keyword.length < 2){
          Alert.alert(
            'Alert',
            'Keyword must be more than 2 characters',
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          );
          this.setState({loading_indicator_state: false, is_searching: false});
        } else {
          //allow to search
          setTimeout(() => {
            this.setState({offset: 0, data_list: [], keyword: _keyword, is_searching: true, loading_indicator_state: true},
              () => this._get_data_list());
          }, 500);

        }
      }
    };
   //==========
    render() {
      {/* define how to render country list */}

        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg, {flexDirection: 'row', justifyContent: 'center'}]}>
                <SearchBar
                  height={50}
                  ref={'SearchBar'}
                  placeholder={this.state._language_info[C_MULTI_LANG.search]}
                  autoCorrect={false}
                  inputProps={{autoFocus:true}}
                  padding={5}
                  returnKeyType={'search'}
                  inputStyle={styles.search_bar}
                  textStyle={{fontSize: 14}}
                  onSubmitEditing={(event) => this._on_submit_search(event)}
                />
                <Body style={styles.headerBody}>
                </Body>
                <View style={styles.search_cancel}>
                  <Button
                    transparent
                     onPress={() => this.props.navigation.goBack()}
                  >
                    <Text uppercase={false} style={common_styles.default_font_color}>{this.state._language_info[C_MULTI_LANG.cancel]}</Text>
                  </Button>
                </View>
              </Header>
              {/* END header */}
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

                {/* fake webview to auto calculate height */}
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

export default SearchArticle;
