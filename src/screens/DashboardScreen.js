import React, { useEffect, useState } from 'react';
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
  Modal,
  Alert,
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  WIDTH,
  HEIGHT,
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderAdd from '../component/HeaderAdd';
import SQLite from 'react-native-sqlite-storage';
import { all } from 'axios';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';

//database connection
const db = SQLite.openDatabase(
  {
    name: 'mydb',
    location: 'default',
  },
  () => {
    console.log('Database connected!');
  }, //on success
  error => console.log('Database error', error), //on error
);

const DashboardScreen = (props) => {
  const [spinner, setspinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // useEffect ======================================================================================
  useEffect(() => {
    createEmailDetailTable(); //create the table
    createFarmDetailTable(); //create the table
    createPaddockDetailTable(); //create the table
    createRainFallDetailTable(); //create the table
    // createTallyDetailTable(); //create the table
    checkUserExist();
    getFarmItemData();
  }, []);
  // Databse ======================================================================================
  //create table function
  const createEmailDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS emaildetail (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };

  //create table function
  const createFarmDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS farmdetail (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR,area VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };
  //create table function
  const createPaddockDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS paddockdetail (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR,age VARCHAR,total VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };
  //create table function
  const createRainFallDetailTable = () => {
    db.executeSql(
      'CREATE TABLE IF NOT EXISTS rainfalldetail (id INTEGER PRIMARY KEY AUTOINCREMENT, date VARCHAR, mililiter VARCHAR,farmname VARCHAR)',
      [],
      result => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Create table error', error);
      },
    );
  };
  // //create table function
  // const createTallyDetailTable = () => {
  //   db.executeSql("CREATE TABLE IF NOT EXISTS emaildetail (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR)",[], (result) => {
  //     console.log("Table created successfully");
  //   }, (error) => {
  //     console.log("Create table error", error)
  //   })
  // }

  // Render ======================================================================================
  const checkUserExist = () => {
    // setspinner(true);
    let sql = 'SELECT * FROM emaildetail';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          for (var i = 0; i < length; i++) {
            console.log(resultSet.rows.item(i));
            setEmail(resultSet.rows.item(i).email);
            global.email = resultSet.rows.item(i).email;
            console.log('global.email', global.email);
            // setspinner(false);
          }
        },
        error => {
          console.log('List user error', error);
          //setspinner(false);
        },
      );
    });
    console.log('global.email', global.email);
  };
  const getFarmItemData = async () => {
    // setspinner(true);
    let sql = 'SELECT * FROM farmdetail';
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, resultSet) => {
          var length = resultSet.rows.length;
          let tempData = [];
          for (var i = 0; i < length; i++) {
            console.log(resultSet.rows.item(i));
            setName(resultSet.rows.item(i).name);
            // tempData.push(resultSet.rows.item(i));
          }
          // setFarmData(tempData);
          // setspinner(false);
        },
        error => {
          console.log('List user error', error);
          // setspinner(false);
        },
      );
    });
  };
  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#f3fffa'} barStyle={'dark-content'} />
        {/* <HeaderAdd
          headerText={'Add Farm'}
          leftIcon={images.PlusIcon}
          onPress1={() => {
            setModalVisible(true);
            // navigation.navigate('SettingScreen');
          }}
          ProfileIconstyle={styles.ProfileIcon}
        /> */}

        {/* <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => {
              // alert(email)
              if (email === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill user detail to procced further.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('SettingScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else if (name === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill farm detail to procced further.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('AddFarmScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else {
                navigation.navigate('RecordSaveScreen');
              }
            }}
            style={styles.boxView}>
            <Image
              source={images.rainfall}
              resizeMode="contain"
              style={styles.imageicon}
            />
            <Text style={styles.titleText}>Rainfall Recorder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // alert(global.email)
              if (email === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill user detail to procced further.',
                  [
                    {
                      text: 'Cancle',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('SettingScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else if (name === undefined) {
                Alert.alert(
                  'Alert',
                  'Please fill farm detail to procced further.',
                  [
                    {
                      text: 'Cancle',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.navigate('AddFarmScreen');
                        console.log('OK Pressed');
                      },
                    },
                  ],
                );
              } else {
                navigation.navigate('FarmTallyScreen');
              }
            }}
            style={styles.boxView}>
            <Image
              source={images.cowtally}
              resizeMode="contain"
              style={styles.imageicon}
            />
            <Text style={styles.titleText}>Tally</Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: HEIGHT * 12 / 100, marginBottom: -HEIGHT * 3.6 / 100 }}>
          <TouchableOpacity 
            onPress={()=> {
              props.navigation.push('RecordSaveScreen')
            }} style={{ backgroundColor: "white", width: WIDTH * 40 / 100, height: HEIGHT * 20 / 100, elevation: 15, borderTopRightRadius: 40, borderBottomLeftRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../res/assets/images/rain.png')} style={{ height: 75, width: 75, }} />
            <Text style={{ color: "#152e0c", fontFamily: "LittleLordFontleroyNF", fontSize: 35 }}>Rainfall</Text>
          </TouchableOpacity>
          <TouchableOpacity
           onPress={()=> {
            props.navigation.push('ChartScreen')
          }} style={{ backgroundColor: "white", width: WIDTH * 40 / 100, height: HEIGHT * 20 / 100, elevation: 15, borderTopLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../res/assets/images/chart.png')} style={{ height: 60, width: 60, }} />
            <Text style={{ color: "#152e0c", fontFamily: "LittleLordFontleroyNF", fontSize: 35, marginTop: HEIGHT * 1 / 100 }}>Chart Data</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: HEIGHT * 7 / 100, width: WIDTH * 15 / 100, borderRadius: 100, backgroundColor: "#ffba49", alignSelf: "center", elevation: 20, zIndex: 6 }}></View>
        <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: -HEIGHT * 3.4 / 100 }}>
          <TouchableOpacity 
            onPress={()=> {
              props.navigation.push('AddFarmScreen',{dash:true})
            }} style={{ backgroundColor: "white", width: WIDTH * 40 / 100, height: HEIGHT * 20 / 100, elevation: 15, borderTopLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../res/assets/images/farms.png')} style={{ height: 60, width: 60, }} />
            <Text style={{ color: "#152e0c", fontFamily: "LittleLordFontleroyNF", fontSize: 30, marginTop: HEIGHT * 1 / 100 }}>Add Farm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
            props.navigation.push('AddPaddock',{dash:true})
          }} style={{ backgroundColor: "white", width: WIDTH * 40 / 100, height: HEIGHT * 20 / 100, elevation: 15, borderTopRightRadius: 40, borderBottomLeftRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../res/assets/images/padd.png')} style={{ height: 60, width: 60, }} />
            <Text style={{ color: "#152e0c", fontFamily: "LittleLordFontleroyNF", fontSize: 30, marginTop: HEIGHT * 1 / 100 }}>Add Paddock</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'flex-end', zIndex: -6 }}>
          <TouchableOpacity onPress={()=>{props.navigation.push('TallyList')}} style={{ height: HEIGHT * 30 / 100, width: WIDTH * 40 / 100, backgroundColor: "#26c485", borderTopRightRadius: 45, elevation: 15, justifyContent:"center", alignItems:"center" }}>
            <Image source={require('../res/assets/images/tallyy.png')} style={{height:70, width:70, marginBottom:HEIGHT*2/100}}/>
            <Text style={{ color: "#152e0c", fontFamily: "LittleLordFontleroyNF", fontSize: 30,}}>Tally List</Text>
          </TouchableOpacity>
          <View style={{ height: HEIGHT * 50 / 100, width: WIDTH * 5 / 100, backgroundColor: "#228f63", alignSelf: "center", marginTop: -HEIGHT * 5 / 100, zIndex: -6, marginHorizontal: WIDTH * 7.5 / 100 }}>

          </View>
          <TouchableOpacity onPress={()=>{props.navigation.push('FarmTallyScreen')}} style={{ height: HEIGHT * 30 / 100, width: WIDTH * 40 / 100, backgroundColor: "#228f63", borderTopLeftRadius: 45, elevation: 15, justifyContent:"center", alignItems:"center" }}>
            <Image source={require('../res/assets/images/tall.png')} style={{height:70, width:70, marginBottom:HEIGHT*2/100}}/>
            <Text style={{ color: "#e2f584", fontFamily: "LittleLordFontleroyNF", fontSize: 30,}}>Add Tally</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.navigate('SettingScreen');
                }}
                style={{ flexDirection: 'row' }}>
                <Image
                  source={images.user}
                  resizeMode="contain"
                  style={styles.otherIcon}
                />
                <Text
                  style={[
                    styles.titleText,
                    { marginTop: responsiveScreenFontSize(0) },
                  ]}>
                  Add Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.navigate('AddFarmScreen');
                }}
                style={{
                  flexDirection: 'row',
                  marginTop: responsiveScreenWidth(2),
                }}>
                <Image
                  source={images.Location}
                  resizeMode="contain"
                  style={styles.otherIcon}
                />
                <Text
                  style={[
                    styles.titleText,
                    { marginTop: responsiveScreenFontSize(0) },
                  ]}>
                  Add Farm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.navigate('AddPaddock');
                }}
                style={{
                  flexDirection: 'row',
                  marginTop: responsiveScreenWidth(2),
                }}>
                <Image
                  source={images.ridding}
                  resizeMode="contain"
                  style={styles.otherIcon}
                />
                <Text
                  style={[
                    styles.titleText,
                    { marginTop: responsiveScreenFontSize(0) },
                  ]}>
                  Add Paddock
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3fffa",
  },
  titleText: {
    fontSize: responsiveScreenFontSize(2),
    marginTop: responsiveScreenFontSize(2),
    color: '#68BBE3',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageicon: {
    height: responsiveScreenWidth(14),
    width: responsiveScreenWidth(14),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: responsiveScreenWidth(10),
  },
  boxView: {
    height: responsiveScreenWidth(38),
    width: responsiveScreenWidth(40),
    borderRadius: responsiveScreenWidth(1),
    backgroundColor: colors.white,
    borderColor: '#68BBE3',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    marginTop: responsiveScreenWidth(10),
  },
  modalView: {
    margin: responsiveScreenWidth(5),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: responsiveScreenWidth(5),
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '60%',
  },
  ProfileIcon: {
    height: responsiveScreenWidth(8),
    width: responsiveScreenWidth(8),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(1),
  },
  otherIcon: {
    height: responsiveScreenWidth(6),
    width: responsiveScreenWidth(6),
    alignSelf: 'center',
    margin: responsiveScreenWidth(1.5),
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
