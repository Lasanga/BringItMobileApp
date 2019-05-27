import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Image,
    TextInput, 
    TouchableHighlight, 
    Alert, 
    TouchableOpacity,
    Dimensions, 
    AsyncStorage, 
    ScrollView, 
    Picker 
} from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            contact: '',
            userID: ''
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={{backgroundColor: '#708BF0'}}>

                    {/* <TouchableOpacity
                    style={{position: 'absolute', alignSelf: 'flex-end', marginTop: 15, zIndex: 1}}
                    onPress={this._saveChanges}>
                    <Text style={{marginRight: 15, color: 'white'}}>
                        Done
                    </Text>
                    </TouchableOpacity> */}

                    <Header
                        leftComponent={{icon:'arrow-back', color:'white', onPress: () => this.props.navigation.goBack()}}
                        // rightComponent={{icon: 'notifications', color: '#919191', onPress: () => alert('Hoi')}}
                        backgroundColor='transparent'
                        outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3, width: width}}
                    />


                    <Image 
                        source={require('../../assets/images/Settings/profile.png')}
                        style={{width: width / 3, height: height / 8, resizeMode: 'contain', alignSelf: 'center'}}
                    />

                    <TextInput
                        style={styles.textinputsTop}
                        placeholder="Username"
                        placeholderTextColor='white'
                        value={this.state.username}
                        onChangeText={(text) => this.setState({username:text})}
                    />

                </View>

                <View style={{marginTop: 10}}> 

                    <Text style={{marginLeft: 20, marginTop: 10}}>Firstname</Text>
                    <TextInput
                        style={styles.textinputsBottom}
                        placeholder="Firstname"
                        placeholderTextColor='white'
                        value={this.state.firstname}
                        onChangeText={(text) => this.setState({firstname:text})}
                    />

                </View>

                <TouchableOpacity style={styles.saveBtn} onPress= {this._saveChanges}>
                <Text style={{fontWeight: 'bold', color: '#708BF0'}}>Save</Text>
                </TouchableOpacity>

            </View>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: 'white'
    },
    textinputsTop: {
      height: height / 19,
      alignSelf: 'center',
      width: width / 2.6,
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
      marginBottom: 15,
      marginTop: 10,
      paddingBottom: 5,
      fontSize: RF(2.2),
      color: 'white'
    },
    textinputsBottom: {
      height: height / 19,
      alignSelf: 'center',
      width: width / 1.1,
      borderColor: 'lightgrey',
      borderWidth: 1,
      marginBottom: 15,
      marginTop: 10,
      fontSize: RF(2.2),
      borderRadius: 5,
      padding: 10
    },
    saveBtn: {
      padding: 10, 
      borderWidth: 1, 
      width: width / 6, 
      alignItems: 'center', 
      borderRadius: 5, 
      borderColor: '#708BF0', 
      alignSelf: 'center', 
      marginTop: 20,
      marginBottom: 5
    }
  });