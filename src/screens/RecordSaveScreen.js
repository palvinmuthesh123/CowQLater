import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
  Keyboard
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import {
  WIDTH,
  HEIGHT,
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from '../utils/Size';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
// import {Calendar, LocaleConfig,Agenda} from 'react-native-calendars';
import HeaderAdd from '../component/HeaderAdd';
import { EmailData } from '../constants/EmailData';
import SQLite from 'react-native-sqlite-storage';
import { Calendar, LocaleConfig, Agenda, CalendarList } from 'react-native-calendars';
// import { TextInput } from 'react-native-paper';
import Land from '../res/assets/svg/land.svg';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import { addRainfall } from '../redux/action/auth.action';
import RNCalendarEvents from "react-native-calendar-events";
import CalendarStrip from 'react-native-calendar-strip';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob'
import Mailer from 'react-native-mail';

//database connection
let rain = ""
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

const RecordSaveScreen = (props) => {
  const [dateValue, setdateValue] = useState(new Date(Date.now()));
  const [tempDate, settempDate] = useState(new Date(Date.now()));
  const [openValue, setOpen] = useState(false);
  const [spinner, setspinner] = useState(false);
  const [mlValue, setmlValue] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [FarmData, setFarmData] = useState([]);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [item, setItem] = useState({})
  var agendaRef = useRef(null);
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [dates, setDates] = useState(new Date(Date.now()));
  const [text, setText] = useState("");
  // const [rain, setRain] = useState("");
  const [current, setCurrent] = useState({});
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [dat, setDat] = useState([]);
  // UseEffect ======================================================================================

  useEffect(() => {
    getDateItemData();
    console.log(new Date(Date.now()));
    setspinner(false);
  }, [])

  useEffect(() => {
    setCurrent(agendaRef.calendar);
    // console.log(agendaRef.current.initialScrollPadPosition(),"A")
    console.log()
    if (
      props.authReducer &&
      props.authReducer.addFarmData
    ) {
      var arr = [];
      for (var i = 0; i < props.authReducer.addFarmData.length; i++) {
        arr.push({
          name: props.authReducer.addFarmData[i].farmname,
          area: props.authReducer.addFarmData[i].farmArea
        })
      }
      setFarmData(arr);
    }
  }, [props.authReducer && props.authReducer.addFarmData])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true);
            console.log("true");
        },
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false);
            console.log("false");
            // console.log(agendaRef.calendar.current,"AAAAAAAAAAAA");
            // console.log(current,"CCCCCCCCCCCCC");
            // agendaRef=current
        },
    );

    return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
    };
}, []);

    const createEvent = () =>{
      const newDate = new Date(Date());
      newDate.setHours(newDate.getHours() + 2); 

      RNCalendarEvents.saveEvent("Hello", {
      calendarId: '3',
      startDate: newDate.toISOString(),
      endDate: newDate.toISOString(),
      // location: eventLocation
      }).then((value) => {
        console.log('Event Id--->', value);
      }).catch((error) => {
        console.log(' Did Not work Threw an error --->',error)
      })
    }

  // UseEffect ======================================================================================

  const getDateItemData = async () => {
    setspinner(true);
    var arr = [];
    if (
      props.authReducer &&
      props.authReducer.addRainfallData
    ) {
      setDat(props.authReducer.addRainfallData);
    }
    // console.log(sets);
    setspinner(false);
  };

  const saveRainFallData = () => {

    if (text != '' && value1 != null) {
      console.log("PPPPPPPPPPPP");
      setspinner(true);
      var arr = [];
      var arr1 = [];
      if (
        props.authReducer &&
        props.authReducer.addRainfallData
      ) {
        arr = props.authReducer.addRainfallData;
      }
      let params = {
        date: dates,
        farmname: value1,
        rainfall: text
      }
      console.log(params);
      console.log(new Date(dates).toISOString().slice(0, 10));
      if (arr.length != 0) {
        arr.map((o, index) => {
          if (new Date(o.date).toISOString().slice(0, 10) == new Date(params.date).toISOString().slice(0, 10)) {
            arr = arr.filter(function(item) {
              return item !== new Date(o.date).toISOString().slice(0, 10)
            })
            arr.push(params);
          }
          else {
            arr.push(params);
          }
        })
        props.addRainfall([]);
        props.addRainfall(arr);
        Alert.alert('Success', 'Rainfall has been added', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              goes();
              // setValue1(null);
              // setText("");
            },
          },
        ]
        )
        console.log(arr1,"AAAAAAAAAAAAAAAAAAAA")
      }
      else {
        arr.push(params)
        props.addRainfall(arr);
        getDateItemData();
        Alert.alert('Success', 'Rainfall has been added', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              goes();
            },
          },
        ]
        )
        setspinner(false);
      }
      setspinner(false);
    }
    else if (value1 == null) {
      setspinner(false);
      Alert.alert('Alert', 'Select the Farm', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          }
        }
      ])
    }
    else if (text == "") {
      console.log("GGGGGGGGGG");
      setspinner(false);
      Alert.alert('Alert', 'Enter the Rainfall Value', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ])
    }
    getDateItemData();
  };

  const mailData = async () => {
    let userName = await AsyncStorage.getItem('userName');
    let userEmail = await AsyncStorage.getItem('userEmail');
    console.log(userEmail);
    console.log(userName);
    if ((userEmail === '') & (userName === '')) {
      Alert.alert('Alert', 'Need to add user data to proceed', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            props.navigation.navigate('SettingScreen');
          },
        },
      ]);
    } else {
      let data =
        'Hello there,\n\n Here the rainfall recorded on date ' +
        dateValue +
        ' ' +
        mlValue +
        ' in mili-liter.';
      EmailData(email, 'Recorded Rain Fall', data);
    }
    setspinner(false);
  };
  const onChange = (event, value) => {
    console.log(value);
    setdateValue(value);
    console.log(dateValue);
    setdateValue(new Date(Date.now()));
    setmlValue('');
    setOpen(false);
  };

  const setDatas = (val) => {
      var datas = test(dat,val)
      if(datas)
      {
        setValue1(datas.farmname);
        setText(datas.rainfall);
      }
      else if(rain!="")
      {
        setValue1(rain);
        setText("");
      }
      else
      {
        setValue1(null);
        setText("");
      }
  }

  function test(dat, val) {
    console.log(dat)
    for (let i=0; i < dat.length; i++) {
    if (new Date(val).toISOString().slice(0, 10)==new Date(dat[i].date).toISOString().slice(0, 10)) {
        return dat[i];
    }
  }}

  const goes = async () => {

    let strr = makeid(8)

    let options = {
      html: `<html>
      <head>
          <title></title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
      <body>
          <div class="container">
              <div class="row">
                  <div class="col-sm-9 col-xs-9 col-md-9 col-lg-9">
                      <h1>Tally Details</h1>
                      <h3>Farm Name: ${value1}</h3>
                      <h3>Date: ${dates.toString()}</h3>
                      <h3>RainFall: ${text}</h3>
                  </div>
              </div>
          </div>
      </body>
  </html>`,
      fileName: 'RainFall'+'_'+value1+'_'+strr,
      directory: 'Download',
      base64: true
  };

    let file = await RNHTMLtoPDF.convert(options)

    let filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${'RainFall'+'_'+value1+'_'+strr}.pdf`;

    RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')
      .then(response => {
          console.log('Success Log: ', response);
      })
      .catch(errors => {
          console.log(" Error Log: ", errors);
      })
      
    // Linking.openURL(`mailto:support@example.com?subject=${value1 + " Tally Details"}&body=Description&attach=${file.base64}`)
    Mailer.mail({
      subject: value1+ " RainFall Details",
      recipients: ['support@example.com'],
      body: `<b>${value1 + " RainFall Details"}</b>`,
      isHTML: true,
      attachments: [{
        path: RNFetchBlob.fs.dirs.DownloadDir + `/${'RainFall'+'_'+value1+'_'+strr}.pdf`,
        uri: file.base64,
        type: 'pdf',
        name: '',
      }]
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

  function makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }


  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
          <Spinner visible={spinner} size={'large'} color="#0E86D4" />
          <TouchableOpacity onPress={()=> props.navigation.push('ChartScreen')}>
            <Text style={{fontSize:35,fontFamily: "LittleLordFontleroyNF", textAlign:'right', marginRight:WIDTH*5/100, marginVertical:HEIGHT*2/100}}>Graphical Representation</Text>
          </TouchableOpacity>
          {/* <Agenda
            ref={agendaRef}
            selected={dates}
            items={
              item
            }
            onDayPress={day => {
              console.log(day, 'day pressed');
              // agendaRef.current.toggleCalendarPosition(false);
              setDate(day.day);
              setMonth(day.month);
              setYear(day.year);
              setDates(day.dateString);
            }}
            renderItem={(item, isFirst) => (
              <TouchableOpacity style={{ backgroundColor: 'white', flex: 1, borderRadius: 5, padding: 10, marginRight: 10, marginTop: 17 }}>
                <Text style={{ color: '#888', fontSize: 16 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
            renderEmptyData={() => {
              return (
                <View style={{ flex: 1 }}>
                  <Text style={{ marginLeft: WIDTH * 5 / 100, fontFamily: "Precious", fontSize: 30, marginVertical: HEIGHT * 5 / 100, color: "#03002e", marginTop: HEIGHT * 10 / 100 }}>No Rainfall Recorded for this day!</Text>
                  <Dropdown
                    style={[
                      styles.dropdown,
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={FarmData}
                    itemTextStyle={{ color: 'grey' }}
                    maxHeight={300}
                    labelField="name"
                    valueField="name"
                    placeholder={'Select Farm Name'}
                    searchPlaceholder="Search..."
                    value={value1}
                    onChange={item => {
                      setValue1(item.name);
                    }}
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 80 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "#68BBE3" }}>
                    <Land height={30} width={30} />
                    <TextInput
                      placeholder="Enter Rainfall"
                      style={[styles.textInputStyle, { paddingLeft: WIDTH * 2 / 100, }]}
                      placeholderTextColor={'#03002e'}
                      keyboardType='numeric'
                      value={text}
                      onChangeText={value => {
                        console.log(value);
                        setText(value);
                      }}
                    /></View>

                  <TouchableOpacity onPress={() => { saveRainFallData() }} style={{ alignItems: "center" }}>
                    <ImageBackground source={require('../res/assets/images/cloud.png')} style={{ height: 200, width: 200, resizeMode: "stretch", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontFamily: "LittleLordFontleroyNF", fontSize: 35 }}>Save</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            }}
          /> */}
          {/* <Calendar
            enableSwipeMonths
            onDayPress={day => {
              console.log(day);
              // setSelected(day.dateString);
            }}
            markedDates={{
              '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
              '2012-03-02': {marked: true},
              '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
            }}
          /> */}

          <CalendarStrip
            scrollable
            style={{height:100, paddingTop: 20, paddingBottom: 10}}
            onDateSelected={(date)=> {
              // console.log(date,"DDDDDDDDDDDDDDDD");
              setDates(date);
              setDatas(date);
            }}
            selectedDate={dates}
            calendarColor={'#68BBE3'}
            calendarHeaderStyle={{color: 'white'}}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            iconContainer={{flex: 0.1}}
            highlightDateContainerStyle={{backgroundColor:"#C6FCFF", borderRadius: 7, elevation:1}}
          />

            <View style={{ flex: 1 }}>
              {text=="" || value1==null ? <Text style={{ marginLeft: WIDTH * 5 / 100, fontFamily: "Precious", fontSize: 30, marginVertical: HEIGHT * 5 / 100, color: "#03002e", marginTop: HEIGHT * 10 / 100 }}>No Rainfall Recorded for this day!</Text> : null}
                <Dropdown
                  style={[styles.dropdown, text!="" && value1!=null ? {marginTop: HEIGHT * 10 / 100} : {}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={FarmData}
                  itemTextStyle={{ color: 'grey' }}
                  maxHeight={300}
                  labelField="name"
                  valueField="name"
                  placeholder={'Select Farm Name'}
                  searchPlaceholder="Search..."
                  value={value1}
                  onChange={item => {
                    setValue1(item.name);
                    rain = item.name;
                  }}
                />

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 80 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "#68BBE3" }}>
                    <Land height={30} width={30} />
                    <TextInput
                      placeholder="Enter Rainfall"
                      style={[styles.textInputStyle, { paddingLeft: WIDTH * 2 / 100, }]}
                      placeholderTextColor={'#03002e'}
                      keyboardType='numeric'
                      value={text}
                      onChangeText={value => {
                        console.log(value);
                        setText(value);
                    }}/></View>
                  <TouchableOpacity onPress={() => { saveRainFallData() }} style={{ alignItems: "center" }}>
                    <ImageBackground source={require('../res/assets/images/cloud.png')} style={{ height: 200, width: 200, resizeMode: "stretch", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontFamily: "LittleLordFontleroyNF", fontSize: 35 }}>Save</Text>
                    </ImageBackground>
                  </TouchableOpacity>
            </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  viewRow: {
    height: responsiveScreenWidth(15),
    margin: responsiveScreenWidth(1.2),
    width: '80%',
    borderColor: colors.gray,
    borderWidth: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInputStyle: {
    width: '80%',
    // borderColor: colors.gray,
    // borderWidth: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: WIDTH * 3 / 100,
    color: "#03002e",
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.BLACK,
    fontWeight: 'bold',
    margin: responsiveScreenWidth(1),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.BLACK,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imageicon: {
    height: responsiveScreenWidth(6),
    width: responsiveScreenWidth(7),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    height: responsiveScreenWidth(13),
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(1),
    marginTop: responsiveScreenWidth(10),
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
  datePickerStyle: {
    height: responsiveScreenWidth(15),
    margin: responsiveScreenWidth(1.2),
    marginTop: responsiveScreenWidth(2),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: "#68BBE3",
    borderWidth: responsiveScreenWidth(0.2),
    borderRadius: 20,
    paddingHorizontal: 8,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#68BBE3'
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#03002e'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#03002e'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#03002e'
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
export default connect(mapStateToProps, mapDispatchToProps)(RecordSaveScreen);