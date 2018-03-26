import React, {Component} from "react";
import {Image, ImageBackground, View, Platform, TouchableOpacity, FlatList, ScrollView, Share} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import {API_URI} from '../../utils/api_uri';
import RequestData from '../../utils/https/RequestData';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';
import store from 'react-native-simple-store';
import {C_Const, C_MULTI_LANG} from '../../utils/constant';

import Utils from "../../utils/functions";

class Home extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        offset: 0,
  			limit: 9,    //first time is 9
  			data_list: [],
  			loading_indicator_state: false,
  			isShowMore: false,
        filtering_key: C_Const.FILTER_COUNTRY.ALL,
        _language_info: {},
        current_language: C_Const.EN_LANG_KEY
  		};
  	}
    //
    componentDidMount() {
      this._get_language_content();
      this.props.screenProps.addListener(C_Const.EMIT_KEY.CHANGE_LANGUAGE, (data)=>{
        if (data[C_Const.STORE_KEY.CURRENT_LANG_KEY] != null && data['lang_info'] != null){
          this.setState({
            current_language: data[C_Const.STORE_KEY.CURRENT_LANG_KEY],
  					_language_info: data['lang_info']
  				}, () => {
            setTimeout( () => {
              this._refresh_list();
            }, 1000);
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
          //get filtering
          store.get(C_Const.STORE_KEY.FILTERING_COUNTRY)
      		.then(filtering => {
      			if (filtering != null){
      				this.setState({
      					filtering_key: filtering
      				}, () => this._get_data_list(this.state.offset, this.state.limit));
      			} else {
              //cannot get filter info
              this._get_data_list(this.state.offset, this.state.limit);
            }
      		});
  			} else {
          //cannot get language
        }
  		});
  	};
    //==========
    _get_data_list = (offset, limit) => {
      var params = {
        offset: offset,
        limit: limit
      };
      // Utils.dlog(params);
      this.setState({offset: offset, limit: limit});
      if (this.state.filtering_key == C_Const.FILTER_COUNTRY.ALL){
        //get all, not filter
        var uri = API_URI.GET_FREE_COURSES_PAGING;
      } else {
        //filter articles
        params['countries'] = [this.state.filtering_key];
        var uri = API_URI.SEARCH_EVENT;
      }
      RequestData.sentPostRequestWithLanguageHeader(uri, this.state.current_language, params,
          (response, error) => {
            Utils.xlog('courses list', response.data);
            if (response != null && !Utils.isEmpty(response.data) && response.data.length > 0){
              //has some data
              var len = response.data.length;
      				if (len > 0){
      					for (var i=0; i<len; i++){
      						this.state.data_list.push(response.data[i]);
      					}
                // Utils.dlog(this.state.data_list);
                if (len < this.state.limit){
                  //no more
                  this.setState({isShowMore: false});
                } else {
                  this.setState({isShowMore: true});  //maybe have more
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
    //==========
    //extract city from event data
    _extract_city = (term) => {
      var len = term.length;
      for (var i=0; i<len; i++){
        if (term[i].taxonomy == 'city_portfolio'){
          return term[i].name;
        }
      }
    };
    //==========
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
    _open_link = (link) => {
      if (link == '#'){
        link = Utils.getHomepageLanguage(this.state.current_language);
      }
      link = link.replace('https://', 'http://');
      this.props.navigation.navigate('Web', {link: link});
    };
    //
    _keyExtractor = (item) => item._id;
  	//render the list. MUST use "item" as param
  	_renderItem = ({item}) => (
      <ImageBackground source={{uri: Utils.isEmpty(item.img_src)?null:item.img_src}} style={styles.thumb}>
        <View style={styles.full_overlay}/>
        <View style={styles.view_inside_img}>
          <View style={common_styles.margin_t_20} />
          <View>
            <View style={[common_styles.margin_l_20, common_styles.float_left]}>
              <Text style={[common_styles.whiteBg, common_styles.default_font_color, styles.country_label]} uppercase={true}>{this._extract_city(item.term)}</Text>
            </View>
            <View style={common_styles.margin_t_5} />
            <Text style={[common_styles.bold, common_styles.whiteColor, common_styles.margin_l_20]}>{Utils.formatCourseDate(this.state.current_language, item.event_date)}</Text>
            <View style={common_styles.margin_t_5} />
            <Text uppercase={false} style={[common_styles.margin_l_20, common_styles.whiteColor]}>{item.title}</Text>
          </View>
          <View style={styles.btn_row_container}>
            <View style={styles.btn_row}>
              <View style={{width:'50%'}}>
                <TouchableOpacity activeOpacity={0.8}>
                  <Button transparent style={styles.btn_share_left} onPress={() => this._open_link(item.link_url)}>
                      <Text uppercase={false} style={common_styles.whiteColor}>{this.state._language_info[C_MULTI_LANG.learn_more]}</Text>
                  </Button>
                </TouchableOpacity>
              </View>
              <View style={{width:1, backgroundColor:'#ccc'}}/>
              <View style={{width:'50%'}}>
                <TouchableOpacity>
                  <Button transparent style={styles.btn_share_right} onPress={() => this._share_link(item.title, item.link_url)}>
                      <Text uppercase={false} style={common_styles.whiteColor}>{this.state._language_info[C_MULTI_LANG.share]}</Text>
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  	//load more item
  	_load_more = () => {
      setTimeout(() => {
        if (this.state.isShowMore && !this.state.loading_indicator_state){
          Utils.dlog('load more events');
          this.setState({loading_indicator_state: true});
    			this._get_data_list(this.state.data_list.length, 4); //Spec: load more: 4 items
        }
      }, 500);
  	};
    //
    _open_filter = () => {
      this.props.navigation.navigate('FilterCountry', {
        current_language: this.state.current_language,
        lang_info: this.state._language_info,
        onPressDone: this._begin_filter,
        filtering_key: this.state.filtering_key
      });
    };
    //apply filter of country
    _begin_filter = (new_filter_key) => {
      this.setState({
        filtering_key: new_filter_key
      }, () => this._refresh_list());
    };
    //
    _open_search = () => {
      this.props.navigation.navigate('SearchEvent', {
        current_language: this.state.current_language,
        lang_info: this.state._language_info
      });
    };
    //
    _refresh_list = () => {
      this.setState({
        offset: 0, limit: 9, data_list: [], loading_indicator_state: true
      }, () => this._get_data_list(0, 9));
    };
   //==========
    render() {
        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Left style={[common_styles.headerLeft, {flex:0.15}]}>
                  <Button
                    transparent
                    onPress={() => this._open_filter()}
                  >
                    <Icon name="menu" style={styles.header_icon}/>
                  </Button>
                </Left>
                <Body style={styles.headerBody}>
                  <Text style={common_styles.bold}>{this.state._language_info[C_MULTI_LANG.free_courses]}</Text>
                </Body>
                <Right style={[common_styles.headerRight, {flex:0.15}]}>
                  <Button
                    transparent
                    onPress={() => this._open_search()}
                  >
                    <Icon name="search" style={styles.header_icon}/>
                  </Button>
                </Right>
              </Header>
              <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />
              <Content>
                <FlatList
                  data={this.state.data_list}
                  renderItem={this._renderItem}
                  refreshing={false}
                  initialNumToRender={10}
                  onRefresh={() => this._refresh_list()}
                  onEndReachedThreshold={0.5}
                  bounces={false}
                  keyExtractor={this._keyExtractor}
                />
              {this.state.isShowMore &&
                <View style={[common_styles.mainGreenBg, styles.load_more]}>
                    <View>
                      <TouchableOpacity activeOpacity={0.8} onPress={()=>this._load_more()}>
                        <Feather name="plus-circle" style={[common_styles.whiteColor, common_styles.font_30]}/>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity activeOpacity={0.8} onPress={()=>this._load_more()}>
                        <Text uppercase={false} style={common_styles.whiteColor}>{this.state._language_info[C_MULTI_LANG.more_courses]}</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              }
              </Content>
            </Container>
        );
    }
}

export default Home;
