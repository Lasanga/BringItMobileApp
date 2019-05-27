import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View, 
    Image,
    TextInput, 
    TouchableOpacity,
    Dimensions, 
    AsyncStorage, 
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import {
    SearchBar, 
    Card, 
    Icon, 
    Header, 
    Button
} from 'react-native-elements';
import RF from 'react-native-responsive-fontsize';
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from "react-native-modal";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import apiMenu from '../../API/menu.json';
// import console = require('console');

const serverErrorImg = "https://cdn2.iconfinder.com/data/icons/databases-and-cloud-technology/48/56-512.png";

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            cartItems: [],
            onCartConfirmed: false,
            showAlert: false,
            isErrorPopup: false,
            isItemRemove: false,
            isCartEmpty: true,
            totalCartPrice: 0,
            itemToRemove_Id: 0
            // isLocalCartConfirmed: false
        }
    }

    removeItem = (index) =>
    {
        this.setState({
            isItemRemove: true, 
            itemToRemove_Id: index
        });
    }

    confirmRemoveItem = async () => {
        this.state.cartItems.splice(this.state.itemToRemove_Id, 1);
        AsyncStorage.removeItem('localCart');
        AsyncStorage.setItem('localCart', JSON.stringify(this.state.cartItems));
        var items = AsyncStorage.getItem('localCart');
        // if(items == '[]'){
        //     this.props.navigation.navigate("Home");
        // }
        
        this.setState({isItemRemove: false});
    }

    cancelRemoveItem = () => {
        this.setState({
            isItemRemove: false,
            itemToRemove_Id: 0
        });
    }

    _getLocalCartDetails = async () => {
        let localCartDetails = await AsyncStorage.getItem('localCart');
        return localCartDetails;
      }


    _clearCart = () => {
        AsyncStorage.setItem('localCart', '[]');
    }

    _checkoutCart = () => {
        AsyncStorage.removeItem('localCart');
    }

    _confirmCartItems = () => {
        this.setState({
            onCartConfirmed: true
        });
    }

    getTotalPrice = async () => {
        let totalPrice = await AsyncStorage.getItem('totalCartPrice');
        return totalPrice;
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };
    
    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    errorPopupShow = () => {
        this.setState({
            isErrorPopup: true
        })
    }

    errorPopupHide = () => {
        this.setState({
            isErrorPopup: false
        })
    }

    _onEmptyCart = async () => 
    {
        this.setState({
            isCartEmpty: true
        });
        // AsyncStorage.removeItem({})
        // AsyncStorage.setItem('totalCartPrice', '0');
    }

    componentDidMount()
    {
        // this.setState({ cartItems: apiMenu });

        this._getLocalCartDetails().then((localCartDetails) => {
            // alert(localCartDetails);
            if(localCartDetails != null && localCartDetails != '[]'){
                this.setState({
                    cartItems: JSON.parse(localCartDetails),
                    isCartEmpty: false
                });

                this.getTotalPrice().then((totalPrice) => {
                    alert(totalPrice);
                });


            }else{
                this._onEmptyCart();
            }

        });

        

    }


    render() {
        return(
            <View style={styles.container}>

                <Header
                    leftComponent={{icon:'arrow-back', color:'#595959', onPress: () => this.props.navigation.goBack()}}
                    centerComponent={{text: 'Your cart'}}
                    // rightComponent={{icon: 'notifications', color: '#595959', onPress: () => alert('Hoi')}}
                    backgroundColor='transparent'
                    outerContainerStyles={{height: RF(6), borderBottomColor: 'transparent', paddingBottom: 3}}
                />

                <View>

                   
                {

                    this.state.isCartEmpty

                    ?
                    

                    <View style={{ height: height / 1.8 }}>
                        <Text style={{ fontSize: RF(3), textAlign: 'center', marginTop: 50 }}>Your cart is empty</Text>
                    </View>
                    

                   :

                   <View>

                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <Text style={{ width: width / 1.5, textAlign: 'center' }}>Item</Text>
                            <Text style={{ width: width / 7 }}>Qty</Text>
                            <Text style={{ marginLeft: 15 }}>Price</Text>
                        </View>

                    
                        <ScrollView style={{ height: height / 2 }}>
                        {

                                this.state.cartItems.map((item, index) => {

                                    return (

                                        <Card containerStyle={{ marginBottom: 2 }} key={index}>
                                            <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                onPress={() => this.removeItem(index) }
                                            >
                                                <Icon
                                                    name="close"
                                                    size={15}
                                                    containerStyle={{ marginRight: 15 }}
                                                />
                                            </TouchableOpacity>
                                                <Text style={{ width: width / 2 }}>{item.itemName}</Text>
                                                <Text style={{ width: width / 7, marginLeft: 10 }}>{item.qty}</Text>
                                                <Text>Rs. {item.price}</Text>
                                            </View>
                                        </Card> 
                                            
                                    );

                                })  

                            }
                            </ScrollView>

                            <View>

                                <Card>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={this._clearCart}
                                        >
                                            <Text>Clear cart</Text>
                                        </TouchableOpacity>
                                        <Text style={{ width: width / 1.69, textAlign: 'right', paddingRight: 20 }}>Sub Total</Text>
                                        <Text>Rs. 2450</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgrey' }}>
                                        <Text style={{ width: width / 1.35, textAlign: 'right', paddingRight: 20 }}>Discount</Text>
                                        <Text>Rs. 0</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                        <Text style={{ width: width / 1.35, textAlign: 'right', paddingRight: 20, fontWeight: 'bold' }}>Net Total</Text>
                                        <Text style={{ fontWeight: 'bold' }}>Rs. 2400</Text>
                                    </View>

                                    {

                                        this.state.onCartConfirmed

                                        ?

                                            <View style={{ alignItems: 'center' }}>
                                                <TouchableOpacity 
                                                    style={styles.bottomBtn}
                                                    // onPress={this.showAlert}
                                                    onPress={this._checkoutCart}
                                                >
                                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Checkout</Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                        : 

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ fontSize: RF(1.8 ), textAlign: 'center', color: 'red', marginTop: 20 }}>Items in cart maybe lost on closing the app. Please confirm the items.</Text>

                                                <TouchableOpacity 
                                                    style={[styles.bottomBtn, { marginTop: 10 } ]}
                                                    onPress={this._confirmCartItems}
                                                >
                                                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Confirm items in Cart</Text>
                                                </TouchableOpacity>
                                            </View>

                                    }

                                </Card>      

                            </View> 

                        </View>

                }

                         

                </View>


                <Modal
                    isVisible={this.state.isErrorPopup}
                >
                    <Card
                        containerStyle={{ borderRadius: 5 }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/images/img.png')}
                                style={{ width: width / 2.2, height: height / 6, resizeMode: 'contain' }}
                            />
                            <Text style={{ fontSize: RF(3.5), fontWeight: 'bold', marginTop: 15 }}>
                                Server Error
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                Our servers are busy at the moment. Please try again later!
                            </Text>
                            <TouchableOpacity 
                                onPress={this.errorPopupHide} 
                                style={{ marginTop: 25, paddingVertical: 8, paddingHorizontal: 15, backgroundColor: 'red', borderRadius: 5 }}>
                                <Text style={{ color: 'white' }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </Modal>

                <Modal
                    isVisible={this.state.isItemRemove}
                >
                    <Card
                        containerStyle={{ borderRadius: 5 }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/images/remove.png')}
                                style={{ width: width / 2.2, height: height / 6, resizeMode: 'contain' }}
                            />
                            <Text style={{ fontSize: RF(3.5), fontWeight: 'bold', marginTop: 15 }}>
                                Remove Item
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                Are you sure to remove this item from the cart?
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity 
                                    onPress={this.cancelRemoveItem} 
                                    style={{ marginTop: 25, paddingVertical: 8, paddingHorizontal: 15, backgroundColor: 'grey', borderRadius: 5 }}>
                                    <Text style={{ color: 'white' }}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.confirmRemoveItem} 
                                    style={{ marginTop: 25, marginLeft: 10, paddingVertical: 8, paddingHorizontal: 15, backgroundColor: 'red', borderRadius: 5 }}>
                                    <Text style={{ color: 'white' }}>Yes</Text>
                                </TouchableOpacity>
                            </View>
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
    bottomBtn: {
        borderColor: 'green',
        borderWidth: 1,
        padding: 8,
        marginTop: 30,
        borderRadius: 5,
        color: 'white',
        backgroundColor: 'green'
    }
})