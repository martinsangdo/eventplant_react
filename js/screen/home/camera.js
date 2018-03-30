import React, {Component} from "react";
import {Image, View, Platform, Alert, NetInfo, TextInput, TouchableOpacity, Dimensions, Vibration} from "react-native";

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
import Orientation from 'react-native-orientation';

const {windowW, windowH} = Dimensions.get('window');
const db = SQLite.openDatabase('EP.db', '1.0', '', 1);
const launchscreenLogo = require("../../../img/event_plant.png");

class Camera extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      is_saving_code: false,    //lock reading barcode many times
      user_info: {}
    };
  }
    componentWillMount() {
      Orientation.lockToLandscape();
    }
    //like onload event
    componentDidMount() {
      this.setState({user_info: this.props.navigation.state.params.user_info});
      Orientation.lockToLandscape();
      Orientation.addOrientationListener(this._orientationDidChange);
    }
    componentWillUnmount() {
      Orientation.removeOrientationListener(this._orientationDidChange);
      Orientation.unlockAllOrientations();
    }
    //
    _orientationDidChange = () => {
      Orientation.lockToLandscape();    //force to lock
    };
    //
    _detected_code = (code) => {
      if (this.state.is_saving_code){
        return;
      }
      this.setState({is_saving_code: true},
      () => {
        this._save_code(code);
      });
    };
    //
    _save_code = (code) => {
      var uri = 'http://eventplant.cafe24.com/app/scan.php?cam_idx='+this.state.user_info.cam_idx+'&num='+code+'&b_id='+this.state.user_info.b_id;
      Utils.xlog('save code uri', uri);
      RequestData.sentGetRequest(uri, (response, error) => {
        Utils.dlog(response);
        if (!Utils.isEmpty(response)){
          Vibration.vibrate(1000);
          Toast.show(response.num+'번 '+response.name+'님 이벤트 확인');
          //upsert into SQLite
          this._upsert_code_2_db(code, response);
        }
        //avoid scan many times
        setTimeout(() => {
          this.setState({is_saving_code: false});
        }, 2000);
      });
    };
    //
    _upsert_code_2_db = (code, resp) => {
      var me = this;
      db.transaction(function (txn) {
        var search_sql = 'SELECT name FROM visitor WHERE num = "'+code+'"';    //find if exist in DB
        txn.executeSql(search_sql, [], function(tx, res){
                if (res.rows.length > 0){
                  //found, update it
                  var update_sql = 'UPDATE visitor SET event="'+Utils.formatDateVisitor(new Date())+'" WHERE NUM="'+code+'"';
                  txn.executeSql(update_sql, [], function(tx, res){
                    Utils.dlog('after update visitor');
                    me._update_history(resp.name, code);
                  });
                } else {
                  //not found, insert it
                  var insert_sql = 'INSERT INTO visitor (name, event, num) values ("'+resp.name+'","'+Utils.formatDateVisitor(new Date())+'", "'+code+'")';
                  txn.executeSql(insert_sql, [], function(tx, res){
                    Utils.dlog('after insert visitor');
                    me._update_history(resp.name, code);
                  });
                }
            }, function (error, bbb){
            });
      });
    };
    //
    _update_history = (name, code) => {
      var me = this;
      //check if table "history" exists
      db.transaction(function (txn) {
        var check_table_exist = 'SELECT name FROM sqlite_master WHERE type="table" AND name="history"';
        var insert_sql = 'INSERT INTO history (name, event, num, cam_idx) values ("'+name+'","'+(new Date())+'", "'+code+'", '+me.state.user_info.cam_idx+')';
        txn.executeSql(check_table_exist, [], function(tx, res){
                if (res.rows.length == 0){
                  //create table
                  var create_table_sql = "CREATE TABLE IF NOT EXISTS `history`("
                          + " _id INTEGER PRIMARY KEY AUTOINCREMENT, "
                          + " num VARCHAR(32), "
                          + " name VARCHAR(128), "
                          + " event DATETIME, "
                          + " cam_idx INTEGER);";
                  //insert into db
                  txn.executeSql(create_table_sql, [], function(tx, res){
                    Utils.dlog('create_table_sql');
                    txn.executeSql(insert_sql, [], function(tx, res){
                      Utils.dlog('insert new history');
                    }, function (err, err2){
                      Utils.xlog('111', err2);
                    });
                  }, function (err, err2){
                    Utils.xlog('222', err2);
                  });
                } else {
                  //insert into table
                  txn.executeSql(insert_sql, [], function(tx, res){
                    Utils.dlog('insert history');
                  }, function (err, err2){
                    Utils.xlog('333', err2);
                  });
                }
              }, function (err, err2){
              });
      });
    };
    //
    _go_history = () => {
      Orientation.removeOrientationListener(this._orientationDidChange);
      Orientation.unlockAllOrientations();
      this.props.navigation.navigate('History', {user_info: this.state.user_info});
    };
    //
    _go_back = () => {
      Orientation.removeOrientationListener(this._orientationDidChange);
      Orientation.unlockAllOrientations();
      this.props.navigation.goBack();
    };
   //==========
    render() {
        return (
            <Container>
              <Header style={[common_styles.header, common_styles.whiteBg, {maxHeight:80}]}>
                <Left style={{flex:0.3, flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => this._go_back()}>
                    <Icon name="ios-arrow-back-outline" style={styles.header_icon}/>
                  </TouchableOpacity>
                  <Image source={launchscreenLogo} style={{width:35, height:35, marginLeft:5}}/>
                  <Text style={{marginLeft:5, fontWeight:'bold', marginTop:5}}>Barcode Scanner</Text>
                </Left>
                <Body style={[styles.headerBody, {flex:0.8}]}>
                  <Text>약 15cm 정도의 거리에서 바코드스캔을 부탁드립니다!</Text>
                </Body>
                <Right style={{flex:0.2}}>
                  <Icon name="ios-clock-outline" style={styles.header_icon}/>
                  <TouchableOpacity style={{justifyContent:'center'}} onPress={() => this._go_history()}>
                    <Text style={{marginBottom:5, marginLeft:10}}>HISTORY</Text>
                  </TouchableOpacity>
                </Right>
              </Header>
              {/* END header */}

              <Content>
                <View style={{marginTop:20}} />
                <View style={[styles.camera_container, {height: windowW>windowH?windowH:windowW}]}>
                  <CameraScanner
                    style={styles.preview}
                    onBarCodeRead={(e) => this._detected_code(e.data)}
                    ref={cam => this.camera = cam}
                    aspect={CameraScanner.constants.Aspect.fill}
                    >
                    <View style={{height:2, backgroundColor: '#f00', width:300, marginTop:100}}></View>
                  </CameraScanner>
                </View>
                <View style={{marginTop:20}} />
                <View style={[common_styles.view_align_center, {alignSelf:'center', justifyContent: 'center'}]}>
                  <Text>사각형 영역 안에 바코드를 위치해주세요.</Text>
                </View>
              </Content>
            </Container>
        );
    }
}

export default Camera;
