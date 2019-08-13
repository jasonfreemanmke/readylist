import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RecentCleans from '../screens/RecentCleans';
import CleanScreen from '../screens/cleanScreen';
import CleaningVersion from "../screens/CleaningVersion";
import SplashScreen from "../screens/SplashScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: RecentCleans,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Recent Cleans',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: CleanScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Rooms',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';


const VerStack = createStackNavigator(
    {
        Settings: CleaningVersion,
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Cleaning Version',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
};

SettingsStack.path = '';


const SplashStack = createStackNavigator(
    {
        Photos: SplashScreen,
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Cleaning Version',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
};

SettingsStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
    VerStack,
    SplashStack,

});

tabNavigator.path = '';

export default tabNavigator;
