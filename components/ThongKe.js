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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class ThongKe extends Component {

  constructor(props) {

      super(props);

      this.state = {
        thu2 : {height:20},
        thu3 : {height:40},
        thu4 : {height:60},
        thu5 : {height:80},
        thu6 : {height:100},
        thu7 : {height:120},
        thu8 : {height:140},
        date2 : 15,
        date3 : 15,
        date4 : 15,
        date5 : 15,
        date6 : 15,
        date7 : 15,
        date8 : 15,
        totalWeek : "20h",
        ttDate : "20p",
        timeUse : this.props.cookieTimeView,
      };


  }


  render() {
    return (
      <View style={[Styles.container_front,{backgroundColor:'#FFFFFF'}]}>

          <View style={Styles.header_front_music}>
              <View style={Styles.header_view}>
                  <Text  style={Styles.header_title} >Thống kê</Text>
                  <TouchableWithoutFeedback onPress={() => {
                      this.props.navigation.goBack();
                  }}>
                    <View style={Styles.header_icon_back} >
                          <Icon name='ios-arrow-back' color='#000000' size={30} style={{marginRight:15}} />
                    </View>
                  </TouchableWithoutFeedback>
              </View>
          </View>
          <View style={Styles.content_front_music_advanced}>

              <ScrollView style={Styles.list_3_colum_full} showsVerticalScrollIndicator={false} >

                  <View style={Styles.chart_}>
                      <View style={[Styles.colum]}>
                          <Text style={[Styles.colum_detail,this.state.thu8]}></Text>
                          <Text style={[Styles.colum_text]}>CN</Text>
                          <View style={[Styles.colum_date]} ><Text style={[Styles.colum_text_date]}>{this.state.date8}</Text></View>
                      </View>
                      <View style={[Styles.colum]}>
                          <Text style={[Styles.colum_detail,this.state.thu2]}></Text>
                          <Text style={[Styles.colum_text]}>Thứ 2</Text>
                          <View style={[Styles.colum_date]} ><Text style={[Styles.colum_text_date]}>{this.state.date2}</Text></View>
                      </View>
                      <View style={[Styles.colum]}>
                          <Text style={[Styles.colum_detail,this.state.thu3]}></Text>
                          <Text style={[Styles.colum_text]}>Thứ 3</Text>
                          <View style={[Styles.colum_date]} ><Text style={[Styles.colum_text_date]}>{this.state.date3}</Text></View>
                      </View>
                      <View style={[Styles.colum]}>
                          <Text style={[Styles.colum_detail,this.state.thu4]}></Text>
                          <Text style={[Styles.colum_text]}>Thứ 4</Text>
                          <View style={[Styles.colum_date]} ><Text style={[Styles.colum_text_date]}>{this.state.date4}</Text></View>
                      </View>
                      <View style={[Styles.colum]}>
                          <Text style={[Styles.colum_detail,this.state.thu5]}></Text>
                          <Text style={[Styles.colum_text]}>Thứ 5</Text>
                          <View style={[Styles.colum_date]} ><Text style={[Styles.colum_text_date]}>{this.state.date5}</Text></View>
                      </View>
                      <View style={[Styles.colum]}>
                          <Text style={[Styles.colum_detail,this.state.thu6]}></Text>
                          <Text style={[Styles.colum_text]}>Thứ 6</Text>
                          <View style={[Styles.colum_date]} ><Text style={[Styles.colum_text_date]}>{this.state.date6}</Text></View>
                      </View>
                      <View style={[Styles.colum]}>
                          <Text style={[Styles.colum_detail,this.state.thu7]}></Text>
                          <Text style={[Styles.colum_text]}>Thứ 7</Text>
                          <View style={[Styles.colum_date]} ><Text style={[Styles.colum_text_date]}>{this.state.date7}</Text></View>
                      </View>

                  </View>
                  <View style={Styles.title_thongke}>
                      <Text style={[Styles.text_title_thongke]}>Tổng cộng tuần</Text>
                      <Text style={[Styles.des_title_thongke]}>{this.state.totalWeek}</Text>
                  </View>
                  <View style={Styles.title_thongke}>
                      <Text style={[Styles.text_title_thongke]}>Trung bình / ngày</Text>
                      <Text style={[Styles.des_title_thongke]}>{this.state.ttDate}</Text>
                  </View>
              </ScrollView>
          </View>






      </View>
    );
  }

  getCN(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:0);
    return new Date(d.setDate(diff));
  }
  get2(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
  }
  get3(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:2);
    return new Date(d.setDate(diff));
  }
  get4(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:3);
    return new Date(d.setDate(diff));
  }
  get5(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:4);
    return new Date(d.setDate(diff));
  }
  get6(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:5);
    return new Date(d.setDate(diff));
  }
  get7(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:6);
    return new Date(d.setDate(diff));
  }
  _getTimeUsedApp = async () => {
        try {
            var cn =  this.getCN(new Date());
            var t2 =  this.get2(new Date());
            var t3 =  this.get3(new Date());
            var t4 =  this.get4(new Date());
            var t5 =  this.get5(new Date());
            var t6 =  this.get6(new Date());
            var t7 =  this.get7(new Date());
             valuecn = await AsyncStorage.getItem(cn.getDate().toString()+'-'+(cn.getMonth()+ 1).toString()+'-'+cn.getFullYear().toString()+'@logistic');
             valuet2 = await AsyncStorage.getItem(t2.getDate().toString()+'-'+(t2.getMonth()+ 1).toString()+'-'+t2.getFullYear().toString()+'@logistic');
             valuet3 = await AsyncStorage.getItem(t3.getDate().toString()+'-'+(t3.getMonth()+ 1).toString()+'-'+t3.getFullYear().toString()+'@logistic');
             valuet4 = await AsyncStorage.getItem(t4.getDate().toString()+'-'+(t4.getMonth()+ 1).toString()+'-'+t4.getFullYear().toString()+'@logistic');
             valuet5 = await AsyncStorage.getItem(t5.getDate().toString()+'-'+(t5.getMonth()+ 1).toString()+'-'+t5.getFullYear().toString()+'@logistic');
             valuet6 = await AsyncStorage.getItem(t6.getDate().toString()+'-'+(t6.getMonth()+ 1).toString()+'-'+t6.getFullYear().toString()+'@logistic');
             valuet7 = await AsyncStorage.getItem(t7.getDate().toString()+'-'+(t7.getMonth()+ 1).toString()+'-'+t7.getFullYear().toString()+'@logistic');


            if (valuecn == null) {
                valuecn = parseInt(0);
            }else{
                valuecn = parseInt(valuecn)/60;
            }

            if (valuet2 == null) {
                valuet2 = parseInt(0);
            }else{
                valuet2 = parseInt(valuet2)/60;
            }

            if (valuet3 == null) {
                valuet3 = parseInt(0);
            }else{
                valuet3 = parseInt(valuet3)/60;
            }

            if (valuet4 == null) {
                valuet4 = parseInt(0);
            }else{
                valuet4 = parseInt(valuet4)/60;
            }

            if (valuet5 == null) {
                valuet5 = parseInt(0);
            }else{
                valuet5 = parseInt(valuet5)/60;
            }

            if (valuet6 == null) {
                valuet6 = parseInt(0);
            }else{
                valuet6 = parseInt(valuet6)/60;
            }

            if (valuet7 == null) {

                valuet7 = parseInt(0);
            }else{
                valuet7 = parseInt(valuet7)/60;
            }

            var valueTotal = parseInt(valuet2) + parseInt(valuet3) + parseInt(valuet4) + parseInt(valuet5) + parseInt(valuet6) + parseInt(valuet7) + parseInt(valuecn);

            if(null == valueTotal){
                valueTotal = parseInt(0);
            }else{
                valueTotal = parseInt(valueTotal);
            }
            this.setState(
                {
                    thu2 : {height:valuet2 * 200 / parseInt(this.state.timeUse)},
                    thu3 : {height:valuet3 * 200 / parseInt(this.state.timeUse)},
                    thu4 : {height:valuet4 * 200 / parseInt(this.state.timeUse)},
                    thu5 : {height:valuet5 * 200 / parseInt(this.state.timeUse)},
                    thu6 : {height:valuet6 * 200 / parseInt(this.state.timeUse)},
                    thu7 : {height:valuet7 * 200 / parseInt(this.state.timeUse)},
                    thu8 : {height:valuecn * 200 / parseInt(this.state.timeUse)},
                    totalWeek: valueTotal + "Phút",
                    ttDate: parseInt((valueTotal/7)) +  "Phút/Ngày"
                }
            );

         } catch (error) {
           console.log(error)
           // Error retrieving data
         }
    }
  componentDidMount(){

    var cn =  this.getCN(new Date());
    var t2 =  this.get2(new Date());
    var t3 =  this.get3(new Date());
    var t4 =  this.get4(new Date());
    var t5 =  this.get5(new Date());
    var t6 =  this.get6(new Date());
    var t7 =  this.get7(new Date());
    this.setState(
        {
            date2: t2.getDate().toString(),
            date3: t3.getDate().toString(),
            date4: t4.getDate().toString(),
            date5: t5.getDate().toString(),
            date6: t6.getDate().toString(),
            date7: t7.getDate().toString(),
            date8: cn.getDate().toString()
        }
    );
    this._getTimeUsedApp();

  }


}
function mapStateToPropsRefesh(state){
    return {
        cookieTimeView : state.cookieTimeView,
    };
}
export default connect(mapStateToPropsRefesh)(ThongKe);
