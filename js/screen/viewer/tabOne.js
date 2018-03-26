import React, { Component } from "react";
import { Content, Card, CardItem, Text, Body } from "native-base";
import {View} from "react-native";
import {C_Const, C_MULTI_LANG} from '../../utils/constant';

export default class TabOne extends Component {
  constructor(props) {
		super(props);
	}

  render() {
    return (
      <Content padder>
        <View style={{padding: 10}}>
          <Text>{this.props.languageInfo[C_MULTI_LANG.about_1]}</Text>
          <Text>{this.props.languageInfo[C_MULTI_LANG.about_2]}</Text>
          <Text>{this.props.languageInfo[C_MULTI_LANG.about_3]}</Text>
          <Text>{this.props.languageInfo[C_MULTI_LANG.about_4]}</Text>
          <Text>{this.props.languageInfo[C_MULTI_LANG.about_5]}</Text>
        </View>
      </Content>
    );
  }
}
