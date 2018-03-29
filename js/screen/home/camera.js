import React, {Component} from "react";
import {Image, View, Platform, Alert, NetInfo, TextInput, TouchableOpacity, Dimensions} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon} from "native-base";
import BaseScreen from "../../base/BaseScreen.js";
import {API_URI} from '../../utils/api_uri';

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';
import Toast from 'react-native-root-toast';
import store from 'react-native-simple-store';
import CameraScanner from 'react-native-camera';
const {windowW, windowH} = Dimensions.get('window');

class Camera extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      // current_code: 
    };
  }
    //like onload event
    componentDidMount() {

    }
    //
    _detected_code = (code) => {
      Utils.dlog('detected: ' + code);

    };
   //==========
    render() {
        return (
            <Container>
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
                <Right style={styles.right}>
                  <Icon name="ios-clock-outline" style={styles.header_icon}/>
                  <TouchableOpacity style={{justifyContent:'center'}}>
                    <Text style={{marginBottom:5, marginLeft:10}}>HISTORY</Text>
                  </TouchableOpacity>
                </Right>
              </Header>
              {/* END header */}

              <Content>
              <View>

                <CameraScanner
                    style={styles.preview}
                    onBarCodeRead={(e) => this._detected_code(e.data)}
                    ref={cam => this.camera = cam}
                    aspect={CameraScanner.constants.Aspect.fill}
                    >
                  </CameraScanner>
                </View>
              </Content>
            </Container>
        );
    }
}

export default Camera;
