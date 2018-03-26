import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Share, WebView} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon} from "native-base";

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

  		};
  	}
    //
    componentDidMount() {

    }
    //
    _onNavigationStateChange = (event) => {
  		Utils.dlog('_onNavigationStateChange '+event.url);

  	};
   //==========
    render() {
        return (
          <Container padder>
            <Content>
                <View style={styles.map_container}>
                  <View style ={styles.container}>
                    <WebView
                      ref={'WEBVIEW_REF'}
                      source={{uri: this.props.navigation.state.params.link}}
                      style={styles.webview}
                      onLoadEnd={this._close_spinner}
                      onLoadStart={this._start_spinner}
                      onNavigationStateChange={this._onNavigationStateChange}
                    />
                </View>
              </View>
            </Content>
          </Container>
        );
    }
}

export default Timeline;
