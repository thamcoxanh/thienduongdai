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
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//import components
import CardHeader from './../sticker/CardHeader.js';

import ListCategory from './../components/ListCategory.js';
import Sale from './../components/Sale.js';
import DetailProduct from './../components/DetailProduct.js';
import Detail from './../components/Detail.js';
import Search from './../components/Search.js';
import HistorySearch from './../components/HistorySearch.js';
import DetailCategory from './../components/DetailCategory.js';
import Styles from './../styles/StylesHome.js';

import MD5 from "react-native-md5";
import { connect } from 'react-redux';


const width = Dimensions.get('window').width;
const widthHalf = Dimensions.get('window').width/2;
const height = Dimensions.get('window').height;
class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          referesh: this.props.navigation.getParam('referesh', ''),
          state_login: this.props.userLoginStatus,
          token: '',
          login_colum:{
              username:'',
              password:''
          },
          username : '',
          email : '',
          password : '',
          repassword : '',
          firstname : '',
          lastname : '',
          jobs : '',
          address : '',
          phone : '',
          id:'',
          loading:{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', right:0, top:  0, width:width, height:height, opacity:0.8, justifyContent: 'center', alignItems: 'center',display: 'none'},

        };
    }


    render() {
        return (
            <View style={Styles.container}>

                <View style={Styles.Header}>
                    <View style={Styles.Header_Logo}>
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


                <View style={Styles.Header}>
                    <View style={Styles.Header_Search}>

                        <View style={Styles.Header_Search_Icon} >
                            <Icon name='ios-search' color='#9b9b9b' size={15}  />
                        </View>
                        <View style={Styles.Header_Seacrh_Input} >
                            <TextInput
                              style={Styles.Header_Seacrh_Input_Custom}
                              placeholder= {this.props.mutilanguge.searchReplace}
                              onFocus={() => {
                                this.props.navigation.navigate('HistorySearch');
                              }}
                            />
                        </View>



                    </View>
                </View>


                <View style={Styles.body} style={{flex:1}}>
                <ScrollView style={Styles.body} showsVerticalScrollIndicator={false}>
                  <View ref="all" style = {{marginBottom:200}} >
                      <View style={Styles.profile_avata}>
                          <Image source={require("./../image/login.png")} style={Styles.profile_avata_image} />
                          <Text style={Styles.profile_username} >{this.props.mutilanguge.updateProfile}</Text>
                      </View>





                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-person' color={this.props.tabBar.home} size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder= {this.props.mutilanguge.firstName}
                          onChangeText={(textFirstname) => this.setState({ firstname : textFirstname })}
                          value={this.state.firstname}
                        />
                      </View>
                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-person' color={this.props.tabBar.home} size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder={this.props.mutilanguge.lastName}
                          onChangeText={(textLastname) => this.setState({ lastname : textLastname })}
                          value={this.state.lastname}
                        />
                      </View>


                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-code-working' color={this.props.tabBar.home} size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder={this.props.mutilanguge.jobs}
                          onChangeText={(textJobs) => this.setState({ jobs : textJobs })}
                          value={this.state.jobs}
                        />
                      </View>

                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-map' color={this.props.tabBar.home} size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder= {this.props.mutilanguge.address}
                          onChangeText={(textAddress) => this.setState({ address : textAddress })}
                          value={this.state.address}
                        />
                      </View>

                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-phone-landscape' color={this.props.tabBar.home} size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder={this.props.mutilanguge.phone}
                          onChangeText={(textPhone) => this.setState({ phone : textPhone })}
                          value={this.state.phone}
                        />
                      </View>
                      <TouchableWithoutFeedback onPress={() => {
                          this.UpdateProfile();
                      }}>
                      <View style={Styles.button_custom_bluewhile}>
                        <Text style={Styles.button_text} >{this.props.mutilanguge.update}</Text>
                      </View>
                      </TouchableWithoutFeedback>

                  </View>



                  </ScrollView>
                  <View style={this.state.loading}>
                              <Image source={require("./../image/loading.gif")} style={{ height: 50, width: 50 }} />
                  </View>
                </View>
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
    UpdateProfile(){
      this.setState({
        loading:{
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'absolute',
          right:0,
          top:  0,
          width:width,
          height:height,
          opacity:0.8,
          justifyContent: 'center',
          alignItems: 'center'
        },
      });

        fetch('http://xanhluc.com:30000/profile', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + this.props.token,
            },
            body: JSON.stringify({
              username : this.state.username,
              email : this.state.email,
              currentPassword : MD5.hex_md5(this.state.username+'LoginWitdhFaceBook'),
              profile: {
                        firstName: this.state.firstname,
                        lastName: this.state.lastname,
                        jobTitle: this.state.jobs,
                        avatar: {
                            url: null,
                            width: null,
                            height: null
                        },
                        address: this.state.address,
                        phoneNumber: this.state.phone,
                        locationId: null,
                        birthDay: null
                    }
            }),
        }).then((response)=>response.json())
        .then((responseJson)=>{
            if(responseJson.errors){
                Alert.alert(JSON.stringify(responseJson.errors));
                this.setState({
                  loading:{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'absolute',
                    right:0,
                    top:  0,
                    width:width,
                    height:height,
                    opacity:0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'none'
                  },
                });
            }else{
              this.setState({
                token:this.props.token,
              })
              fetch('http://xanhluc.com:30000/profile', {
                  method: 'GET',
                  headers: {
                    'Authorization' : 'Bearer ' + this.props.token,
                    },
              }).then((responses)=>responses.json())
              .then((responseJsons)=>{
                    this.props.dispatch({type:"LOGIN",data:responseJsons , token : this.props.token});
                    this.setState({
                      loading:{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: 'absolute',
                        right:0,
                        top:  0,
                        width:width,
                        height:height,
                        opacity:0.8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'none'
                      },
                    });
                    this.setState({
                      state_login:true
                    })
              })
              .catch((error)=>{
                  console.log(error);
                });
            }

        })
        .catch((error)=>{
            console.log(error);
          });
          ;


    }
    componentDidMount(){

      this.setState({
            username : this.props.userLoginProfile.username,
            email:this.props.userLoginProfile.email,
            firstname : this.props.userLoginProfile.firstname,
            lastname : this.props.userLoginProfile.lastname,
            jobs : this.props.userLoginProfile.jobs,
            address:  this.props.userLoginProfile.address,
            phone : this.props.userLoginProfile.phone,

      });
    }




}



function mapStateToPropsRefesh(state){
    return {
    userLoginStatus : state.userLoginStatus,
    userLoginProfile : state.userLoginProfile,
    myValueRefesh : state.myValueRefesh,
    language: state.language,
    mutilanguge : state.mutilanguge,
    tabBar: state.tabBar,
    myValue: state.value,
    token: state.token,
  };
}
export default connect(mapStateToPropsRefesh)(UpdateProfile);
