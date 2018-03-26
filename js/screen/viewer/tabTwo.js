import React, { Component } from "react";
import {View, TouchableOpacity, Linking} from "react-native";
import { Content, Text, Icon } from "native-base";
import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class TabTwo extends Component {
  constructor(props) {
		super(props);
	}
  //
  _open_map = (lat, lon, title) => {
    this.props.onOpenMap(lat, lon, title);
  };

  //
  render() {
    return (
      <Content padder>
        {/* Singapore */}
        <View style={styles.contact_item_container}>
          <View><Text style={common_styles.bold}>Singapore</Text></View>
          <View><Text>Lian Huat Building</Text></View>
          <View><Text>163 Tras Street #02-03</Text></View>
          <View><Text>Singapore 079024</Text></View>
          <View style={styles.btn_row_container}>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>this._open_map(1.275055, 103.843981, 'Summit (Singapore)')}>
                <MaterialIcons name='location-on' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('mailto:singapore@summitasia.com')}>
                <MaterialIcons name='mail-outline' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('tel:+65 6909 0526')}>
                <MaterialIcons name='phone' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Kuala Lumpur */}
        <View style={styles.contact_item_container}>
          <View><Text style={common_styles.bold}>Kuala Lumpur</Text></View>
          <View><Text>Pusat Dagangan Phileo D&#39;sara 1</Text></View>
          <View><Text>B701 No 9 Jln 16/11 Off Jln D&#39;sara</Text></View>
          <View><Text>46350 PJ Selangor, Malaysia</Text></View>
          <View style={styles.btn_row_container}>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>this._open_map(3.127593, 101.642915, 'Summit Capital Training Sdn Bhd')}>
                <MaterialIcons name='location-on' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('mailto:malaysia@summitasia.com')}>
                <MaterialIcons name='mail-outline' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('tel:+603 7932 1981')}>
                <MaterialIcons name='phone' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Penang */}
        <View style={styles.contact_item_container}>
          <View><Text style={common_styles.bold}>Penang</Text></View>
          <View><Text>Suite 163E, Level 16, Hunza Tower</Text></View>
          <View><Text>Gurney Paragon, Jalan Kelawai</Text></View>
          <View><Text>Georgetown 10250 Penang, Malaysia</Text></View>
          <View style={styles.btn_row_container}>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>this._open_map(5.435105, 100.311184, 'Summit Capital (Penang)')}>
                <MaterialIcons name='location-on' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('mailto:penang@summitasia.com')}>
                <MaterialIcons name='mail-outline' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('tel:+604 222 8908')}>
                <MaterialIcons name='phone' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Ho Chi Minh City */}
        <View style={styles.contact_item_container}>
          <View><Text style={common_styles.bold}>Ho Chi Minh City</Text></View>
          <View><Text>Dai Thanh Binh Office Building, Level 1</Text></View>
          <View><Text>915 Nguyen Trai St. Ward 14, District 5</Text></View>
          <View><Text>Ho Chi Minh City, Vietnam</Text></View>
          <View style={styles.btn_row_container}>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>this._open_map(10.752795, 106.655613, 'Summit Capital (Ho Chi Minh city)')}>
                <MaterialIcons name='location-on' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('mailto:vietnam@summitasia.com')}>
                <MaterialIcons name='mail-outline' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('tel:+84 909668127')}>
                <MaterialIcons name='phone' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Bangkok */}
        <View style={styles.contact_item_container}>
          <View><Text style={common_styles.bold}>Bangkok</Text></View>
          <View><Text>2nd Floor, Asoke Towers Sukhumvit 21</Text></View>
          <View><Text>(Soi Asoke) Khlongtoey Nua</Text></View>
          <View><Text>Wattana Bangkok 10110, Thailand</Text></View>
          <View style={styles.btn_row_container}>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>this._open_map(13.745705, 100.562320, 'Asoke Towers')}>
                <MaterialIcons name='location-on' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('mailto:thailand@summitasia.com')}>
                <MaterialIcons name='mail-outline' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('tel:+66 2120 9616')}>
                <MaterialIcons name='phone' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Bengaluru */}
        <View style={[styles.contact_item_container, styles.contact_item_container_last]}>
          <View><Text style={common_styles.bold}>Bengaluru</Text></View>
          <View><Text>No 3/A, Hyland Industrial Estate</Text></View>
          <View><Text>Bommanahalli, Hosur Main Road</Text></View>
          <View><Text>Bangalore 560068 India</Text></View>
          <View style={styles.btn_row_container}>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>this._open_map(12.898627, 77.635769, 'Summit Capital (Bengaluru)')}>
                <MaterialIcons name='location-on' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('mailto:india@summitasia.com')}>
                <MaterialIcons name='mail-outline' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity onPress={()=>Linking.openURL('tel:+91 808 815 0160')}>
                <MaterialIcons name='phone' style={[common_styles.grayColor, common_styles.font_30]}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Content>
    );
  }
}
