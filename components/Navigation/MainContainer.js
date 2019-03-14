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

import Login from '../screens/Auth/Login';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

// const CustomeDrawerImage = (props) => (

//   <View style={{width: width/1.3, height: 190,}}>
  
//     {/* <Image
//       style={styles.drawerHeaderImage}
//       source={require('./images/reminderImg.png')}/> */}
      
//       <View >
//       <ScrollView style={{width:width/1.3,height:height/1.6}}>
//       <DrawerItems
//         {...props}
//       />

//       </ScrollView>
//       </View>
//   </View>

// );

// const Drawer = createDrawerNavigator({
//   "Home":{
//     screen: Home,
//     navigationOptions: {
//       drawerIcon: ({ tintColor }) => (
//         <Image
//           source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
//           resizeMode="contain"
//           style={{ width: 20, height: 20}}
//         />
//       )
//     }
//   },
//   "Online Consultation":{
//     screen: OnlineConsultation,
//     navigationOptions: {
//       drawerIcon: ({ tintColor }) => (
//         <Image
//           source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
//           resizeMode="contain"
//           style={{ width: 20, height: 20}}
//         />
//       )
//     }
//   },
//   "Hospital/Pharmacy Locator":{
//     screen: Locator,
//     navigationOptions: {
//       drawerIcon: ({ tintColor }) => (
//         <Image
//           source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
//           resizeMode="contain"
//           style={{ width: 20, height: 20}}
//         />
//       )
//     }
//   },
//   "Doctor Availability":{
//     screen: DoctorAvailability,
//     navigationOptions: {
//       drawerIcon: ({ tintColor }) => (
//         <Image
//           source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
//           resizeMode="contain"
//           style={{ width: 20, height: 20}}
//         />
//       )
//     }
//   },
//   "Emergency":{
//     screen: Emergency,
//     navigationOptions: {
//       drawerIcon: ({ tintColor }) => (
//         <Image
//           source={require("../assets/images/DrawerIcons/active/pillReminder.png")}
//           resizeMode="contain"
//           style={{ width: 20, height: 20}}
//         />
//       )
//     }
//   },
// },{
//   drawerWidth: width/1.3,
//   drawerPosition: 'left',
//   contentComponent: CustomeDrawerImage,
//   drawerOpenRoute: 'DrawerOpen',
//   drawerCloseRoute: 'DrawerClose',
//   drawerToggleRoute: 'DrawerToggle',
//   drawerBackgroundColor: '#5ec0eb',
//   contentOptions: {
//     labelStyle: {
//       color: 'white'
//     }
//   }
// });

const NavigationApp = StackNavigator({

  //UI Navigation Map For All
//   Splash:{ screen: Splash, navigationOptions: { title: 'SplashScreen', header: null ,gesturesEnabled:false},},
  Login:{ screen: Login, navigationOptions: { title: 'Login', header: null ,gesturesEnabled:false},},

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
