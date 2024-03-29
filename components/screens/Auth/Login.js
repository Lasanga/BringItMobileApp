

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import Api from '../../config/ApiLinks';

export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      username:'admin',
      password:'123qwe'
    };
    
  }

  _onRegisterPressed = () => {
    this.props.navigation.navigate("Register",{screen: "Register"});
  }

  _onLoginPressed = () => {

    var details = {
      'username': this.state.username,
      'password': this.state.password,
      'grant_type': "password",
      'scope': "openid profile api1"
    };

    // alert(details);
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var object = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'Basic anM6c2VjcmV0'
        },
        body: formBody
      };
  
      fetch(Api.authentication, object)
      .then((response) => response.json())
      .then((responseText) => {

        if( responseText.access_token != null )
        {

          let access_token = AsyncStorage.getItem('access_token');

          if(access_token != null)
          {
            AsyncStorage.removeItem('access_token');
            AsyncStorage.setItem('access_token', responseText.access_token );
          }else{
            AsyncStorage.setItem('access_token', responseText.access_token );
          }
          
          // AsyncStorage.setItem('username', this.state.username);
          // AsyncStorage.setItem('password', this.state.password);

          this.props.navigation.navigate('Drawer', {screen: 'Drawer'});

        }else{

          alert(responseText.error);

        }

        // alert(responseText.error);

  
      })
      .catch((error) => {
        alert(error);
        // this.props.navigation.navigate('Splash');
      })

  }


  render() {

    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>

          <Image
            source={require('../../assets/images/logo.png')} 
            style={{width: width / 1.2, height: height / 3.5, resizeMode: 'contain', marginTop: -80, marginBottom: 30}}
          />
        
          <TextInput
            style={styles.textinputs}
            placeholder="Username"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({username:text})}

          />

          <TextInput
            style={styles.textinputs}
            placeholder="Password"
            placeholderTextColor='grey'
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={(text) => this.setState({password:text})}
          />

          <View style={{flexDirection: 'row', width: width / 1.1, marginTop: 40}}>
            <View style={{alignSelf: 'flex-start', width: '66%', marginTop: 15}}>
                <Text style={{color: '#f5821b', marginLeft: 5}}>Forgot Password?</Text>
            </View>
            <View style={{alignContent: 'flex-end', marginLeft: 18}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this._onLoginPressed}
                >
                    <Text style={{color: '#f5821b', padding: 7, fontSize: 28, fontWeight: 'bold'}}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
          </View>


          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text style={{marginTop: '5%'}}>Don't have an account?</Text>
            <Text style={{color: '#f5821b',marginTop: '5%', marginLeft: '1%'}}
            onPress={this._onRegisterPressed}>Signup here</Text>
            {/* this.props.navigation.navigate("Register",{screen: "Register"}); */}
          </View>

          {/* <TouchableOpacity
            onPress={this._onRegisterPressed}
            style={[styles.button, {width: '20%', marginTop: 5}]}
          >
          <Text style={{alignSelf: 'center',color: 'white'}}>Sign up</Text>
          </TouchableOpacity> */}

        </View>
          

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
    backgroundColor: 'white'
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
    width: width / 3.5,
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