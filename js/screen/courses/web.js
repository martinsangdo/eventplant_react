import React, { Component } from "react";
import {View, TouchableOpacity, WebView} from "react-native";
import {Container, Content, Header, Body, Left, Right, Icon, Button} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";
import Spinner from 'react-native-loading-spinner-overlay';
import Utils from "../../utils/functions";

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here

export default class Web extends BaseScreen {
  constructor(props) {
		super(props);
		this.state = {
			loading_indicator_state: true
		};
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

	};
  //==========
  render() {

    return (
      <Container padder>
        <Header style={[common_styles.header, common_styles.whiteBg]}>
          <Left style={styles.left}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={styles.left_row}>
                <View style={[common_styles.float_center]}>
                  <Icon name="ios-close" style={styles.header_icon}/>
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
