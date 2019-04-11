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
  Alert,
  TextInput,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//import components
import Styles from './../styles/StylesHome.js';
import ListCategory from './../components/ListCategory.js';
import Sale from './../components/Sale.js';

import DetailProduct from './../components/DetailProduct.js';
import Detail from './../components/Detail.js';
import Search from './../components/Search.js';
import DetailCategory from './../components/DetailCategory.js';
import CardHeader from './../sticker/CardHeader.js';
import { connect } from 'react-redux';

class HistorySearch extends Component<Props> {
  constructor(props) {
  super(props);

      this.state = {
        data:[],
        position: 1,
        interval: null,
        dataSource: [],
        GridListItems: [],
        text: '',
      };
    }

    onPressHistory = () => {
        this.props.navigation.navigate('HistorySearch')
    }
    onPressSaved = () => {
        this.props.navigation.navigate('ProductBookmark')
    }

    render() {
        return (
            <View style={Styles.container}>

            <View style={Styles.Header}>
                <View style={Styles.Header_Logo}>
                    <View style={Styles.Header_Logo_Icon} >
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
                          placeholder={this.props.mutilanguge.searchReplace}
                          onChangeText={(text) => this.setState({text})}
                          value={this.state.text}
                          autoFocus = {true}
                          onSubmitEditing={() => {
                              if(this.state.text.trim() != ''){
                                this.props.navigation.navigate('Search', {
                                  params: this.state.text,
                                });
                              }else{
                                Alert.alert(this.props.mutilanguge.keySearchNotexist)
                              }
                            }}
                        />
                    </View>

                    {this.state.text.trim() != ''?
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({text:''})
                        }}>
                            <View style={Styles.Header_Search_Remove} >
                                <Icon name='ios-close' color='#9b9b9b' size={20} />
                            </View>
                        </TouchableWithoutFeedback>
                    : null }

                </View>
            </View>




                <View style={Styles.topTab} >
                    <TouchableOpacity onPress={this.onPressHistory} >
                        <View style={Styles.item_tab}>
                          <Text style={Styles.tabTitle}>{this.props.mutilanguge.historySearch}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPressSaved} >
                      <View style={Styles.item_tab}>
                        <Text style={Styles.tabTitle}>{this.props.mutilanguge.bookmark}</Text>
                      </View>
                    </TouchableOpacity>
                </View>

                <ScrollView style={Styles.body} showsVerticalScrollIndicator={false} >

                  <TouchableWithoutFeedback onPress={() => {
                      this.removeKeySearch();
                  }}>
                  <View style={Styles.title}>
                      <Text style={Styles.contentTitle,{color:'#5f57ff'}}>{this.props.mutilanguge.removeAllKeySearch}</Text>
                  </View>

                  </TouchableWithoutFeedback>
                  <FlatList
                      data={ this.state.GridListItems }
                      renderItem={ ({item}) =>
                      <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('Search', {
                              params: item,
                            });
                        }}>
                        <View style={Styles.title}>
                            <Text style={Styles.contentTitle}>{item}</Text>
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
    removeKeySearch= async()=>{
      await AsyncStorage.removeItem('key@logistic');
      this.getKeySearch();
    }
    getKeySearch = async()=>{

        const keySearch = await AsyncStorage.getItem('key@logistic');

        var flag_search = [];
        if(keySearch !== null){
              flag_search = JSON.parse(keySearch);
              this.setState(
                {
                GridListItems:flag_search,
                })
        }
        else{
          this.setState(
            {
            GridListItems:flag_search,
            })
        }
        try{

        }catch(e){

        }
    }
    componentDidUpdate(prevProps, prevState) {
      this.getKeySearch();
    }
    componentDidMount(){
      this.props.dispatch({type:"SEARCH"});
      this.getKeySearch();
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
export default connect(mapStateToPropsRefesh)(HistorySearch);
