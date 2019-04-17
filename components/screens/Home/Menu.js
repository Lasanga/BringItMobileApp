

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView, Picker } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

import apiMenu from '../../API/menu.json';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class Menu extends Component {

  constructor(props){
    super(props);

    this.state = {

      restaurantName: this.props.navigation.state.params.restaurantName,
      filterMenu: '',
      orderDetails: false,
      orderDetailsSize: '',
      orderDetailsQuantity: '',
      restaurantId: this.props.navigation.state.params.restaurantId,
      itemId: '12',
      menuDetails: []
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

  _addToCart = () => {
    this.props.navigation.navigate('Order', { itemId: [this.state.itemId] });
  }

  componentDidMount()
  {
    this.setState({menuDetails: apiMenu});
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
            buttonStyle={{width: width / 4.2, padding: 3, elevation: 3, borderRadius: 5, backgroundColor: 'orange'}} />
        </View>

        {
            this.state.menuDetails.map((item, index) => {
              const url = item.url;
              return (

                <View>

                  <Card containerStyle={{borderRadius: 5}} key="index">

                    <View style={{flexDirection: 'row'}}>

                      <Image 
                        style={{width: width / 3, height: height / 10, resizeMode: 'contain', borderRadius: 10}} 
                        source={{uri: url }} 
                      />

                      <View style={{width: width / 2.4}}>
                        <Text>{ item.name }</Text>
                        <Text style={{marginTop: 10, fontSize: RF(3)}}>Rs. 590</Text>
                      </View>

                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}>

                      <TouchableOpacity 
                        style={styles.cardViewBtn}
                        onPress={this._addToCart}
                      >
                        <Text style={{ fontSize: RF(1.8), color: 'orange' }}>Order</Text>
                      </TouchableOpacity>

                    </View>

                  </Card>

                </View>
              
              );
            })}

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