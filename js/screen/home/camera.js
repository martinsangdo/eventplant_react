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
import SQLite from 'react-native-sqlite-2';

const {windowW, windowH} = Dimensions.get('window');
const db = SQLite.openDatabase('EP.db', '1.0', '', 1);

class Camera extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      is_saving_code: false,    //lock reading barcode many times
      user_info: {}
    };
  }
    //like onload event
    componentDidMount() {
      this.setState({user_info: this.props.navigation.state.params.user_info});
    }
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
                Utils.xlog('select db', res);
                if (res.rows.length > 0){
                  //found, update it
                  var update_sql = 'UPDATE visitor SET event="'+(new Date())+'" WHERE NUM="'+code+'"';
                  txn.executeSql(update_sql, [], function(tx, res){
                    me._update_history();
                  });
                } else {
                  //not found, insert it
                  var insert_sql = 'INSERT INTO visitor (name, event, num) values ("'+resp.name+'","'+getDate()+'", "'+code+'")';
                  txn.executeSql(insert_sql, [], function(tx, res){
                    me._update_history();
                  });
                }
            }, function (error, bbb){
            });
      });
    };
    //
    _update_history = () => {
      //check if table "history" exists
      
      db.transaction(function (txn) {
        // var insert_sql = 'INSERT INTO history (name, event, num) values ("'+resp.name+'","'+getDate()+'", "'+code+'")';
        // txn.executeSql(insert_sql, [], function(tx, res){
        //   me._update_history();
        // });
      });
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
