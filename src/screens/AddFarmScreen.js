import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from '../utils/Size';
import Spinner from 'react-native-loading-spinner-overlay';
import { HEIGHT, WIDTH } from '../utils/Size';
import Crop from '../res/assets/svg/crop.svg';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import { addFarm } from '../redux/action/auth.action';

const AddFarmScreen = (props) => {
  const [farmname, setFarmName] = useState('');
  const [spinner, setspinner] = useState(false);
  const [hide, setHide] = useState(true);

  // UseEffect ======================================================================================
  useEffect(() => {
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

  // UseEffect ======================================================================================
  // UseEffect ======================================================================================
  const saveAddFarmInfo = async () => {
    if (farmname != '') {
      setspinner(true);
      var arr = [];
      if (
        props.authReducer &&
        props.authReducer.addFarmData
      ) {
        arr = props.authReducer.addFarmData;
      }
      let params = {
        farmname: farmname,
      }
      if (arr.length != 0) {
        arr.some((o) => {
          if (o.farmname === params.farmname &&
            o.farmArea === params.farmArea) {
            console.log("Farm Name with farm area exists");
            Alert.alert('Alert', 'Farm Name with farm area exists', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                },
              },
            ]
            )
          }
          else if (o.farmname === params.farmname) {
            console.log("Farm Name already exists");
            Alert.alert('Alert', 'Farm Name already exists', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                },
              },
            ]
            )
          }
          else {
            arr.push(params)
            props.addFarm(arr);
            Alert.alert('Success', 'Farm has been added successfully', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  props.navigation.push(props.route.params && props.route.params.tally ? 'FarmTallyScreen' : hide ? 'AddPaddock' : 'DashboardScreen')
                },
              },
            ]
            )
          }
        })
      }
      else {
        arr.push(params)
        props.addFarm(arr);
        Alert.alert('Alert', 'Farm has been added', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              props.navigation.push(props.route.params && props.route.params.tally ? 'FarmTallyScreen' : hide ? 'AddPaddock' : 'DashboardScreen')
            },
          },
        ]
        )
      }
      setspinner(false);
    }
    else if (farmname == '') {
      setspinner(false);
      Alert.alert('Alert', 'Please fill the Farm Name', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
  }
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'#f4e0a2'} barStyle={'dark-content'} />
          <Spinner visible={spinner} size={'large'} color="#0E86D4" />
          <View style={{ flex: 1, backgroundColor: "#f4e0a2" }}>
            <Image source={require('../res/assets/images/farm1.png')} style={{ height: HEIGHT * 40 / 100, width: WIDTH, resizeMode: "stretch", marginTop: HEIGHT * 5 / 100 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 80 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "#bc4824" }}>
              <Crop height={25} width={25} />
              <TextInput
                placeholder="Farm Name"
                style={styles.textInputStyle}
                placeholderTextColor={'#bc4824'}
                value={farmname}
                onChangeText={value => {
                  console.log(value);
                  setFarmName(value);
                }}
              /></View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => {
                  setspinner(true);
                  saveAddFarmInfo();
                }
                }>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
            {hide ? <TouchableOpacity onPress={() => props.navigation.push(props.route.params && props.route.params.tally ? 'FarmTallyScreen' : hide ? 'AddPaddock' : 'DashboardScreen')}><Text style={{ fontFamily: "LittleLordFontleroyNF", fontSize: 35, fontWeight: "600", textAlign: "right", marginTop: HEIGHT * 3 / 100, color: "#bc4824", marginRight: WIDTH * 10 / 100 }}>Skip For Now</Text></TouchableOpacity> : null}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  textInputStyle: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: WIDTH * 3 / 100,
    color: "#bc4824",
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
    width: WIDTH * 60 / 100,
    borderRadius: 25,
    backgroundColor: '#bc4824',
    marginTop: HEIGHT * 10 / 100
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
export default connect(mapStateToProps, mapDispatchToProps)(AddFarmScreen);
