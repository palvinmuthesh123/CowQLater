// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage'

//database connection
const db = SQLite.openDatabase(
  {
    name: 'mydb',
    location: 'default'
  },
  () => { console.log("Database connected!") }, //on success
  error => console.log("Database error", error) //on error
)
import StackNavigator from './StackNavigator';
console.disableYellowBox = true;
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
