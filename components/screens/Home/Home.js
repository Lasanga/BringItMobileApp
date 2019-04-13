

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      topBtnColorR: 'orange',
      topBtnColorAll: 'lightgrey',
      recommendedView: true
    };
    
  }

  recommendedBtn = () => {
    this.setState({topBtnColorR: 'orange'});
    this.setState({topBtnColorAll: 'lightgrey'});
    this.setState({recommendedView: true});
  }

  allBtn = () => {
    this.setState({topBtnColorR: 'lightgrey'});
    this.setState({topBtnColorAll: 'orange'});
    this.setState({recommendedView: false});
  }

  toMenu = () => {
    this.props.navigation.navigate("Menu",{screen: "Menu"});
    // alert('hi');
  }


  render() {

    const {navigate} = this.props.navigation

    return (
      <View style={styles.container}>

        <Header
          leftComponent={{icon:'menu', color:'#595959', onPress: () => this.props.navigation.openDrawer()}}
          rightComponent={{icon: 'notifications', color: '#595959', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        />

        {/* <SearchBar 
          lightTheme
          platform='android'
          searchIcon={false}
          placeholder='Search for location'
          placeholderTextColor='grey'
          containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent', width: width / 1.1, alignSelf: 'center'}}
          inputStyle={{backgroundColor: 'lightgrey', borderColor: 'white', borderRadius: 50, marginBottom: 15}}
        /> */}

        <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 15}}>

          <Button 
          title="Recommended" 
          buttonStyle={{width: width / 2.3, borderBottomColor: this.state.topBtnColorR, borderBottomWidth: 5, backgroundColor: 'transparent'}}
          textStyle={{color: 'black'}} 
            onPress={this.recommendedBtn}
          />

          <Button 
          title="All Restaurants" 
          buttonStyle={{width: width / 2.3, borderBottomColor: this.state.topBtnColorAll, borderBottomWidth: 5, backgroundColor: 'transparent'}} 
          textStyle={{color: 'black'}}
          onPress={this.allBtn}
          />
        </View>
        {
          this.state.recommendedView 
          
          ? 
        
            <ScrollView>

              <Card
                image={require('../../assets/images/Home/mcDonalds.jpg')}
                containerStyle={{width: width / 1.1}}
              >
                <Text>McDonald's - Nugegoda</Text>
                <Button 
                  title="View more" 
                  buttonStyle={styles.cardViewBtn} 
                  textStyle={{fontSize: RF(1.5), color: 'orange'}}
                  onPress={() => navigate('Menu', {restaurantName: 'Mc'})}
                >
                </Button>
              </Card>

              <Card
                image={require('../../assets/images/Home/burgerking.jpg')}
                containerStyle={{width: width / 1.1}}
              >
                <Text>Burger King - Nugegoda</Text>
                <Button 
                  title="View more" 
                  buttonStyle={styles.cardViewBtn} 
                  textStyle={{fontSize: RF(1.5), color: 'orange'}}
                  onPress={() => navigate('Menu', {restaurantName: 'Burger King'})}
                >
                </Button>
              </Card>

              <Card
                image={require('../../assets/images/Home/mcDonalds.jpg')}
                containerStyle={{width: width / 1.1}}
                
              >
                <Text>McDonald's - Nugegoda</Text>
                <Button 
                  title="View more" 
                  buttonStyle={styles.cardViewBtn} 
                  textStyle={{fontSize: RF(1.5), color: 'orange'}}
                  onPress={this.toMenu}
                >
                </Button>
              </Card>

            </ScrollView>

            :

            <ScrollView>

              <Card
                image={require('../../assets/images/Home/mcDonalds.jpg')}
                containerStyle={{width: width / 1.1}}
                
              >
                <Text>McDonald's - Nugegoda</Text>
                <Button 
                  title="View more" 
                  buttonStyle={styles.cardViewBtn} 
                  textStyle={{fontSize: RF(1.5), color: 'orange'}}
                  onPress={this.toMenu}
                >
                </Button>
              </Card>
              

            </ScrollView>


        }

      
       

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
  cardViewBtn: {
    width: width / 5.5,
    padding: 3,
    borderRadius: 50,
    marginLeft: -10,
    marginTop: 10,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'orange'
  }
  
});