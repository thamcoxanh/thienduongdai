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
   TextInput,
   AsyncStorage,
   Alert,
   RefreshControl,
   Dimensions,
   StatusBar,

 } from 'react-native';

 //import components
 import Styles from './../styles/StylesHome.js';
 import { connect } from 'react-redux';

 const width = Dimensions.get('window').width;
 const height = Dimensions.get('window').height;

class Background extends Component {
  constructor(props) {
      super(props);
      this.state = {

          width_background: 0,
          height_background : height,
          background_animated: new Animated.Value(0),
          key_bg : 0 ,
          bg_opacity : new Animated.Value(0.5),
      };
  }

    render() {
        let aminated_bg = {
          top:  0,
          left: this.state.background_animated,
          position: 'absolute',
          width:this.state.width_background ,
          height:this.state.height_background ,
          opacity: this.state.bg_opacity,
          backgroundColor:'#FFFFFF',

        };
        return (

            <Animated.View style={[aminated_bg]}>
                <Image source={{uri: this.props.list_bg[this.state.key_bg].url}} resizeMode="contain" style={{ height: this.state.height_background, width: this.state.width_background }} />
            </Animated.View>
        )
    }

    aminated_bg_faceIn(){

        Animated.timing(
           this.state.background_animated,
             {
               toValue: 0,
               duration: 0,
             }
        ).start(() => {
            Animated.spring(this.state.bg_opacity, {
              toValue: 0.5,
              duration: 50,
            }).start(() => {
              this.aminated_bg_image();
            });
        });

    }


    aminated_bg_faceOut(){
        count = this.props.list_bg.length;
        if(this.state.key_bg >= count-1){
          this.setState(
              {
                  key_bg: 0,
              }
          );
        }else{
          this.setState(
              {
                  key_bg: this.state.key_bg + 1,
              }
          );
        }
        Animated.spring(this.state.bg_opacity, {
          toValue: 0,
          duration: 50,
          }).start(() => {
            this.aminated_bg_faceIn();
        });
    }


    aminated_bg_image(){
        Animated.timing(
           this.state.background_animated,
             {
               toValue: (this.props.list_bg[this.state.key_bg].width*height/this.props.list_bg[this.state.key_bg].height)-(this.props.list_bg[this.state.key_bg].width*height/this.props.list_bg[this.state.key_bg].height*2)+width,
               duration: 50000,
             }
        ).start(() => {
          this.aminated_bg_faceOut();
      });
    }
    componentDidMount(){

        this._getLayoutApp();
        this.setState(
            {
                width_background: this.props.list_bg[this.state.key_bg].width*height/this.props.list_bg[this.state.key_bg].height
            }
        );
        this.aminated_bg_image();
    }

    _getLayoutApp = async () => {

        try {
          const value = await AsyncStorage.getItem('layoutApp@logistic');

            if (value !== null) {

                if(value != '0'){
                  fetch('http://thienyoga.net/api/get-background/'+value, {
                      method: 'GET',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      }
                  })
                  .then((response)=>response.json())
                  .then((responseJson)=>{
                      this.props.dispatch({type:"SETLAYOUT", valueLayout : responseJson , layout : value});
                  })
                  .catch((error)=>{
                    console.log(error);
                  });

                }

            }else{
                var val = '0';
                await AsyncStorage.setItem('layoutApp@logistic',val);
            }
         } catch (error) {
           Alert.alert(error);
         }
    }
}

function mapStateToProps(state){
    return {
    list_bg : state.list_bg,
    layout : state.layout,
    };
}
export default connect(mapStateToProps)(Background);
