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
  Linking,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//import components
import Styles from './../styles/StylesHome.js';
import { connect } from 'react-redux';
import MD5 from "react-native-md5";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Background from './../sticker/background.js';
//import  PushNotification from 'react-native-push-notification';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
            <View style={Styles.container_front}>
                <View style={Styles.header_front}>
                    <View style={Styles.header_view}>
                        <Text  style={Styles.header_title} >Tùy chỉnh</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                          <View style={Styles.header_icon_back} >
                                <Icon name='ios-arrow-back' color='#000000' size={30} style={{marginRight:15}} />
                          </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={Styles.content_front}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {this.props.userLoginStatus == false ?
                          <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('User');
                          }}>
                        <View style={Styles.content_items}>
                            <Text style={Styles.content_items_title}>Đăng nhập / Đăng ký</Text>
                        </View>
                        </TouchableWithoutFeedback>
                        : null }
                        {this.props.userLoginStatus == true ?
                          <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('User');
                          }}>
                        <View style={Styles.content_items}>
                            <Text style={Styles.content_items_title}>{this.props.userLoginProfile.name}</Text>
                        </View>
                        </TouchableWithoutFeedback>
                        : null }

                        <TouchableWithoutFeedback onPress={() => {
                          this.props.navigation.navigate('ThongKe');
                        }}>
                        <View style={Styles.content_items}>
                            <Text style={Styles.content_items_title}>Thống kê</Text>
                        </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {
                          this.props.navigation.navigate('MucTieu');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>Đặt mục tiêu</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                          this.props.navigation.navigate('Alarm');
                        }}>
                        <View style={Styles.content_items}>
                            <Text style={Styles.content_items_title}>Nhắc thiền</Text>
                        </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                          this.props.navigation.navigate('Backgrounds');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>Chọn bộ ảnh nền</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            Linking.openURL("https://www.facebook.com/App-Thi%E1%BB%81n-%C4%90%E1%BB%8Bnh-tr%C3%AAn-ios-android-630171277427871/?modal=admin_todo_tour")
                        }}>
                        <View style={Styles.content_items}>
                            <Text style={Styles.content_items_title}>Đánh giá / Phản hồi</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
                <View style={Styles.footer_front}>
                    <Text  style={Styles.footer_title} >Version 1.1.2</Text>
                </View>

            </View>
        );
    }



    componentDidMount(){

    }





}



function mapStateToPropsRefesh(state){
    return {
    userLoginStatus : state.userLoginStatus,
    userLoginProfile : state.userLoginProfile,
    cookieApp : state.cookieApp,
  };
}
export default connect(mapStateToPropsRefesh)(Home);
