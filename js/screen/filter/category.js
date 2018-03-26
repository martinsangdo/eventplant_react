import React, {Component} from "react";
import {Image, View, Platform, TouchableOpacity} from "react-native";

import {Container, Content, Button, Text, Icon, Header, Left, Right, Body} from "native-base";
import {NavigationActions} from "react-navigation";

import BaseScreen from "../../base/BaseScreen.js";

import common_styles from "../../../css/common";
import styles from "./style";    //CSS defined here
import Utils from "../../utils/functions";
import {C_Const, C_MULTI_LANG} from "../../utils/constant";
import store from 'react-native-simple-store';

class FilterCategory extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        old_filtering_key: C_Const.FILTER_CATEGORY.LATEST,  //passed from Home
        filtering_key: C_Const.FILTER_CATEGORY.LATEST,  //chosing category
        _language_info: {},
        current_language: C_Const.EN_LANG_KEY
  		};
  	}
    //
    componentDidMount() {
      this.setState({
        old_filtering_key: this.props.navigation.state.params.filtering_key,
        filtering_key: this.props.navigation.state.params.filtering_key,
        current_language: this.props.navigation.state.params.current_language,
        _language_info: this.props.navigation.state.params.lang_info
      });
    }
    //
    _begin_filter = () => {
      if (this.state.filtering_key == this.state.old_filtering_key){
        //do not choose new filter
        this.props.navigation.goBack();
      } else {
        //user chose new filter
        store.update(C_Const.STORE_KEY.FILTERING_CATEGORY, this.state.filtering_key); //save chosen one to Store
        this.props.navigation.state.params.onPressDone(this.state.filtering_key);
        this.props.navigation.goBack();
      }
    };
   //==========
    render() {

        return (
            <Container>
              <Header style={[common_styles.header, common_styles.whiteBg]}>
                <Left style={common_styles.headerLeft}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text uppercase={false} style={[common_styles.default_font_color, common_styles.margin_l_10]}>{this.state._language_info[C_MULTI_LANG.cancel]}</Text>
                  </TouchableOpacity>
                </Left>
                <Body style={styles.headerBody}>
                  <Text uppercase={false} style={[common_styles.bold]}>{this.state._language_info[C_MULTI_LANG.filter]}</Text>
                </Body>
                <Right style={common_styles.headerRight}>
                  <TouchableOpacity onPress={() => this._begin_filter()}>
                    <Text uppercase={false} style={[common_styles.default_font_color, common_styles.margin_r_10]}>{this.state._language_info[C_MULTI_LANG.done]}</Text>
                  </TouchableOpacity>
                </Right>
              </Header>
                {/* END header */}
              <Content>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_CATEGORY.LATEST})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_CATEGORY.LATEST && styles.active_label]}>{this.state._language_info[C_MULTI_LANG.latest]}</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_CATEGORY.LATEST &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_CATEGORY.NEWS})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_CATEGORY.NEWS && styles.active_label]}>{this.state._language_info[C_MULTI_LANG.news]}</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_CATEGORY.NEWS &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_CATEGORY.BUSINESS})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_CATEGORY.BUSINESS && styles.active_label]}>{this.state._language_info[C_MULTI_LANG.business]}</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_CATEGORY.BUSINESS &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_CATEGORY.ENTREPRENEURSHIP})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_CATEGORY.ENTREPRENEURSHIP && styles.active_label]}>{this.state._language_info[C_MULTI_LANG.entrepreneurship]}</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_CATEGORY.ENTREPRENEURSHIP &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_CATEGORY.FINANCE})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_CATEGORY.FINANCE && styles.active_label]}>{this.state._language_info[C_MULTI_LANG.finance]}</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_CATEGORY.FINANCE &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_CATEGORY.LIFESTYLE})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_CATEGORY.LIFESTYLE && styles.active_label]}>{this.state._language_info[C_MULTI_LANG.lifestyle]}</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_CATEGORY.LIFESTYLE &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
              </Content>
            </Container>
        );
    }
}

export default FilterCategory;
