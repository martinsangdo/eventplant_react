import React, {Component} from "react";
import {Image, View, WebView, TouchableOpacity} from "react-native";

import {Container, Content, Button, Text, Icon, Header, Left, Body, Right} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here

import Utils from "../../utils/functions";

class Statistic extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
  		};
  	}
    //
    componentDidMount() {
    }
   //==========
    render() {
        return (
          <Container padder>
            <Header style={[common_styles.header, common_styles.whiteBg]}>
              <Left style={styles.left}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                  <View style={styles.left_row}>
                    <View style={[common_styles.float_center]}>
                      <Icon name="ios-arrow-back-outline" style={styles.header_icon}/>
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
              <WebView
                source={{uri: this.props.navigation.state.params.link}}
                style={styles.webview}
                scalesPageToFit={false}
              />
            </Content>
          </Container>
        );
    }
}

export default Statistic;
