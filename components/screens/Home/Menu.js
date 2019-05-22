

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView, Picker } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import Modal from "react-native-modal";

import apiMenu from '../../API/menu.json';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const placeholderImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpeefzFuSk86toTbJOCFij7WQpUACtG-5jIZLo_QAdlFmuF5';

export default class Menu extends Component {

  constructor(props){
    super(props);

    this.state = {

      // restaurantName: this.props.navigation.state.params.restaurantName,
      // restaurantId: this.props.navigation.state.params.restaurantId,
      restaurantName: 'Pizza Hut',
      restaurantId: 1,
      filterMenu: '',
      orderDetails: false,
      orderDetailsSize: '',
      orderDetailsQuantity: '',
      itemId: '12',
      menuDetails: [],
      isAddToCart: false,
      itemNameForAddToCart: '',
      itemQuantity: 1,
      buttonDisable: true,
      itemPrice: 0,
      itemPriceSum: 0,
      test: 'test',
      totalCartPrice: 0,

      itemSelected_name: '',
      itemSelected_id: '',
      itemSelected_price: '',
      itemSelected_qty: ''

    };
    
  }


  _addToCart = async (id, name, price, qty) => {

    const cart = 
      {
        itemId: id,
        itemName: name,
        qty: qty,
        price: price
      }
    
    const existingItems = await AsyncStorage.getItem('localCart');
    const totalCartPrice = await AsyncStorage.getItem('totalCartPrice');
    // alert(existingItems);

    let newProduct = JSON.parse(existingItems);
    if( !newProduct ){
      newProduct = [];
      newProduct.push( cart );
      // alert(JSON.stringify(newProduct));
    }else{
      // newProduct = [];
      newProduct.push( cart );
      // alert(JSON.stringify(newProduct));
    }
    // alert(newProduct);

    AsyncStorage.setItem('localCart', JSON.stringify(newProduct));

    let totalPrice = JSON.parse(totalCartPrice)
    if( !totalPrice )
    {
      totalPrice = 0;
    }else{
      totalPrice = totalCartPrice + price;
    }

alert(totalPrice);

    // AsyncStorage.setItem('totalCartPrice', totalCartPrice);


    // AsyncStorage.setItem('localCart', JSON.stringify(cart));
    // alert(JSON.stringify(cart));

  }

  getTotalPrice = async () => {
    let totalPrice = await AsyncStorage.getItem('totalPrice');
    return totalPrice;
  }

  getCart = async () => {
    let test = await AsyncStorage.getItem('localCart');
    alert(test);
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

  _onOrder = (id, name, price, qty) =>{
   
    this.setState({
      isAddToCart: true,
      itemPrice: price,
      itemSelected_name: name,
      itemSelected_id: id,
      itemSelected_qty: qty
    });

    if(parseInt(this.state.itemPriceSum) == 0){
      this.setState({
        itemPriceSum: price
      });
    }else{
      let total = parseInt(this.state.itemPriceSum) + price;
      this.setState({
        itemPriceSum: total
      });
    }

  }

  hidePopup = () => {
    this.setState({
      isAddToCart: false,
      itemPrice: 0,
      itemPriceSum: 0,
      itemQuantity: 1,
      itemSelected_name: '',
      itemSelected_id: '',
      itemSelected_qty: ''
    });
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
    this.setState({menuDetails: apiMenu});
    this.setState({isAddToCart: false});
  }
  

  render() {

    return (
      <View style={styles.container}>

        <Header
          leftComponent={{icon:'arrow-back', color:'#595959', onPress: () => this.props.navigation.goBack()}}
          // centerComponent={{ text: this.state.restaurantName }}
          rightComponent={{icon: 'notifications', color: '#595959', onPress: () => alert('Hoi')}}
          backgroundColor='transparent'
          outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
        />

        <View style={{alignItems: 'center'}}>
            <Text>
                {this.state.restaurantName}
            </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

          <Picker
            selectedValue={this.state.filterMenu}
            onValueChange={ (itemValue) => this.setState({filterMenu: itemValue}) }
            style={{width: width / 2.8}}
          >
            <Picker.Item label="All" value="All"/>
            <Picker.Item label="Appetizers" value="Appetizers"/>
            <Picker.Item label="Main" value="Main"/>
          </Picker>

          <Button 
            title="Filter Menu" 
            textStyle={{fontSize: RF(2)}}
            buttonStyle={{width: width / 4.2, padding: 3, elevation: 3, borderRadius: 5, backgroundColor: 'orange'}} 
          />

          <TouchableOpacity
          onPress={this.getCart}>
            <Text>LOL</Text>
          </TouchableOpacity>

        </View>

        <ScrollView style={{ marginBottom: 2 }}>

        {
            this.state.menuDetails.map((item, index) => {
              
              return (

                  <Card containerStyle={{borderRadius: 5}} key={index}>

                    <View style={{flexDirection: 'row'}}>

                      <Image 
                        style={{width: width / 3, height: height / 10, resizeMode: 'contain', borderRadius: 10}} 
                        source={{uri: placeholderImg }} 
                      />

                      <View style={{width: width / 2.4}}>
                        <Text>{ item.name }</Text>
                        <Text style={{marginTop: 10, fontSize: RF(3)}}>Rs. {item.price}</Text>
                      </View>

                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>

                      <TouchableOpacity 
                        style={styles.cardViewBtn}
                        onPress={() => this._onOrder(item.id, item.name, item.price, item.qty) }
                      >
                        <Text style={{ fontSize: RF(1.8), color: 'orange' }}>Order</Text>
                      </TouchableOpacity>

                    </View>

                  </Card>

                    
              );
            })}

            </ScrollView>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => this.props.navigation.navigate("Cart")}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                <Icon name="shopping-cart"  size={25} color="#fff" />
                <Text style={{ marginLeft: 15, color: '#fff' }}>Go to Cart</Text>
              </View>
            </TouchableOpacity>

            
            <Modal 
              isVisible={this.state.isAddToCart}
              animationIn="slideInUp"
              animationOut="slideOutDown"
            >

                    <Card containerStyle={{borderRadius: 5}}>

                      <View style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
                        <TouchableOpacity
                          onPress={this.hidePopup}
                        >
                          <Icon 
                            name="close"
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={{flexDirection: 'row', marginLeft: 10}}>

                        {/* <Image 
                          style={{width: width / 3, height: height / 10, resizeMode: 'contain', borderRadius: 10}} 
                          source={{uri: placeholderImg}} 
                        /> */}

                        <View style={{width: width / 2.4}}>
                          <Text style={{ fontSize: RF(2.6) }}>{this.state.itemSelected_name}</Text>
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
                              onPress={() => this._addToCart(
                                this.state.itemSelected_id, 
                                this.state.itemSelected_name,
                                this.state.itemPriceSum,
                                this.state.itemQuantity
                              )}
                          >
                              <Text style={{ fontSize: RF(1.8), color: 'orange' }}>Add to Cart</Text>
                          </TouchableOpacity>

                      </View>

                    </Card>

                  </Modal>


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
  },
  cartButton: {
    width: width,
    height: 35,
    backgroundColor: '#ff5722',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
  }

  
});