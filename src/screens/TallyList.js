import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  Linking,
  Alert
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import {
  WIDTH,
  HEIGHT,
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from '../utils/Size';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dropdown } from 'react-native-element-dropdown';
import HeaderAdd from '../component/HeaderAdd'
import Animal from '../res/assets/svg/animal.svg'
import { PaddockCount } from '../res/raw/data';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@redux/action';
import { connect } from 'react-redux';
import { addPaddock } from '../redux/action/auth.action';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'rn-fetch-blob'
import Mailer from 'react-native-mail';

const TallyList = (props) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [numberValue, setnumberValue] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  const [names, setNames] = useState("");
  const [path, setPath] = useState();

  // UseEffect ======================================================================================

  useEffect(() => {
    if (
      props.authReducer &&
      props.authReducer.addTallyData
    ) {
      setData(props.authReducer.addTallyData);
      console.log(props.authReducer.addTallyData[0].paddock);
    }
  }, [])

  const lapsList = (val) => {
    return val.map((datas, index) => {
      return (
        <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>{datas.animalName + "-" + datas.animalCount}{index != val.length - 1 ? "" : ", "}</Text>
      )
    })
  }

  const lapsLists = (val) => {
    var count = 0;
    for(var i = 0; i<val.length; i++)
    {
      count = count + parseInt(val[i].animalCount)
    }
      return (
        <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>{count}</Text>
      )
  }

  const goes = async (item, index) => {
    var count = 0;
    var name = ""
    for(var i = 0; i<item.paddock.length; i++)
    {
      count = count + parseInt(item.paddock[i].animalCount)
      name = name + (name!='' ? ", " : '') +item.paddock[i].animalName + "-" + item.paddock[i].animalCount
    }
    
    setTotal(count.toString());
    setNames(name.toString());
    console.log(name, count, item)

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
                      <h3>Farm Name: ${item.farm}</h3>
                      <h3>Paddock Name: ${item.paddocks}</h3>
                      <h3>Animal Name: ${name.toString()}</h3>
                      <h3>Paddock Count: ${count.toString()}</h3>
                  </div>
              </div>
          </div>
      </body>
  </html>`,
      fileName: 'Tally'+'_'+item.farm+'_'+strr,
      directory: 'Download',
      base64: true
  };

    if(name && count)
    {
    let file = await RNHTMLtoPDF.convert(options)

    let filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${'Tally'+'_'+item.farm+'_'+strr}.pdf`;

    RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')
      .then(response => {
          console.log('Success Log: ', response);
      })
      .catch(errors => {
          console.log(" Error Log: ", errors);
      })
      
    // Linking.openURL(`mailto:support@example.com?subject=${item.farm + " Tally Details"}&body=Description&attach=${file.base64}`)
    Mailer.mail({
      subject: item.farm+ " Tally Details",
      recipients: ['support@example.com'],
      body: `<b>${item.farm + " Tally Details"}</b>`,
      isHTML: true,
      attachments: [{
        path: RNFetchBlob.fs.dirs.DownloadDir + `/${'Tally'+'_'+item.farm+'_'+strr}.pdf`,
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


  // UseEffect ======================================================================================

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#f4e0a2'} barStyle={'dark-content'} />
        <Spinner visible={spinner} size={'large'} color="#0E86D4" />

        <View style={{ paddingTop: responsiveScreenWidth(5) }}>

          <TouchableOpacity onPress={() => { }}><Text style={{ color: "black", fontSize: 40, fontFamily: "LittleLordFontleroyNF", textAlign: "center" }}>Tally List</Text></TouchableOpacity>

          <FlatList
            style={{ marginBottom: 10 }}
            data={data}
            keyExtractor={item => item}
            renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => {goes(item, index)}}><ImageBackground source={require('../res/assets/images/tally.png')} resizeMode='stretch' style={{ width: WIDTH * 90 / 100, height: HEIGHT * 30 / 100, marginLeft: WIDTH * 5 / 100, alignItems: "center", marginTop: HEIGHT * 2 / 100, justifyContent: "center" }}>
                <View style={{ backgroundColor: "rgba(255,255,255,0.4)", width: "80%", height: "50%", marginTop: HEIGHT * 4 / 100, borderRadius: 25, justifyContent: "center", paddingLeft: WIDTH * 5 / 100 }}>
                  <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>
                    Date : {new Date(item.date).toISOString().substring(0, 10)}
                  </Text>
                  <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>
                    Farm : {item.farm}
                  </Text>
                  <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>
                    Paddock : {item.paddocks}
                  </Text>
                  <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>
                    Animals: {lapsList(item.paddock)}
                  </Text>
                  <Text style={{ color: "black", fontSize: 17, fontWeight: "800" }}>
                    Total Count : {lapsLists(item.paddock)}
                  </Text>
                </View>
              </ImageBackground>
              </TouchableOpacity>
            } />
        </View>

      </View>
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
    height: responsiveScreenWidth(13),
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(1),
    position: 'absolute',
    bottom: responsiveScreenWidth(10),
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
export default connect(mapStateToProps, mapDispatchToProps)(TallyList);