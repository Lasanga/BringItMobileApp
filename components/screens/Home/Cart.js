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

const serverErrorImg = "https://cdn2.iconfinder.com/data/icons/databases-and-cloud-technology/48/56-512.png";

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            cartItems: [],
            onCartConfirmed: true,
            showAlert: false,
            isErrorPopup: false,
            isItemRemove: false
        }
    }

    removeItem(id)
    {
        // alert(id);
        this.showAlert();
        this.setState({
            isItemRemove: true
        })
    }

    componentDidMount()
    {
        this.setState({ cartItems: apiMenu });
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

      removePopupHide = () => {
          this.setState({
              isItemRemove: false
          })
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

                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={{ width: width / 1.5, textAlign: 'center' }}>Item</Text>
                        <Text style={{ width: width / 7 }}>Qty</Text>
                        <Text style={{ marginLeft: 15 }}>Price</Text>
                    </View>

                   <ScrollView>
                   {

                        this.state.cartItems.map((item, index) => {

                            return (

                                <Card containerStyle={{ marginBottom: 2 }} key={index}>
                                    <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => this.removeItem(item.id) }
                                    >
                                        <Icon
                                            name="close"
                                            size={15}
                                            containerStyle={{ marginRight: 15 }}
                                        />
                                    </TouchableOpacity>
                                        <Text style={{ width: width / 2 }}>{item.name}</Text>
                                        <Text style={{ width: width / 7, marginLeft: 10 }}>{item.qty}</Text>
                                        <Text>Rs. {item.price * item.qty}</Text>
                                    </View>
                                </Card> 
                                    
                            );

                        })  

                    }
                   </ScrollView>
   

                    <View style={{ marginTop: 230 }}>

                        <Card>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: width / 1.35, textAlign: 'right', paddingRight: 20 }}>Sub Total</Text>
                                <Text>Rs. 2450</Text>
                            </View>

                            <View style={{ flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgrey' }}>
                                <Text style={{ width: width / 1.35, textAlign: 'right', paddingRight: 20 }}>Discount</Text>
                                <Text>Rs. 50</Text>
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
                                            onPress={this.errorPopupShow}
                                        >
                                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Checkout</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                : 

                                    <View style={{ marginTop: 15, alignItems: 'center' }}>
                                        <Text style={{ fontSize: RF(1.8 ), textAlign: 'center', color: 'red' }}>Items in cart maybe lost on closing the app. Please confirm the items.</Text>

                                        <TouchableOpacity 
                                            style={styles.bottomBtn}
                                        >
                                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Confirm items in Cart</Text>
                                        </TouchableOpacity>
                                    </View>

                            }

                        </Card>      

                    </View> 

                    {/* <AwesomeAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Server Error"
                        message="Our servers are busy at the moment. Please try again later!"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        confirmText="Ok"
                        confirmButtonColor="#DD6B55"
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />    */}

                         

                </View>

                {/* <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Remove Item"
                    message="Are you sure you want to remove this item?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />  */}

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
                                    // onPress={this.errorPopupHide} 
                                    style={{ marginTop: 25, paddingVertical: 8, paddingHorizontal: 15, backgroundColor: 'grey', borderRadius: 5 }}>
                                    <Text style={{ color: 'white' }}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.removePopupHide} 
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