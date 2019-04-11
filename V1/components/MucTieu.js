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
class MucTieu extends React.Component {
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
                        <Text  style={Styles.header_title} >Mục tiêu</Text>
                        <Text  style={Styles.header_description} >Xin vui lòng chọn mục tiêu thiền bạn muốn hàng ngày đạt được . Bạn có thể thay đổi mục tiêu này bất cứ lúc nào trong mục 'Tuỳ chỉnh'</Text>
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
                        {this.props.cookieTimeView == '5' ?
                            <View style={Styles.content_items_active}>
                                <Text style={Styles.content_items_title}>5 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn mới bắt đầu tập thiền</Text>
                            </View>
                        :
                        <TouchableWithoutFeedback onPress={() => {
                          this._getTimeViewApp('5');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>5 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn mới bắt đầu tập thiền</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                        {this.props.cookieTimeView == '10' ?
                            <View style={Styles.content_items_active}>
                                <Text style={Styles.content_items_title}>10 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn đã tập thiền được một thời gian</Text>
                            </View>
                        :
                        <TouchableWithoutFeedback onPress={() => {
                          this._getTimeViewApp('10');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>10 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn đã tập thiền được một thời gian</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                        {this.props.cookieTimeView == '15' ?
                            <View style={Styles.content_items_active}>
                                <Text style={Styles.content_items_title}>15 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn hiểu được thiền mức cơ bản</Text>
                            </View>
                        :
                        <TouchableWithoutFeedback onPress={() => {
                          this._getTimeViewApp('15');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>15 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn hiểu được thiền mức cơ bản</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                        {this.props.cookieTimeView == '20' ?
                            <View style={Styles.content_items_active}>
                                <Text style={Styles.content_items_title}>20 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn đã thành thục thiền</Text>
                            </View>
                        :
                        <TouchableWithoutFeedback onPress={() => {
                          this._getTimeViewApp('20');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>20 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn đã thành thục thiền</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                        {this.props.cookieTimeView == '30' ?
                            <View style={Styles.content_items_active}>
                                <Text style={Styles.content_items_title}>30 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn đã thành thục thiền</Text>
                            </View>
                        :
                        <TouchableWithoutFeedback onPress={() => {
                          this._getTimeViewApp('30');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>30 phút</Text>
                                <Text style={Styles.content_items_description}>Nếu bạn đã thành thục thiền</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                        {this.props.cookieTimeView == '60' ?
                            <View style={Styles.content_items_active}>
                                <Text style={Styles.content_items_title}>1 tiếng</Text>
                                <Text style={Styles.content_items_description}>Bạn rất thích thiền</Text>
                            </View>
                        :
                        <TouchableWithoutFeedback onPress={() => {
                          this._getTimeViewApp('60');
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title}>1 tiếng</Text>
                                <Text style={Styles.content_items_description}>Bạn rất thích thiền</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                        {this.props.cookieTimeView == '120' ?
                            <View style={Styles.content_items_active}>
                                <Text style={Styles.content_items_title}>2 tiếng</Text>
                                <Text style={Styles.content_items_description}>Bạn rất rất rất thích thiền</Text>
                            </View>
                        :
                            <TouchableWithoutFeedback onPress={() => {
                              this._getTimeViewApp('120');
                            }}>
                                <View style={Styles.content_items}>
                                    <Text style={Styles.content_items_title}>2 tiếng</Text>
                                    <Text style={Styles.content_items_description}>Bạn rất rất rất thích thiền</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }

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

    _getTimeViewApp = async (value_avariable) => {
        try {
            var val = value_avariable;
            await AsyncStorage.setItem('timeView@logistic',val);
            this.props.dispatch({type:"SETTIMEVIEWAPP", valueApp: val });
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
    cookieTimeView : state.cookieTimeView,
  };
}
export default connect(mapStateToPropsRefesh)(MucTieu);
