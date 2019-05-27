

import React, {Component} from 'react';
import {
  Platform, 
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
  RefreshControl
} from 'react-native';
import {
  SearchBar, 
  Card, 
  Icon, 
  Header, 
  Button
} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import Spinner from 'react-native-loading-spinner-overlay';

import apiRest from '../../API/restaurant.json';
import apiRecRest from '../../API/recomRest.json';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import Api from '../../config/ApiLinks';

const placeholderImgRestaurant = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpeefzFuSk86toTbJOCFij7WQpUACtG-5jIZLo_QAdlFmuF5';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      access_token: '',
      topBtnColorR: 'orange',
      topBtnColorAll: 'lightgrey',
      isContentShown: false,
      restaurantDetails: [],
      recomRest: [],
      restaurantId: '',
      loading: false,
      currentLat: 0,
      currentLong: 0,
      error: '',
      currentAddress: 'Fetching your current location... (Please turn on your location if turned off)'
      // refreshing: false,
    };
    
  }

  // _onRefresh = () => {
  //   this.setState({refreshing: true});
  //   fetchData().then(() => {
  //     this.setState({refreshing: false});
  //   });
  // }

  _getCurrentLocation() {
   
    navigator.geolocation.getCurrentPosition(
      (position) => {
          this.setState({currentLat: parseFloat(position.coords.latitude)});
          this.setState({currentLong: parseFloat(position.coords.longitude)});
      },
      (error) => alert(error.message),
      { 
        enableHighAccuracy: false, timeout: 20000
      }
  
    );

  }
  

  _getCurrentLocationName = () => {

    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.currentLat+','+this.state.currentLong+'&key=AIzaSyB6OWfrnREeAUi-mzD7LZjYAHScsIK8quw', object)
    .then((response) => response.json())
    .then((responseText) => {

      this.setState({currentAddress: responseText.results[0].formatted_address});

    })
    .catch((error) => {
      alert(error);
    })
    
  }


  _getAccessToken = async () => {
    let access_token = await AsyncStorage.getItem('access_token');
    return access_token;
  }

  componentDidMount()
  {

    this._getAccessToken().then((access_token) => {
      this._getRestaurants(access_token);
      // alert('Bearer '+access_token);
      this.setState({
        access_token: JSON.parse(access_token)
      });
    })

    this.setState({ loading: true });
    setInterval(() => {
      this.setState({ loading: false });

    }, 3000);

    this._getCurrentLocation();
    setInterval(() => {
      this._getCurrentLocationName();
    }, 3000);
  
  }


  async _getRestaurants(token) {

    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };

    fetch(Api.getRestaurants, object)
    .then((response) => response.json())
    .then((responseText) => {

      this.setState({restaurantDetails: responseText});
      this.setState({isContentShown: true});
      // alert('ok');

    })
    .catch((error) => {
      // alert(error);
      // alert('An error has occured, please try again');
    })
    // this.setState({ restaurantName: apiRest.name });



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
          // centerComponent={{text: 'Current location here'}}
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

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, width: width }}>
          <Icon 
            name='place'
          />
          <Text style={{marginLeft: 10, alignSelf: 'center', width: width / 1.5}}>{this.state.currentAddress}</Text>
        </View>

        

        {/* <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 15}}>

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
        </View> */}

        {

          this.state.isContentShown 
          
          ? 
        
            <ScrollView
              showsVerticalScrollIndicator={false}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={this.state.refreshing}
              //     onRefresh={this._onRefresh}
              //   />
              // }
            >

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

                <Card
                  image={{uri: placeholderImgRestaurant}}
                  containerStyle={{width: width / 1.1, borderRadius: 8}}
                >

                  <Text style={{ fontSize: RF(3), backgroundColor: '#D1D1D1', width: width / 1.5, marginBottom: 5 }}></Text>
                  <Text style={{ fontSize: RF(2), backgroundColor: '#E4E2E2', width: width / 3 }}></Text>

                </Card>

                <Card
                  image={{uri: placeholderImgRestaurant}}
                  containerStyle={{width: width / 1.1, borderRadius: 8}}
                >

                  <Text style={{ fontSize: RF(3), backgroundColor: '#D1D1D1', width: width / 1.5, marginBottom: 5 }}></Text>
                  <Text style={{ fontSize: RF(2), backgroundColor: '#E4E2E2', width: width / 3 }}></Text>

                </Card>

              </ScrollView>

        }

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => this.props.navigation.navigate("Cart")}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
            <Icon name="shopping-cart"  size={25} color="#fff" />
            <Text style={{ marginLeft: 15, color: '#fff' }}>Go to Cart</Text>
          </View>
        </TouchableOpacity>

        {/* <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        /> */}


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
    // marginTop: 10,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'orange',
    alignItems: 'center'
  },
  cartButton: {
    width: width,
    height: 35,
    backgroundColor: '#ff5722',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    marginTop: 5,
  },
  spinnerTextStyle:{
    color: 'white'
  }
  
});