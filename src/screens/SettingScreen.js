import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  WIDTH,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderAdd from '../component/HeaderAdd';
import SQLite from 'react-native-sqlite-storage';
import Profile from '../res/assets/svg/profile.svg';
import Email from '../res/assets/svg/email.svg';
import Lottie from 'lottie-react-native';
import { HEIGHT } from '../utils/Size';
import ReactLoading from 'react-loading';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import { login } from '../redux/action/auth.action';

//database connection
const db = SQLite.openDatabase(
  {
    name: 'mydb',
    location: 'default'
  },
  () => { console.log("Database connected!") }, //on success
  error => console.log("Database error", error) //on error
)


const SettingScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [spinner, setspinner] = useState(false);
  // UseEffect ======================================================================================
  useEffect(() => {
    setspinner(true);
    // getItemData();
    if (
      props.authReducer &&
      !props.authReducer.isLogin &&
      props.authReducer.type == 'LOGIN_SUCCESS' &&
      props.authReducer.userData
    ) {
      setName(props.authReducer.userData.name)
      setEmail(props.authReducer.userData.email)
    }
    setspinner(false);
  }, [props.authReducer && props.authReducer.userData]);
  // UseEffect ======================================================================================
  const getItemData = async () => {
    let sql = 'SELECT * FROM emaildetail';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          for (var i = 0; i < length; i++) {
            console.log(resultSet.rows.item(i));
            setEmail(resultSet.rows.item(i).email)
            setName(resultSet.rows.item(i).name)
          }
          setspinner(false);
        },
        error => {
          console.log('List user error', error);
          setspinner(false);
        },
      );
    });

  };

  const savePersonalInfo = async () => {
    // let sql = 'INSERT INTO emaildetail (email, name) VALUES (?, ?)';
    // let params = [email, name];
    if(email!='' && name!='')
    {
      setspinner(false);
      // db.executeSql(
      //   sql,
      //   params,
      //   result => {
      //     setspinner(false);
      //     Alert.alert('Success', 'User detail updated successfully.', [
      //       {text: 'OK', onPress: () => {
      //         global.email=email
      //         console.log('OK Pressed')
      //         navigation.push('AddFarmScreen')}},
      //     ]);
      
      //   },
      //   error => {
      //     console.log('Create user error', error);
      //   },
      // );
      let params = {
        name: name,
        email: email
      }
      console.log(login,"PPPPPPPPPPPPPPP")
      // login(params);
      props.login(params);
      Alert.alert('Success', 'Your Profile has been added', [
        {text: 'OK', onPress: () => {
          console.log('OK Pressed')
          props.navigation.push('AddFarmScreen')
        }},
      ]);
    }
    else if(email=='' && name!='')
    {
      setspinner(false);
      Alert.alert('Alert', 'Please Enter your Email Address', [
        {text: 'OK', onPress: () => {
          global.email=email
          console.log('OK Pressed')
          // navigation.push('DashboardScreen')
        }},
      ]);
    }
    else if(name=='' && email!='')
    {
      setspinner(false);
      Alert.alert('Alert', 'Please Enter your Name', [
        {text: 'OK', onPress: () => {
          global.email=email
          console.log('OK Pressed')
          // navigation.push('DashboardScreen')
        }},
      ]);
    }
    else
    {
      setspinner(false);
      Alert.alert('Alert', 'Please Enter your Name and Email Address', [
        {text: 'OK', onPress: () => {
          global.email=email
          console.log('OK Pressed')
          // navigation.push('DashboardScreen')
        }},
      ]);
    }
    
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={{flexGrow : 1}}>
        <StatusBar backgroundColor={'#f7fcbb'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />
        {/* <HeaderAdd
          onPress={() => {
            navigation.goBack();
          }}
          headerText={'Add Profile'}
          rightIcon={images.backArrow}
        /> */}
        <View style={{flex:1}}>
          
          {/* <Text style={styles.titleText}>Full Name</Text> */}
          <View style={{backgroundColor:'#f7fcbb',height:'auto',alignItems:'flex-end'}}><Lottie style={{width:WIDTH+WIDTH*20/100}} source={require('../res/assets/lottie/farm.json')} autoPlay loop /></View>
          
          <View style={{flexDirection:'row',alignItems:'center',width:WIDTH*80/100,marginLeft:WIDTH*10/100,borderRadius:20, marginTop:HEIGHT*10/100,paddingLeft:WIDTH*3/100,borderWidth:1,borderColor:"#152e0c"}}>
          <Profile height={30} width={30}/>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={'#152e0c'}
            style={styles.textInputStyle}
            value={name}
            onChangeText={value => {
              console.log(value);
              setName(value);
            }}
          />
          </View>
          {/* <Text style={styles.titleText}>Email</Text> */}
          <View style={{flexDirection:'row',alignItems:'center',width:WIDTH*80/100,marginLeft:WIDTH*10/100,borderRadius:20, marginTop:HEIGHT*5/100,paddingLeft:WIDTH*3/100,borderWidth:1,borderColor:"#152e0c"}}>
          <Email height={30} width={30}/>
          <TextInput
            placeholder="Email"
            style={styles.textInputStyle}
            placeholderTextColor={'#152e0c'}
            value={email}
            onChangeText={value => {
              console.log(value);
              setEmail(value);
            }}
          />
          </View>
          <View
          style={{alignItems:"center"}}
          >
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => {
              setspinner(true);
              savePersonalInfo();
            }}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=> props.navigation.push('DashboardScreen')}><Text style={{fontFamily:"LittleLordFontleroyNF",fontSize:35,fontWeight:"600",textAlign:"right",marginTop:HEIGHT*3/100,color:"#152e0c",marginRight:WIDTH*10/100}}>Skip For Now</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f7fcbb'
  },
  textInputStyle: {
    // height: responsiveScreenWidth(15),
    // margin: responsiveScreenWidth(1.2),
    width: '80%',
    // borderColor: colors.gray,
    // borderWidth: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft:WIDTH*3/100,
    color:"#152e0c",
    // fontFamily:"LittleLordFontleroyNF",
    // fontSize:25
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.BLACK,
    fontWeight: '500',
    margin: responsiveScreenWidth(1),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: '#f7fcbb',
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily:"LittleLordFontleroyNF",
    fontSize: 40
  },
  imageicon: {
    height: responsiveScreenWidth(30),
    width: responsiveScreenWidth(50),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenWidth(5),
  },
  btnStyle: {
    paddingVertical: HEIGHT*0.5/100,
    width: WIDTH*60/100,
    borderRadius:25,
    backgroundColor:'#152e0c',
    marginTop:HEIGHT*10/100
    // height: responsiveScreenWidth(13),
    // width: '80%',
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    // borderRadius: responsiveScreenWidth(1),
    // position: 'absolute',
    // bottom: responsiveScreenWidth(10),
  },
  boxView: {
    height: responsiveScreenWidth(35),
    width: responsiveScreenWidth(35),
    borderRadius: responsiveScreenWidth(1),
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
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
export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
