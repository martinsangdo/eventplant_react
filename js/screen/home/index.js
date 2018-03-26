import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Share} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
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

class Timeline extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        offset: 0,
  			data_list: [],
  			loading_indicator_state: true,
  			isShowMore: false,
        filtering_key: C_Const.FILTER_CATEGORY.LATEST,
        _language_info: {},
        current_language: C_Const.EN_LANG_KEY,
        jwt: ''
  		};
  	}
    //
    componentDidMount() {

    }
    //
    _open_detail = (link) => {
      this.props.navigation.navigate('Viewer', {link: link});
    };
   //==========
    render() {
        return (
            <Container padder>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Left style={[common_styles.headerLeft, {flex:0.15}]}>
                  <Button
                    transparent
                  >
                    <Icon name="menu" style={styles.header_icon}/>
                  </Button>
                </Left>
                <Body style={styles.headerBody}>
                  <Text style={common_styles.bold}>Timeline</Text>
                </Body>
                <Right style={[common_styles.headerRight, {flex:0.15}]}>
                  <Button
                    transparent
                  >
                    <Icon name="search" style={styles.header_icon}/>
                  </Button>
                </Right>
              </Header>
              {/* END header */}
              <TouchableOpacity onPress={() => this._open_detail('http://216.240.43.70:8080/viewer/viewer.html')}>
                <View style={styles.item_row}>
                  <View>
                    <Image style={styles.thumb} source={{uri: 'http://216.240.43.70:8080/viewer/wizard.png'}}/>
                  </View>
                  <View style={styles.text_label}>
                    <Text numberOfLines={2}>Wizard of Oz</Text>
                    <Text style={styles.time_label}>Fixed layout</Text>
                  </View>
                  <View style={styles.forward_ico}>
                    <Icon name="ios-arrow-forward-outline" style={common_styles.darkGrayColor}/>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._open_detail('http://216.240.43.70:8080/viewer/viewer2.html')}>
                <View style={styles.item_row}>
                  <View>
                    <Image style={styles.thumb} source={{uri: 'http://216.240.43.70:8080/viewer/good.png'}}/>
                  </View>
                  <View style={styles.text_label}>
                    <Text numberOfLines={2}>Good Will</Text>
                    <Text style={styles.time_label}>Reflowable layout</Text>
                  </View>
                  <View style={styles.forward_ico}>
                    <Icon name="ios-arrow-forward-outline" style={common_styles.darkGrayColor}/>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._open_detail('http://216.240.43.70:8080/viewer/viewer3.html')}>
                <View style={styles.item_row}>
                  <View>
                    <Image style={styles.thumb} source={{uri: 'http://216.240.43.70:8080/viewer/war.png'}}/>
                  </View>
                  <View style={styles.text_label}>
                    <Text numberOfLines={2}>The War Poems</Text>
                    <Text style={styles.time_label}>Fixed layout</Text>
                  </View>
                  <View style={styles.forward_ico}>
                    <Icon name="ios-arrow-forward-outline" style={common_styles.darkGrayColor}/>
                  </View>
                </View>
              </TouchableOpacity>
            </Container>
        );
    }
}

export default Timeline;
