

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView } from 'react-native';
import {SearchBar, Card, Icon, Header} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
    };
    
  }

  render() {

    return (
      <View style={styles.container}>

        <Header
          leftComponent={{icon:'menu', color:'#595959', onPress: () => this.props.navigation.openDrawer()}}
          rightComponent={{icon: 'notifications', color: '#595959', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        />

        <SearchBar 
          lightTheme
          platform='android'
          searchIcon={false}
          placeholder='Search for location'
          placeholderTextColor='grey'
          containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent', width: width / 1.1, alignSelf: 'center'}}
          inputStyle={{backgroundColor: 'lightgrey', borderColor: 'white', borderRadius: 50, marginBottom: 15}}
        />

        <Text style={{marginLeft: 20, fontSize: RF(2.2)}}>Nearby Restaurants</Text>

        <ScrollView>

          <Card
            image={require('../../assets/images/Home/mcDonalds.jpg')}
            containerStyle={{width: width / 1.1}}
          >
            <Text>McDonald's - Nugegoda</Text>
          </Card>

          <Card
            image={require('../../assets/images/Home/burgerking.jpg')}
            containerStyle={{width: width / 1.1}}
          >
            <Text>Burger King - Nugegoda</Text>
          </Card>

          <Card
            image={require('../../assets/images/Home/mcDonalds.jpg')}
            containerStyle={{width: width / 1.1}}
          >
            <Text>McDonald's - Nugegoda</Text>
          </Card>

        </ScrollView>
       

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
  }
  
});