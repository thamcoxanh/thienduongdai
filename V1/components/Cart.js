/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//import lib react native
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Easing,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
  AsyncStorage,
  Alert,
  RefreshControl,
  ListView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//import components
import CardHeader from './../sticker/CardHeader.js';

import ListCategory from './../components/ListCategory.js';
import Sale from './../components/Sale.js';
import DetailProduct from './../components/DetailProduct.js';
import Detail from './../components/Detail.js';
import Search from './../components/Search.js';
import HistorySearch from './../components/HistorySearch.js';
import DetailCategory from './../components/DetailCategory.js';
import Styles from './../styles/StylesHome.js';
import { connect } from 'react-redux';



const width = Dimensions.get('window').width;
const widthHalf = Dimensions.get('window').width/2;
const height = Dimensions.get('window').height;


class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GridListItemsProductCart: [],
            cartTotal : this.props.myValue,
            data : [],
            message : '',
            displayKeyborth : true ,
            fadeIn: new Animated.Value(1),
            statusPopupAlert : false ,
            popUpShow : {
              width : width,
              height: height,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top : 0,
              left: 0},
              statusPopupLoadding : false
        };
    }


    render() {
        return (
            <View style={Styles.container}>

                <View style={Styles.Header}>
                    <View style={Styles.Header_Logo}>
                        <View style={Styles.Header_Logo_Icon} >
                          <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.goBack();
                          }}>
                            <Icon name='ios-arrow-round-back' color='#a4cd39' size={30} style={{marginRight:15}} />
                          </TouchableWithoutFeedback>
                            <Icon name='ios-menu' color='#a4cd39' size={30}  />
                        </View>


                        <View style={Styles.Header_Logo_Image} >
                            <Image source={require("./../image/logoxanhluc.png")} style={{ height: 22, width: 120 }} />
                        </View>


                        <TouchableWithoutFeedback onPress={() => {
                          this.props.navigation.navigate('Cart');
                        }}>
                          <View style={Styles.Header_Cart} >
                              <Icon name='ios-cart' color='#a4cd39' size={30} />
                              <View style={Styles.cart_mount} >
                                  <Text  style={Styles.cart_mount_count} >{this.props.myValue}</Text>
                              </View>
                          </View>
                      </TouchableWithoutFeedback>

                    </View>
                </View>


                <View style={Styles.Header}>
                    <View style={Styles.Header_Search}>

                        <View style={Styles.Header_Search_Icon} >
                            <Icon name='ios-search' color='#9b9b9b' size={15}  />
                        </View>
                        <View style={Styles.Header_Seacrh_Input} >
                            <TextInput
                              style={Styles.Header_Seacrh_Input_Custom}
                              placeholder= {this.props.mutilanguge.searchReplace}
                              onFocus={() => {
                                this.props.navigation.navigate('HistorySearch');
                              }}
                            />
                        </View>



                    </View>
                </View>

                <View style={Styles.body} style={{flex:1}}>
                <ScrollView style={Styles.body} showsVerticalScrollIndicator={false}  >

                    <View style={Styles.Title_H1}>
                        <Icon name='ios-flash' size={18} color='#000' />
                        <Text style={Styles.contentTitle_h1}>{this.props.mutilanguge.cart}</Text>
                    </View>



                    {this.state.GridListItemsProductCart  ?


                      this.state.GridListItemsProductCart.map(r => {
                          return (
                            <View style={Styles.item_group_product_cart}>
                                <Image style={Styles.item_image_cart} source= {{uri:r.productInfo.PictureURL[0]}} resizeMode="contain" />
                                <View style={Styles.item_title_cart}>
                                    <Text style={Styles.item_product_title}>{r.productInfo.Title}</Text>
                                    {r.description != '0'  ?
                                    <View>
                                        {r.styleVariation.VariationSpecifics.NameValueList.map(item => {
                                            return (
                                              <View style={Styles.cart_view_price}>
                                                  <Text style={Styles.cart_view_text}>{item.Name} : {item.Value}</Text>
                                              </View>
                                        )})}
                                        <View style={Styles.cart_view_quantity}>
                                            <Text style={Styles.cart_view_text}>{this.props.mutilanguge.cartCountExist} : {r.totalProduct}</Text>
                                        </View>
                                        <View style={Styles.cart_view_price}>
                                            <Text style={Styles.cart_view_text}>{this.props.mutilanguge.cartPriceItem} : {r.priceCart} {r.productInfo.Price.Key}</Text>
                                        </View>
                                        <View style={Styles.cart_view_quantity}>
                                            <TextInput
                                              style={this.state.data[r.sku].style}
                                              placeholder={this.props.mutilanguge.mount}
                                              keyboardType = 'numeric'
                                              value= {this.state.data[r.sku].count}
                                              editable = {this.state.displayKeyborth}
                                              onChangeText={(text) => {
                                                  var data = this.state.data;
                                                  if(text > data[r.sku].totalProduct){
                                                      data[r.sku].style = {paddingLeft : 20,
                                                      paddingBottom: 2,
                                                      paddingTop: 2,
                                                      paddingRight: 20,
                                                      borderWidth: 0.5,
                                                      borderRadius: 10,
                                                      borderColor: '#FF0000',
                                                      marginRight:5};
                                                      this.setState({
                                                        message : this.props.mutilanguge.countUpInCart,
                                                      });
                                                      data[r.sku].count = data[r.sku].totalProduct+'';
                                                      this.showPopUpClick();
                                                  }else{
                                                      data[r.sku].count = text;
                                                  }
                                                  this.setState({
                                                    data : data
                                                  });

                                              }}
                                            />
                                            <TouchableWithoutFeedback onPress={() => {
                                              this.confirmRemoveId(r.productID , r.sku);
                                            }}>
                                                <Icon name='ios-trash' color='red' size={30} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                    : null }
                                    {r.description == '0'  ?
                                    <View>
                                        <View style={Styles.cart_view_quantity}>
                                            <Text style={Styles.cart_view_text}>{this.props.mutilanguge.cartCountExist} : {r.productInfo.Quantity} </Text>
                                        </View>
                                        <View style={Styles.cart_view_price}>
                                            <Text style={Styles.cart_view_text}> {this.props.mutilanguge.cartPriceItem} : {r.productInfo.Price.Value} {r.productInfo.Price.Key}</Text>
                                        </View>
                                        <View style={Styles.cart_view_quantity}>
                                            <TextInput
                                              style={this.state.data[r.productID].style}
                                              editable = {this.state.displayKeyborth}
                                              onChangeText={(text) => {
                                                  var data = this.state.data;
                                                  if(text > data[r.productID].totalProduct){
                                                      data[r.productID].style = [{paddingLeft : 20,
                                                      paddingBottom: 2,
                                                      paddingTop: 2,
                                                      paddingRight: 20,
                                                      borderWidth: 0.5,
                                                      borderRadius: 10,
                                                      borderColor: '#FF0000',
                                                      marginRight:5}];
                                                      this.setState({
                                                        message : this.props.mutilanguge.countUpInCart,
                                                      });
                                                      data[r.productID].count = data[r.productID].totalProduct+'';
                                                      this.showPopUpClick();
                                                  }else{
                                                      data[r.productID].count = text;
                                                  }
                                                  this.setState({
                                                    data : data
                                                  });

                                              }}
                                              placeholder={this.props.mutilanguge.mount}
                                              keyboardType = 'numeric'
                                              value= {this.state.data[r.productID].count}

                                            />
                                            <TouchableWithoutFeedback onPress={() => {
                                              this.confirmRemoveId(r.productID , '');
                                            }}>
                                                <Icon name='ios-trash' color='red' size={30} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>

                                    : null }



                                </View>

                            </View>

                          )
                      }
                    )


                    : null }


                    {this.state.GridListItemsProductCart == 0  ?
                        <View style={{flex:1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop:100,
                      }}>
                            <Text>{this.props.mutilanguge.alertCartProductNull}</Text>
                        </View>
                    : null}
                    {this.state.GridListItemsProductCart != 0  ?
                      <View>
                         <TouchableOpacity onPress={() => {
                             this.confirmupdateAllCart();
                         }}>
                          <View style={Styles.readmore}>
                              <Text style={Styles.contentReadmore}>{this.props.mutilanguge.updateCart}</Text>
                          </View>

                        </TouchableOpacity>

                        <View style={Styles.button_card2}>
                            <Text style={Styles.button_card_content}>{this.props.mutilanguge.cartPayment}</Text>
                        </View>
                      </View>
                      : null}


                </ScrollView>
                    {this.state.statusPopupLoadding == true ?
                    <View style={Styles.loadingView}>
                                <Image source={require("./../image/loading.gif")} style={{ height: 50, width: 50 }} />
                    </View>
                    :null}
                </View>
                <View style={Styles.bottomBar}>

                  <TouchableWithoutFeedback onPress={() => {
                    this.props.dispatch({type:"HOME"});
                    this.props.navigation.navigate('Home', {
                      params: '',
                    });
                  }}>
                  <View style={Styles.bottomBar_Item}>
                        <Icon name='ios-home' color={this.props.tabBar.home} size={24} />
                  </View>

                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => {
                    this.props.dispatch({type:"NOTIFICATIONS"});
                    this.props.navigation.navigate('notifications', {
                      params: '',
                    });
                  }}>

                  <View style={Styles.bottomBar_Item}>
                        <Icon name='ios-notifications' color={this.props.tabBar.notifications} size={24} />
                  </View>
                  </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => {
                      this.props.dispatch({type:"SEARCH"});
                      this.props.navigation.navigate('HistorySearch', {
                        params: '',
                      });
                    }}>
                    <View style={Styles.bottomBar_Item}>
                          <Icon name='ios-search' color={this.props.tabBar.search} size={24} />
                    </View>
                  </TouchableWithoutFeedback>

                  <TouchableWithoutFeedback onPress={() => {
                    this.props.dispatch({type:"USER"});
                    this.props.navigation.navigate('userprofile', {
                      params: '',
                    });
                  }}>

                  <View style={Styles.bottomBar_Item}>
                        <Icon name='ios-person' color={this.props.tabBar.user} size={24} />
                  </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => {
                    this.props.dispatch({type:"FLASH"});
                    this.props.navigation.navigate('flash', {
                      params: '',
                    });
                  }}>
                  <View style={Styles.bottomBar_Item}>
                        <Icon name='ios-flash' color={this.props.tabBar.flash} size={24} />
                  </View>

                  </TouchableWithoutFeedback>
              </View>
                {this.state.statusPopupAlert == true ?
                    <View style={this.state.popUpShow}>
                      <View style={Styles.popupBackgrounOpatical}></View>
                        <Animated.View
                           style={{opacity: this.state.fadeIn}}
                        >

                        <View style={Styles.popupContent}>
                            <View style={Styles.popupTitle}>
                                <Text style={Styles.popupTitleText}>{this.props.mutilanguge.popUpAlertTitle}</Text>
                            </View>
                            <Text style={Styles.popupContentText}> {this.state.message}</Text>
                        </View>

                      </Animated.View>
                    </View>
                    :null }
            </View>
        );
    }
    showPopUpClick(){
      this.setState({
        displayKeyborth : false,
        statusPopupAlert : true,
      });
      this.state.fadeIn.setValue(1)
      Animated.timing(
         this.state.fadeIn,
         {
           toValue: 0.5,
           duration: 2000,
         }
      ).start(() => {
        this.setState({
        displayKeyborth : true,
        statusPopupAlert : false
      });});

    }
    confirmupdateAllCart(){
      Alert.alert(
        this.props.mutilanguge.confirm,
        this.props.mutilanguge.confirmUpdateCart,
        [
          {text: this.props.mutilanguge.cancel, onPress: () => console.log('NO Pressed'), style: 'cancel'},
          {text: this.props.mutilanguge.yes, onPress: () => this.updateAllCart()},
        ]
      );
    }
    updateAllCart(){
        this.setState({
          statusPopupLoadding : true,
        });

        var update = [];
        this.state.GridListItemsProductCart.map((r) => {
          if(r.description == '0'){
            var arr = [{  productID: this.state.data[r.productID].productid ,
                          sku : this.state.data[r.productID].sku ,
                          quantity : parseInt(this.state.data[r.productID].count ),
                          description : this.state.data[r.productID].value}];
            update = update.concat(arr);
          }else{
            var arr = [{  productID: this.state.data[r.sku].productid ,
                          sku : this.state.data[r.sku].sku ,
                          quantity : parseInt(this.state.data[r.sku].count) ,
                          description : this.state.data[r.sku].value}];
            update = update.concat(arr);
          }

        });
        var data = {
                cookie : this.props.cookieApp,
                cartProducts : update,
        };
        console.log(JSON.stringify(data));
        fetch('http://xanhluc.com:33000/cart/cookie/'+this.props.cookieApp, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
              this._getCart();
        })
        .catch((error)=>{
            this.setState({
              statusPopupLoadding : false
            });
        });
    }
    removeCart(id,sku){
      this.setState({
        statusPopupLoadding : true,
      });
      var data = {
              cookie : this.props.cookieApp,
              productID : id,
              sku : sku,
            };
      fetch('http://xanhluc.com:33000/cart/cookie/product/', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
          this._getCart();
      })
      .catch((error)=>{
        this.setState({

          statusPopupLoadding : false
        });
      });

    }
    confirmRemoveId(id,sku){
      Alert.alert(
        this.props.mutilanguge.confirm,
        this.props.mutilanguge.confirmRemoveCart,
        [
          {text: this.props.mutilanguge.cancel, onPress: () => console.log('NO Pressed'), style: 'cancel'},
          {text: this.props.mutilanguge.yes, onPress: () => this.removeCart(id,sku)},
        ]
      );
    }
    componentDidMount(){
        this._getCart();
    }

    _getCart(){
        this.setState({
          statusPopupLoadding : true
        });
        fetch('http://xanhluc.com:33000/cart/cookie/'+this.props.cookieApp, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
            })
            .then((response)=>response.json())
            .then((responseJsonDetail)=>{

              if(responseJsonDetail.error){
                this.setState({
                  GridListItemsProductCart: [],
                  data : []
                })
                this.setState({

                  statusPopupLoadding : false
                });
              }else if(responseJsonDetail.cartProducts && responseJsonDetail.cartProducts != null){
                  var data = [];
                  responseJsonDetail.cartProducts.map((userData) => {
                      if(userData.description != '0' ){
                          data[userData.sku] = {productid : userData.productID , sku : userData.sku ,producttype : 1, value : userData.description+"",count : userData.quantity+"",totalProduct : "",style : {paddingLeft : 20,
                          paddingBottom: 2,
                          paddingTop: 2,
                          paddingRight: 20,
                          borderWidth: 0.5,
                          borderRadius: 10,
                          borderColor: '#000',
                          marginRight:5}};
                      }else{
                          data[userData.productID] = {productid : userData.productID , sku : userData.sku ,producttype : 0, value : userData.description+"",count : userData.quantity+"",totalProduct : "",style : {paddingLeft : 20,
                          paddingBottom: 2,
                          paddingTop: 2,
                          paddingRight: 20,
                          borderWidth: 0.5,
                          borderRadius: 10,
                          borderColor: '#000',
                          marginRight:5}};
                      }
                  });
                  responseJsonDetail.cartProducts.map((responseJson) => {



                      if(responseJson.description != '0' ){

                          var style_product ;
                          responseJson.productInfo.Variations.map((itemVariations) => {
                              if(itemVariations.SKU == responseJson.sku){
                                style_product = itemVariations;
                              }
                          })

                          responseJson.totalProduct  = style_product['Quantity'];
                          responseJson.styleVariation  = style_product;
                          responseJson.priceCart  = style_product['StartPrice'];
                          if(style_product['Quantity'] < data[responseJson.sku]['count']){
                              data[responseJson.sku]['count'] = style_product['Quantity']
                          }
                          data[responseJson.sku]['totalProduct'] = style_product['Quantity'];
                      }else{
                        if(responseJson.productInfo.Quantity < data[responseJson.productID]['count']){
                            data[responseJson.productID]['count'] = responseJson.productInfo.Quantity
                        }
                        data[responseJson.productID]['totalProduct'] = responseJson.productInfo.Quantity;
                      }

                  });
                  this.setState({
                    GridListItemsProductCart: responseJsonDetail.cartProducts,
                    data : data
                  })
                  this.setProductCart();
                  this._getCartCount();
                  this.setState({
                    statusPopupLoadding : false
                  });

              }else if(!responseJsonDetail.error && responseJsonDetail.cartProducts == null){
                this.setState({
                  GridListItemsProductCart: [],
                  data : []
                })
                this.setProductCart();
                this._getCartCount();
                this.setState({
                  statusPopupLoadding : false
                });
              }

              this.setState({
                statusPopupLoadding : false
              });
            })
            .catch((error)=>{
              console.log(error);
            });
        ;
    }
    _getCartCount = async () => {
        try {
          //await AsyncStorage.removeItem('productcart@logistic');
          const value = await AsyncStorage.getItem('productcart@logistic');

            if (value !== null) {
                var cartList = JSON.parse(value);
                var flagTotalCart = 0;
                cartList.map((userData) => {
                    flagTotalCart++;
                });
                this.props.dispatch({type:"GETCART", count:flagTotalCart});
            }else{
                this.props.dispatch({type:"GETCART", count:0});
            }
         } catch (error) {
           // Error retrieving data
         }
    }

    setProductCart = async()=>{
              if(this.state.GridListItemsProductCart.length > 0){

                  var arr_product = [];
                  this.state.GridListItemsProductCart.map((responseJson) => {
                      var arr = [];
                      var type = '0';
                      var value = ''
                      if(responseJson.description != 0){
                        type = '1';
                        value = responseJson.description;
                      }
                      arr = [{product_id: responseJson.productID , producttype : type , value : value , count : responseJson.quantity}];
                      arr_product = arr_product.concat(arr);

                  });
                  var variable_product = JSON.stringify(arr_product);
                  await AsyncStorage.setItem('productcart@logistic',variable_product);
              }else {
                    await AsyncStorage.removeItem('productcart@logistic');
              }

    }

}



function mapStateToPropsRefesh(state){
    return {
    userLoginStatus : state.userLoginStatus,
    userLoginProfile : state.userLoginProfile,
    myValueRefesh : state.myValueRefesh,
    language: state.language,
    mutilanguge : state.mutilanguge,
    tabBar: state.tabBar,
    myValue: state.value,
    cookieApp : state.cookieApp,
  };
}
export default connect(mapStateToPropsRefesh)(Cart);
