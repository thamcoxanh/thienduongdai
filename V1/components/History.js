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

class History extends Component {

  constructor(props) {

      super(props);

      this.state = {
          GridListItems: [],
          loaddingStatus: false,
       };

  }


  render() {
    return (
      <View style={[Styles.container_front,{backgroundColor:'#FFFFFF'}]}>

          <View style={Styles.header_front_music}>
              <View style={Styles.header_view}>
                  <Text  style={Styles.header_title} >Thiền đã mua</Text>
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

                        <FlatList
                            data={ this.state.GridListItems }
                            renderItem={ ({item}) =>
                            <TouchableWithoutFeedback onPress={() => {
                                this.props.navigation.navigate('Detail', {
                                  itemId: item.id,
                                  category : item.category_id
                                });
                              }}>

                              <View style={Styles.item_3_colum_music}>
                                  <Image style={Styles.content_front_music_advanced_image} source={{uri: item.icon}} />
                                  <Text style={Styles.content_items_title_music}> {item.name} </Text>
                                  {item.type == "buy" ?
                                  <Icon name='ios-lock' color='#000000' size={30} style={{position:"absolute",right : 5,bottom:0}} />
                                  : null
                                  }
                                  {item.type == "coming soon" ?
                                  <Icon name='ios-add' color='#000000' size={30} style={{position:"absolute",right : 5,bottom:0}} />
                                  : null
                                  }
                              </View>


                            </TouchableWithoutFeedback>
                          }
                          numColumns={3}
                        />


                </ScrollView>
          </View>



          {this.state.loaddingStatus == true ?
          <View style={Styles.loadingView}>
                <Image source={require("./../image/loading.gif")} style={{ height: 50, width: 50 }} />
          </View>
          : null }


      </View>
    );
  }

  componentDidMount(){

      this.setState(
          {
              loaddingStatus: true
          }
      );


      fetch('http://thienyoga.net/api/history-all', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email : this.props.userLoginProfile.email,
            }),
        })
        .then((response)=>response.json())
        .then((responseJson)=>{

          this.setState(
              {
                  GridListItems: responseJson,
                  loaddingStatus: false
              }
          );
        })
        .catch((error)=>{
          console.log(error);
        });


  }



}
function mapStateToPropsRefesh(state){
    return {
      userLoginStatus : state.userLoginStatus,
      userLoginProfile : state.userLoginProfile
    };
}
export default connect(mapStateToPropsRefesh)(History);
