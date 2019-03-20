

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
    };
    
  }

  _onRegisterPressed = () => {
    this.props.navigation.navigate("Login",{screen: "Login"});
  }

  _onLoginPressed = () => {
    alert("Register");
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>

          <Image
            source={require('../../assets/images/logo.png')} 
            style={{width: width / 2.2, height: height / 3.5, resizeMode: 'contain', marginTop: -120}}
          />
        
          {/* <TextInput
            style={[styles.textinputs, style={marginTop: -20}]}
            placeholder="Username"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({username:text})}

          /> */}

          <TextInput
            style={[styles.textinputs, style={marginTop: -10}]}
            placeholder="Firstname"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({firstname:text})}

          />

          <TextInput
            style={styles.textinputs}
            placeholder="Lastname"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({lastname:text})}

          />   

          <TextInput
            style={styles.textinputs}
            placeholder="Mobile number"
            placeholderTextColor='grey'
            // value={this.state.mobileNumber}
            onChangeText={(text) => this.setState({mobile:text})}

          />    

          <TextInput
            style={styles.textinputs}
            placeholder="Password"
            placeholderTextColor='grey'
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={(text) => this.setState({password:text})}
          />

          
            <View style={{marginLeft: 18, alignItems: 'center', alignSelf: 'center', marginTop: 20}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this._onLoginPressed}
                >
                    <Text style={{color: '#f5821b', padding: 7, fontSize: 28, fontWeight: 'bold'}}>SIGN UP</Text>
                </TouchableOpacity>
          </View>


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
    paddingLeft: '4%',
    paddingRight: '4%',
    width: '90%',
    margin: '2%',
    color: 'grey',
    height: '8%', 
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
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