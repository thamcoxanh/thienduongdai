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
   TextInput
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
 //import components
 import Styles from './../styles/StylesHome.js';
 import CardHeader from './../sticker/CardHeader.js';
import { connect } from 'react-redux';
class ListCategory extends Component {

  constructor(props) {
  super(props);

      this.state = {
        GridListItems: [],
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
            <View style={Styles.banner}>
                  <Image style={Styles.banner_image} source= {{uri:'https://png.pngtree.com/thumb_back/fh260/back_pic/00/15/30/4656e81f6dc57c5.jpg'}} />
            </View>

            <View style={Styles.title}>
                <Icon name='ios-flash' size={18} color='#000' />
                <Text style={Styles.contentTitle}>{this.props.mutilanguge.category}</Text>
            </View>
            <View style={Styles.item}>
            <FlatList
                data={ this.state.GridListItems }
                renderItem={ ({item}) =>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('DetailCategory', {
                      itemId: item.categoryID,
                      titleName: item.name
                    });
                  }}>

                  <View style={Styles.GridViewContainer}>
                    <Image style={Styles.GridViewImage} source= {{uri:'https://image.freepik.com/free-vector/geometric-sale-banners-with-text-space_1017-11175.jpg'}} />
                    <Text style={Styles.GridViewTextLayout} > {item.name} </Text>
                  </View>


                </TouchableWithoutFeedback>
              }
              numColumns={2}
           />
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

  componentDidMount(){
    fetch("http://xanhluc.com:32000/categorys/")
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState(

        {
        GridListItems: responseJson.data,
        });


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
export default connect(mapStateToPropsRefesh)(ListCategory);
