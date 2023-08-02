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
  Linking,
  Alert,
  Dimensions,
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
// import {BarChart, ContributionGraph} from 'react-native-chart-kit';

import HeaderAdd from '../component/HeaderAdd';

import Lottie from 'lottie-react-native'
import { BarChart } from 'react-native-gifted-charts';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import { addRainfall } from '../redux/action/auth.action';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob'
import Mailer from 'react-native-mail';

const ChartScreen = (props) => {
  const [spinner, setspinner] = useState(false);
  const colors = {}
  const [data, setData] = useState();
  const [barData, setBarData] = useState([
    {
      value: 230,
      label: 'Jan',
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
    },
    // {
    //   value: 180,
    //   label: 'Feb',
    //   frontColor: '#79C3DB',
    //   sideColor: '#68BCD7',
    //   topColor: '#9FD4E5',
    // },
    // {
    //   value: 195,
    //   label: 'Mar',
    //   frontColor: '#28B2B3',
    //   sideColor: '#0FAAAB',
    //   topColor: '#66C9C9',
    // },
    // {
    //   value: 250,
    //   label: 'Apr',
    //   frontColor: '#4ADDBA',
    //   sideColor: '#36D9B2',
    //   topColor: '#7DE7CE',
    // },
    // {
    //   value: 320,
    //   label: 'May',
    //   frontColor: '#91E3E3',
    //   sideColor: '#85E0E0',
    //   topColor: '#B0EAEB',
    // },

  ]);
  // UseEffect ======================================================================================

  useEffect(() => {
    if (
      props.authReducer &&
      props.authReducer.addRainfallData
    ) {
      var arr = [];
      props.authReducer.addRainfallData.map((item, index) => {
        arr.push({
          value: item.rainfall,
          label: new Date(item.date).toISOString().substring(0, 10),
          frontColor: '#28B2B3',
          sideColor: '#0FAAAB',
          topColor: '#66C9C9',
        })
      })
      setBarData(arr);
      datt();
      // setFarmData(props.authReducer.addFarmData);
    }
  }, [])

  const datt = () => {
    var info = ""
    for (var i = 0; i < props.authReducer.addRainfallData.length; i++) {
      info = info + `<tr>
        <td>${new Date(props.authReducer.addRainfallData[i].date).toISOString().substring(0, 10)}</td>
        <td>${props.authReducer.addRainfallData[i].farmname}</td>
        <td>${props.authReducer.addRainfallData[i].rainfall}</td>
      </tr>` + '\n'
    }
    console.log(info, "IIIIIIIIIIIIIIIIIIIIIIII");
    setData(info);
  }

  const goes = async () => {

    let strr = makeid(8)

    let options = {
      html: `<html>
        <head>
        <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #dddddd;
        }
        </style>
        </head>
        <body>
        <h2>Rainfall Datas</h2>

        <table>
          <tr>
            <th>Date</th>
            <th>Farm Name</th>
            <th>RainFall</th>
          </tr>
          ${data}
        </table>
        </body>
    </html>`,
      fileName: 'RainFall' + '_' + 'AllFarms' + '_' + strr,
      directory: 'Download',
      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options)

    let filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${'RainFall' + '_' + 'AllFarms' + '_' + strr}.pdf`;

    RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')
      .then(response => {
        console.log('Success Log: ', response);
      })
      .catch(errors => {
        console.log(" Error Log: ", errors);
      })

    // Linking.openURL(`mailto:support@example.com?subject=${'AllFarms' + " Tally Details"}&body=Description&attach=${file.base64}`)
    Mailer.mail({
      subject: 'AllFarms' + " RainFall Details",
      recipients: ['support@example.com'],
      body: `<b>${'AllFarms' + " RainFall Details"}</b>`,
      isHTML: true,
      attachments: [{
        path: RNFetchBlob.fs.dirs.DownloadDir + `/${'RainFall' + '_' + 'AllFarms' + '_' + strr}.pdf`,
        uri: file.base64,
        type: 'pdf',
        name: '',
      }]
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
          { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
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
          <StatusBar backgroundColor={'#bae3ff'} barStyle={'dark-content'} />
          {/* <HeaderAdd
            onPress={() => {
              navigation.goBack();
            }}
            headerText={'Charts'}
            rightIcon={images.backArrow}
          /> */}
          <Lottie style={{ height: undefined, width: WIDTH * 80 / 100, marginLeft: WIDTH * 5 / 100 }} source={require('../res/assets/lottie/rainy.json')} autoPlay loop />
          {/* <View style={{top:HEIGHT*5/100,position:"absolute",right:WIDTH*5/100}}>
          <Text style={{color:"black", fontSize:17, fontWeight:"800",textAlign:"right"}}>
            Scale 
          </Text>
          <Text style={{color:"black", fontSize:17, fontWeight:"800",textAlign:"right"}}>
            X Axis - Dates 
          </Text>
          <Text style={{color:"black", fontSize:17, fontWeight:"800",textAlign:"right"}}>
            Y Axis - Rainfall Measurements 
          </Text>
          </View> */}
          <TouchableOpacity onPress={()=>{goes()}}><Text style={{marginBottom:HEIGHT*3/100, fontSize:20, fontWeight:"700", textAlign:"right",marginRight:WIDTH*5/100}}>Share All Datas</Text></TouchableOpacity>
          <BarChart
            showFractionalValue
            showYAxisIndices
            hideRules
            noOfSections={4}
            maxValue={50}
            data={barData}
            barWidth={70}
            sideWidth={25}
            isThreeD
            side="right"
          // labelWidth={80}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bae3ff",
    // justifyContent:"center",
    // alignItems:"center"
  },

  boxView: {
    height: responsiveScreenWidth(35),
    width: responsiveScreenWidth(35),
    borderRadius: responsiveScreenWidth(1),
    // backgroundColor: colors.gray,
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);