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
  Alert,
  TextInput,
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import HeaderAdd from '../component/HeaderAdd';
import SQLite from 'react-native-sqlite-storage';
import Lottie from 'lottie-react-native';
import { WIDTH, HEIGHT } from '../utils/Size';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import { clearAuthReducer } from '../redux/action/auth.action';

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

let tempFarmData;
let tempPaddockData;
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const FarmTallyScreen = (props) => {
  const [FarmData, setFarmData] = useState([]);
  const [PaddockData, setPaddockData] = useState([]);
  const [PaddockData1, setPaddockData1] = useState([]);
  const [spinner, setspinner] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState('');
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isAge, setisAge] = useState(false);
  const [isCount, setisCount] = useState(false);

  // UseEffect ======================================================================================
  useEffect(() => {
    setspinner(true);
    getFarmItemData();
    getPaddockItemData();
  }, []);
  // UseEffect ======================================================================================
  
  const getFarmItemData = async () => {
    if (
      props.authReducer &&
      props.authReducer.addFarmData
    ) {
      var arr = [];
      setFarmData(props.authReducer.addFarmData);
    }
  };

  const getPaddockItemData = async () => {
    setspinner(false);
    if (
      props.authReducer &&
      props.authReducer.addPaddockData 
      ) {
        var arr = props.authReducer.addPaddockData.filter((tag, index, array) => array.findIndex(t => t.paddockNumber == tag.paddockNumber) == index);
        setPaddockData(arr);
        setPaddockData1(arr);
      }
  };

  const renderDataItem = (item) => {
    return (
        <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.paddockNumber}</Text>
            {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
        </View>
    );
  };

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#e0f8fa'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />
        <View style={{flex:1}}>
          <Lottie style={{height:undefined,width:WIDTH}} source={require('../res/assets/lottie/tally.json')} autoPlay loop />
          
          <Dropdown
            style={[
              styles.dropdown
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{color:'#3a6dda'}}
            data={FarmData}
            maxHeight={300}
            labelField="farmname"
            valueField="farmname"
            placeholder={!isFocus1 ? 'Select Farm' : '...'}
            searchPlaceholder="Search..."
            value={value1}
            onFocus={() => setIsFocus1(true)}
            onBlur={() => setIsFocus1(false)}
            onChange={item => {
              console.log(item.farmname,"AAAAAAAAAAAAAAAA");
              setValue1(item.farmname);
              var arr = [];
              PaddockData1.map((items,index)=> {
                console.log(items.farmname,"FFFFFFFFFFFFFFFFF");
                {
                  items.farmname==item.farmname ? arr.push(items) : null
                }
              })
              console.log(arr,"AAAAAAAAAAAAAa");
              setPaddockData(arr);
              setIsFocus1(false);
            }}
          />
          <TouchableOpacity onPress={()=>{props.navigation.push('AddFarmScreen',{tally: true})}}><Text style={{textAlign:"right", marginTop:HEIGHT*1/100, fontSize:27, marginRight:WIDTH*10/100,fontFamily:"LittleLordFontleroyNF",color:'#3a6dda'}}>Add Farm</Text></TouchableOpacity>
          <Dropdown
            style={[
              styles.dropdown,{marginTop:HEIGHT*2/100}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{color:'#3a6dda'}}
            data={value1!=null && PaddockData.length!=0 ? PaddockData : value1!=null && PaddockData.length==0 ? [{paddockNumber: "No Paddock Available"}] : [{paddockNumber: "Please Select Farm"}]}
            maxHeight={300}
            labelField="paddockNumber"
            valueField="paddockNumber"
            placeholder={value2=='' ? 'Select Paddock' : value2}
            searchPlaceholder="Search..."
            value={value2}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={item => {
              if(item.paddockNumber!="Please Select Farm" || item.paddockNumber!="No Paddock Available")
              {
                setValue2(item.paddockNumber);
                setIsFocus2(false);
              }
              setIsFocus2(false);
            }}
          />
          <TouchableOpacity onPress={()=>{props.navigation.push('AddPaddock',{tally: true})}}><Text style={{textAlign:"right", marginTop:HEIGHT*1/100, fontSize:27, marginRight:WIDTH*10/100,fontFamily:"LittleLordFontleroyNF",color:'#3a6dda'}}>Add Paddock</Text></TouchableOpacity>
          {/* <MultiSelect
            style={[
              styles.dropdown,
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{color:'#3a6dda'}}
            data={PaddockData}
            maxHeight={300}
            labelField="paddockNumber"
            valueField="paddockNumber"
            placeholder={value2.length==0 ? 'Select Paddock' : value2.join(" ")}
            searchPlaceholder="Search..."
            value={value2}
            onFocus={() => setIsFocus2(true)}
            onBlur={() => setIsFocus2(false)}
            onChange={item => {
              setValue2(item);
              console.log(value2)
              // setIsFocus2(false);
            }}
            renderItem={renderDataItem}
            renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => {
                  console.log(item);
                  setValue2(value2.filter(function(el) { return el != item.paddockNumber }))
                  console.log(value2)
                  }}>
                    <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.paddockNumber}</Text>
                        
                    </View>
                </TouchableOpacity>
            )}
          /> */}
        <View style={{alignItems:"center"}}>
          <TouchableOpacity
          style={styles.btnStyle}
            onPress={() => {
              if(value1!=null && value2.length!=0)
              {
              props.navigation.push('CountPaddockScreen',{paddock: value2, farm: value1});
              }
              else if(value1==null)
              {
                Alert.alert('Alert', 'Please select the Farm', [
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('OK Pressed');
                    },
                  },
                ]
                )
              }
              else if(value2.length==0)
              {
                Alert.alert('Alert', 'Please select the Paddock', [
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('OK Pressed');
                    },
                  },
                ]
                )
              }

            }}>
            <Text style={styles.saveText}>Next</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f8fa",
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
    color: '#e0f8fa',
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
  boxBoderView: {
    height: responsiveScreenWidth(6),
    width: responsiveScreenWidth(6),
    borderColor: colors.gray_dark,
    borderWidth: responsiveScreenWidth(0.2),
    marginTop: responsiveScreenWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: HEIGHT*0.5/100,
    width: WIDTH*60/100,
    borderRadius:25,
    backgroundColor:'#3a6dda',
    marginTop:HEIGHT*7/100
    // #3a6dda
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
    borderColor: "#3a6dda",
    borderWidth: responsiveScreenWidth(0.2),
    borderRadius: 20,
    paddingHorizontal: 10,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#3a6dda',
    marginTop:HEIGHT*5/100
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
    color:'#3a6dda'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'#3a6dda',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'#3a6dda'
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    marginLeft:12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
      marginRight: 5,
      fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
export default connect(mapStateToProps, mapDispatchToProps)(FarmTallyScreen);
