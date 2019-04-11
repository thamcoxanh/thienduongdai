/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//component React Native customer
import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Easing,
    Animated,
    AsyncStorage,
    Alert,
    StatusBar

} from 'react-native';
//component Dev customer
import Home from './components/Home.js';
import Homescreen from './components/Homescreen.js';
import Menu from './components/Menu.js';
import MucTieu from './components/MucTieu.js';
import ThongKe from './components/ThongKe.js';
import History from './components/History.js';
import Alarm from './components/Alarm.js';
import User from './components/User.js';
import Detail from './components/Detail.js';
import MusicBasic from './components/MusicBasic.js';
import MusicAdvanced from './components/MusicAdvanced.js';
import Backgrounds from './components/Backgrounds.js';
import { createStackNavigator , createSwitchNavigator ,createAppContainer } from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

var languageVI = {};
var languageEN = {};
const defaultState = {
  userLoginStatus : false,
  userLoginProfile : {
        email:'',
        name:'',
        address: '',
        phone : '',
    },
    cookieTimeView: '60',
    token : '',
    cookieApp : '',
    timeUsed : 0,
    alarm : [],
    list_bg : [
        {"url" : "http://thienyoga.net/media/userfiles/images/1.jpg","width" : "1280" , "height" : "720"},
        {"url" : "http://thienyoga.net/media/userfiles/images/2.jpg","width" : "1280" , "height" : "720"},
        {"url" : "http://thienyoga.net/media/userfiles/images/3.jpg","width" : "1280" , "height" : "720"},
        {"url" : "http://thienyoga.net/media/userfiles/images/4.jpg","width" : "1280" , "height" : "720"},
        {"url" : "http://thienyoga.net/media/userfiles/images/5.jpg","width" : "1280" , "height" : "720"}
      ],
    layout : 0,
};

_removeTokkenLogin = async()=>{
  try {
        await AsyncStorage.removeItem('user@logistic');
    } catch (error) {
      console.log(error)
    }

}

const reducer = (state = defaultState , action) =>
{
    if(action.type == "LOGOUT"){

      try {
          this._removeTokkenLogin();
          return{
              ...state,
              userLoginStatus : false,
              userLoginProfile:{
                  email: '',
                  name: '',
                  address: '',
                  phone : '',
              },
          };
        } catch (error) {
          console.log(error)
        }

    }

    if(action.type == "SETCOOKIEAPP"){
      try {

          return{
            ...state,
            cookieApp : action.valueApp
          };
        } catch (error) {
          console.log(error)
        }

    }
    if(action.type == "SETALARM"){
      try {

          return{
            ...state,
            alarm : action.valueApp
          };
        } catch (error) {
          console.log(error)
        }

    }
    if(action.type == "SETTIMEVIEWAPP"){
      try {

          return{
            ...state,
            cookieTimeView : action.valueApp
          };
        } catch (error) {
          console.log(error)
        }

    }
    if(action.type == "SETTIMEUSEDAPP"){
      try {

          return{
            ...state,
            timeUsed : action.valueApp
          };
        } catch (error) {
          console.log(error)
        }

    }
    if(action.type == "SETLAYOUT"){


          return{
            ...state,
            list_bg : action.valueLayout,
            layout : action.layout
          };


    }
    if(action.type == "LOGIN"){


        return{
            ...state,
            userLoginStatus : true,
            userLoginProfile:{
                email:action.data.email,
                name:action.data.name,
                address: action.data.address,
                phone : action.data.phone,
            },
        };


    }

    return state;
}

const store = createStore(reducer);


export default class App extends React.Component {
  render() {
    /* In the root component we are rendering the app navigator */
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
      );
  }


  componentDidMount(){
      StatusBar.setHidden(true);
  }

}

const AuthenticationNavigator = createStackNavigator({
    Home: Home,
    Homescreen:Homescreen,
    Menu: Menu,
    Backgrounds : Backgrounds,
    User:User,
    MusicBasic: MusicBasic,
    MusicAdvanced:MusicAdvanced,
    Detail:Detail,
    MucTieu:MucTieu,
    ThongKe:ThongKe,
    History:History,
    Alarm:Alarm
},
{
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },

}
);

class AuthenticationScreen extends React.Component {
    static router = AuthenticationNavigator.router;

    render() {
        return (
            <AuthenticationNavigator navigation={this.props.navigation}  />
        );
    }
}

const AppNavigator = createSwitchNavigator({
  Auth: AuthenticationScreen, // This screen renders a navigator!
  Home: Home,
});

const AppContainer = createAppContainer(AppNavigator);
