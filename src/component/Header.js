import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Modal,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
// Custom ======================================================================================
import colors from "../res/colors/colors";
import images from "../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../utils/Size";
import Spinner from "react-native-loading-spinner-overlay";
import { BaseURL, EndPoint } from "../api/ApiConstant";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

const Header = (props) => {
  const navigation = useNavigation();
  const [isModal, setIsModal] = useState(false);
  const [successModal, setsuccessModal] = useState(false);
  const [failureModal, setfailureModal] = useState(false);
  // api Call=================================================================================
  const callLogOutApi = async () => {
    let token = await AsyncStorage.getItem("token");
    setIsModal(false);
    var config = {
      method: "post",
      url: BaseURL + EndPoint.LOGOUT,
      headers: {
        "x-access-token": token,
      },
    };
    await axios(config)
      .then(async () => {
        setsuccessModal(true);
        await AsyncStorage.clear();
      })
      .catch((err) => {
        setfailureModal(true);
        console.log(JSON.stringify(err));
      });
  };
  // Function=================================================================================
  const TopHeaderView = () => {
    return (
      <View style={styles.headerstyle}>
        <TouchableOpacity
          onPress={() => {
            props.onPress();
          }}
          style={{ marginTop: responsiveScreenWidth(1) }}
        >
          <Image
            source={images.HamburgerIcon}
            resizeMode="contain"
            style={styles.HamburgerIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}> {props.headerText}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!isModal) {
              setIsModal(true);
            }
          }}
          style={{ marginTop: responsiveScreenWidth(1) }}
        >
          <Image
            source={global.image === null || global.image === undefined ? images.ProfileIcon : { uri: global.image }}
            resizeMode="contain"
            style={styles.ProfileIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // Render ======================================================================================
  return (<View>
    <Modal transparent={true} visible={isModal} animationType="slide">
      <View style={styles.modalView}>
        <Text
          onPress={() => {
            navigation.navigate("PersonalInfoScreen");
          }}
          style={styles.modaltextStyle}
        >
          Profile Information
        </Text>
        <View style={styles.modalline} />
        <Text
          onPress={() => {
            callLogOutApi();
          }}
          style={styles.modaltextStyle}
        >
          Logout
        </Text>
      </View>
    </Modal>

    <Modal transparent={true} visible={successModal} animationType="slide">
      <View style={styles.modalView1}>
        <Image
          source={images.successIcon}
          resizeMode="contain"
          style={styles.ProfileIcon1}
        />
        <Text
          style={styles.modaltextStyle1}
        >
          You have been logged out.
        </Text>
        <TouchableOpacity onPress={() => {
          setsuccessModal(false)
          navigation.navigate("MemberLoginScreen");
        }}
          style={{
            width: "50%",
            padding: responsiveScreenWidth(2),
            marginTop: responsiveScreenWidth(8),
            backgroundColor: colors.primary,
            borderRadius: responsiveScreenWidth(2),
            justifyContent: "center",
            alignSelf: "center",
            alignContent: "center"
          }}
        >
          <Text style={{
            color: colors.white, alignSelf: "center",
            fontSize: responsiveScreenFontSize(1.8),
            fontWeight: "bold",
          }}>Thank You</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    <Modal transparent={true} visible={failureModal} animationType="slide">
      <View style={styles.modalView1}>
        <Image
          source={images.cancelcon}
          resizeMode="contain"
          style={styles.ProfileIcon1}
        />
        <Text
          style={styles.modaltextStyle1}
        >
          Not able to log out from app.
        </Text>
        <TouchableOpacity onPress={() => {
          setfailureModal(false)
          // navigation.goBack()
        }}
          style={{
            width: "50%",
            padding: responsiveScreenWidth(2),
            marginTop: responsiveScreenWidth(8),
            backgroundColor: colors.primary,
            borderRadius: responsiveScreenWidth(2),
            justifyContent: "center",
            alignSelf: "center",
            alignContent: "center"
          }}
        >
          <Text style={{
            color: colors.white, alignSelf: "center",
            fontSize: responsiveScreenFontSize(1.8),
            fontWeight: "bold",
          }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </Modal>

    <TopHeaderView />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
  },
  HamburgerIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: "center",
    tintColor: colors.white,
    marginTop: responsiveScreenWidth(0),
  },
  ProfileIcon: {
    height: responsiveScreenWidth(7),
    width: responsiveScreenWidth(7),
    alignSelf: "center",
    marginTop: responsiveScreenWidth(1),
  },
  headerstyle: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenWidth(16),
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    paddingStart: responsiveScreenWidth(6),
    paddingEnd: responsiveScreenWidth(6),
  },
  headerText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    fontWeight: "600",
  },
  modalView: {
    width: "50%",
    height: responsiveScreenWidth(23),
    borderRadius: responsiveScreenWidth(2),
    padding: responsiveScreenWidth(4),
    alignSelf: "center",
    marginStart: responsiveScreenWidth(35),
    backgroundColor: colors.white,
    marginTop: responsiveScreenWidth(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  modalline: {
    width: "100%",
    height: responsiveScreenWidth(0.12),
    backgroundColor: colors.gray,
    alignSelf: "center",
    margin: responsiveScreenWidth(2),
  },
  linestyle: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.blue,
    height: responsiveScreenWidth(0.2),
    margin: responsiveScreenWidth(2),
  },
  modaltextStyle: {
    textAlign: "left",
    fontWeight: "bold",
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(2),
    marginTop: 0,
  },


  modalView1: {
    width: "80%",
    height: responsiveScreenWidth(60),
    marginTop: responsiveScreenWidth(60),
    borderRadius: responsiveScreenWidth(2),
    padding: responsiveScreenWidth(4),
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  ProfileIcon1: {
    height: responsiveScreenWidth(20),
    width: responsiveScreenWidth(20),
    justifyContent: "center",
    alignSelf: "center"
  }, modaltextStyle1: {
    color: colors.BLACK,
    fontSize: responsiveScreenFontSize(1.8),
    marginTop: responsiveScreenWidth(8),
    fontWeight: "bold",
    width: "100%",
    alignSelf: "center",
    textAlign: "center"
  },
});

export default Header;
