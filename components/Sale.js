/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



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
   Alert,
   Dimensions,
   ListView,
   RefreshControl,
   ActivityIndicator,
   TextInput
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
 //import components
 import Styles from './../styles/StylesHome.js';

import CardHeader from './../sticker/CardHeader.js';
import { connect } from 'react-redux';
class Sale extends Component {

  constructor(props) {
  super(props);

      this.state = {
        text: '',
        page:1,
        fetching_from_server: false,
        refreshing: false,
        GridListItems: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
        params:this.props.navigation.getParam('itemId', 'NO-ID'),
        titleName:this.props.navigation.getParam('titleName', 'NO-ID'),
        data:[]
      };
    }
  onPress = () => {
      this.props.navigation.goBack()
  }
  renderFooter = () => {

    var footer = (

    <View >

      <ActivityIndicator size="large" color="#fff" />

    </View>

    );

    return footer;

  };
  render() {
    return (
      <View style={Styles.container}>
          <View style={Styles.Header}>
              <View style={Styles.Header_Logo} >
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


            <View style={Styles.body} style={{flex:1}}>

                          <View style={Styles.title}>
                              <Icon name='ios-flash' size={18} color='#000' />
                              <Text style={Styles.contentTitle}>{this.props.mutilanguge.productSale}</Text>
                          </View>
              <View style={{flex:1}}>

              <ListView
                  renderFooter={this.renderFooter}
                  onEndReached={this.loadNewData.bind(this)}
                  onEndReachedThreshold={30}
                  dataSource={this.state.GridListItems}
                  renderRow={(r)=>

                    <TouchableWithoutFeedback onPress={() => {
                        this.props.navigation.navigate('Detail', {
                          itemId: r.ItemID,
                        });
                      }}>
                      <View style={Styles.item}>
                          <Image style={Styles.item_image} source= {{uri:r.Image225}}  resizeMode="contain"  />
                          <View style={Styles.item_title}>
                              <Text style={Styles.item_product_title}>{r.Title}</Text>
                              <Text style={Styles.item_product_price}>{r.Price} {r.Currency}</Text>
                              {r.DiscountPercentage > 0 &&
                                <Text style={Styles.item_product_price_sale}>{r.OriginalPrice} {r.Currency}</Text>
                              }
                              {r.DiscountPercentage > 0 &&
                              <Text style={Styles.item_product_price_off}>{r.DiscountPercentage}% {this.props.mutilanguge.off}</Text>
                              }
                              <Text style={Styles.item_product_price_date}>3d 21h</Text>
                          </View>

                      </View>
                      </TouchableWithoutFeedback>
                  }
              />
              </View>
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
      </View>
    );
  }
  loadNewData(){

    fetch("http://3.0.184.47:32000/aws/e/promotion/?&limit=10&page="+this.state.page)
    .then((response)=>response.json())
    .then((responseJson)=>{
      if(responseJson.Items.length != 0)
      {
        this.setState(

          {
          data:this.state.data.concat(responseJson.Items),
          page:this.state.page+1,
          GridListItems:this.state.GridListItems.cloneWithRows(this.state.data)
          })
      }



    })
    .catch((error)=>{
        console.log(error);
      });

  }
  componentDidMount(){
    fetch("http://3.0.184.47:32000/aws/e/promotion/?&limit=10&page=1")
    .then((response)=>response.json())
    .then((responseJson)=>{

      this.setState(

        {
        data:responseJson.Items,
        page:this.state.page+1,
        GridListItems:this.state.GridListItems.cloneWithRows(responseJson.Items)
        })


    })
    .catch((error)=>{
        console.log(error);
      });
  }
}
function mapStateToPropsRefesh(state){
    return {
    tabBar: state.tabBar,
    language: state.language,
    mutilanguge : state.mutilanguge,
    myValue: state.value,
  };
}
export default connect(mapStateToPropsRefesh)(Sale);
