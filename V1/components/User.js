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
   Alert,
   Dimensions,
   ListView,
   RefreshControl,
   ActivityIndicator,
   TextInput,
   AsyncStorage,
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
 //import components
 import Styles from './../styles/StylesHome.js';

import { connect } from 'react-redux';
import MD5 from "react-native-md5";
import { LoginButton, AccessToken , LoginManager,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';


import Background from './../sticker/background.js';
const width = Dimensions.get('window').width;
const widthHalf = Dimensions.get('window').width/2;
const height = Dimensions.get('window').height;

class User extends Component {

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
        email : '',
        password : '',
        name : '',
        address : '',
        phone : '',
        id:'',
        loaddingStatus : false ,

      };
  }


  render() {
    return (
      <View style={[Styles.container_front,{backgroundColor:'#FFFFFF'}]}>
          <View style={Styles.header_front}>
              <View style={Styles.header_view}>
                  <Text  style={Styles.header_title} >Tài Khoản</Text>
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

                  {this.state.state_login == false ?
                      <View ref="all" style={{justifyContent: 'center',alignItems: 'center',}} >

                        <View style={Styles.input_file}>
                          <View  style={Styles.input_icon}>
                                <Icon name='ios-person' color="#000" size={24} />
                          </View>
                          <TextInput
                            style={Styles.input_file_Custom}
                            onChangeText={(textUsername) => this.setState({ login_colum : {username : textUsername,password : this.state.login_colum.password} })}
                            value={this.state.login_colum.username}
                            placeholder= 'email'
                          />
                        </View>
                        <View style={Styles.input_file}>
                          <View  style={Styles.input_icon}>
                                <Icon name='ios-key' color="#000" size={24} />
                          </View>
                          <TextInput
                            style={Styles.input_file_Custom}
                            placeholder= 'Mật khẩu'
                            onChangeText={(textPassword) => this.setState({ login_colum : {password : textPassword,username : this.state.login_colum.username} })}
                            value={this.state.login_colum.password}
                            secureTextEntry={true}
                          />
                        </View>
                        <TouchableWithoutFeedback onPress={() => {
                          this.Login();
                        }}>
                          <View style={Styles.button_custom_green}>
                            <Text style={Styles.button_text} >Đăng nhập</Text>
                          </View>
                        </TouchableWithoutFeedback>



                        <TouchableWithoutFeedback onPress={() => {
                          this.setState({
                            state_login:'register'
                          })
                        }}>
                        <View style={Styles.button_custom_bluewhile}>
                          <Text style={Styles.button_text} >Đăng ký</Text>
                        </View>
                        </TouchableWithoutFeedback>

                        <View>

                          <LoginButton
                            onLoginFinished={
                              (error, result) => {
                                if (error) {
                                  console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                  console.log("login is cancelled.");
                                } else {
                                  AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                      this.handleFacebookLogin()
                                      console.log(data.accessToken.toString())
                                    }
                                  )
                                }
                              }
                            }
                            onLogoutFinished={() => console.log("logout.")}/>
                        </View>

                    </View>
                  : null }
                  {this.state.state_login == 'register' ?
                  <View ref="all" style={{justifyContent: 'center',alignItems: 'center',}} >


                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-mail' color="#000" size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder="email"
                          onChangeText={(textEmail) => this.setState({ email : textEmail })}
                          value={this.state.email}
                        />
                      </View>


                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-key' color="#000" size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder= "password"
                          secureTextEntry={true}
                          onChangeText={(textPassword) => this.setState({ password : textPassword })}
                          value={this.state.password}
                        />
                      </View>


                      <View style={Styles.input_file}>
                        <View  style={Styles.input_icon}>
                              <Icon name='ios-person' color="#000" size={24} />
                        </View>
                        <TextInput
                          style={Styles.input_file_Custom}
                          placeholder= "Họ & Tên"
                          onChangeText={(textFirstname) => this.setState({ name : textFirstname })}
                          value={this.state.name}
                        />
                      </View>


                      <TouchableWithoutFeedback onPress={() => {
                          this.Register();
                      }}>
                      <View style={Styles.button_custom_bluewhile}>
                        <Text style={Styles.button_text} >Đăng ký</Text>
                      </View>
                      </TouchableWithoutFeedback>


                      <TouchableWithoutFeedback onPress={() => {
                        this.setState({
                          state_login:false
                        })
                      }}>
                      <View style={Styles.button_custom_green}>
                        <Text style={Styles.button_text} >Đăng nhập</Text>
                      </View>
                      </TouchableWithoutFeedback>


                      <View>
                      <LoginButton
                        onLoginFinished={
                          (error, result) => {
                            if (error) {
                              console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                              console.log("login is cancelled.");
                            } else {
                              AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                  this.handleFacebookLogin()
                                  console.log(data.accessToken.toString())
                                }
                              )
                            }
                          }
                        }
                        onLogoutFinished={() => console.log("logout.")}/>
                      </View>

                  </View>
                  : null }

                  {this.state.state_login == true ?
                        <View ref="all"  style={{justifyContent: 'center',alignItems: 'center',}} >


                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('History');
                        }}>
                        <View style={[Styles.content_items,{marginBottom:10,borderRadius:5,borderWidth:0.5}]}>
                            <Text style={Styles.content_items_title}>Các bài thiền đã mua</Text>
                        </View>
                        </TouchableOpacity>

                            <TouchableWithoutFeedback onPress={() => {
                              try {
                                  LoginManager.logOut();
                              } catch (error) { }
                              this.props.dispatch({type:"LOGOUT"});
                              this.setState({
                                state_login:false
                              })
                            }}>
                                <View style={[Styles.content_items,{marginBottom:10,borderRadius:5,borderWidth:0.5}]}>
                                    <Text style={Styles.content_items_title}>Đăng xuất</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                  : null }
              </ScrollView>


          </View>

          <View style={Styles.footer_front}>
              <Text  style={Styles.footer_title} >Version 1.1.2</Text>
          </View>
          {this.state.loaddingStatus == true ?
          <View style={Styles.loadingView}>
                <Image source={require("./../image/loading.gif")} style={{ height: 50, width: 50 }} />
          </View>
          : null }


      </View>
    );
  }

  _checkLoginFacebookExits(res){
    this.setState({
      loaddingStatus : true
    });
    var flag = 0;
      fetch('http://thienyoga.net/api/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'example'+res.id+'@gmail.com',
            password: MD5.hex_md5(res.id+'LoginWitdhFaceBook'),
          }),
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
          if(responseJson.errors){
            if(res.email){

            }else{
                res.email = 'example'+res.id+'@gmail.com'
            }
            this.setState({
              email : res.email,
              password : MD5.hex_md5(res.id+'LoginWitdhFaceBook'),
              name : res.name
            });
            this.addToSeverUser();
          }else{
              fetch('http://thienyoga.net/api/token', {
                  method: 'GET',
                  headers: {
                    'Authorization' : responseJson.token,
                    },
              }).then((responses)=>responses.json())
              .then((responseJsons)=>{
                    this.props.dispatch({type:"LOGIN",data:responseJsons,token:responseJson.token});

                    this.setState({
                      loaddingStatus : false,
                      state_login:true,
                      token:responseJson.token
                    });
                    this._setTokkenLogin();
                    this.props.navigation.goBack();
              })
              .catch((error)=>{
                  console.log(error);
              });

          }
      })
      .catch((error)=>{
          console.log(error);
      });
  }



  handleFacebookLogin (accessToken) {


      const infoRequest = new GraphRequest('/me', {
        parameters: {'fields': {'string': 'email,name,picture,id'}}
        }, (err, res) => {
            if (res) {
                this._checkLoginFacebookExits(res);
            } else {
                return false;
            }
        });
      new GraphRequestManager().addRequest(infoRequest).start();



  }
  Register(){
    var flag = 0;
    if(this.state.email == ''){
        flag = 1;
        Alert.alert('Email không được bỏ trống');
        return false;
    }

    if(this.state.password == ''){
        flag = 1;
        Alert.alert('Mật khẩu không được bỏ trống');
        return false;
    }
    if(this.state.name == ''){
        flag = 1;
        Alert.alert('Tên không được bỏ trống');
        return false;
    }
    if(flag == 0){

        Alert.alert(
          'Xác nhận',
          'Bạn muốn đăng ký với email này',
          [
            {text: 'Huỷ', onPress: () => console.log('NO Pressed'), style: 'cancel'},
            {text: 'Đồng ý', onPress: () => this.addToSeverUser()},
          ]
        );
    }

  }
  addToSeverUser(){
      this.setState({
        loaddingStatus : true
      });
      fetch('http://thienyoga.net/api/dang-ky', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          	email : this.state.email,
            password : this.state.password,
          	name : this.state.name,
          }),
      }).then((response)=>response.json())
      .then((responseJson)=>{
          if(responseJson.errors){
              Alert.alert('Email đã tồn tại')
          }else{
            fetch('http://thienyoga.net/api/token', {
                method: 'GET',
                headers: {
                  'Authorization' : responseJson.token,
                  },
            }).then((responses)=>responses.json())
            .then((responseJsons)=>{
                  this.props.dispatch({type:"LOGIN",data:responseJsons,token:responseJson.token});
                  this.setState({
                    loaddingStatus: false,
                    state_login:true,
                    token:responseJson.token,
                  });
                  this._setTokkenLogin();
                  this.props.navigation.goBack();
            })
            .catch((error)=>{
                console.log(error);
              });
          }

      })
      .catch((error)=>{
          console.log(error);
      });

  }


  Login(){
    this.setState({
      loaddingStatus: true
    });

    var flag = 0;
    if(this.state.login_colum.username == ''){
        flag = 1;
        Alert.alert('Email không được bỏ trống');
        this.setState({
          loaddingStatus : false
        });
        return false;
    }
    if(this.state.login_colum.password == ''){
        flag = 1;
        Alert.alert('Mật khẩu không được để trống');
        this.setState({
          loaddingStatus: false
        });
        return false;
    }
    if(flag == 0){

      fetch('http://thienyoga.net/api/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.login_colum.username,
            password: this.state.login_colum.password,
          }),
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
          if(responseJson.errors){
              Alert.alert('Sai email hoặc mật khẩu');
              this.setState({
                loaddingStatus : false
              });
          }else{


              this.setState({
                token:responseJson.token
              })

              fetch('http://thienyoga.net/api/token', {
                  method: 'GET',
                  headers: {
                    'Authorization' : responseJson.token,
                    },
              }).then((responses)=>responses.json())
              .then((responseJsons)=>{
                    this.props.dispatch({type:"LOGIN",data:responseJsons,token : responseJson.token});
                    this._setTokkenLogin();

                    this.setState({
                      loaddingStatus : false
                    });

                    this.setState({
                      state_login:true
                    });
                    this.props.navigation.goBack();
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

  }


  _setTokkenLogin = async()=>{
      await AsyncStorage.setItem('user@logistic',this.state.token);
  }
  componentDidMount(){
      try {
          LoginManager.logOut();
      } catch (error) {

      }
  }

}
function mapStateToPropsRefesh(state){
    return {
    userLoginStatus : state.userLoginStatus,
    userLoginProfile : state.userLoginProfile
  };
}
export default connect(mapStateToPropsRefesh)(User);
