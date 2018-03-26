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

class Home extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        count: 0,
        data_list: []
  		};
  	}
    //
    componentDidMount() {
      this._load_data();
    }
    //
    _load_data = () => {
      Utils.dlog(this.props.navigation.state.params);
      var uri = 'http://eventplant.cafe24.com/app/appdata.php?cam_idx='+
          this.props.navigation.state.params.user_info.cam_idx+'&b_id='+
          this.props.navigation.state.params.user_info.b_id;
      RequestData.sentGetRequest(uri, (response, error) => {
        // Utils.dlog(response);
        if (!Utils.isEmpty(response) && !Utils.isEmpty(response.results)){
          //success
          var list = response.results;
          var total = list.length;
          this.setState({count: response.counts});
          for (var i=0; i<total; i++){
            if (list[i]['b_num'] != '미응모'){
              this.state.data_list.push(list[i]);
            }
          }
          Utils.dlog(this.state.data_list);
        } else {
          //something wrong
        }
      });
  	};
   //==========
    render() {
        return (
          <Container padder>
            <Content>
                <View style={styles.map_container}>
                  <View style ={styles.container}>

                </View>
              </View>
            </Content>
          </Container>
        );
    }
}

export default Home;
