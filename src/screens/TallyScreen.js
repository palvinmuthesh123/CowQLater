import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
// Custom ======================================================================================
import colors from '../res/colors/colors';
import images from '../res/imageConstant/images';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from '../utils/Size';
import AsyncStorage from '@react-native-community/async-storage';

const TallyScreen = ({navigation}) => {
  // UseEffect ======================================================================================

  // Render ======================================================================================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#68BBE3'} barStyle={'dark-content'} />
        {/* <Image
          source={images.LogoIcon}
          resizeMode="contain"
          style={styles.imageicon}
        /> */}
        <Text style={styles.titleText}>Welcome to CowQLater</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: responsiveScreenFontSize(3),
    color: '#68BBE3',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageicon: {
    height: responsiveScreenWidth(30),
    width: responsiveScreenWidth(50),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default TallyScreen;
