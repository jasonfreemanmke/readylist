import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RecentCleans from '../screens/RecentCleans';
import CleanScreen from '../screens/cleanScreen';
import CleaningVersion from "../screens/CleaningVersion";
import SplashScreen from "../screens/SplashScreen";
import tableScreen from "../screens/tableScreen";
import switchLocations from "../screens/switchLocations";
import ItemsScreen from "../screens/ItemsScreen";
import test1 from "../screens/test1"
import test2 from "../screens/test2";



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
    Links: tableScreen,
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
    tabBarLabel: 'test',
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

const tableStack = createStackNavigator(
    {
        Photos: tableScreen,

    },
    config
);

SettingsStack.navigationOptions = {

    tabBarLabel: 'Rooms List',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
};

SettingsStack.path = '';



const LocStack = createStackNavigator(
    {
        Settings: switchLocations,
    },
    config
);

LocStack.navigationOptions = {
    tabBarLabel: 'Switch Locations',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
};

LocStack.path = '';


const ItemsStack = createStackNavigator(
    {
        Links: test2,
    },
    config
);

ItemsStack.navigationOptions = {
    tabBarLabel: 'Items',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
    ),
};

ItemsStack.path = '';





const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
    VerStack,
    // SplashStack,
    // tableStack,
LocStack,
    ItemsStack,
});

tabNavigator.path = '';

export default tabNavigator;
