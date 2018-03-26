import React, { Component } from "react";
import {View, TouchableOpacity, Linking} from "react-native";
import {Container, Content, Text, Header, Body, Left, Right, Icon, Button} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

//https://github.com/react-community/react-native-maps
//https://codeburst.io/react-native-google-map-with-react-native-maps-572e3d3eee14
// https://github.com/react-community/react-native-maps/issues/1391

export default class Map extends BaseScreen {
  render() {

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
                  <Text uppercase={false} style={[common_styles.default_font_color]}>{this.props.navigation.state.params.contact}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Left>
          <Body style={styles.headerBody}>
          </Body>
          <Right style={styles.right}></Right>
        </Header>
        {/* END header */}

        <Content padder>
            <View style={styles.map_container}>
              <View style ={styles.container}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  region={{
                    latitude: this.props.navigation.state.params.lat,
                    longitude: this.props.navigation.state.params.lon,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                  }}
                >
                  <Marker
                    title={this.props.navigation.state.params.title}
                    coordinate={{latitude: this.props.navigation.state.params.lat, longitude: this.props.navigation.state.params.lon}}
                  />
                </MapView>

            </View>

          </View>

        </Content>
      </Container>
    );
  }
}
