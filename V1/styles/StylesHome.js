import {
    StyleSheet,
    Dimensions,
    Platform
 } from "react-native";

//create variable used all component

if(Platform.OS === 'ios' ){

}else{

}
const width = Dimensions.get('window').width;
const widthHalf = Dimensions.get('window').width/2;
const height = Dimensions.get('window').height;

// create StyleSheet
export default StyleSheet.create({
    // create container full screen
    container_home:{
        backgroundColor: '#FFF',
        width: width,
        height: height,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#000',
        width: width,
        height: height
    },
    home_logo_image_center:{
        width: 80,
        height: 75,
    },
    container_front: {
        backgroundColor: '#FFF',
        width: width,
        height: height
    },
    load_javascript:{
      position: 'absolute',
      right:10,
      top:  0,
      padding:2,
    },
    content : {
      width: width,
      height: height,
      flex : 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    category_item_list:{
        position: 'absolute',
        right:10,
        top:  10,
    },
    home_logo : {
      width: width,
      height: height/2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    home_logo_image:{
      width: 60,
      height: 60,
    },
    home_title:{
      color:'#fff',
      fontSize:25,
      fontWeight : 'bold',
      width: width,
      textAlign: 'center',
      marginTop:20,
      fontFamily: 'Arial'
    },
    list_category_home:{
      width: width,
      height: height/2,
      alignItems: 'center',
    },
    category_item : {
      padding : 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#ccc',
      flexDirection: 'row',
      marginBottom : 15,
      width: 200,
      alignItems: 'center',
      textAlign: 'center',
    },
    category_name:{
      color:'#fff',
      fontSize:17,
      textAlign: 'center',
      fontFamily: 'Arial',
      marginRight : 10,
      width: 180,
      alignItems: 'center',
    },
    header_front : {
      width: width,
      height: height/6,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    header_front_music : {
      width: width,
      height: height/8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottomWidth:0.5,
      borderColor:"#ccc",
    },
    content_front : {
      width: width,
      height: height/6*4,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft : 20,
      paddingRight : 20
    },
    content_front_music_advanced_image:{
        width: width / 3 - 20,
        height : 150,
        position:"absolute",
        top:0,
        left:0,
        opacity:0.6,
        borderRadius:10
    },
    content_front_music_advanced_image_detail:{
        width: width / 3 - 36,
        height : 130,
        position:"absolute",
        top:0,
        left:0,
        opacity:0.6,
        borderRadius:10
    },
    content_front_music_advanced:{
        width: width,
        height: height/8*7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content_front_music : {
      width: width,
      height: height/6*3.5,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft : 20,
      paddingRight : 20
    },
    content_items:{
        width: width-40,
        borderBottomWidth : 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        height:70,
    },
    content_items_active:{
        width: width-40,
        borderColor: '#ccc',
        borderBottomWidth : 0.5,
        backgroundColor: '#CCCCCC',
        alignItems: 'center',
        justifyContent: 'center',
        height:70,
    },
    content_items_title : {
        color:'#000000',
        fontSize:20,
        width: width,
        textAlign: 'center',
        fontFamily: 'Arial'
    },
    content_items_title_alarm : {
        color:'#000000',
        fontSize:20,
        width: width - 50,
        fontFamily: 'Arial'
    },
    content_items_description : {
        color:'#acacac',
        fontSize:14,
        width: width,
        textAlign: 'center',
        fontFamily: 'Arial'
    },
    switch:{
        position:"absolute",
        right: 30 ,
        top : 23
    },
    add_time:{

        width: width,
        padding : 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    add_time_picker:{
      width: (width-40)/2 - 10,
      textAlign : "center"
    },
    content_items_title_music : {
        color:'#000000',
        fontSize:16,
        width: width / 3 -30,
        textAlign: 'center',
        fontFamily: 'Arial',
        fontWeight:"bold"
    },
    content_items_title_music_detail:{
      color:'#FFFFFF',
      fontSize:16,
      width: width / 3 -30,
      textAlign: 'center',
      fontFamily: 'Arial',
      fontWeight:"bold"
    },
    content_items_title_music_detail_1:{
        color:'#FFFFFF',
        fontSize:16,
        width: width / 3 -46,
        textAlign: 'center',
        fontFamily: 'Arial',
        fontWeight:"bold"
    },
    content_items_image_title:{
        position: 'absolute',
        top:  0,
        width: width-40,
        height:70,
    },
    footer_front : {
      width: width,
      height: height/6,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    footer_front_music : {
      width: width,
      height: height/6*1.5,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    list_3_colum_full: {
        width:width,
    },
    list_3_colum: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:width,
        height: height/6*1.5,
    },
    item_3_colum: {
        margin:3,
        width: width / 3 - 6,
        padding: 5,
        textAlign:"center",
        alignItems: 'center',
    },
    item_3_colum_music: {
        margin:10,
        width: width / 3 - 20,
        padding: 5,
        textAlign:"center",
        alignItems: 'center',
        justifyContent: 'center',
        height : 150,
        backgroundColor:"#ccc",
        borderWidth:0.5,
        borderColor: "#000",
        borderRadius:10
    },
    item_3_colum_music_detail: {
        width: width / 3 - 36,
        padding: 5,
        margin:18,
        textAlign:"center",
        alignItems: 'center',
        justifyContent: 'center',
        height : 130,
        backgroundColor:"#ccc",
        borderWidth:0.5,
        borderColor: "#000",
        borderRadius:10
    },
    footer_title:{
      color:'#000000',
      fontSize:16,
      fontWeight : 'bold',
      width: width,
      textAlign: 'center',
      marginTop:20,
      fontFamily: 'Arial'
    },
    header_view:{
      width: width,
      justifyContent: 'center',
    },
    header_icon_back:{
      position: 'absolute',
      left:20,
      top: 0,
      padding:2,

    },
    header_icon_close:{
      position: 'absolute',
      right:20,
      top: 0,
      padding:2,

    },
    header_title:{
      color:'#000000',
      fontSize:23,
      textAlign: 'center',
      fontWeight : 'bold',
      fontFamily: 'Arial'
    },
    header_description:{
      color:'#acacac',
      fontSize:14,
      textAlign: 'center',
      fontFamily: 'Arial'
    },
    header_music_title:{
      width:width,
      color:'#000000',
      fontSize:20,
      textAlign: 'center',
      fontWeight : 'bold',
      fontFamily: 'Arial',
      marginTop:5,
    },
    header_music_des:{
      width:width,
      color:'#616161',
      fontSize:15,
      textAlign: 'center',
      fontFamily: 'Arial',
      padding:5,
    },
    loadingView : {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        right:0,
        top:  0,
        width:width,
        height:height,
        opacity:0.8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      //TextInput
      input_file:{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding:5

      },
      input_file_Custom:{
          width: width-150,
          paddingLeft : 30,
          paddingBottom: 10,
          paddingTop: 10,
          paddingRight: 20,
          borderWidth: 0.5,
          borderColor: '#ccc',
      },
      input_icon:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:17,
        left:  7,
      },
      button_custom_green:{
          width: width-150,
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#a5a896',
          padding:7,
          marginBottom:10,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: '#ccc',
      },
      button_text:{
        color:'#fff',
        fontSize:18,

      },
      loader:{
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
      button_custom_blue:{
          width: width-150,
          backgroundColor: 'blue',
          padding:30,
          marginBottom:10,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: '#ccc',
      },
      button_custom_bluewhile:{
          width: width-150,
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#a5a896',
          padding:7,
          marginBottom:10,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: '#ccc',
      },
      bg_fullscreen:{
          width: width,
          height: height,
          position: 'absolute',
          top:0,
          left:0
      },
      Title_H1:{
        width: width-6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        padding:15,
        borderBottomWidth:0.5,
        borderTopWidth:0.5,
        borderColor: '#DDDDDD',
        margin:3,
        marginBottom:10,
      },
      contentTitle_h1:{
        color:'#000',
        fontSize: 18,
        marginLeft: 20
      },
      Header_Logo_Image:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

      },
      titleTopHeader:{
        fontSize: 20,
        fontWeight: 'bold',
      },
      chart_:{
          width : width - 10,
          marginLeft : 5,
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height:300,
          marginTop:10,
      },
      colum:{
          width: (width - 10)/7 -10,
          marginLeft : 5,
          height:300,
      },
      colum_detail:{
          backgroundColor:"#a5a896",
          width: (width - 10)/7 -20,
          position: "absolute",
          bottom: 70,
          left: 10,
          textAlign:"center",
          justifyContent: 'center',
          alignItems: 'center',
          fontSize:16,
          color:"#000000",
          borderRadius: 5,
      },
      colum_text:{
          width: (width - 10)/7 -20,
          position: "absolute",
          bottom: 40,
          left: 10,
          textAlign:"center",
          fontSize:14,
          color:"#000000",
          fontWeight:"bold",
      },
      colum_date:{
          width: (width - 10)/7 -20,
          position: "absolute",
          bottom: 0,
          left: 10,
          textAlign:"center",
          justifyContent: 'center',
          alignItems: 'center',
          fontSize:16,
          color:"#000000",
          fontWeight:"bold",
          backgroundColor:"red",
          borderRadius: 30,
          height:(width - 10)/7 -20,
      },
      colum_text_date:{
          color:"#FFF",
          fontWeight:"bold",
      },
      title_thongke:{
        width : width - 10,
        marginLeft : 5,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
      },
      text_title_thongke:{
          width : width - 10,
          color:"#000000",
          fontSize:18,
          textAlign:"center",
          marginBottom:10,
      },
      des_title_thongke:{
          width : width - 10,
          color:"#000000",
          fontSize:40,
          textAlign:"center",
          marginBottom:10,
          fontWeight:"bold"
      },
      textInput:{
          borderWidth:0.5,
          borderRadius : 5,
          padding:5,
          margin:5 ,
          width:width - 10,
      },
      view_tow_colum:{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        width : width - 20,
        marginLeft : 10
      },
      colum_in_tow_colum:{
          width : (width - 20)/2,
          paddingLeft : 10,
          paddingRight : 10
      }
});
