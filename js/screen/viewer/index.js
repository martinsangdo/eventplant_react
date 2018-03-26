import React, {Component} from "react";
import {View, StatusBar, Platform, TouchableOpacity, FlatList, ScrollView, Dimensions, WebView} from "react-native";

import {Container, Content, Text, Header, Title, Body, Left, Right, Icon, Button} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import store from 'react-native-simple-store';
import Spinner from 'react-native-loading-spinner-overlay';
import AutoHTML from 'react-native-autoheight-webview';

//define label
const T_ABOUT = 'about';
const T_CONTACT = 'contact';

class Viewer extends BaseScreen {
    constructor(props) {
      super(props);
      this.state = {
        loading_indicator_state: true
      };
    }
    //
    componentDidMount() {
    }
    //close spinner after page loading
    _close_spinner = () => {
      this.setState({
        loading_indicator_state: false
      });
    };
    //
    _start_spinner = () => {
      this.setState({
        loading_indicator_state: true
      });
    };
    //
  	_onNavigationStateChange = (event) => {
  		Utils.dlog('_onNavigationStateChange '+event.url);
      // return false;

  	};
    //
    _onError = (err) => {
      Utils.dlog(err);
    };
    //
    _onShouldStartLoadWithRequest = (a) => {
      Utils.xlog('_onShouldStartLoadWithRequest', a);
      if(checkUrl(e.url)) {
        Utils.xlog('_onShouldStartLoadWithRequest 111', a);
          return false;
      }
      return true;
    };
    //
    _onMessage = (b) => {
      Utils.xlog('_onMessage', b);
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
                    </View>
                  </TouchableOpacity>
                </Left>
                <Body style={styles.headerBody}>
                </Body>
                <Right style={styles.right}></Right>
              </Header>
              {/* END header */}
              <Content>
                <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />

                <WebView
                  ref={'WEBVIEW_REF'}
                  nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
                  source={{uri: this.props.navigation.state.params.link, baseUrl: ''}}
                  style={styles.webview}
                  onLoadEnd={this._close_spinner}
                  onLoadStart={this._start_spinner}
                  mediaPlaybackRequiresUserAction={false}
                  renderError={(e)=> this._onError(e)}
                  onMessage={this._onMessage}
                  onShouldStartLoadWithRequest={this._onNavigationStateChange}
                  onNavigationStateChange={this._onNavigationStateChange}
                  urlPrefixesForDefaultIntent={['blob']}
                />

              </Content>
            </Container>
        );
    }
}

export default Viewer;
