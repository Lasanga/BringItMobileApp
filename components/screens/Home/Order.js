

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView, Picker } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import apiRest from '../../API/restaurant.json';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Order extends Component {

  constructor(props){
    super(props);

    this.state = {

    //   restaurantName: this.props.navigation.state.params.restaurantName,
      filterMenu: '',
    //   orderDetails: false,
    //   orderDetailsSize: '',
    //   orderDetailsQuantity: '',
    //   restaurantId: this.props.navigation.state.params.restaurantId
    itemId: this.props.navigation.state.params.itemId,
    itemQuantity: 1,
    buttonDisable: true,
    itemPrice: '',
    itemPriceSum: ''

    };
    
  }


  _placeOrderEdit = () => {
    this.setState({orderDetails: true});
  }

  _cancelOrderDetails = () => {
    this.setState({orderDetails: false});
  }

  _orderDetailsSize_Regular = () => {
    this.setState({orderDetailsSize: 'Regular'});
  }

  _decreaseQuanity = () => {
    if(this.state.itemQuantity == 1)
    {
        this.setState({buttonDisable: true});

    }else if(this.state.itemQuantity > 1){

        this.setState({buttonDisable: false});
        this.setState({itemQuantity: this.state.itemQuantity - 1});
        this.setState({itemPriceSum: parseInt(this.state.itemPriceSum) - parseInt(this.state.itemPrice) });
    }
  }

  _increaseQuantity = () => {
    this.setState({itemQuantity: this.state.itemQuantity + 1});
    this.setState({buttonDisable: false});
    this.setState({itemPriceSum: parseInt(this.state.itemPriceSum) + parseInt(this.state.itemPrice) });
  }


  componentDidMount()
  {
    this.setState({itemPriceSum: '590'});
    this.setState({itemPrice: '590'});
  }
  

  render() {

    return (
      <View style={styles.container}>

        <Header
          leftComponent={{icon:'arrow-back', color:'#595959', onPress: () => this.props.navigation.goBack()}}
          rightComponent={{icon: 'notifications', color: '#595959', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        />


        <View>

          <Card containerStyle={{borderRadius: 5}}>

            <View style={{flexDirection: 'row'}}>

              <Image 
                style={{width: width / 3, height: height / 10, resizeMode: 'contain', borderRadius: 10}} 
                source={{uri: 'http://www.pulse.lk/wp-content/uploads/2015/10/IMG_1294.jpg'}} 
              />

              <View style={{width: width / 2.4}}>
                <Text>Hot Butter Cuttlefish</Text>
                <Text style={{marginTop: 10, fontSize: RF(3)}}>Rs. { this.state.itemPriceSum }</Text>
              </View>

            </View>

            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>

                <View style={{width: width / 1.4}}>

                  <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>

                    {/* <Picker
                      selectedValue={this.state.dayFromPicker}
                      style={{ width: width / 2.5, fontSize: RF(0.8) }}
                      onValueChange={(itemValue, itemIndex) =>
                          this.setState({dayFromPicker: itemValue})
                      }
                    >
                        <Picker.Item label="Pick a size" value="0" />
                        <Picker.Item label="Regular" value="Regular" />
                        <Picker.Item label="Large" value="Large" />
                    </Picker> */}

                    <View style={{flexDirection: 'row', justifyContent:'center', marginLeft: 20}}>
                      
                      {
                        this.state.buttonDisable == true 
                        
                        ?  

                        <TouchableOpacity 
                            style={styles.quantityBtns}
                            onPress={this._decreaseQuanity}
                            disabled
                        >
                            <Icon name='remove' color='grey'/>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity 
                            style={styles.quantityBtns}
                            onPress={this._decreaseQuanity}
                        >
                            <Icon name='remove' color='grey'/>
                        </TouchableOpacity>
                      
                      }
                    

                      <View style={{ marginHorizontal: 15, justifyContent: 'center', alignItems: 'center', height: 40 }}>
                        <Text style={{ fontSize: RF(2.5) }}>
                          { this.state.itemQuantity }
                        </Text>
                      </View>

                      <TouchableOpacity 
                        style={styles.quantityBtns}
                        onPress={this._increaseQuantity}
                      >
                       <Icon name="add" color='grey'/>
                      </TouchableOpacity>

                    </View>


                  </View>

                </View>

            </View>
              
            <View style={{ alignSelf: 'flex-end' }}>

                <TouchableOpacity 
                    style={styles.cardViewBtn}
                >
                    <Text style={{ fontSize: RF(1.8), color: 'orange' }}>Add to Cart</Text>
                </TouchableOpacity>

            </View>

          </Card>

        
        </View>


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

  card: {
      width: width / 2.5,
      alignItems: 'center'
  },

  orderCardPromptBtns:{
    padding: 5,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderRadius: 50
  },

  orderDetailsSize: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    alignItems: 'center'
  },

  orderDetailsQuantity: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    borderRadius: 50
  },
  quantityBtns: {
    width: 38,
    height: 38,
    borderRadius: 50,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center'
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