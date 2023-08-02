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
// Custom ======================================================================================
import colors from "../res/colors/colors";
import images from "../res/imageConstant/images";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "../utils/Size";

const ButtonText = (props) => {
  // Render ======================================================================================
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}
        style={[styles.loginBtn, props.loginBtn]}
      >
        <Text
          style={[
            styles.loginText, props.loginText,
            {
              color: colors.WHITE,
              fontSize: responsiveScreenFontSize(2),
            },
          ]}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blueSmallText: {
    color: colors.blue,
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: "400",
  },
  loginBtn: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: responsiveScreenWidth(1),
    height: responsiveScreenWidth(12),
    backgroundColor: colors.BLUETEXT,
    padding: responsiveScreenWidth(3),
  },
  loginText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: colors.BLACK,
    alignSelf: "center",
    fontWeight: "bold",
    width: "80%",
  },
  personalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: colors.white,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    padding: responsiveScreenWidth(4),
    marginTop: responsiveScreenWidth(5),
    borderRadius: responsiveScreenWidth(2),
  },
});

export default ButtonText;
