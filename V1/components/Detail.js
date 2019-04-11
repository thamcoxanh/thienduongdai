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
import Stripe from 'react-native-stripe-api';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Detail extends Component {

  constructor(props) {

      super(props);
      this.moveAnimation = new Animated.ValueXY({ x: 0, y: height });
      this.moveAnimation1 = new Animated.ValueXY({ x: 0, y: height });
      that = this;
      this.state = {
          GridListItems: [],
          loaddingStatus: false,
          title:'',
          description_item : '',
          title_item : '',
          params_category_id:this.props.navigation.getParam('category', '0'),
          params_item_id:this.props.navigation.getParam('itemId', '0'),
          link_sound : '',
          settime : '10',
          array_time:[],
          time_used_app:0,
          clearId : '',
          static_play : false,
          play_status : false,
          paypal_status : "free",
          price_paypal : "0",
          price_paypal_display : "0",
          bank : '',
          month : "",
          year : "",
          cvc : "",
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
       Sound = require('react-native-sound');
        Sound.setCategory('Playback');
        whoosh = new Sound('', '', (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // loaded successfully
          console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        });

  }


  render() {
    return (
      <View style={[Styles.container_front,{backgroundColor:'#FFFFFF'}]}>

          <View style={Styles.header_front_music}>
              <View style={Styles.header_view}>
                  <Text  style={Styles.header_title} >{this.state.title}</Text>
                  <TouchableWithoutFeedback onPress={() => {
                      whoosh.stop();
                      this.props.navigation.goBack();
                  }}>
                    <View style={Styles.header_icon_close} >
                          <Icon name='ios-close' color='#000000' size={30} style={{marginRight:15}} />
                    </View>
                  </TouchableWithoutFeedback>
              </View>
          </View>
          <View style={Styles.content_front_music_advanced}>

              <ScrollView style={Styles.list_3_colum_full} showsVerticalScrollIndicator={false} >

                  <FlatList
                      data={ this.state.GridListItems }
                      renderItem={ ({item}) =>
                            <TouchableWithoutFeedback onPress={() => { this.change_product(item.item.id); }}>
                              {item.item.id != this.state.params_item_id  ?


                                  <View style={Styles.item_3_colum_music_detail}>
                                      <Image style={Styles.content_front_music_advanced_image_detail} source={{uri: item.item.icon}} />
                                      <Text style={Styles.content_items_title_music_detail_1}> {item.item.name} </Text>
                                      {item.item.type == "buy" ?
                                      <Icon name='ios-lock' color='#000000' size={30} style={{position:"absolute",right : 5,bottom:0}} />
                                      : null
                                      }
                                      {item.item.type == "coming soon" ?
                                      <Icon name='ios-add' color='#000000' size={30} style={{position:"absolute",right : 5,bottom:0}} />
                                      : null
                                      }
                                  </View>


                              :
                              <View style={[Styles.item_3_colum_music_detail,item.style1]}>
                                  <Image style={[Styles.content_front_music_advanced_image_detail,item.style2]} source={{uri: item.item.icon}} />
                                  <Text style={[Styles.content_items_title_music_detail_1,item.style3]}> {item.item.name} </Text>
                                  {item.item.type == "buy" ?
                                  <Icon name='ios-lock' color='#000000' size={30} style={{position:"absolute",right : 5,bottom:0}} />
                                  : null
                                  }
                                  {item.item.type == "coming soon" ?
                                  <Icon name='ios-add' color='#000000' size={30} style={{position:"absolute",right : 5,bottom:0}} />
                                  : null
                                  }
                              </View>

                              }

                            </TouchableWithoutFeedback>
                    }
                    numColumns={3}
                  />
                  <Text style={[Styles.header_music_title,{'marginTop':50,"textAlign":'left',"marginLeft":20,"width":width-40}]}>{this.state.description_item} </Text>
                  <Text style={[Styles.header_music_des,{'marginTop':20,"textAlign":'left',"marginLeft":20,"fontSize":15,"width":width-50}]}>{this.state.title_item}</Text>

                  <TouchableWithoutFeedback onPress={() => {
                      this.showPopup();
                    }}>
                    <View style={Styles.Title_H1}>
                        <Text style={Styles.contentTitle_h1}>{this.state.settime} Phút</Text>
                        <Icon name='ios-clock' color='#DDDDDD' size={25} style={{position: 'absolute', left:10,top:14}} />
                    </View>
                  </TouchableWithoutFeedback>

                  {this.state.play_status != false ?
                      this.state.static_play != false ?
                        <TouchableWithoutFeedback onPress={() => {
                              this.stop_music();
                        }}>
                          <View style={[Styles.button_custom_green,{"width":width-80,"marginLeft" : 40,'marginTop':20,'backgroundColor':'#a5a896'}]}>
                            <Text style={Styles.button_text} >KẾT THÚC THIỀN</Text>
                          </View>
                        </TouchableWithoutFeedback>
                        :

                        <TouchableWithoutFeedback onPress={() => {
                              this.play_music();
                        }}>
                          <View style={[Styles.button_custom_green,{"width":width-80,"marginLeft" : 40,'marginTop':20,'backgroundColor':'#a5a896'}]}>
                            <Text style={Styles.button_text} >BẮT ĐẦU THIỀN</Text>
                          </View>
                        </TouchableWithoutFeedback>

                    :null}


                    {this.state.paypal_status == 'buy' ?
                        this.props.userLoginStatus == true ?
                            <TouchableWithoutFeedback onPress={() => {
                                this.showPopup1();
                            }}>
                              <View style={[Styles.button_custom_green,{"width":width-80,"marginLeft" : 40,'marginTop':20,'backgroundColor':'#a5a896'}]}>
                                <Text style={Styles.button_text} >THANH TOÁN</Text>
                              </View>
                            </TouchableWithoutFeedback>
                          :
                          <TouchableWithoutFeedback onPress={() => {
                                this.props.navigation.navigate('User');
                          }}>
                            <View style={[Styles.button_custom_green,{"width":width-80,"marginLeft" : 40,'marginTop':20,'backgroundColor':'#a5a896'}]}>
                              <Text style={Styles.button_text} >THANH TOÁN</Text>
                            </View>
                          </TouchableWithoutFeedback>
                    :null}
                    {this.state.paypal_status == 'coming soon' ?

                          <View style={[Styles.button_custom_green,{"width":width-80,"marginLeft" : 40,'marginTop':20,'backgroundColor':'#a5a896'}]}>
                            <Text style={Styles.button_text} >ĐANG CẬP NHẬT</Text>
                          </View>
                    :null}

                </ScrollView>
          </View>

          <Animated.View style={[this.state.loading,this.moveAnimation.getLayout()]}>

                  <View>


                        <View style={Styles.header_front_music}>
                            <View style={Styles.header_view}>
                                <Text  style={Styles.header_title} >Thời gian thiền</Text>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.closePopup();
                                }}>
                                  <View style={Styles.header_icon_close} >
                                        <Icon name='ios-close' color='#000000' size={30} style={{marginRight:15}} />
                                  </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                            <ScrollView showsVerticalScrollIndicator={false} >

                                {
                                    this.state.array_time.map(item => {
                                        return (
                                          <TouchableWithoutFeedback onPress={() => {
                                              this.valueChangeOption(item);
                                          }}>
                                            <View style={[Styles.Title_H1,{"borderTopWidth":0,"margin" : 0,"width":width,marginBottom:0,marginTop:0}]}>
                                                <Icon name='ios-clock' color='#DDDDDD' size={25} style={{position: 'absolute', left:10,top:14}} />
                                                <Text style={Styles.contentTitle_h1}>{item} Phút</Text>
                                            </View>
                                          </TouchableWithoutFeedback>
                                        )
                                    }
                                  )

                                }
                            </ScrollView>

                  </View>
          </Animated.View>
          <Animated.View style={[this.state.loading,this.moveAnimation1.getLayout()]}>

                  <View>


                        <View style={Styles.header_front_music}>
                            <View style={Styles.header_view}>
                                <Text  style={Styles.header_title} >Thanh toán : {this.state.price_paypal_display} VNĐ</Text>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.closePopup1();
                                }}>
                                  <View style={Styles.header_icon_close} >
                                        <Icon name='ios-close' color='#000000' size={30} style={{marginRight:15}} />
                                  </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                            <ScrollView showsVerticalScrollIndicator={false} >
                                <Text style={[Styles.header_music_title,{'marginTop':0,"textAlign":'left',"marginLeft":0,"width":width,"padding" : 15, "borderBottomWidth":0.5,"fontSize" : 16}]}>Thanh toán bằng visa hoặc debit card </Text>
                                <Text style={[Styles.header_music_title,{'marginTop':10,"textAlign":'left',"marginLeft":20,"width":width-40,"paddingLeft" : 20}]}>Mã thẻ </Text>
                                <TextInput
                                  style={[Styles.textInput,{"marginLeft" : 25,"width" : width -40}]}
                                  onChangeText={(textBank) => this.setState({bank:textBank})}
                                  value={this.state.bank}
                                />
                                <View style={Styles.view_tow_colum}>
                                    <Image style={{"width" : width -40 , "height": 40, "marginLeft" :15 , "marginTop" : 10 }} source={require("./../image/paypal.png")} resizeMode="contain" />
                                </View>
                                <View style={Styles.view_tow_colum}>
                                    <View style={Styles.colum_in_tow_colum}>
                                        <Text style={[Styles.header_music_title,{'marginTop':10,"textAlign":'left',"marginLeft":20,"width":(width-20)/2 - 20}]}>Tháng</Text>
                                        <TextInput
                                          style={[Styles.textInput,{"width":(width-20)/2 - 20}]}
                                          onChangeText={(textMount) => this.setState({month:textMount})}
                                          value={this.state.month}
                                        />
                                    </View>
                                    <View style={Styles.colum_in_tow_colum}>
                                        <Text style={[Styles.header_music_title,{'marginTop':10,"textAlign":'left',"marginLeft":20,"width":(width-20)/2 - 20}]}>Năm</Text>
                                        <TextInput
                                          style={[Styles.textInput,{"width":(width-20)/2 - 20}]}
                                          onChangeText={(textYear) => this.setState({year:textYear})}
                                          value={this.state.year}
                                        />
                                    </View>
                                </View>

                                <Text style={[Styles.header_music_title,{'marginTop':10,"textAlign":'left',"marginLeft":20,"width":width-40,"paddingLeft" : 20}]}>Mã CVC </Text>
                                <TextInput
                                  style={[Styles.textInput,{"marginLeft" : 25,"width" : width -40}]}
                                  onChangeText={(textcvc) => this.setState({cvc:textcvc})}
                                  value={this.state.cvc}
                                />

                                <TouchableWithoutFeedback onPress={() => {
                                      this.thanhtoan_confirm();
                                }}>
                                  <View style={[Styles.button_custom_green,{"width":width-80,"marginLeft" : 40,'marginTop':20,'backgroundColor':'#a5a896'}]}>
                                    <Text style={Styles.button_text} >THANH TOÁN</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>

                  </View>
          </Animated.View>
          {this.state.loaddingStatus == true ?
          <View style={Styles.loadingView}>
                <Image source={require("./../image/loading.gif")} style={{ height: 50, width: 50 }} />
          </View>
          : null }


      </View>
    );
  }
  stop_music(){
      whoosh.getCurrentTime((seconds) => this._getTimeUsedApp(seconds));
      whoosh.stop();
      this.setState(
              {
                  static_play: false
              }
          );
      clearTimeout(this.state.clearId);
  }
  _getTimeUsedApp = async (seconds) => {
        try {
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();

            const value = await AsyncStorage.getItem(date+'-'+month+'-'+year+'@logistic');

            if (value !== null) {


                var val = (parseInt(seconds)+parseInt(value));
                await AsyncStorage.setItem(date+'-'+month+'-'+year+'@logistic',val.toString());
                if(val < 60){
                  Alert.alert('Hôm nay bạn đã thiền được :'+val.toString()+' giây');
                }else{
                    Alert.alert('Hôm nay bạn đã thiền được :'+(parseInt(val/60)).toString()+' phút');
                }
            }
         } catch (error) {
           Alert.alert(error);
           // Error retrieving data
         }
    }
  formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
  play_music(){


      whoosh.stop();
      whoosh = new Sound(this.state.link_sound, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

        whoosh.play();


      });
      this.setState(
              {
                  static_play: true
              }
          );
      var clearId = setTimeout(() => {that.stop_music()}, parseInt(this.state.settime)*1000*60);
      that.setState({ clearId: clearId});

  }
  valueChangeOption(value){
      this.setState(
              {
                  settime: value
              }
          );
    this._displayNone();

  }
  _displayNone1= () => {
    Animated.spring(this.moveAnimation1, {
      toValue: {x: 0, y: height},
      duration: 1000,
    }).start()
  }
  _displayTrue1= () => {
    Animated.spring(this.moveAnimation1, {
      toValue: {x: 0, y: 0},
      duration: 1000,
    }).start()
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
  showPopup1(){
    this._displayTrue1();
  }
  closePopup1(){
    this._displayNone1();
  }
  showPopup(){
    this._displayTrue();
  }
  closePopup(){
    this._displayNone();
  }
  change_product(id_product){
          this.setState(
              {
                  loaddingStatus: true
              }
          );
          var return_json = new Array;
          this.state.GridListItems.map((itemData) => {
              var flag = new Array;
              if(itemData.item.id == id_product){
                var time_flag = itemData.item.time_play%5;
                var time_used = (itemData.item.time_play - time_flag)/5;
                var arr_time = new Array;
                for(var i = 0; i < time_used ; i++){
                    arr_time[i] = (i+1) * 5;
                }
                if(itemData.item.type == "free"){
                    this.setState(
                        {
                            play_status: true,
                            paypal_status: "free",
                        }
                    );
                }else{
                  this.setState(
                      {
                          play_status: false,
                          paypal_status: itemData.item.type,
                      }
                  );
                }
                if(this.props.userLoginStatus == true && itemData.item.type == "buy"){


                  fetch('http://thienyoga.net/api/history-check', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          email: this.props.userLoginProfile.email,
                          product_id: itemData.item.id,
                        }),
                    })
                    .then((responses)=>responses.json())
                    .then((responseJsons)=>{
                        if (responseJsons == 1) {
                            this.setState(
                                {
                                    play_status: true,
                                    paypal_status: "free",
                                }
                            );
                        }
                    })
                    .catch((errors)=>{
                      console.log(errors);
                    });


                }

                this.setState(
                    {
                        description_item: itemData.item.name,
                        title_item: itemData.item.description,
                        link_sound : itemData.item.file,
                        array_time : arr_time,
                        settime : itemData.item.time_play,
                        price_paypal : itemData.item.price,
                        price_paypal_display : this.formatMoney(itemData.item.price),
                    }
                );
                flag['item'] = itemData.item;
                flag['style1'] = { margin : 3 , width : width / 3 - 6, height : 160 ,marginTop : 8 };
                flag['style2'] = { width : width / 3 - 6 , height : 160 };
                flag['style3'] = { width : width / 3 - 16 };
              }else{
                flag['item'] = itemData.item;
                flag['style1'] = '';
                flag['style2'] = '';
                flag['style3'] = '';
              }
              return_json.push(flag);
          });

          this.setState(
              {
                  GridListItems: return_json,
                  loaddingStatus: false,
                  params_item_id : id_product,
              }
          );
  }
  componentDidMount(){

      this.setState(
          {
              loaddingStatus: true
          }
      );

      fetch('http://thienyoga.net/api/get-basic-music/'+this.state.params_category_id, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{


          var return_json = new Array;
          responseJson.items.map((itemData) => {
              var flag = new Array;
              if(itemData.id == this.state.params_item_id){
                var time_flag = itemData.time_play%5;
                var time_used = (itemData.time_play - time_flag)/5;
                var arr_time = new Array;
                for(var i = 0; i < time_used ; i++){
                    arr_time[i] = (i+1) * 5;
                }
                if(itemData.type == "free"){
                    this.setState(
                        {
                            play_status: true,
                            paypal_status: "free",
                        }
                    );
                }else{
                  this.setState(
                      {
                          play_status: false,
                          paypal_status: itemData.type,
                      }
                  );
                }
                if(this.props.userLoginStatus == true && itemData.type == "buy"){
                  fetch('http://thienyoga.net/api/history-check', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          email: this.props.userLoginProfile.email,
                          product_id: itemData.id,
                        }),
                    })
                    .then((responses)=>responses.json())
                    .then((responseJsons)=>{
                        if (responseJsons == 1) {
                            this.setState(
                                {
                                    play_status: true,
                                    paypal_status: "free",
                                }
                            );
                        }
                    })
                    .catch((errors)=>{
                      console.log(errors);
                    });
                }
                this.setState(
                    {
                        description_item: itemData.name,
                        title_item: itemData.description,
                        link_sound : itemData.file,
                        array_time : arr_time,
                        settime : itemData.time_play,
                        price_paypal : itemData.price,
                        price_paypal_display : this.formatMoney(itemData.price),

                    }
                );
                flag['item'] = itemData;
                flag['style1'] = { margin : 3 , width : width / 3 - 6, height : 160 };
                flag['style2'] = { width : width / 3 - 6 , height : 160 };
                flag['style3'] = { width : width / 3 - 16 };
              }else{
                flag['item'] = itemData;
                flag['style1'] = '';
                flag['style2'] = '';
                flag['style3'] = '';
              }
              return_json.push(flag);
              this.setState(
                  {
                      loaddingStatus: false
                  }
              );
          });

          this.setState(
              {
                  GridListItems: return_json,
                  title : responseJson.category
              }
          );


        })
        .catch((error)=>{
          console.log(error);
        });


  }
  thanhtoan_confirm(){
    const apiKey = 'pk_test_iEJ4ow3sCW6q2oLKIUY4CXHy';
    const client = new Stripe(apiKey);
    var key = 0;

    if(this.state.bank == '' && key == 0){
        Alert.alert('Mã thẻ không được bỏ trống');
        key = 1;
    }
    if(this.state.month == '' && key == 0){
        Alert.alert('Tháng không được bỏ trống');
        key = 1;
    }
    if(this.state.year == '' && key == 0){
        Alert.alert('Năm không được bỏ trống');
        key = 1;
    }
    if(this.state.cvc == '' && key == 0){
        Alert.alert('Mã CVC không được bỏ trống');
        key = 1;
    }
    if( key == 0 ){
        const token = client.createToken({
          number: this.state.bank,
          cvc: this.state.cvc,
          exp_month: this.state.month,
          exp_year: this.state.year,
          address_zip: '700000'
        }).then((x) => {
            if(x.error){
                Alert.alert(x.error.message);
            }else{
              fetch('http://thienyoga.net/api/history-payment', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    bank:this.state.bank,
                  	month : this.state.month,
                  	year : this.state.year,
                  	price : this.state.price_paypal,
                  	email : this.props.userLoginProfile.email,
                  	product_id : this.state.params_item_id,
                    token : token.id
                  }),
              })
              .then((response)=>response.json())
              .then((responseJson)=>{
                  if(responseJson == 0){
                      Alert.alert("Tài khoản của bạn không đủ để thanh toán");
                  }else{
                      Alert.alert("Thanh toán thành công");
                      this.setState(
                          {
                              play_status: true,
                              paypal_status: "free",
                          }
                      );
                      this.closePopup1();
                  }
              })
              .catch((error)=>{
                  console.log(error);
              });
            }

        }).catch((e)=>{

        });
    }

  }


}
function mapStateToPropsRefesh(state){
    return {
      userLoginStatus : state.userLoginStatus,
      userLoginProfile : state.userLoginProfile,
  };
}
export default connect(mapStateToPropsRefesh)(Detail);
