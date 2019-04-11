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
import Background from './../sticker/background.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
//import  PushNotification from 'react-native-push-notification';
class Backgrounds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          GridListItems : [],
          layout_choose : '0',
        };
    }


    render() {

        return (
            <View style={Styles.container_front}>
                <Background />
                <View style={Styles.header_front}>

                    <View style={Styles.header_view}>
                        <Text  style={Styles.header_title} >Tùy chỉnh giao diện</Text>
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

                        <FlatList
                            data={ this.state.GridListItems }
                            renderItem={ ({item}) =>
                            <TouchableWithoutFeedback onPress={() => {
                                  this.setState(
                                      {
                                          layout_choose: item.id.toString()
                                      }
                                  );

                                  if(item.id !== 0){
                                      fetch('http://thienyoga.net/api/get-background/'+item.id.toString(), {
                                          method: 'GET',
                                          headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                          }
                                      })
                                      .then((response)=>response.json())
                                      .then((responseJson)=>{
                                          this.props.dispatch({type:"SETLAYOUT", valueLayout : responseJson , layout : item.id.toString()});
                                          this._setLayout();
                                      })
                                      .catch((error)=>{
                                        console.log(error);
                                      });
                                  }else{
                                    default_layout = [
                                              {"url" : "http://thienyoga.net/media/userfiles/images/1.jpg","width" : "1280" , "height" : "720"},
                                              {"url" : "http://thienyoga.net/media/userfiles/images/2.jpg","width" : "1280" , "height" : "720"},
                                              {"url" : "http://thienyoga.net/media/userfiles/images/3.jpg","width" : "1280" , "height" : "720"},
                                              {"url" : "http://thienyoga.net/media/userfiles/images/4.jpg","width" : "1280" , "height" : "720"},
                                              {"url" : "http://thienyoga.net/media/userfiles/images/5.jpg","width" : "1280" , "height" : "720"}
                                            ];
                                    this.props.dispatch({type:"SETLAYOUT", valueLayout : default_layout , layout : item.id.toString()});
                                    this._setLayout();
                                  }
                              }}>
                              <View style={[Styles.content_items,{marginBottom:10,borderRadius:5,borderWidth:0.5}]}>
                                  <Image source={{uri: item.images[0].url}} style={Styles.content_items_image_title}/>
                                  <Text style={Styles.content_items_title}>{item.name}</Text>
                              </View>

                              </TouchableWithoutFeedback>
                            }
                            numColumns={1}
                         />


                    </ScrollView>
                </View>
                <View style={Styles.footer_front}>
                    <Text  style={Styles.footer_title} >Version 1.1.2</Text>
                </View>

            </View>
        );
    }


    _setLayout = async () => {

        try {

            var val = this.state.layout_choose;
            await AsyncStorage.setItem('layoutApp@logistic',val.toString());

         } catch (error) {
           Alert.alert(error);
         }
    }

    componentDidMount(){
        fetch('http://thienyoga.net/api/get-background', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            default_layout = [{
              "id": 0,
              "name": "Mặc định",
              "images": [
                  {"url" : "http://thienyoga.net/media/userfiles/images/1.jpg","width" : "1280" , "height" : "720"},
                  {"url" : "http://thienyoga.net/media/userfiles/images/2.jpg","width" : "1280" , "height" : "720"},
                  {"url" : "http://thienyoga.net/media/userfiles/images/3.jpg","width" : "1280" , "height" : "720"},
                  {"url" : "http://thienyoga.net/media/userfiles/images/4.jpg","width" : "1280" , "height" : "720"},
                  {"url" : "http://thienyoga.net/media/userfiles/images/5.jpg","width" : "1280" , "height" : "720"}
                ]
          }];
          this.setState(
              {
                  GridListItems: default_layout.concat(responseJson)
              }
          );
        })
        .catch((error)=>{
          console.log(error);
        });
    }





}



function mapStateToPropsRefesh(state){
    return { };
}
export default connect(mapStateToPropsRefesh)(Backgrounds);
