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

class FilterCountry extends BaseScreen {
    constructor(props) {
  		super(props);
  		this.state = {
        old_filtering_key: C_Const.FILTER_COUNTRY.LATEST,  //passed from Home
        filtering_key: C_Const.FILTER_COUNTRY.ALL,
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
        store.update(C_Const.STORE_KEY.FILTERING_COUNTRY, this.state.filtering_key); //save chosen one to Store
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
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_COUNTRY.ALL})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_COUNTRY.ALL && styles.active_label]}>{this.state._language_info[C_MULTI_LANG.all_courses]}</Text>
                      </Left>
                      <Right>
                        {this.state.filtering_key == C_Const.FILTER_COUNTRY.ALL &&
                          <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                        }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_COUNTRY.SINGAPORE})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_COUNTRY.SINGAPORE && styles.active_label]}>Singapore</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_COUNTRY.SINGAPORE &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_COUNTRY.MALAYSIA})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_COUNTRY.MALAYSIA && styles.active_label]}>Malaysia</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_COUNTRY.MALAYSIA &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_COUNTRY.INDIA})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_COUNTRY.INDIA && styles.active_label]}>India</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_COUNTRY.INDIA &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_COUNTRY.THAILAND})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_COUNTRY.THAILAND && styles.active_label]}>Thailand</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_COUNTRY.THAILAND &&
                        <Icon name="ios-checkmark" style={[common_styles.font_40, common_styles.default_font_color]}/>
                      }
                      </Right>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({filtering_key: C_Const.FILTER_COUNTRY.VIETNAM})}>
                  <View style={styles.item_row}>
                      <Left>
                        <Text style={[this.state.filtering_key == C_Const.FILTER_COUNTRY.VIETNAM && styles.active_label]}>Vietnam</Text>
                      </Left>
                      <Right>
                      {this.state.filtering_key == C_Const.FILTER_COUNTRY.VIETNAM &&
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

export default FilterCountry;
