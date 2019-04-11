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

import CardHeader from './../sticker/CardHeader.js';
import { connect } from 'react-redux';
class User extends Component {

  constructor(props) {
  super(props);

      this.state = {
        referesh: this.props.navigation.getParam('referesh', 'false'),
        state_login: false,
        username : '',
        email : '',
        password : '',
        repassword : '',
        firstname : '',
        lastname : '',
        jobs : '',
        address : '',
        phone : '',
        token : ''
      };
  }


  render() {
    return (
      <View style={Styles.container}>

          <View style={Styles.Header}>
              <View style={Styles.Header_Logo} >
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


          <View style={Styles.body} style={{flex:1}}>
              <ScrollView style={Styles.body} showsVerticalScrollIndicator={false} >
                  {this.state.state_login == false ?

                  : null }
                  {this.state.state_login == false ?

                  : null }
              </ScrollView>
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

  componentDidMount(){

  }

  Register(){
    var flag = 0;
    if(this.state.username == ''){
        flag = 1;
        Alert.alert('Username Empty');
    }
    if(this.state.email == ''){
        flag = 1;
        Alert.alert('Email Empty');
    }

    if(this.state.password == ''){
        flag = 1;
        Alert.alert('Password Empty');
    }
    if(this.state.repassword == ''){
        flag = 1;
        Alert.alert('Conform Password Empty');
    }
    if(this.state.firstname == ''){
        flag = 1;
        Alert.alert('First Name Empty');
    }
    if(this.state.lastname == ''){
        flag = 1;
        Alert.alert('Last Name Empty');
    }
    if(this.state.address == ''){
        flag = 1;
        Alert.alert('Address Empty');
    }
    if(this.state.phone == ''){
        flag = 1;
        Alert.alert('Phone Empty');
    }
    if(flag == 0){
        Alert.alert(
          'Conform',
          'You agree to register with this information',
          [
            {text: 'Cancle', onPress: () => console.log('NO Pressed'), style: 'cancel'},
            {text: 'Yes', onPress: () => this.addToSeverUser()},
          ]
        );
    }

  }
  _setTokkenLogin = async()=>{
      await AsyncStorage.removeItem('user@logistic');
      await AsyncStorage.setItem('user@logistic',this.state.token);
      console.log('here 11111')
      const value = await AsyncStorage.getItem('user@logistic');
      console.log(value)
  }
  addToSeverUser(){
      fetch('http://xanhluc.com:30000/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username : this.state.username,
          	email : this.state.email,
          	plainPassword : {
          		first:  this.state.password,
          		second:this.state.repassword,
          	},
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
              Alert.alert('Username Or Email Exist')
          }else{
            this.setState({
              token:responseJson.token_data.token,
            })
            this._setTokkenLogin();
            fetch('http://xanhluc.com:30000/profile', {
                method: 'GET',
                headers: {
                  'Authorization' : 'Bearer ' + responseJson.token_data.token,
                  },
            }).then((responses)=>responses.json())
            .then((responseJsons)=>{
                  this.props.dispatch({type:"LOGIN",data:responseJsons});
                  this.props.navigation.navigate('userprofile',{
                    referesh: 'true',
                  });
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
function mapStateToPropsRefesh(state){
    return {
    tabBar: state.tabBar,
    language: state.language,
    mutilanguge : state.mutilanguge,
    myValue: state.value,
  };
}
export default connect(mapStateToPropsRefesh)(User);
