import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Share, WebView, TextInput} from "react-native";

import {Container, Content, Button, Text, Icon, Picker, Item} from "native-base";

import BaseScreen from "../../base/BaseScreen.js";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import {API_URI} from '../../utils/api_uri';
import store from 'react-native-simple-store';
import Toast from 'react-native-root-toast';

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
        data_list: [{
          index: '순번',
          num: '관리번호',
          name: '성명',
          jtype: '등록구분',
          company: '소속',
          b_num: '이벤트응모',
          department: '부서',
          position: '직위',
          phone: 'HP',
          tel: 'Tel',
          email: 'Email'
        }],
        filter_list: [
          {key: 'name', value:'성명'},
          {key: 'num', value:'관리번호'},
          {key: 'company', value:'소속'}
        ],      //for searching
        filter_key: 'name',   //default
        keyword: '',
        user_info: 0
  		};
  	}
    //
    componentDidMount() {
      store.get(C_Const.STORE_KEY.USER_INFO)
      		.then(user_info => {
      			if (user_info != null){
              Utils.xlog('saved user info', user_info);
      				this.setState({
      					user_info: user_info
      				}, () => this._load_data());
      			} else {
              //cannot get user info

            }
      });
      // this._load_data();
    }
    //
    _load_data = () => {
      var uri = 'http://eventplant.cafe24.com/app/appdata.php?cam_idx='+
          this.state.user_info.cam_idx+'&b_id='+this.state.user_info.b_id;
      RequestData.sentGetRequest(uri, (response, error) => {
        // Utils.dlog(response);
        if (!Utils.isEmpty(response) && !Utils.isEmpty(response.results)){
          //success
          var list = response.results;
          var total = list.length;
          this.setState({count: response.counts});
          var idx = response.counts;
          for (var i=0; i<total; i++){
            if (list[i]['b_num'] != '미응모'){
              list[i]['index'] = idx--;
              this.state.data_list.push(list[i]);
            }
          }
          Toast.show(this.state.user_info.b_name+'님 환영합니다');
          Utils.dlog(this.state.data_list);
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
    //
    _open_statistic = () => {
      this.props.navigation.navigate('Statistic', {
        link: 'http://eventplant.cafe24.com/app/stats.html?cam_idx='+
            this.state.cam_idx+'&b_id='+this.state.b_id
      });
    };
    //
    _load_more = () => {};
    //
    _refresh_list = () => {
      Utils.dlog('_refresh_list');
    };
    //
    //
    _keyExtractor = (item) => item.index;
  	//render the list. MUST use "item" as param
  	_renderItem = ({item}) => (
  			<View style={[styles.list_item, (item.index=='순번'?common_styles.grayBg:(item.index%2==1?common_styles.litegrayBg:common_styles.whiteBg))]}>
          <Text style={[common_styles.justifyCenter, {width:50}]}>{item.index}</Text>
          <Text style={[common_styles.justifyCenter, {width:100}]}>{item.num}</Text>
          <Text style={[common_styles.justifyCenter, {width:100}]}>{item.name}</Text>
          <Text style={[common_styles.justifyCenter, {width:100}]}>{item.jtype}</Text>
          <Text style={[common_styles.justifyCenter, {width:150}]}>{item.company}</Text>
          <Text style={[common_styles.justifyCenter, {width:200}]}>{item.b_num}</Text>
          <Text style={[common_styles.justifyCenter, {width:100}]}>{item.department}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.position}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.phone}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.tel}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.email}</Text>
  			</View>
    );
   //==========
    render() {
      {/* define how to render country list */}
  		let filter_list = this.state.filter_list.map( (detail) => {
      	return <PickerItem key={detail.key} value={detail.key} label={detail.value} />
      });

        return (
          <Container padder>
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
                    <TouchableOpacity onPress={()=>this._open_scanner()}
                      style={{width:100, height: 50, backgroundColor: '#555',justifyContent: 'center', alignItems: 'center', borderRadius:6}}>
                      <Text>바코드스캔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._open_statistic()}
                      style={{width:100, height: 50, backgroundColor: '#555',justifyContent: 'center', alignItems: 'center', borderRadius:6, marginTop:2}}>
                      <Text>통계보기</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{justifyContent:'center', alignItems: 'center', marginLeft:10}}>
                    <Text>화면을 아래로 내리면</Text>
                    <Text>DB가 새로고침 됩니다.</Text>
                  </View>
                </View>
              </ScrollView>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    <FlatList
                      data={this.state.data_list}
                      renderItem={this._renderItem}
                      refreshing={false}
                      initialNumToRender={10}
                      onRefresh={() => this._refresh_list()}
                      onEndReachedThreshold={0.5}
                      keyExtractor={this._keyExtractor}
                      style={styles.data_table}
                      onEndReached={({ distanceFromEnd }) => this._load_more()}
                    />
              </ScrollView>
          </Container>
        );
    }
}

export default Home;
