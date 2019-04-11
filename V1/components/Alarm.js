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
  Switch,
  Picker

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
class Alarm extends React.Component {
    constructor(props) {
        super(props);

        this.moveAnimation = new Animated.ValueXY({ x: 0, y: height });
        this.state = {
            switch : false,
            minute : "30",
            house : "18",
            all_time : [],
            loading:{
              backgroundColor: '#fff',
              position: 'absolute',
              right:0,
              top:  0,
              width:width,
              height:height,
              opacity:1,
          },
        };
    }


    render() {

        return (
            <View style={Styles.container_front}>
                <View style={Styles.header_front}>
                    <View style={Styles.header_view}>
                        <Text  style={Styles.header_title} >Nhắc thiền</Text>
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
                        <TouchableWithoutFeedback onPress={() => {
                            this.showPopup();
                        }}>
                            <View style={Styles.content_items}>
                                <Text style={[Styles.content_items_title_alarm,{"fontWeight" : "bold"}]}>Thêm</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {this.props.alarm.map((itemData) => {
                          return (
                            <View style={Styles.content_items}>
                                <Text style={Styles.content_items_title_alarm}>{itemData.house} : {itemData.minute}</Text>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.remove_time(itemData.key);
                                }}>
                                  <View style={{"position" : "absolute" ,"top" : 20 , right : 2}} >
                                        <Icon name='ios-trash' color='#000000' size={30} />
                                  </View>
                                </TouchableWithoutFeedback>
                                <Switch
                                  style={Styles.switch}
                                  onValueChange = {(value) => this.change_time(value , itemData.key)}
                                  value = {itemData.display}/>

                            </View>
                            )
                        })
                      }

                    </ScrollView>
                </View>
                <View style={Styles.footer_front}>
                    <Text  style={Styles.footer_title} >Version 1.1.2</Text>
                </View>

                <Animated.View style={[this.state.loading,this.moveAnimation.getLayout()]}>

                        <View>


                              <View style={Styles.header_front_music}>
                                  <View style={Styles.header_view}>
                                      <Text  style={Styles.header_title} >Thêm nhắc thiền</Text>
                                      <TouchableWithoutFeedback onPress={() => {
                                          this.closePopup();
                                      }}>
                                        <View style={Styles.header_icon_close} >
                                              <Icon name='ios-close' color='#000000' size={30} style={{marginRight:15}} />
                                        </View>
                                      </TouchableWithoutFeedback>
                                  </View>
                              </View>

                              <View style={[Styles.content_front,{"justifyContent" : "center"}]}>
                                  <ScrollView showsVerticalScrollIndicator={false}>
                                      <View style={Styles.add_time}>

                                          <Picker
                                              selectedValue={this.state.house}
                                              style={Styles.add_time_picker}
                                              onValueChange={(itemValue, itemIndex) =>
                                              this.setState({house: itemValue})
                                              }>
                                              <Picker.Item label="1" value="1" />
                                              <Picker.Item label="2" value="2" />
                                              <Picker.Item label="3" value="3" />
                                              <Picker.Item label="4" value="4" />
                                              <Picker.Item label="5" value="5" />
                                              <Picker.Item label="6" value="6" />
                                              <Picker.Item label="7" value="7" />
                                              <Picker.Item label="8" value="8" />
                                              <Picker.Item label="9" value="9" />
                                              <Picker.Item label="10" value="10" />
                                              <Picker.Item label="11" value="11" />
                                              <Picker.Item label="12" value="12" />
                                              <Picker.Item label="13" value="13" />
                                              <Picker.Item label="14" value="14" />
                                              <Picker.Item label="15" value="15" />
                                              <Picker.Item label="16" value="16" />
                                              <Picker.Item label="17" value="17" />
                                              <Picker.Item label="18" value="18" />
                                              <Picker.Item label="19" value="19" />
                                              <Picker.Item label="20" value="20" />
                                              <Picker.Item label="21" value="21" />
                                              <Picker.Item label="22" value="22" />
                                              <Picker.Item label="23" value="23" />
                                              <Picker.Item label="24" value="24" />
                                          </Picker>
                                          <Picker
                                              selectedValue={this.state.minute}
                                              style={Styles.add_time_picker}
                                              onValueChange={(itemValue, itemIndex) =>
                                              this.setState({minute: itemValue})
                                              }>
                                              <Picker.Item label="1" value="1" />
                                              <Picker.Item label="2" value="2" />
                                              <Picker.Item label="3" value="3" />
                                              <Picker.Item label="4" value="4" />
                                              <Picker.Item label="5" value="5" />
                                              <Picker.Item label="6" value="6" />
                                              <Picker.Item label="7" value="7" />
                                              <Picker.Item label="8" value="8" />
                                              <Picker.Item label="9" value="9" />
                                              <Picker.Item label="10" value="10" />
                                              <Picker.Item label="11" value="11" />
                                              <Picker.Item label="12" value="12" />
                                              <Picker.Item label="13" value="13" />
                                              <Picker.Item label="14" value="14" />
                                              <Picker.Item label="15" value="15" />
                                              <Picker.Item label="16" value="16" />
                                              <Picker.Item label="17" value="17" />
                                              <Picker.Item label="18" value="18" />
                                              <Picker.Item label="19" value="19" />
                                              <Picker.Item label="20" value="20" />
                                              <Picker.Item label="21" value="21" />
                                              <Picker.Item label="22" value="22" />
                                              <Picker.Item label="23" value="23" />
                                              <Picker.Item label="24" value="24" />
                                              <Picker.Item label="25" value="25" />
                                              <Picker.Item label="26" value="26" />
                                              <Picker.Item label="27" value="27" />
                                              <Picker.Item label="28" value="28" />
                                              <Picker.Item label="29" value="29" />
                                              <Picker.Item label="30" value="30" />
                                              <Picker.Item label="31" value="31" />
                                              <Picker.Item label="32" value="32" />
                                              <Picker.Item label="33" value="33" />
                                              <Picker.Item label="34" value="34" />
                                              <Picker.Item label="35" value="35" />
                                              <Picker.Item label="36" value="36" />
                                              <Picker.Item label="37" value="37" />
                                              <Picker.Item label="38" value="38" />
                                              <Picker.Item label="39" value="39" />
                                              <Picker.Item label="40" value="40" />
                                              <Picker.Item label="51" value="51" />
                                              <Picker.Item label="52" value="52" />
                                              <Picker.Item label="53" value="53" />
                                              <Picker.Item label="54" value="54" />
                                              <Picker.Item label="55" value="55" />
                                              <Picker.Item label="56" value="56" />
                                              <Picker.Item label="57" value="57" />
                                              <Picker.Item label="58" value="58" />
                                              <Picker.Item label="59" value="59" />
                                              <Picker.Item label="60" value="60" />
                                          </Picker>

                                      </View>
                                      <TouchableWithoutFeedback onPress={() => { this.add_time(); }}>
                                        <View style={[Styles.button_custom_green,{"width" : width -40}]}>
                                          <Text style={Styles.button_text} >Thêm</Text>
                                        </View>
                                      </TouchableWithoutFeedback>
                                  </ScrollView>
                              </View>
                              <View style={Styles.footer_front}>
                                  <Text  style={Styles.footer_title} >Version 1.1.2</Text>
                              </View>

                        </View>
                </Animated.View>


            </View>
        );
    }
    _displayNone= () => {
      Animated.spring(this.moveAnimation, {
        toValue: {x: 0, y: height},
        duration: 1000,
      }).start()
    }
    _displayTrue= () => {
      Animated.spring(this.moveAnimation, {
        toValue: {x: 0, y: 0},
        duration: 1000,
      }).start()
    }
    showPopup(){
      this._displayTrue();
    }
    closePopup(){
      this._displayNone();
    }
    remove_time = async (key_change) => {
        try {
            value = await AsyncStorage.getItem('alarm@logistic');
            if (value !== null) {
                value = JSON.parse(value);
                return_data = [];
                value.map((itemData) => {
                    if(itemData.key == key_change){
                      
                    }else{
                        return_data.push(itemData);
                    }
                })
                await AsyncStorage.setItem('alarm@logistic',JSON.stringify(return_data));
                this.props.dispatch({type:"SETALARM", valueApp : return_data });
            }
         } catch (error) {
           console.log(error);
           // Error retrieving data
         }
    }
    change_time = async ( value_change , key_change) => {
        try {
            value = await AsyncStorage.getItem('alarm@logistic');
            if (value !== null) {
                value = JSON.parse(value);
                return_data = [];
                value.map((itemData) => {
                    if(itemData.key == key_change){
                        itemData.display = value_change;
                        console.log(key_change);
                        console.log(value_change);
                        return_data.push(itemData);
                    }else{
                        return_data.push(itemData);
                    }
                })
                await AsyncStorage.setItem('alarm@logistic',JSON.stringify(return_data));
                this.props.dispatch({type:"SETALARM", valueApp : return_data });
            }
         } catch (error) {
           console.log(error);
           // Error retrieving data
         }
    }
    add_time = async () => {
        try {
            const dateTime = new Date().getTime();
            value = await AsyncStorage.getItem('alarm@logistic');
            if (value !== null) {
                value = JSON.parse(value);
                value.push({"key" :Math.floor(dateTime / 1000),"house" : this.state.house , "minute" : this.state.minute , "display" : true});
                await AsyncStorage.setItem('alarm@logistic',JSON.stringify(value));
                this.props.dispatch({type:"SETALARM", valueApp : value});
            }else{
                var val = [{"key" :Math.floor(dateTime / 1000),"house" : this.state.house , "minute" : this.state.minute , "display" : true}];
                await AsyncStorage.setItem('alarm@logistic',JSON.stringify(val));
                this.props.dispatch({type:"SETALARM", valueApp: val });
            }
            this.closePopup();
         } catch (error) {
           console.log(error);
           // Error retrieving data
         }
    }
    get_time = async () => {
        try {
            value = await AsyncStorage.getItem('alarm@logistic');
            if (value !== null) {
                value = JSON.parse(value);

                this.setState({all_time: value});
                this.props.dispatch({type:"SETALARM", valueApp: this.state.all_time });

            }
         } catch (error) {
           console.log(error);
           // Error retrieving data
         }
    }
    componentDidMount(){
        this.get_time();
    }





}



function mapStateToPropsRefesh(state){
    return {
    alarm : state.alarm,
  };
}
export default connect(mapStateToPropsRefesh)(Alarm);
