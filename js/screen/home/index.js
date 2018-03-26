import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Share, WebView, TextInput} from "react-native";

import {Container, Content, Button, Text, Icon, Picker, Item} from "native-base";

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
          {key: 'num', value:'관리번호'},
          {key: 'company', value:'소속'}
        ],      //for searching
        filter_key: 'name',   //default
        keyword: ''
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
      Utils.dlog(itemValue);
    	this.setState({
    		filter_key: itemValue
    	});
    }
    //
    _begin_search = () => {

    };
   //==========
    render() {
      {/* define how to render country list */}
  		let filter_list = this.state.filter_list.map( (detail) => {
      	return <PickerItem key={detail.key} value={detail.key} label={detail.value} />
      });

        return (
          <Container padder>
            <Content>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
              <View style={{flexDirection: 'row', marginTop:20}}>
                <View style={styles.left}>
                  <Text style={{fontWeight:'bold', fontSize:24, marginLeft:20}}>eventplant</Text>
                  <Text style={{marginLeft:20}}>이벤트응모수({this.state.count})</Text>
                  <View style={{flexDirection:'row'}}>
                    <Picker
                      note
                      iosHeader="Select one"
                      mode="dropdown"
                      name="picker_filter"
                      selectedValue={this.state.filter_key}
                      onValueChange={this._filter_list_change.bind(this)}
                      style={{marginLeft:10}}
                      >
                      {filter_list}
                    </Picker>
                    <Icon name="md-arrow-dropdown" style={{marginTop:5}}/>
                    <TextInput style={{borderBottomColor:'#5499C7', borderBottomWidth:1, width:160, marginLeft:10, marginRight:10}}
                     autoCapitalize="none" onChange={(event) => this.setState({keyword: event.nativeEvent.text})}/>
                     <TouchableOpacity onPress={()=>this._begin_search()}
                       style={{width:80, height: 50, backgroundColor: '#ccc',justifyContent: 'center', alignItems: 'center', borderRadius:6}}>
                       <Text>검색</Text>
                     </TouchableOpacity>
                  </View>
                </View>
                <View style={{flexDirection: 'column', marginLeft: 20}}>
                  <TouchableOpacity onPress={()=>this._begin_search()}
                    style={{width:100, height: 50, backgroundColor: '#555',justifyContent: 'center', alignItems: 'center', borderRadius:6}}>
                    <Text>바코드스캔</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this._begin_search()}
                    style={{width:100, height: 50, backgroundColor: '#555',justifyContent: 'center', alignItems: 'center', borderRadius:6, marginTop:2}}>
                    <Text>통계보기</Text>
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems: 'center', marginLeft:10}}>
                  <Text>화면을 아래로 내리면</Text>
                  <Text>DB가 새로고침 됩니다.</Text>
                </View>
              </View>
              <View style={styles.header_table}>

              </View>
              <View style={styles.table}>

              </View>
              </ScrollView>
            </Content>
          </Container>
        );
    }
}

export default Home;
