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
  TextInput,
  FlatList,
  ImageBackground,
  Alert,
  Modal
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
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderAdd from '../component/HeaderAdd';
import Animal from '../res/assets/svg/animal.svg'
import Name from '../res/assets/svg/name.svg';
import { PaddockCount } from '../res/raw/data';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import { addPaddock, addAnimal } from '../redux/action/auth.action';
import { addTally } from '../redux/action/auth.action';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Animals from '../res/assets/svg/animals.svg'
import Arrow from '../res/assets/svg/arrow.svg'

const CountPaddockScreen = (props) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [numberValue, setnumberValue] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [data, setData] = useState([]);
  var [value, setValue] = useState([]);
  const [isFocus, setIsFocus] = useState(true);
  const [hide, setHide] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [animalCount, setanimalCount] = useState("5");
  const [oper, setOper] = useState("")
  const [tempind, setTempInd] = useState("")
  const [texts, setTexts] = useState()
  const [paddockNumber, setpaddockNumber] = useState('');
  const [animalCounts, setanimalCounts] = useState('');
  const [newAnimal, setNewAnimal] = useState({});
  const [cha, setCha] = useState(true);
  const [ticks, setTicks] = useState(true);
  const [ticks1, setTicks1] = useState(true);
  const [name, setName] = useState("");
  const [modalVisible3, setModalVisible3] = useState(false);
  const [genders, setGenders] = useState();
  const [aging, setAging] = useState();

  // UseEffect ======================================================================================

  useEffect(() => {
    if (
      props.authReducer &&
      props.authReducer.addAnimalData
    ) {
      var arr = [];
        props.authReducer.addAnimalData.map((item, index) => {
            arr.push({
              animalName: item.animalName,
              count: item.animalCount,
              animalCount: item.animalCount,
              animalAge: "",
              status: false
            });
        })
      setData(arr);
    }
  }, [])

  const increase = (ind) => {

    var arr = [];
    var arr1 = [];
    for (var i = 0; i < data.length; i++) {
      if (i == ind && data[i].count!="" && data[i].count>0 && !isNaN(data[i].count)) {

        let det = {
          count: data[i].count,
          age: aging,
          gender: genders
        }

        arr1 = data[i].datas
        arr1.push(det);

        arr.push({
          animalAge: data[i].animalAge,
          animalCount: (parseInt(data[i].animalCount) + parseInt(data[i].count)).toString(),
          animalName: data[i].animalName,
          count: data[i].count,
          status: data[i].status,
          agetrack: ticks,
          gendertrack: ticks1,
          datas: arr1
        })
      }
      else if(i == ind && data[i].count=="")
      {
        Alert.alert('Alert', 'Enter the count', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            },
          },
        ]);
        arr.push(data[i])
      }
      else if(i == ind && data[i].count<=0)
        {
          Alert.alert('Alert', 'Count should be greater than 0', [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
              },
            },
          ]);
          arr.push(data[i])
        }
        else if(i == ind && isNaN(data[i].count))
        {
          Alert.alert('Alert', 'Enter the valid number', [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
              },
            },
          ]);
          arr.push(data[i])
        }
      else {
        arr.push(data[i])
      }
    }

    props.addAnimal(arr);
    setData(arr);
    setanimalCount();
  }

  const decrease = (ind) => {

    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (i == ind && data[i].count!="" && parseInt(data[i].count)>0 && !isNaN(data[i].count)) {
        if (parseInt(data[i].animalCount) - parseInt(data[i].count) >= 0) {
          arr.push({
            animalAge: data[i].animalAge,
            animalCount: (parseInt(data[i].animalCount) - parseInt(data[i].count)).toString(),
            animalName: data[i].animalName,
            count: data[i].count,
            status: data[i].status
          })
        }
      }
      else if(i == ind && data[i].count=="")
        {
          Alert.alert('Alert', 'Enter the count', [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
              },
            },
          ]);
          arr.push(data[i])
        }
        else if(i == ind && isNaN(data[i].count))
        {
          Alert.alert('Alert', 'Enter the valid number', [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
              },
            },
          ]);
          arr.push(data[i])
        }
        else if(i == ind && data[i].count<=0)
        {
          Alert.alert('Alert', 'Count should be greater than 0', [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
              },
            },
          ]);
          arr.push(data[i])
        }
        else if(i == ind && parseInt(data[i].animalCount) - parseInt(data[i].count) < 0) 
      {
        Alert.alert('Alert', 'Count Cannot be decreased', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            },
          },
        ]);
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalCount,
          animalName: data[i].animalName,
          count: data[i].count,
          status: data[i].status
        })
      }
      else {
        arr.push(data[i])
      }
    }

    props.addAnimal(arr);
    setData(arr);
    setanimalCount();
  }

  const tallies = () => {
    setspinner(true);
    var arr = [];

    if (
      props.authReducer &&
      props.authReducer.addTallyData
    ) {
      arr = props.authReducer.addTallyData;
    }
    let params = {
      farm: props.route.params.farm,
      paddock: data,
      paddocks: props.route.params.paddock,
      date: new Date(Date.now())
    }
    // if(value.length!=0)
    // {
    if (arr.length != 0) {
      arr.some((o) => {
        if (o.date === params.date &&
          o.farm === params.farm) {
          console.log("Farm Name with similar date exists");
          Alert.alert('Alert', 'Farm Name with similar date exists', [
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
          props.addTally(arr);
          Alert.alert('Alert', 'Tally has been successfully added', [
            {
              text: 'OK',
              onPress: () => {
                console.log('OK Pressed');
                props.addAnimal([]);
                props.navigation.push("TallyList");
              },
            },
          ]
          )
        }
      })
    }
    else {
      arr.push(params)
      props.addTally(arr);
      Alert.alert('Success', 'Tally has been successfully added', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            props.addAnimal([]);
            props.navigation.push("TallyList");
          },
        },
      ]
      )
    }
  // }
  // else
  // {
  //   Alert.alert('Alert', 'Please add atleast one Animal', [
  //     {
  //       text: 'OK',
  //       onPress: () => {
  //         console.log('OK Pressed');
  //       },
  //     },
  //   ]
  //   )
  // }
    setspinner(false);
  }

  const addanimals = () => {
    if (paddockNumber != '') {
      setspinner(true);
      var arr = [];
      if (
        props.authReducer &&
        props.authReducer.addAnimalData
      ) {
        arr = props.authReducer.addAnimalData;
      }
        
      let params = {
        animalName: paddockNumber,
        animalCount: "0",
        count: "1",
        animalAge: "",
        status: false,
        agetrack: ticks,
        gendertrack: ticks1,
        datas: []
      }
      arr.push(params);

        props.addAnimal(arr);
        // setNewAnimal(params);
        // data.push(params);
        setData(arr);
        setpaddockNumber('')
        Alert.alert('Success', 'Animals has been added successfully', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            },
          }
        ]
        )
      setspinner(false);
    }
    else if (paddockNumber == '') {
      setspinner(false);
      Alert.alert('Alert', "Please enter Animal's Name", [
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
      Alert.alert('Alert', 'Please enter the Details', [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
  }

  const changetexts = (text, ind) => {
    // if(text!="")
    // {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (i == ind) {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount:  data[i].animalCount,
          animalName: data[i].animalName,
          count: text,
          status: data[i].status
        })
      }
      else {
        arr.push(data[i])
      }
    }
    props.addAnimal(arr);
    setData(arr);
    setanimalCount();
    // }
    // else
    // {

    // }
  }

  const onCheck = (ind) => {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (i == ind && data[i].status) {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalAge,
          animalName: data[i].animalName,
          status: false
        })
      }
      else if (i == ind && !data[i].status) {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalAge,
          animalName: data[i].animalName,
          status: true
        })
      }
      else if (data[i].status) {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalAge,
          animalName: data[i].animalName,
          status: true
        })
      }
      else {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalAge,
          animalName: data[i].animalName,
          status: false
        })
      }
    }
    // props.addPaddock(arr);
    setData(arr);
  }

  const change = (ind, datas) => {
    var arr = [];
    var arr1 = [];
    for (var i = 0; i < data.length; i++) {
      if (i == ind && !data[i].status) {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalCount,
          animalName: data[i].animalName,
          count: data[i].count,
          status: true
        })
        // console.log(data[i].animalName)
        value.push(data[i].animalName)
      }
      else if(i == ind && data[i].status)
      {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalCount,
          animalName: data[i].animalName,
          count: data[i].count,
          status: false
        })
        value = value.filter(function(item) {
          return item !== datas
        })
      }
      else if(data[i].status)
      {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalCount,
          animalName: data[i].animalName,
          count: data[i].count,
          status: true
        })
      }
      else {
        arr.push(data[i])
      }
    }
    console.log(arr,"AAAAAAAAAAA");
    console.log(value,"BBBBBBBBBBB");
    setValue(value);
    setData(arr);
  }

  const lapsList = () => {
    return data.map((datas, index) => {
      return (
        <View style={{flexDirection:"column",width:WIDTH*78/100,backgroundColor:"brown",marginLeft:WIDTH*11/100,marginTop:-5}}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={()=> {change(index, datas.animalName)}} style={{width:"85%"}}><Text style={{ color: "white", fontSize: 17, fontWeight: "800",padding:10 }}>{datas.animalName}</Text></TouchableOpacity>
            {datas.status ? <Image source={require('../res/assets/images/success.png')} style={{height: 25, width:25, resizeMode:"stretch", marginTop:HEIGHT*1/100}}/> : null }
          </View>
        </View>
      )
    })
  }

  const saveAddPaddockInfo = () => {
    if (paddockNumber != '' && animalCount != '') {
      setspinner(true);
      var arr = [];
      if (
        props.authReducer &&
        props.authReducer.addAnimalData
      ) {
        arr = props.authReducer.addAnimalData;
      }
      let params = {
        animalName: paddockNumber,
        animalCount: animalCounts,
      }
        arr.push(params);
        props.addAnimal(arr);
        let animalData = {
          animalName: paddockNumber,
          animalCount: animalCounts,
          animalCount: "1",
          animalAge: "",
          status: false
        }
        setNewAnimal(animalData);
        // arr.push(animalDatasetData);
        data.push(animalData);
        setData(data);
        Alert.alert('Success', 'Animals has been added successfully', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
              setpaddockNumber('');
            },
          }
        ]
        )
      setspinner(false);
    }
    else if (paddockNumber == '' && animalCounts == '') {
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
    else if (paddockNumber == '') {
      setspinner(false);
      Alert.alert('Alert', "Please enter Animal's Name", [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    else if (animalCounts == '') {
      setspinner(false);
      Alert.alert('Alert', "Please enter Animal's Age", [
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

  const removes = () => {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (i != tempind) {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: (parseInt(data[i].animalCount) + parseInt(data[i].count)).toString(),
          animalName: data[i].animalName,
          count: data[i].count,
          status: data[i].status,
          agetrack: data[i].agetrack,
          gendertrack: data[i].gendertrack
        })
      }
      else {
        // arr.push(data[i])
      }
    }
    props.addAnimal(arr);
    setData(arr);
    setModalVisible1(false);
  }

  const edits = () => {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (i == tempind) {
        arr.push({
          animalAge: data[i].animalAge,
          animalCount: data[i].animalCount,
          animalName: name,
          count: data[i].count,
          status: data[i].status,
          agetrack: data[i].agetrack,
          gendertrack: data[i].gendertrack
        })
      }
      else {
        arr.push(data[i])
      }
    }
    props.addAnimal(arr);
    setData(arr);
    setModalVisible2(false);
  }

  const Editset = () => {
    for (var i = 0; i < data.length; i++) {
      if (i == tempind) {
        setName(data[i].animalName);
      }
    }
    setModalVisible1(false);
    setModalVisible2(true);
  }

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#f4e0a2'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />

        <View style={{ flex: 1 }}>
          {/* <TouchableOpacity onPress={()=> {setHide(!hide)}} style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 80 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "brown", paddingVertical: HEIGHT*1.5/100 }}>
            <Text style={{color:"brown",fontSize:17, width:"87%"}}>{value.length!=0 ? value.join(', ') : "Select Animals"}</Text>
            <Arrow height={15} />
          </TouchableOpacity>

          {hide ? lapsList() : null} */}

          {/* {hide ? <View style={{width:WIDTH*78/100, marginLeft:WIDTH*11/100, backgroundColor:"brown", alignItems:"center"}}>
            <TouchableOpacity onPress={()=> {setHide(!hide)}}><Text style={{color:"brown", backgroundColor:"white",paddingHorizontal:WIDTH*3/100, paddingVertical:HEIGHT*1/100,marginBottom:HEIGHT*1/100, borderRadius:10, fontSize:16, fontWeight:"800"}}>Done</Text></TouchableOpacity>
          </View> : null} */}

          {/* <TouchableOpacity onPress={()=>{
            // props.navigation.push('AddPaddockScreen',{count: true})
            setHide(false);
            setCha(!cha);
            }}>
            <Text style={{fontSize:18, textAlign:"center", marginTop:HEIGHT*2/100}}>{cha ? "Add Animals" : "Close"}</Text>
          </TouchableOpacity> */}

          {/* { !cha ? <> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 80 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "brown" }}>
            <Name height={30} width={30} />
            <TextInput
              placeholder="Animal Type"
              style={[styles.textInputStyle1, { paddingLeft: WIDTH * 3 / 100 }]}
              placeholderTextColor={'brown'}
              value={paddockNumber}
              onChangeText={value => {
                console.log(value);
                setpaddockNumber(value);
              }}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                if(paddockNumber=="")
                {
                  Alert.alert('Alert', "Please Add Animal's Name", [
                    {
                      text: 'OK',
                      onPress: () => {
                        console.log('OK Pressed');
                      },
                    }
                  ]
                  )
                }
                else
                {
                setModalVisible(true);
                }
                // setOper("add")
              }}>
              <Text style={styles.saveText}>Add</Text>
            </TouchableOpacity>
          </View>
          {/* </>: null} */}

          <FlatList
            style={{ marginBottom: 10 }}
            data={data}
            keyExtractor={item => item}
            renderItem={({ item, index }) =>
              <><TouchableOpacity onPress={()=>{
                setTempInd(index);
                setModalVisible1(true);
              }}><ImageBackground source={require('../res/assets/images/wood.png')} resizeMode='stretch' style={{ flexDirection: "row", width: WIDTH * 90 / 100, height: HEIGHT * 10 / 100, marginLeft: WIDTH * 5 / 100, alignItems: "center", zIndex: -6, marginTop: HEIGHT * 5 / 100 }} imageStyle={{ borderRadius: 10 }}>
                <View style={{ alignItems: "center", justifyContent: "center", marginLeft: WIDTH * 8 / 100 }}><Animal fill={'brown'} height={50} width={50} /></View>
                <Text style={{ fontSize: 35, color: "brown", fontFamily: "LittleLordFontleroyNF", marginLeft: WIDTH * 5 / 100, width: WIDTH * 20 / 100 }}>{item.animalName}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: HEIGHT * 5 / 100, width: WIDTH * 25 / 100, borderRadius: 10 }}>
                  <TouchableOpacity onPress={() => { 
                    if(item.animalCount>1)
                    {
                      setModalVisible(true); 
                      setTempInd(index);
                      setOper("minus") 
                      // decrease(index);
                    }
                    else {
                      Alert.alert('Alert', 'Count Cannot be decreased', [
                        {
                          text: 'OK',
                          onPress: () => {
                            console.log('OK Pressed');
                          },
                        },
                      ]);
                    } 
                  }} style={{ justifyContent: "center", alignItems: "center", backgroundColor: "brown", height: HEIGHT * 5 / 100, paddingHorizontal: WIDTH * 2.5 / 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                    <Text style={{ fontSize: 25, color: "white", fontWeight: "700" }}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{ justifyContent: "center", alignItems: "center", width: WIDTH * 10 / 100, borderWidth: 1, borderColor: "brown", color: "white", textAlign: 'center' }}
                    value={item.count}
                    onChangeText={text => {
                      // if (1 <= parseInt(item.count) <= 9) {
                      //   console.log(text);
                      //   if (text != "") {
                      //     changetexts(text, index)
                      //     // setModalVisible(true); setTempInd(index); setOper("text"); setTexts(text)
                      //   }
                      //   else {
                      //     Alert.alert('Alert', 'Count Cannot be decreased', [
                      //       {
                      //         text: 'OK',
                      //         onPress: () => {
                      //           console.log('OK Pressed');
                      //         },
                      //       },
                      //     ]);
                      //     changetexts("1", index)
                      //   }
                      // }
                      // else {
                      //   changetexts(text, index)
                      // }
                      changetexts(text, index)
                      // setModalVisible(true); setTempInd(index); setOper("text"); setTexts(text)
                    }}
                    placeholder={item.count}
                    placeholderTextColor={"white"}
                    keyboardType='numeric'
                  />
                  <TouchableOpacity onPress={() => { 
                    setModalVisible(true); setTempInd(index); setOper("plus")
                    // increase(index);
                    }} style={{ justifyContent: "center", alignItems: "center", height: HEIGHT * 5 / 100, backgroundColor: "brown", paddingHorizontal: WIDTH * 2 / 100, borderBottomRightRadius: 11, borderTopRightRadius: 11 }}>
                    <Text style={{ fontSize: 25, color: "white", fontWeight: "700" }}>+</Text>
                  </TouchableOpacity>
                </View>
                  <Text style={{ fontSize: 18, color: "white", fontWeight: "700", marginLeft:WIDTH*4/100 }}>
                    {item.animalCount}
                  </Text>
                {/* <Text style={{fontSize:35, color:"brown",fontFamily:"LittleLordFontleroyNF", marginRight:WIDTH*5/100, width:WIDTH*20/100}}>Age : {item.animalAge}</Text> */}

              </ImageBackground></TouchableOpacity>
                {value.length > 1 && index != value.length - 1 ? <Image source={require('../res/assets/images/rope.png')} style={{ height: HEIGHT * 15 / 100, width: WIDTH * 5 / 100, resizeMode: "stretch", marginTop: -HEIGHT * 5 / 100, marginLeft: WIDTH * 6 / 100, zIndex: 6, position: "absolute", marginTop: HEIGHT * 10 / 100 }} /> : null}</>
            } />
          <TouchableOpacity onPress={() => {
            tallies()
          }} style={{ backgroundColor: "brown", width: WIDTH * 40 / 100, paddingVertical: HEIGHT * 1 / 100, justifyContent: "center", alignItems: "center", borderRadius: 15, alignSelf: "center", marginBottom: HEIGHT * 3 / 100 }}>
            <Text style={{ color: "white", fontFamily: "LittleLordFontleroyNF", fontSize: 35 }}>Finish</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={{flex:1, backgroundColor:"rgba(255,255,255,0.4)"}}>
            <View style={{backgroundColor:"white", height:HEIGHT*60/100, width:WIDTH*80/100, marginLeft:WIDTH*10/100,marginTop:HEIGHT*20/100, borderRadius:20}}>
              <TouchableOpacity onPress={()=>{setModalVisible(false);}}><Image source={require('../res/assets/images/cross.png')} style={{height:20, width:20,alignSelf:"flex-end",marginTop:HEIGHT*2/100, marginRight:WIDTH*4/100}}/></TouchableOpacity>
              {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 60 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 10 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "brown" }}>
                <Animals height={30} width={30} />
                <TextInput
                  placeholder="Enter Age"
                  style={styles.textInputStyle1}
                  placeholderTextColor={'brown'}
                  value={animalCount}
                  keyboardType='numeric'
                  onChangeText={(value) => {
                    console.log(value);
                    setanimalCount(value);
                  }}
                />
              </View> */}

              <Text style={{fontSize:40, marginLeft:WIDTH*20/100,color:"brown",fontFamily: "LittleLordFontleroyNF", marginTop:HEIGHT*3/100}}>Track Age</Text>
              <TouchableOpacity onPress={()=>{setTicks(true)}} style={{flexDirection:"row", marginTop:HEIGHT*2/100, marginLeft:WIDTH*20/100}}>
                {ticks ? <Image source={require('../res/assets/images/success.png')} style={{height:25, width:25, resizeMode:"stretch"}}/> : null}
                <Text style={[{fontSize:18,color:"brown" },ticks ? {marginLeft:WIDTH*2/100} : {marginLeft:WIDTH*8/100}]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setTicks(false)}} style={{flexDirection:"row", marginTop:HEIGHT*2/100, marginLeft:WIDTH*20/100}}>
                {!ticks ? <Image source={require('../res/assets/images/success.png')} style={{height:25, width:25, resizeMode:"stretch"}}/> : null}
                <Text style={[{fontSize:18, color:"brown" },!ticks ? {marginLeft:WIDTH*2/100} : {marginLeft:WIDTH*9/100}]}>No</Text>
              </TouchableOpacity>
              

              <Text style={{fontSize:40, marginLeft:WIDTH*20/100,color:"brown",fontFamily: "LittleLordFontleroyNF", marginTop:HEIGHT*3/100}}>Track Gender</Text>
              <TouchableOpacity onPress={()=>{setTicks1(true)}} style={{flexDirection:"row", marginTop:HEIGHT*2/100, marginLeft:WIDTH*20/100}}>
                {ticks1 ? <Image source={require('../res/assets/images/success.png')} style={{height:25, width:25, resizeMode:"stretch"}}/> : null}
                <Text style={[{fontSize:18,color:"brown" },ticks1 ? {marginLeft:WIDTH*2/100} : {marginLeft:WIDTH*8/100}]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setTicks1(false)}} style={{flexDirection:"row", marginTop:HEIGHT*2/100, marginLeft:WIDTH*20/100}}>
                {!ticks1 ? <Image source={require('../res/assets/images/success.png')} style={{height:25, width:25, resizeMode:"stretch"}}/> : null}
                <Text style={[{fontSize:18, color:"brown" },!ticks1 ? {marginLeft:WIDTH*2/100} : {marginLeft:WIDTH*9/100}]}>No</Text>
              </TouchableOpacity>
              
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.btnStyle1}
                  onPress={() => {
                    addanimals();
                    setModalVisible(false);
                    if(ticks || ticks1)
                    {
                      setModalVisible3(true);
                    }
                  }}>
                  <Text style={styles.saveText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
            setModalVisible3(false);
          }}>
          <View style={{flex:1, backgroundColor:"rgba(255,255,255,0.4)"}}>
            <View style={{backgroundColor:"white", height:HEIGHT*45/100, width:WIDTH*80/100, marginLeft:WIDTH*10/100,marginTop:HEIGHT*27/100, borderRadius:20}}>
              <TouchableOpacity onPress={()=>{setModalVisible3(false);}}><Image source={require('../res/assets/images/cross.png')} style={{height:20, width:20,alignSelf:"flex-end",marginTop:HEIGHT*2/100, marginRight:WIDTH*4/100}}/></TouchableOpacity>
              {data[tempind].agetrack ? <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 60 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "brown" }}>
                <Animals height={30} width={30} />
                <TextInput
                  placeholder="Enter Age"
                  style={styles.textInputStyle1}
                  placeholderTextColor={'brown'}
                  value={aging}
                  keyboardType='numeric'
                  onChangeText={(value) => {
                    console.log(value);
                    setAging(value);
                  }}
                />
              </View> : null }

              {data[tempind].gendertrack ? <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 60 / 100, marginLeft: WIDTH * 10 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "brown" }}>
                <Animals height={30} width={30} />
                <TextInput
                  placeholder="Enter Gender"
                  style={styles.textInputStyle1}
                  placeholderTextColor={'brown'}
                  value={genders}
                  keyboardType='numeric'
                  onChangeText={(value) => {
                    console.log(value);
                    setGenders(value);
                  }}
                />
              </View> : null }

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.btnStyle1}
                  onPress={() => {
                    if(oper=="plus")
                    {
                      increase();
                    }
                    else if(oper=="minus")
                    {
                      decrease();
                    }
                    // else if(oper=="text")
                    // {
                    //   changetexts();
                    // }
                    // else if(oper=="add")
                    // {
                    //   saveAddPaddockInfo();
                    // }
                    setModalVisible3(false);
                  }}>
                  <Text style={styles.saveText}>Submit</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            setModalVisible1(false);
          }}>
          <View style={{flex:1, backgroundColor:"rgba(255,255,255,0.4)"}}>
            <View style={{backgroundColor:"white", height:HEIGHT*30/100, width:WIDTH*80/100, marginLeft:WIDTH*10/100,marginTop:HEIGHT*20/100, borderRadius:20}}>
              <TouchableOpacity onPress={()=>{setModalVisible1(false);}}><Image source={require('../res/assets/images/cross.png')} style={{height:20, width:20,alignSelf:"flex-end",marginTop:HEIGHT*2/100, marginRight:WIDTH*4/100}}/></TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                
                <TouchableOpacity
                  style={[styles.btnStyle1,{marginTop:HEIGHT*2/100}]}
                  onPress={() => {
                    Editset();
                  }}>
                  <Text style={styles.saveText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnStyle1}
                  onPress={() => {
                    removes();
                  }}>
                  <Text style={styles.saveText}>Remove</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            setModalVisible2(false);
          }}>
          <View style={{flex:1, backgroundColor:"rgba(255,255,255,0.4)"}}>
            <View style={{backgroundColor:"white", height:HEIGHT*30/100, width:WIDTH*80/100, marginLeft:WIDTH*10/100,marginTop:HEIGHT*20/100, borderRadius:20}}>
              <TouchableOpacity onPress={()=>{setModalVisible2(false);}}><Image source={require('../res/assets/images/cross.png')} style={{height:20, width:20,alignSelf:"flex-end",marginTop:HEIGHT*2/100, marginRight:WIDTH*4/100}}/></TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                
              <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH * 60 / 100, borderRadius: 20, marginTop: HEIGHT * 5 / 100, paddingLeft: WIDTH * 3 / 100, borderWidth: 1, borderColor: "brown" }}>
                <Animals height={30} width={30} />
                <TextInput
                  placeholder="Enter Name"
                  style={styles.textInputStyle1}
                  placeholderTextColor={'brown'}
                  value={name}
                  // keyboardType='numeric'
                  onChangeText={(value) => {
                    console.log(value);
                    setName(value);
                  }}
                />
              </View>

              <TouchableOpacity
                  style={[styles.btnStyle1,{marginTop:HEIGHT*4/100}]}
                  onPress={() => {
                    edits();
                  }}>
                  <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4e0a2",
  },
  textInputStyle: {
    height: responsiveScreenWidth(15),
    margin: responsiveScreenWidth(1.2),
    width: '80%',
    borderColor: colors.gray,
    borderWidth: 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textInputStyle1: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: WIDTH * 3 / 100,
    color: "brown",
  },
  titleText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: colors.BLACK,
    fontWeight: '500',
    margin: responsiveScreenWidth(1),
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
  imageicon: {
    height: responsiveScreenWidth(30),
    width: responsiveScreenWidth(50),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  boxBoderView: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(10),
    borderColor: colors.gray_dark,
    borderWidth: responsiveScreenWidth(0.4),
    justifyContent: 'center',
    alignItems: 'center',
    margin: responsiveScreenWidth(5),
  },
  boxImage: {
    height: responsiveScreenWidth(4),
    width: responsiveScreenWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: HEIGHT * 1.5 / 100,
    width: WIDTH * 30 / 100,
    borderRadius: 25,
    backgroundColor: 'brown',
    marginTop: HEIGHT * 4 / 100
  },
  btnStyle1: {
    paddingVertical: HEIGHT * 2 / 100,
    width: WIDTH * 40 / 100,
    borderRadius: 25,
    backgroundColor: 'brown',
    marginTop: HEIGHT * 5 / 100
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
    borderColor: colors.gray_dark,
    borderWidth: responsiveScreenWidth(0.2),
    borderRadius: responsiveScreenWidth(0.5),
    paddingHorizontal: 8,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
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
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
export default connect(mapStateToProps, mapDispatchToProps)(CountPaddockScreen);