import React, { Component, useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
// Library ======================================================================================
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// Screens ======================================================================================
import SplashScreen from './src/screens/SplashScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import SettingScreen from './src/screens/SettingScreen'
import RecordSaveScreen from './src/screens/RecordSaveScreen'
import ChartScreen from './src/screens/ChartScreen'
import TallyScreen from './src/screens/TallyScreen'
import AddFarmScreen from './src/screens/AddFarmScreen'
import FarmTallyScreen from './src/screens/FarmTallyScreen'
import CountPaddockScreen from './src/screens/CountPaddockScreen'
import AddPaddockScreen from './src/screens/AddPaddockScreen'
import { WIDTH } from './src/utils/Size';
import Lottie from 'lottie-react-native';

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"RecordSaveScreen"}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={'SplashScreen'}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'DashboardScreen'}
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'SettingScreen'}
        component={SettingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'RecordSaveScreen'}
        component={RecordSaveScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'ChartScreen'}
        component={ChartScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'TallyScreen'}
        component={TallyScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'AddFarmScreen'}
        component={AddFarmScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'FarmTallyScreen'}
        component={FarmTallyScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'CountPaddockScreen'}
        component={CountPaddockScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'AddPaddockScreen'}
        component={AddPaddockScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator1 = () => {

  const [go, setGo] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setGo(true);
    }, 1300);
  }, [])

  return (
    go ? <StackNavigator /> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      <Lottie style={{ width: WIDTH }} source={require('./src/res/assets/lottie/loader.json')} autoPlay loop />
    </View>
  )

}
