/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions, 
    Image,
    ScrollView 
} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import {Icon} from 'react-native-elements';

import Splash from '../screens/Welcome/Splash';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/Home/Home';
import Menu from '../screens/Home/Menu';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const CustomeDrawerImage = (props) => (

  <View style={{width: width/1.3, height: 190,}}>
  
    <Image
      style={styles.drawerHeaderImage}
      source={require('../assets/images/logo.png')}/>
      
      <View >
      <ScrollView style={{width:width/1.3,height:height/1.6}}>
      <DrawerItems
        {...props}
      />

      </ScrollView>
      </View>
  </View>

);

const Drawer = DrawerNavigator({
  "Home":{
    screen: Home,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='home'
        />
      )
    }
  // },
  // "Online Consultation":{
  //   screen: OnlineConsultation,
  //   navigationOptions: {
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
  //         resizeMode="contain"
  //         style={{ width: 20, height: 20}}
  //       />
  //     )
  //   }
  // },
  // "Hospital/Pharmacy Locator":{
  //   screen: Locator,
  //   navigationOptions: {
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
  //         resizeMode="contain"
  //         style={{ width: 20, height: 20}}
  //       />
  //     )
  //   }
  // },
  // "Doctor Availability":{
  //   screen: DoctorAvailability,
  //   navigationOptions: {
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
  //         resizeMode="contain"
  //         style={{ width: 20, height: 20}}
  //       />
  //     )
  //   }
  // },
  // "Emergency":{
  //   screen: Emergency,
  //   navigationOptions: {
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
  //         resizeMode="contain"
  //         style={{ width: 20, height: 20}}
  //       />
  //     )
  //   }
  },
},
{
  drawerWidth: width/1.3,
  drawerPosition: 'left',
  contentComponent: CustomeDrawerImage,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerBackgroundColor: 'white',
  contentOptions: {
    labelStyle: {
      color: 'grey'
    }
  }
});

const NavigationApp = StackNavigator({

  //UI Navigation Map For All
  // Splash:{ screen: Splash, navigationOptions: { title: 'SplashScreen', header: null ,gesturesEnabled:false},},
  // Login:{ screen: Login, navigationOptions: { title: 'Login', header: null ,gesturesEnabled:false},},
  // Register:{ screen: Register, navigationOptions: { title: 'Register', header: null ,gesturesEnabled:false},},
  Drawer:{ screen: Drawer, navigationOptions: { title: 'Drawer', header: null ,gesturesEnabled:false},},
  Home: { screen: Home, navigationOptions: { title: 'Home', header: null ,gesturesEnabled:false},},
  Menu: { screen: Menu, navigationOptions: { title: 'Menu', header: null ,gesturesEnabled:false},},

});

  

export default class MainContainer extends Component{

  constructor(props){
  super(props);
  }

  render() {
    return (
      <NavigationApp />
    );
  }
}

const styles = StyleSheet.create({
  drawerHeaderImage:{
    width: 250,
    height: 190,
    resizeMode: 'contain',
    marginLeft:width/13
  }
});