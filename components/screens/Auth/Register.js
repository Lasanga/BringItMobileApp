

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Register extends Component {

  constructor(props){
    super(props);

    this.state = {

      username: null,
      email: null,
      mobileNumber: null,
      age: null,
      password: null,
      passwordReEntered: null,

      isUserDataEntered: false,

    };
    
  }

  _onRegisterPressed = () => {
    this.props.navigation.navigate("Login",{screen: "Login"});
  }

  _onLoginPressed = () => {
    alert("Register");
  }

  _onUserDetailEntered = () => {

    if(
      this.state.username != null && 
      this.state.email != null && 
      this.state.mobileNumber != null &&
      this.state.age != null
      ){

        this.setState({ isUserDataEntered: true });

      }else{

        alert('enter all');

      }

    

  }

  render() {

    return (
      <View style={styles.container}>

        {/* <View style={styles.innerContainer}> */}

          <Image
            source={require('../../assets/images/logo.png')} 
            style={{width: width / 2.2, height: height / 3.5, resizeMode: 'contain', marginTop: -100}}
          />

          {

            !this.state.isUserDataEntered 

            ?

            <View>

              <TextInput
                style={styles.textinputs}
                placeholder="Username"
                placeholderTextColor='grey'
                // value={this.state.mobileNumber}
                onChangeText={(text) => this.setState({username:text})}

              />

              <TextInput
                style={styles.textinputs}
                placeholder="E-mail Address"
                placeholderTextColor='grey'
                keyboardType="email-address"
                // value={this.state.mobileNumber}
                onChangeText={(text) => this.setState({email:text})}

              />

              <TextInput
                style={styles.textinputs}
                placeholder="Mobile number"
                placeholderTextColor='grey'
                keyboardType="phone-pad"
                // value={this.state.mobileNumber}
                onChangeText={(text) => this.setState({mobileNumber:text})}

              /> 

              <TextInput
                style={styles.textinputs}
                placeholder="Age"
                placeholderTextColor='grey'
                keyboardType="numeric"
                // value={this.state.mobileNumber}
                onChangeText={(text) => this.setState({age:text})}

              />   

              <View style={{marginLeft: 18, alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
                <TouchableOpacity 
                  style={[ styles.button, { width: width / 2.5 } ]}
                  onPress={this._onUserDetailEntered}
                >
                  <Text style={{color: '#f5821b', padding: 7, fontSize: 28, fontWeight: 'bold'}}>CONTINUE</Text>
                </TouchableOpacity>
              </View> 

            </View>

            :

            <View>

              <TextInput
                style={styles.textinputs}
                placeholder="Password"
                placeholderTextColor='grey'
                secureTextEntry={true}
                // value={this.state.password}
                onChangeText={(text) => this.setState({password:text})}
              />

              <TextInput
                style={styles.textinputs}
                placeholder="Re-enter Password"
                placeholderTextColor='grey'
                secureTextEntry={true}
                // value={this.state.password}
                onChangeText={(text) => this.setState({repass:text})}
              />
              
              <View style={{marginLeft: 18, alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={this._onLoginPressed}
                >
                  <Text style={{color: '#f5821b', padding: 7, fontSize: 28, fontWeight: 'bold'}}>SIGN UP</Text>
                </TouchableOpacity>
              </View>

            </View>

          }
        

          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{marginTop: '3%'}}>Already a member?</Text>
            <Text style={{color: '#f5821b',marginTop: '3%', marginLeft: '1%'}}
            onPress={this._onRegisterPressed}>Signin here</Text>
            {/* this.props.navigation.navigate("Register",{screen: "Register"}); */}
          </View>

          {/* <TouchableOpacity
            onPress={this._onRegisterPressed}
            style={[styles.button, {width: '20%', marginTop: 5}]}
          >
          <Text style={{alignSelf: 'center',color: 'white'}}>Sign up</Text>
          </TouchableOpacity> */}

        {/* </View> */}
          

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: height,
    width: width,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  screenSize:{
    flex: 1,
    width: width,
    height: height,
    position: 'absolute'
  },
  innerContainer: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImages: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  logo: {
    width: '20%',
    height: '20%',
    flex: 1,
    resizeMode: 'contain', 
    marginBottom: '2%',
  },
  textinputs: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 0,
    width: width / 1.1,
    margin: 5,
    color: 'grey',
    height: 60, 
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    width: width / 3,
    alignSelf: 'center',
  },
  buttonBottom: {
    marginTop: '4%',
    width: 100,
    borderRadius: 50,
    backgroundColor: '#387EE9'
  },
  bottomFlexRight:{
    position: 'absolute',
    bottom: 40,
    width: '45%',
    alignSelf: 'flex-start'
  },
  bottomFlexLeft:{
    position: 'absolute',
    bottom: 40,
    width: '40%',
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
  roundButton:{
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20
  }
  
});