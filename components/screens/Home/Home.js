

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import apiRest from '../../API/restaurant.json';
import apiRecRest from '../../API/recomRest.json';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      topBtnColorR: 'orange',
      topBtnColorAll: 'lightgrey',
      recommendedView: true,
      restaurantDetails: [],
      recomRest: [],
      restaurantId: ''
    };
    
  }

  componentDidMount()
  {
    this.setState({ restaurantDetails: apiRest });
    this.setState({ recomRest: apiRecRest });
    // this._getRestaurants();
  }


  _getRestaurants() {

    this.setState({ restaurantName: apiRest.name });

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
          centerComponent={{text: 'Current location here'}}
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

            {
            this.state.recomRest.map((item, index) => {
              const url = item.url;
              return (

              <Card
                image={{uri: url}}
                containerStyle={{width: width / 1.1, borderRadius: 5}}
                key={index}
              >

                <Text>{item.name}</Text>

               <View style={{ alignSelf: 'flex-end' }}>

                <TouchableOpacity 
                  style={styles.cardViewBtn}
                  onPress={() => navigate('Menu', {restaurantId: item.id})}
                >

                  <Text style={{ fontSize: RF(1.8), color: 'orange' }}>View more</Text>

                </TouchableOpacity>

               </View>

              </Card>

              );
              
            })}

            </ScrollView>

            :

            <ScrollView>

            {
            this.state.restaurantDetails.map((item, index) => {
              const url = item.url;
              return (

              <Card
                image={{uri: url}}
                containerStyle={{width: width / 1.1, borderRadius: 5}}
                key={index}
              >

                <Text>{item.name}</Text>

               <View style={{ alignSelf: 'flex-end' }}>

                <TouchableOpacity 
                  style={styles.cardViewBtn}
                  onPress={() => navigate('Menu', {restaurantId: item.id})}
                >

                  <Text style={{ fontSize: RF(1.8), color: 'orange' }}>View more</Text>

                </TouchableOpacity>

               </View>

              </Card>

              );
              
            })}

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
    marginTop: 10,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'orange',
    alignItems: 'center'
  }
  
});