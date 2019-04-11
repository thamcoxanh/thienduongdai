''/**
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
   WebView,
   TextInput
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
 //import components
 import Styles from './../styles/StylesHome.js';

 import HTML from 'react-native-render-html';

import CardHeader from './../sticker/CardHeader.js';
import { connect } from 'react-redux';
class DetailProduct extends Component {

  constructor(props) {
  super(props);

      this.state = {
      text: '',
        params:this.props.navigation.getParam('itemId', 'NO-ID'),
        htmlContent:'<iframe height="1000px" src="https://vi.vipr.ebaydesc.com/ws/eBayISAPI.dll?ViewItemDescV4&item='+this.props.navigation.getParam('itemId', 'NO-ID')+'" ></iframe> '
      };

    }
  onPress = () => {
      this.props.navigation.goBack()
  }
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


            <ScrollView style={Styles.body} showsVerticalScrollIndicator={false} >


              <View style={Styles.title}>
                  <Icon name='ios-flash' size={18} color='#000' />
                  <Text style={Styles.contentTitle}>{this.props.mutilanguge.detailInformation}</Text>
              </View>

              <View style={Styles.item_product_detail_html_2}>

                <HTML html={this.state.htmlContent} />
              </View>

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

  componentWillMount() {

  }
  componentWillUnmount() {

  }
  componentDidMount(){



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
export default connect(mapStateToPropsRefesh)(DetailProduct);
