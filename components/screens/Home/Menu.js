

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TextInput, TouchableHighlight, Alert, TouchableOpacity,
Dimensions, AsyncStorage, ScrollView, Picker } from 'react-native';
import {SearchBar, Card, Icon, Header, Button} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';

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
      orderDetailsQuantity: ''
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

        {/* <View style={{flexDirection: 'row', maxWidth: width, justifyContent: 'center', flexWrap: 'wrap'}}>
            <Card containerStyle={styles.card}>
                <Text>Appetizers</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Text>Main</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Text>Desert</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Text>Beverages</Text>
            </Card>
        </View> */}

        <View>

          <Card containerStyle={{borderRadius: 5}}>
            <View style={{flexDirection: 'row'}}>

              <Image 
                style={{width: width / 3, height: height / 10, resizeMode: 'contain', borderRadius: 10}} 
                source={{uri: 'http://www.pulse.lk/wp-content/uploads/2015/10/IMG_1294.jpg'}} 
              />

              <View style={{width: width / 2.4}}>
                <Text>Hot Butter Cuttlefish</Text>
                <Text style={{marginTop: 10, fontSize: RF(3)}}>Rs. 590</Text>
              </View>

              <TouchableOpacity 
                style={{justifyContent:'center'}}
                onPress={this._placeOrderEdit}
              >
                <Image
                  style={{width: width / 7, height: height / 25, resizeMode: 'contain', borderRadius: 10}} 
                  source={{uri: 'https://cdn3.iconfinder.com/data/icons/shopping-2/256/Add_to_Cart-512.png'}} 
                />
              </TouchableOpacity>

            </View>
          </Card>

          { 
            
            this.state.orderDetails 
            
            ? 

            <Card style={{marginTop: 0}}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                <View style={{width: width / 1.4}}>
                  <View style={{flexDirection: 'row', marginBottom: 20, justifyContent: 'center'}}>
                    <Text>Size</Text>
                    <Button 
                      title="Regular" 
                      buttonStyle={[styles.orderDetailsSize]}
                      textStyle={{ fontSize: RF(1.8)}}
                      onPress={this._orderDetailsSize_Regular}
                    />
                    <Button 
                      title="Large" 
                      buttonStyle={[styles.orderDetailsSize]}
                      textStyle={{ fontSize: RF(1.8)}}
                    />
                  </View>
                  
                  <View style={{flexDirection: 'row', marginBottom: 25, justifyContent: 'center'}}>
                    <Text style={{marginRight: 10}}>Quantity</Text>
                    <Button 
                      buttonStyle={[styles.orderDetailsQuantity]}
                      textStyle={{ fontSize: RF(1.8)}}
                      icon={{name: 'remove', color: 'grey'}}
                    />
                    <Text>1</Text>
                    <Button 
                      buttonStyle={[styles.orderDetailsQuantity, {marginLeft: 6}]}
                      textStyle={{ fontSize: RF(1.8)}}
                      icon={{name: 'add', color: 'grey'}}
                    />
                  </View>

                </View>
               
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button 
                  title="Cancel" 
                  buttonStyle={[styles.orderCardPromptBtns, {borderColor: 'red'}]}
                  textStyle={{ fontSize: RF(2), color: 'red' }}
                  onPress={this._cancelOrderDetails}
                />
                <Button 
                  title="Confirm"
                  buttonStyle={[styles.orderCardPromptBtns, {borderColor: 'green'}]}
                  textStyle={{ fontSize: RF(2), color: 'green' }}
                />
              </View>
            </Card>
            
            :

            <View></View>

          }

          
        
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
  }

  
});