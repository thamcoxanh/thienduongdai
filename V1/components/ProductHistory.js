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
  RefreshControl
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

class ProductHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GridListItemsProductSale: [],
            GridListItemsProductHistory: [],
            countProductHistory:0,
            refesh:this.props.myValueRefesh,
            refreshing : false,
            count : 10 ,
            page : 1
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



                <ScrollView style={Styles.body} showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._getProductHistory.bind(this)}
                    />
                  }

                >



                    {this.state.countProductHistory > 0 ?
                    <View style={Styles.Title_H1}>
                        <Icon name='ios-flash' size={18} color='#000' />
                        <Text style={Styles.contentTitle_h1}>{this.props.mutilanguge.productHistory}</Text>
                        <TouchableWithoutFeedback onPress={() => {
                          this.componentDidMount();
                        }}>
                            <Icon name='ios-refresh' color='#a4cd39' size={20} style={{position: 'absolute', right:10,top:13}} />
                        </TouchableWithoutFeedback>
                    </View>
                    : null }
                    <TouchableOpacity onPress={() => {
                        this._removeHistory();
                    }}>
                     <View style={Styles.readmore}>
                         <Text style={Styles.contentReadmore}>{this.props.mutilanguge.removeAllProductHistory}</Text>
                     </View>
                 </TouchableOpacity>
                    <FlatList
                        data={ this.state.GridListItemsProductHistory }
                        renderItem={ ({item}) =>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('Detail', {
                              itemId: item.ItemID,
                            });
                        }}>
                        <View style={Styles.item_group_product}>
                            <Image style={Styles.item_image} source= {{uri:item.PictureURL}}  resizeMode="contain"  />
                            <View style={Styles.item_title}>
                                <Text style={Styles.item_product_title}>{item.Title}</Text>
                                <Text style={Styles.item_product_price}>{item.Price.Value} {item.Price.Key}</Text>
                                {item.DiscountPercentage > 0 &&
                                  <Text style={Styles.item_product_price_sale}>{item.OriginalPrice.Value} {item.OriginalPrice.Key}</Text>
                                }
                                {item.DiscountPercentage > 0 &&
                                <Text style={Styles.item_product_price_off}>{item.DiscountPercentage}% {this.props.mutilanguge.off}</Text>
                                }
                                <Text style={Styles.item_product_price_date}>3d 21h</Text>
                            </View>

                        </View>
                        </TouchableWithoutFeedback>
                      }
                      numColumns={1}
                   />

                </ScrollView>

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


            </View>
        );
    }

    _getProductHistory = async () => {
        try {
          const value = await AsyncStorage.getItem('productHistory@logistic');
          var flag_product = [];
          var get_product = [];
          var str_product = '';
          if (value !== null) {
            // We have data!!
            flag_product = JSON.parse(value);


                get_product = flag_product;
            this.setState({
              countProductHistory:get_product.length,
            })
            if(get_product.length > 0){
                str_product = get_product.join(',');

                fetch("http://3.0.184.47:32000/aws/e/multi/"+str_product)
                .then((response)=>response.json())
                .then((responseJson)=>{
                  this.setState({
                    GridListItemsProductHistory:responseJson,
                    })

                })
                .catch((error)=>{
                    console.log(error);
                  });

            }

            this.setState({
              refreshing:false,
              })
          }
         } catch (error) {
           // Error retrieving data
         }
    }

    componentDidMount(){
        this._getProductHistory();
    }

    _removeHistory = async()=>{
      try {
            await AsyncStorage.removeItem('productHistory@logistic');
            this.setState({
              GridListItemsProductHistory:[],
            })
            this._getProductHistory();
        } catch (error) {
          console.log(error)
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
    myValue: state.value
  };
}
export default connect(mapStateToPropsRefesh)(ProductHistory);
