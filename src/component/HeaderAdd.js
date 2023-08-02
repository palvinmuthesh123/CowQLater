import React, {useEffect, useState} from 'react';
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
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';

const HeaderAdd = props => {
  // Function=================================================================================
  const TopHeaderView = () => {
    return (
      <View style={styles.headerstyle}>
        <TouchableOpacity
          onPress={() => {
            props.onPress();
          }}
          style={{marginTop: responsiveScreenWidth(1)}}>
          <Image
            source={props.rightIcon !== '' ? props.rightIcon : images.Check}
            resizeMode="contain"
            style={styles.ProfileIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}> {props.headerText}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.onPress1();
          }}
          style={{marginTop: responsiveScreenWidth(1)}}>
          <Image
            source={props.leftIcon !== '' ? props.leftIcon : images.Check}
            // source={props.leftIcon}
            resizeMode="contain"
            style={[styles.ProfileIcon,props.ProfileIconstyle]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // Render ======================================================================================
  return <TopHeaderView />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  HamburgerIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(0),
  },
  ProfileIcon: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    alignSelf: 'center',
    marginTop: responsiveScreenWidth(1),
  },
  headerstyle: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenWidth(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingStart: responsiveScreenWidth(6),
    paddingEnd: responsiveScreenWidth(6),
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: '#68BBE3',
    fontWeight: 'bold',
  },
});

export default HeaderAdd;
