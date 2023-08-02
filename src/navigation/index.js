import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigationRef } from '../utils/navigation';
import { ActionCreators } from '../redux/action';
import SplashScreen from '../screens/SplashScreen'
import DashboardScreen from '../screens/DashboardScreen'
import SettingScreen from '../screens/SettingScreen'
import RecordSaveScreen from '../screens/RecordSaveScreen'
import ChartScreen from '../screens/ChartScreen'
import TallyScreen from '../screens/TallyScreen'
import AddFarmScreen from '../screens/AddFarmScreen'
import FarmTallyScreen from '../screens/FarmTallyScreen'
import CountPaddockScreen from '../screens/CountPaddockScreen'
import AddPaddockScreen from '../screens/AddPaddockScreen'
import { WIDTH } from '../utils/Size';
import Lottie from 'lottie-react-native';
import { View } from 'react-native';
import TallyList from '../screens/TallyList';
import AddPaddock from '../screens/AddPaddock';

const Stack = createStackNavigator();

const AppStack = props => {
    return (
        <Stack.Navigator
            initialRouteName={"CountPaddockScreen"}
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
            <Stack.Screen
                options={{ headerShown: false }}
                name={'TallyList'}
                component={TallyList}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={'AddPaddock'}
                component={AddPaddock}
            />
        </Stack.Navigator>
    );
};


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isApiCall: true,
        };
    }

    render() {
        setTimeout(
            () =>
                this.setState({
                    isApiCall: false,
                }),
            1300,
        );

        if (this.state.isApiCall) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    <Lottie style={{ width: WIDTH }} source={require('../res/assets/lottie/loader.json')} autoPlay loop />
                </View>
            );
        } else {
            return (
                <NavigationContainer ref={navigationRef}>
                    <AppStack />
                </NavigationContainer>
            );
        }
    }
}

const mapStateToProps = ({ authReducer }) => {
    if (authReducer) {
        return {
            authReducer: authReducer,
        };
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
