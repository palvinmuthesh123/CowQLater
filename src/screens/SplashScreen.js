import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  HEIGHT,
  WIDTH,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';

const SplashScreen = (props) => {
  const [hide, setHide] = useState(true);
  // UseEffect ======================================================================================
  useEffect(() => {
    if(
      props.authReducer &&
      props.authReducer.userData.email && 
      props.authReducer.userData.name)
    {
    setHide(false);
    setTimeout(async () => {
      props.navigation.navigate('DashboardScreen');
    }, 2000);
    }
  },[]);

  // useEffect(async () => {
  //   if(props.authReducer &&
  //     !props.authReducer.isathome &&
  //     props.authReducer.athomedata)
  //     {
  //       setCondition(true)
  //     }
  //     else
  //     {
  //       setCondition(false)
  //     }
  // }, [])


  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#71922d'} barStyle={'dark-content'} />
        {/* <Image
          source={images.LogoIcon}
          resizeMode="contain"
          style={styles.imageicon}
        /> */}
        {/* <Text style={styles.titleText}>Welcome to CowQLater</Text> */}
        <View style={{flex:1,justifyContent:"flex-end"}}>
          <View style={{alignItems:"center",marginBottom:HEIGHT*5/100}}>
          <Image source={require('../res/assets/images/log.png')} style={{width:WIDTH*80/100,height:HEIGHT*20/100,resizeMode:"stretch"}}/></View>
        <Text style={{fontFamily:"Precious",textAlign:'center',color:'#152e0c',fontSize:50}}>Farmer's Assist</Text>
        <View style={{backgroundColor:"#71922d",height:HEIGHT*60/100,alignItems:"center",}}>
            <Image source={require('../res/assets/images/splash.png')} style={{width:WIDTH}}/>
            {hide ? <TouchableOpacity onPress={()=>{props.navigation.push('SettingScreen');}} style={{backgroundColor:"#152e0c",paddingHorizontal:10, paddingVertical:10,justifyContent:"center",alignItems:"center",width:WIDTH*50/100, borderRadius:20,marginTop:HEIGHT*10/100}}>
              <Text style={{color:"#71922d",fontSize:50,fontFamily:"LittleLordFontleroyNF"}}>Get Started</Text>
            </TouchableOpacity> : null }
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: responsiveScreenFontSize(3),
    color: '#68BBE3',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageicon: {
    height: responsiveScreenWidth(30),
    width: responsiveScreenWidth(50),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = ({ authReducer }) => {
  console.log('reducer', authReducer);
  return {
    authReducer: authReducer,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
