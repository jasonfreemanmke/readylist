import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CleaningVersion from "../screens/CleaningVersion";
import cleanScreen from "../screens/cleanScreen";
import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.83,
    contentComponent: ({ navigation }) => {
        return(<MenuDrawer navigation={navigation} />)
    }
};

const DrawerNavigator =  createDrawerNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Cleaning: {
            screen: CleaningVersion
        },
        clean: {
            screen: cleanScreen
        },
        Header:{
            screen: HeaderScreen

        },
        Login:{
            screen: LoginScreen
        },
        Login2:{
            screen: LoginScreen2
        },
        test1:{
            screen: test1
        },

        SplashA:{
            screen: SplashSreenA
        },
    },
    DrawerConfig
);

export default createAppContainer(DrawerNavigator);
