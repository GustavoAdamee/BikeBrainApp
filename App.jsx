import React, { useState, useEffect } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import UserScreen from './src/screens/user';
import HomeScreen from './src/screens/home';
import ActivityScreen from './src/screens/activity';
import SyncDataScreen from './src/screens/syncData';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator();

const App = () => {
  
  useEffect(() => {
    console.log("APP Mount");
  }
  , []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route })=>({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'User') {
              iconName = focused 
                ? 'person' 
                : 'person-outline';
            }
            else if (route.name === 'Activity') {
              iconName = focused
                ? 'bicycle'
                : 'bicycle-outline';
            }
            else if (route.name === 'Sync Data') {
              iconName = focused
                ? 'sync'
                : 'sync-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* <Tab.Screen name="Sync Data">
          {(props) => <SyncDataScreen {...props} updateActivities={updateActivities} />}
        </Tab.Screen> */}
        <Tab.Screen name="Sync Data" component={SyncDataScreen} />
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
