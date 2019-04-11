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
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
            <View style={Styles.container_home}>

                <TouchableWithoutFeedback onPress={() => {
                          //this._pushNotication();
                          this.props.navigation.navigate('Homescreen');
                        }}>
                    <Image style={Styles.home_logo_image_center} source={require("./../image/logoHome.png")} resizeMode="contain" />
                </TouchableWithoutFeedback>
                
            </View>
        );
    }

    

    componentDidMount(){
        let that = this;
        
        setTimeout(function(){that.props.navigation.navigate('Homescreen')}, 3000);

        
    
    }
    

    /*_pushNotication(){
      Alert.alert('here')
      PushNotification.localNotificationSchedule({
        //... You can use all the options from localNotifications
        message: "Không thể buông, trọn đời sẽ khổ,sCó thể kiềm, tức sẽ thành danh !.", // (required)
        date: new Date(Date.now() + (10 * 1000)) // in 60 secs
      });

    }*/



}



function mapStateToPropsRefesh(state){
    return {
    userLoginStatus : state.userLoginStatus,
    userLoginProfile : state.userLoginProfile,
    cookieApp : state.cookieApp,
  };
}
export default connect(mapStateToPropsRefesh)(Home);
