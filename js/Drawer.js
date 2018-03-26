/**
 * author: Martin SD
 * Declare screens in menu
 */
import React from "react";
import { DrawerNavigator } from "react-navigation";

import SideBar from "./screen/sidebar";   //left menu
import Home from "./screen/home";
import EditProfile from "./screen/edit_profile";
import ChangePassword from "./screen/change_password";
import MemberCard from "./screen/member_card";

const DrawerMenu = DrawerNavigator(
  {
    Home: {screen: Home},
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerMenu;
