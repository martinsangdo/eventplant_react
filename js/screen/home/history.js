import React, {Component} from "react";
import {Image, View, Platform, Alert, FlatList, TextInput, TouchableOpacity, Dimensions, Vibration} from "react-native";

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
import SQLite from 'react-native-sqlite-2';

const {windowW, windowH} = Dimensions.get('window');
const db = SQLite.openDatabase('EP.db', '1.0', '', 1);

class History extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      user_info: {},
      data_list: [],
      item_num: 0
    };
  }
    //like onload event
    componentDidMount() {
      this.setState({user_info: this.props.navigation.state.params.user_info});
      this._get_history_data();
    }
    //
    _get_history_data = () => {
      var me = this;
      //check if table "history" exists
      db.transaction(function (txn) {
        var check_table_exist = 'SELECT * FROM history WHERE cam_idx='+me.state.user_info.cam_idx+' ORDER BY event DESC';
        txn.executeSql(check_table_exist, [], function(tx, res){
          Utils.xlog('history list', res);
                if (res.rows.length == 0){
                  //not found

                } else {
                  //found
                  me.setState({item_num: res.rows.length});
                  for (var i=0; i<res.rows.length; i++){
                    me.state.data_list.push(res.rows._array[i]);
                  }
                }
              }, function (err, err2){
                Utils.xlog('history list err', err2);
              });
      });
    };
    _keyExtractor = (item) => item._id;
  	//render the list. MUST use "item" as param
  	_renderItem = ({item}) => (
  			<View style={[styles.history_list_item, {backgroundColor: '#000', padding: 10}]}>
          <Text style={{fontSize:20, color:'#fff'}}>{item.num+'번 '+ item.name + '님'}</Text>
          <Text style={[{fontSize:15, color:'#fff'}]}>({Utils.formatDate(item.event)})</Text>
  			</View>
    );
    //
    _confirm_clear_history = () => {
      Alert.alert(
        'Confirmation',
        'Are you sure?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this._delete_history()},
        ],
        { cancelable: false }
      );
    };
    //
    _delete_history = () => {
      var me = this;
      //check if table "history" exists
      db.transaction(function (txn) {
        var delete_sql = 'DELETE FROM history WHERE cam_idx='+me.state.user_info.cam_idx;
        txn.executeSql(delete_sql, [], function(tx, res){
          me.setState({
            data_list: [],
            item_num: 0
          });
              }, function (err, err2){
                Utils.xlog('delete list err', err2);
              });
      });
    };
   //==========
    render() {
        return (
            <Container>
              <Header style={[common_styles.header, {backgroundColor: '#85C1E9'}]}>
                <Left style={{width:200, flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <View style={styles.left_row}>
                      <Icon name="ios-arrow-back-outline" style={{color: '#fff'}}/>
                    </View>
                  </TouchableOpacity>
                  <Text style={{marginLeft: 10, color: '#fff'}}>Scan list ({this.state.item_num})</Text>
                </Left>
                <Right style={styles.right}>
                {this.state.item_num > 0 &&
                  <TouchableOpacity style={{justifyContent:'center'}} onPress={() => this._confirm_clear_history()}>
                    <Icon name="ios-trash" style={{color: '#fff'}}/>
                  </TouchableOpacity>
                }
                </Right>
              </Header>
              {/* END header */}

              <View style={{backgroundColor: '#000', height:'100%'}}>
                <FlatList
                  data={this.state.data_list}
                  renderItem={this._renderItem}
                  refreshing={false}
                  initialNumToRender={10}
                  onEndReachedThreshold={0.5}
                  keyExtractor={this._keyExtractor}
                />
              </View>
            </Container>
        );
    }
}

export default History;
