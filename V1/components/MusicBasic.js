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

class MusicBasic extends Component {

  constructor(props) {
      
      super(props);

      this.state = {
          GridListItems: [],
          loaddingStatus: false,
          link_mp3:'',
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
          <Image source={require("./../image/bg_thugian.png")} style={Styles.bg_fullscreen} />
          <View style={Styles.header_front}>
              <View style={Styles.header_view}>
                  <Text  style={Styles.header_title} >Thiền thư giãn</Text>
                  <TouchableWithoutFeedback onPress={() => {
                      whoosh.stop();
                      this.props.navigation.goBack();
                  }}>
                    <View style={Styles.header_icon_back} >
                          <Icon name='ios-arrow-back' color='#000000' size={30} style={{marginRight:15}} />
                    </View>
                  </TouchableWithoutFeedback>
              </View>
          </View>
          <View style={Styles.content_front_music}>

          </View>

          <View style={Styles.footer_front_music}>
                <ScrollView style={Styles.list_3_colum} showsVerticalScrollIndicator={false} >
                    <FlatList
                        data={ this.state.GridListItems }
                        renderItem={ ({item}) =>
                        <TouchableWithoutFeedback onPress={() => { this.play_sound(item.file)}}>

                          <View style={Styles.item_3_colum}>
                              <Text style={Styles.content_items_title_music}> {item.name} </Text>
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

      

      fetch('http://thienyoga.net/api/get-basic-music/1', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            
          this.setState(
              {
                  GridListItems: responseJson.items
              }
          );
        })
        .catch((error)=>{
          console.log(error);
        });

        
  }

  play_sound(link){
      
      this.setState(
          {
              link_mp3: link
          }
      );
      
      whoosh.stop();
      whoosh = new Sound(link, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        
        whoosh.play();
      });
      whoosh.setVolume(1);
      whoosh.setPan(1);
      whoosh.setNumberOfLoops(-1);
      

  }

}
function mapStateToPropsRefesh(state){
    return {};
}
export default connect(mapStateToPropsRefesh)(MusicBasic);
