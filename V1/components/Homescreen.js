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
  Dimensions,
  StatusBar,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//import components
import Styles from './../styles/StylesHome.js';
import { connect } from 'react-redux';
import MD5 from "react-native-md5";

import Background from './../sticker/background.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
//import  PushNotification from 'react-native-push-notification';
class Homescreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
            <View style={Styles.container}>
                <Background />

                <View style={Styles.content}>
                    <View  style={Styles.home_logo}>
                        <TouchableWithoutFeedback onPress={() => {
                          this.props.navigation.navigate('Menu');
                        }}>
                            <Image style={Styles.home_logo_image} source={require("./../image/logo.png")} resizeMode="contain" />

                        </TouchableWithoutFeedback>

                        <Text style={Styles.home_title}>Thiền Định</Text>
                    </View>
                    <View  style={Styles.list_category_home}>
                        <TouchableWithoutFeedback onPress={() => {
                          //this._pushNotication();
                          this.props.navigation.navigate('MusicBasic');
                        }}>
                            <View style={Styles.category_item} >
                                <Text  style={Styles.category_name} >Thiền thư giãn</Text>
                                <Icon name='ios-arrow-round-forward' style={Styles.category_item_list} color='#FFFFFF' size={25} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                          this.props.navigation.navigate('MusicAdvanced');
                        }}>
                            <View style={Styles.category_item} >
                                <Text  style={Styles.category_name} >Thiền chuyên sâu</Text>
                                <Icon name='ios-arrow-round-forward'  style={Styles.category_item_list} color='#FFFFFF' size={25} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }



    componentDidMount(){
        this._getCookieApp();
        this._getTokkenLogin();
        this._getTimeViewApp();
        this._getTimeUsedApp();
        this._getAlarm();
    }



    startAndEndOfWeek(date) {

      // If no date object supplied, use current date
      // Copy date so don't modify supplied date
      var now = date? new Date(date) : new Date();

      // set time to some convenient value
      now.setHours(0,0,0,0);

      // Get the previous Monday
      var monday = new Date(now);
      monday.setDate(monday.getDate() - monday.getDay() + 1);

      // Get next Sunday
      var sunday = new Date(now);
      sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

      // Return array of date objects
      return [monday, sunday];
    }
     _getTimeUsedApp = async () => {
        try {
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            const value = await AsyncStorage.getItem(date+'-'+month+'-'+year+'@logistic');
            if (value !== null) {

            }else{
                var val = '0';
                await AsyncStorage.setItem(date+'-'+month+'-'+year+'@logistic',val);
            }
         } catch (error) {
           // Error retrieving data
         }
    }
    _removeTokkenLogin = async()=>{
      try {
            await AsyncStorage.removeItem('user@logistic');
        } catch (error) {
          console.log(error)
        }

    }
    _getTokkenLogin = async () => {
        try {
            const value = await AsyncStorage.getItem('user@logistic');

            if (value !== null) {
                fetch('http://thienyoga.net/api/token', {
                    method: 'GET',
                    headers: {
                      'Authorization' : value,
                      },
                }).then((response)=>response.json())
                .then((responseJson)=>{

                  if(responseJson.erros){
                      this._removeTokkenLogin();
                  }else{
                      this.props.dispatch({type:"LOGIN",data:responseJson,token : value});
                  }
                })
                .catch((error)=>{
                    console.log(error);
                  });
            }

         } catch (error) {
           // Error retrieving data
         }
    }
    _getAlarm = async () => {
        try {

          const value = await AsyncStorage.getItem('alarm@logistic');
          console.log(value);
          console.log('here');
            if (value !== null) {
                value = JSON.parse(value);
                this.props.dispatch({type:"SETALARM", valueApp : value});
            }else{
                var val = [];
                await AsyncStorage.setItem('alarm@logistic','');
                this.props.dispatch({type:"SETALARM", valueApp: val });
            }
         } catch (error) {
           // Error retrieving data
         }
    }
    _getCookieApp = async () => {
        try {
          const value = await AsyncStorage.getItem('cookieApp@logistic');
            if (value !== null) {
                this.props.dispatch({type:"SETCOOKIEAPP", valueApp : value});
            }else{
                var val = (Math.floor(Math.random() * (100000000000000000000000000 - 1)) + 1)+'xanhluccookie';
                await AsyncStorage.setItem('cookieApp@logistic',val);
                this.props.dispatch({type:"SETCOOKIEAPP", valueApp: val });
                value = val;
            }
         } catch (error) {
           // Error retrieving data
         }
    }
    _getTimeViewApp = async () => {
        try {
          const value = await AsyncStorage.getItem('timeView@logistic');
            if (value !== null) {
                this.props.dispatch({type:"SETTIMEVIEWAPP", valueApp : value});
            }else{
                var val = ('60');
                await AsyncStorage.setItem('timeView@logistic',val);
                this.props.dispatch({type:"SETTIMEVIEWAPP", valueApp: val });
                value = val;
            }
         } catch (error) {
           // Error retrieving data
         }
    }




}



function mapStateToPropsRefesh(state){
    return {
    userLoginStatus : state.userLoginStatus,
    userLoginProfile : state.userLoginProfile,
    cookieApp : state.cookieApp,
  };
}
export default connect(mapStateToPropsRefesh)(Homescreen);
