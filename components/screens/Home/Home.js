

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import Spinner from 'react-native-loading-spinner-overlay';

import apiRest from '../../API/restaurant.json';
import apiRecRest from '../../API/recomRest.json';
// import { O_RDONLY } from 'constants';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const placeholderImgRestaurant = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpeefzFuSk86toTbJOCFij7WQpUACtG-5jIZLo_QAdlFmuF5';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      topBtnColorR: 'orange',
      topBtnColorAll: 'lightgrey',
      recommendedView: true,
      restaurantDetails: [],
      recomRest: [],
      restaurantId: '',
      loading: false,
    };
    
  }

  componentDidMount()
  {
    this.setState({ restaurantDetails: apiRest });
    this.setState({ recomRest: apiRecRest });
    // this._getRestaurants();
    this.setState({ loading: true });
    setInterval(() => {
      this.setState({
        //change the state of the laoding in every 3 second
        loading: false,
      });
    }, 3000);
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
          title="Nearby Restaurants" 
          buttonStyle={{width: width / 2.3, borderBottomColor: this.state.topBtnColorR, borderBottomWidth: 5, backgroundColor: 'transparent'}}
          textStyle={{color: 'black'}} 
            onPress={this.recommendedBtn}
          />

          <Button 
          title="Favorites" 
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
            this.state.restaurantDetails.map((item, index) => {
              {/* const url = item.url; */}
              return (

              <Card
                image={{uri: placeholderImgRestaurant}}
                containerStyle={{width: width / 1.1, borderRadius: 8}}
                key={index}
              >

                <Text style={{ fontSize: RF(3) }}>{item.displayName}</Text>
                <Text style={{ fontSize: RF(2) }}>{item.city}</Text>

                <View style={{ alignSelf: 'flex-end' }}>

                  <TouchableOpacity 
                    style={styles.cardViewBtn}
                    onPress={() => navigate('Menu', {restaurantId: [item.id], restaurantName: [item.displayName] })}
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
              {/* const url = item.url; */}
              return (

                <Card
                  image={{uri: placeholderImgRestaurant}}
                  containerStyle={{width: width / 1.1, borderRadius: 8}}
                  key={index}
                >

                <Text style={{ fontSize: RF(3) }}>{item.displayName}</Text>
                <Text style={{ fontSize: RF(2) }}>{item.city}</Text>

                <View style={{ alignSelf: 'flex-end' }}>

                  <TouchableOpacity 
                    style={styles.cardViewBtn}
                    onPress={() => navigate('Menu', {restaurantId: [item.id], restaurantName: [item.displayName] })}
                  >

                    <Text style={{ fontSize: RF(1.8), color: 'orange' }}>View more</Text>

                  </TouchableOpacity>

                </View>

                </Card>

              );
              
            })}

            </ScrollView>

        }

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => this.props.navigation.navigate("Cart")}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 4 }}>
            <Icon name="shopping-cart"  size={20} color="#fff" />
            <Text style={{ marginLeft: 15, color: '#fff' }}>Go to Cart</Text>
          </View>
        </TouchableOpacity>

        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.loading}
          //Text with the Spinner 
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />


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
  },
  cartButton: {
    width: width,
    height: 30,
    backgroundColor: '#ff5722',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
  },
  spinnerTextStyle:{
    color: 'white'
  }
  
});