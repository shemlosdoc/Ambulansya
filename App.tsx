import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as firebase from 'firebase';
import 'firebase/auth';

import LoginScreen from './components/LoginScreen.js';
import UserModeSelectScreen from './components/UserModeSelectScreen.js';
import DriverSignUpScreen from './components/DriverSignUpScreen.js';
import UserSignUpScreen from './components/UserSignUpScreen.js';
import SummoningAmbulanceScreen from './components/SummoningAmbulanceScreen.js';
import WaitingForCallScreen from './components/WaitingForCallScreen.js';
import ShowNearestAmbulanceScreen from './components/ShowNearestAmbulanceScreen.js';
import GoogleMapScreen from './components/GoogleMapScreen.js';
import AmbulanceEnRouteScreen from './components/AmbulanceEnRouteScreen.js';
import CallReceivedScreen from './components/CallReceivedScreen.js';
import SummoningConfirmation from './components/SummoningConfirmation.js';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserModeSelect"
          component={UserModeSelectScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverSignUp"
          component={DriverSignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserSignUp"
          component={UserSignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WaitingForCall"
          component={WaitingForCallScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SummoningAmbulance"
          component={SummoningAmbulanceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SummoningConfirmation"
          component={SummoningConfirmation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShowNearestAmbulance"
          component={ShowNearestAmbulanceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoogleMap"
          component={GoogleMapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AmbulanceEnRoute"
          component={AmbulanceEnRouteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CallReceived"
          component={CallReceivedScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;