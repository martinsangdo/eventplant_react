import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity, FlatList, ScrollView, Share, WebView, TextInput, Dimensions} from "react-native";

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
import SQLite from 'react-native-sqlite-2';

const db = SQLite.openDatabase('EP.db', '1.0', '', 1);
const {windowW, windowH} = Dimensions.get('window');

const PickerItem = Picker.Item;
//https://github.com/craftzdog/react-native-sqlite-2

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
          event: '이벤트응모',
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
        filter_key: 'name',   //default selecting
        keyword: '',
        user_info: 0,
        loading_indicator_state: true,
        is_portrait_mode: true
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
          //insert into local db
          this._save_data_2_db(response.results);
          //
          Toast.show(this.state.user_info.b_name+'님 환영합니다');
        } else {
          //something wrong
          this.setState({loading_indicator_state: false});
        }
      });
  	};
    //
    _save_data_2_db = (list) => {
      var me = this;
      db.transaction(function (txn) {
        txn.executeSql('DROP TABLE IF EXISTS `visitor`', []);
        var create_table_sql = "CREATE TABLE IF NOT EXISTS `visitor`("
                + " _id INTEGER PRIMARY KEY AUTOINCREMENT, "
                + " num VARCHAR(32), "
                + " name VARCHAR(128), "
                + " jtype VARCHAR(128), "
                + " company VARCHAR(128), "
                + " event DATETIME, "
                + " dept VARCHAR(128), "
                + " position VARCHAR(128), "
                + " hp VARCHAR(32), "
                + " tel VARCHAR(32), "
                + " email VARCHAR(64));";
        // Utils.dlog(create_table_sql);
        txn.executeSql(create_table_sql, [], function(response, error){
                  //insert data
                  var total = list.length;
                  for (var i=0; i<total; i++){
                    txn.executeSql('INSERT INTO visitor (num, name, jtype, company, event, dept, position, hp, tel, email) VALUES '+
                        '(:num, :name, :jtype, :company, :event, :dept, :position, :hp, :tel, :email)',
                        [list[i]['num'], list[i]['name'], list[i]['jtype'], list[i]['company'], list[i]['b_num'],
                        list[i]['department'], list[i]['position'], list[i]['phone'], list[i]['tel'], list[i]['email']], function(response, error){
                                  // Utils.xlog('insert table', response);
                                  // Utils.xlog('insert table', error);
                                }, function (error){
                                  // Utils.xlog('insert table error', error);
                                });
                  }
                  me._get_data_list_from_db();
                }, function (error, bbb){
                  // Utils.xlog('create table error', error);
                  // Utils.xlog('create table error', bbb);
                });
      });
    };
    //sort by event date
    _get_data_list_from_db = () => {
      var me = this;
      db.transaction(function (txn) {
        txn.executeSql('SELECT * FROM `visitor` WHERE event<>"미응모" ORDER BY event DESC', [], function (tx, res) {
          // Utils.xlog('list', res.rows._array);
          var list = res.rows._array;
          var total = list.length;
          me.setState({count: total});
          var idx = total;
          for (var i=0; i<total; i++){
            list[i]['index'] = idx--;
            me.state.data_list.push(list[i]);
          }
          me.setState({loading_indicator_state: false});
        }, function(err, detail){
          me.setState({loading_indicator_state: false});
        });
      });
    };
    //handle actions when user changes city
    _filter_list_change(itemValue, itemIndex){
      Utils.dlog(itemValue);
    	this.setState({
    		filter_key: itemValue
    	});
    }
    //
    _begin_search = () => {
      if (Utils.isEmpty(this.state.keyword)){
        //show all
        var sql = 'SELECT * FROM `visitor` WHERE event<>"미응모" ORDER BY event DESC';
      } else {
        var where = this.state.filter_key + ' LIKE "%'+this.state.keyword+'%"';
        var sql = 'SELECT * FROM `visitor` WHERE event<>"미응모" AND '+where+' ORDER BY event DESC';
      }
      this.setState({loading_indicator_state: true});
      var me = this;
      db.transaction(function (txn) {
        txn.executeSql(sql, [], function (tx, res) {
          // Utils.xlog('list', res.rows._array);
          var list = res.rows._array;
          var total = list.length;
          if (total == 0){
            //not found
            Toast.show('Not found');
          } else {
            //found
            //clear displaying list
            me.setState({data_list: [{
              index: '순번',
              num: '관리번호',
              name: '성명',
              jtype: '등록구분',
              company: '소속',
              event: '이벤트응모',
              department: '부서',
              position: '직위',
              phone: 'HP',
              tel: 'Tel',
              email: 'Email'
            }]});
            var idx = total;
            for (var i=0; i<total; i++){
              list[i]['index'] = idx--;
              me.state.data_list.push(list[i]);
            }
          }
          me.setState({loading_indicator_state: false});
        }, function(err, detail){
          me.setState({loading_indicator_state: false});
          // Utils.dlog(detail);
        });
      });

    };
    //
    _open_statistic = () => {
      this.props.navigation.navigate('Statistic', {
        link: 'http://eventplant.cafe24.com/app/stats.html?cam_idx='+
            this.state.user_info.cam_idx+'&b_id='+this.state.user_info.b_id
      });
    };
    //
    _load_more = () => {};
    //
    _refresh_list = () => {
      Utils.dlog('_refresh_list');
      var me = this;
      db.transaction(function (txn) {
        txn.executeSql('SELECT * FROM `visitor` WHERE event<>"미응모" ORDER BY event DESC', [], function (tx, res) {
          me.setState({data_list: [{
            index: '순번',
            num: '관리번호',
            name: '성명',
            jtype: '등록구분',
            company: '소속',
            event: '이벤트응모',
            department: '부서',
            position: '직위',
            phone: 'HP',
            tel: 'Tel',
            email: 'Email'
          }]});
          // Utils.xlog('list', res.rows._array);
          var list = res.rows._array;
          var total = list.length;
          me.setState({count: total});
          var idx = total;
          for (var i=0; i<total; i++){
            list[i]['index'] = idx--;
            me.state.data_list.push(list[i]);
          }
        }, function(err, detail){
        });
      });
    };
    //
    _keyExtractor = (item) => item.index;
  	//render the list. MUST use "item" as param
  	_renderItem = ({item}) => (
  			<View style={[styles.list_item, (item.index=='순번'?common_styles.grayBg:(item.index%2==1?common_styles.litegrayBg:common_styles.whiteBg))]}>
          <Text style={[common_styles.justifyCenter, {width:50}]}>{item.index}</Text>
          <Text style={[common_styles.justifyCenter, {width:120}]}>{item.num}</Text>
          <Text style={[common_styles.justifyCenter, {width:100}]}>{item.name}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.jtype}</Text>
          <Text style={[common_styles.justifyCenter, {width:150}]}>{item.company}</Text>
          <Text style={[common_styles.justifyCenter, {width:200}]}>{item.event}</Text>
          <Text style={[common_styles.justifyCenter, {width:100}]}>{item.department}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.position}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.phone}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.tel}</Text>
          <Text style={[common_styles.justifyCenter, {width:80}]}>{item.email}</Text>
  			</View>
    );
    //
    DetectOrientation = () => {
      this.setState({is_portrait_mode: this.state.Height_Layout > this.state.Width_Layout});
    };
    //
    _open_scanner = () => {
      this.props.navigation.navigate('Camera', {user_info: this.state.user_info});
    };
   //==========
    render() {
      {/* define how to render country list */}
  		let filter_list = this.state.filter_list.map( (detail) => {
      	return <PickerItem key={detail.key} value={detail.key} label={detail.value} />
      });

        return (
          <Container padder  onLayout={(event) => this.setState({Width_Layout : event.nativeEvent.layout.width,
                                                                Height_Layout : event.nativeEvent.layout.height
                                                                }, ()=> this.DetectOrientation())}>
            <Spinner visible={this.state.loading_indicator_state} textStyle={common_styles.whiteColor} />
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                <View style={{flexDirection: 'row', marginTop:20, marginBottom:this.state.is_portrait_mode?30:70}}>
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
                    </View>
                  </View>
                  <View style={{flexDirection: 'column', marginLeft: 20}}>
                    <TouchableOpacity onPress={()=>this._refresh_list()} style={{alignSelf: 'flex-end', marginBottom:10}}>
                      <Icon name="ios-refresh"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._begin_search()}
                      style={{width:80, height: 50, backgroundColor: '#ccc',justifyContent: 'center', alignItems: 'center', borderRadius:6}}>
                      <Text>검색</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'column', marginLeft: 20, marginRight:10}}>
                    <TouchableOpacity onPress={()=>this._open_scanner()}
                      style={{width:100, height: 50, backgroundColor: '#555',justifyContent: 'center', alignItems: 'center', borderRadius:6}}>
                      <Text style={{color: '#fff'}}>바코드스캔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._open_statistic()}
                      style={{width:100, height: 50, backgroundColor: '#555',justifyContent: 'center', alignItems: 'center', borderRadius:6, marginTop:2}}>
                      <Text style={{color: '#fff'}}>통계보기</Text>
                    </TouchableOpacity>
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
                      onEndReached={({ distanceFromEnd }) => this._load_more()}
                    />
              </ScrollView>
          </Container>
        );
    }
}

export default Home;
