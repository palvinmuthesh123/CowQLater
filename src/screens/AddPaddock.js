import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
  Image,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from '../utils/Size';
import Spinner from 'react-native-loading-spinner-overlay';
import Lottie from 'lottie-react-native';
import { WIDTH, HEIGHT } from '../utils/Size';
import Name from '../res/assets/svg/name.svg';
import Date from '../res/assets/svg/Date.svg'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import Animals from '../res/assets/svg/animals.svg'
import * as ImagePicker from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import Crop from '../res/assets/svg/crop.svg';

const AddPaddock = (props) => {
  const [paddockNumber, setpaddockNumber] = useState('');
  const [animalCount, setanimalCount] = useState('');
  const [animalAge, setanimalAge] = useState('');
  const [spinner, setspinner] = useState(false);
  const [images, setImages] = useState(false);
  const [hide, setHide] = useState(true);
  const [modalVisible, setModalVisible] = useState(false)
  const [farmData, setFarmData] = useState([])
  const [data, setData] = useState([1])
  const [enable, setEnable] = useState(true);
  const [farm, setFarm] = useState('');
  const [isFocus1, setIsFocus1] = useState(false);

  // UseEffect ======================================================================================

  useEffect(() => {
    getFarmItemData();
    if (
      props.route.params &&
      props.route.params.dash
    ) {
      setHide(false);
    }
    else if(
      props.route.params && 
      props.route.params.tally
    )
    {
      setHide(false);
    }
  }, []);

  const getFarmItemData = async () => {
    if (
      props.authReducer &&
      props.authReducer.addFarmData
    ) {
      var arr = [];
      setFarmData(props.authReducer.addFarmData);
    }
  };

  const source = {
    html: `
    <input type="text">`
  };

  const saveAddPaddockInfo = () => {
    if (paddockNumber != '' && farm != '') {
      setspinner(true);
      var arr = [];
      if (
        props.authReducer &&
        props.authReducer.addPaddockData
      ) {
        arr = props.authReducer.addPaddockData;
      }
        
      let params = {
        paddockNumber: paddockNumber,
        farmname: farm
      }
      arr.push(params);

        props.addPaddock(arr);
        Alert.alert('Success', 'Paddock has been added', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              setpaddockNumber('');
              // props.navigation.push(hide ? 'AddPaddockScreen' : 'DashboardScreen')
            },
          },
        ]
        )
      setspinner(false);
    }
    else if (paddockNumber == '' && farm == '') {
      setspinner(false);
      Alert.alert('Alert', 'Please enter all Details', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    else if (farm == '') {
      setspinner(false);
      Alert.alert('Alert', 'Please select Farm', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    else if (paddockNumber == '') {
      setspinner(false);
      Alert.alert('Alert', 'Please enter Paddock Name', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    else {
      setspinner(false);
      Alert.alert('Alert', 'Please enter all Details', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }

  };

  const cameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'CowQLater Camera Permission',
          message: 'CowQLater needs access to your camera',
          buttonPositive: 'Allow',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await launchCamera();
      } else {
        alert('CAMERA Permission Denied');
      }
    } else {
      await launchCamera();
    }
  };

  const launchCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
      maxWidth: 640,
      maxHeight: 480,
      compressImageQuality: 1,
    };
    await ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);
      setImages({ uri: 'data:image/png;base64,' + response.assets[0].base64 });
      try {
        console.log('Canceled image request ', response.didCancel);
      } catch (e) {
        console.error('Catch err >>> ', e);
        handleError;
      }
    });
  };

  const pushDatas = (val) => {
    var arr = [];
    for (var i = 0; i < animalCount; i++) {
      arr.push({
        paddockNumber: paddockNumber,
      });
    }
    setData(arr);
    setModalVisible(val);
  }

  const changeage = (ind, val) => {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (ind == i) {
        arr.push({
          paddockNumber: data[i].paddockNumber,
          farmname: farm
        });
      }
      else {
        arr.push({
          paddockNumber: data[i].paddockNumber,
          farmname: farm
        });
      }
    }
    setData(arr);
  }

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor={'#e2f584'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />
        <View style={{ flex: 1 }}>
          {/* <Lottie style={{ height: undefined, width: WIDTH }} source={require('../res/assets/lottie/windmill.json')} autoPlay loop /> */}
          <Image source={require('../res/assets/images/paddock.png')} style={{ height: HEIGHT*35/100, width: WIDTH*90/100, resizeMode:"stretch", marginTop: HEIGHT*7/100, marginLeft:WIDTH*5/100 }}/>
          
          <Dropdown
            style={[
              styles.dropdown
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{color:'#587324'}}
            data={farmData}
            maxHeight={300}
            labelField="farmname"
            valueField="farmname"
            placeholder={!isFocus1 ? 'Select Farm' : '...'}
            searchPlaceholder="Search..."
            value={farm}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={item => {
              setFarm(item.farmname);
              setIsFocus1(false);
            }}
          />
          
          <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 80 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "#587324" }}>
            <Crop height={25} width={25} />
            <TextInput
              placeholder="Paddock Name"
              style={[styles.textInputStyle, { paddingLeft: WIDTH * 3 / 100 }]}
              placeholderTextColor={'#587324'}
              value={paddockNumber}
              onChangeText={value => {
                console.log(value);
                setpaddockNumber(value);
              }}
            />
          </View>

          {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 80 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "#587324" }}>
            <Animals height={30} width={30} />
            <TextInput
              placeholder="Count"
              style={styles.textInputStyle}
              placeholderTextColor={'#587324'}
              value={animalCount}
              keyboardType='numeric'
              onChangeText={(value) => {
                console.log(value);
                setanimalCount(value);
              }}
            />
          </View> */}



          <View style={{ alignItems: "center", flexDirection:"row", justifyContent:"center" }}>
            <TouchableOpacity
              style={[styles.btnStyle,{marginRight:WIDTH*5/100}]}
              onPress={() => {
                saveAddPaddockInfo();
              }}>
              <Text style={styles.saveText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                // saveAddPaddockInfo();
                props.route.params && props.route.params.tally ? props.navigation.push('FarmTallyScreen') :
                props.navigation.push('DashboardScreen')
              }}>
              <Text style={styles.saveText}>Finish</Text>
            </TouchableOpacity>

          </View>

          {hide ? <TouchableOpacity onPress={() => props.navigation.push('DashboardScreen')}><Text style={{ fontFamily: "LittleLordFontleroyNF", fontSize: 35, fontWeight: "600", textAlign: "right", marginTop: HEIGHT * 3 / 100, color: "#587324", marginRight: WIDTH * 10 / 100 }}>Skip For Now</Text></TouchableOpacity> : null}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2f584",
  },
  textInputStyle: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: WIDTH * 3 / 100,
    color: "#587324",
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
    fontFamily: "LittleLordFontleroyNF",
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
    paddingVertical: HEIGHT * 0.5 / 100,
    width: WIDTH * 40 / 100,
    borderRadius: 25,
    backgroundColor: '#587324',
    marginTop: HEIGHT * 7 / 100
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
  dropdown: {
    height: 50,
    borderColor: "#587324",
    borderWidth: responsiveScreenWidth(0.2),
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#587324',
    marginTop:HEIGHT*5/100
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
export default connect(mapStateToProps, mapDispatchToProps)(AddPaddock);
