import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Share, WebView} from "react-native";

import {Container, Content, Button, Text, Header, Title, Body, Left, Right, Icon, Picker, Item} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import {API_URI} from '../../utils/api_uri';
import store from 'react-native-simple-store';

import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';
import RequestData from '../../utils/https/RequestData';
import Spinner from 'react-native-loading-spinner-overlay';

const PickerItem = Picker.Item;

class Home extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        count: 0,
        data_list: [],
        filter_list: [
          {key: 'name', value:'성명'},
          {key: 'name', value:'관리번호'},
          {key: 'name', value:'소속'}
        ],      //for searching
        filter_value: '성명'   //default
  		};
  	}
    //
    componentDidMount() {
      // this._load_data();
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
          //todo: show toast welcome, b_name
        } else {
          //something wrong
        }
      });
  	};
    //
    //handle actions when user changes city
    _filter_list_change(itemValue, itemIndex){
    	this.setState({
    		filter_value: itemValue
    	});
    }
   //==========
    render() {
      {/* define how to render country list */}
  		let filter_list = this.state.filter_list.map( (detail) => {
      	return <PickerItem key={detail.key} value={detail.key} label={detail.value} />
      });

        return (
          <Container padder>
            <Content>
              <View style={styles.header}>
                <View style={styles.left}>
                  <Text style={{fontWeight:'bold', fontSize:24}}>eventplant</Text>
                  <Text>이벤트응모수({this.state.count})</Text>
                  <View style={{}}>
                  <Picker
                    note
                    iosHeader="Select one"
                    mode="dropdown"
                    name="picker_filter"
                    selectedValue={this.state.filter_value}
                    onValueChange={this._filter_list_change.bind(this)}
                    >
                    {filter_list}
                  </Picker>
                  </View>
                </View>
                <View style={styles.middle}>

                </View>
                <View style={styles.right}>

                </View>
              </View>
              <View style={styles.header_table}>

              </View>
              <View style={styles.table}>

              </View>
            </Content>
          </Container>
        );
    }
}

export default Home;
