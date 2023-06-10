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
import AmbulansyaBanner from './AmbulansyaBanner.js';
import { NavigationContainer } from '@react-navigation/native';

function UserModeSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <AmbulansyaBanner />
      <View style={styles.userModes}>
        <TouchableOpacity style={styles.userView} onPress={() => navigation.navigate('DriverSignUp')}>
          <Text style={styles.userButton}>
            DRIVER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userView} onPress={() => navigation.navigate('UserSignUp')}>
          <Text style={styles.userButton}>
            USER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.termsButton}>By Continuing you agree to the Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  userView: {
    backgroundColor: "#1e81b0",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userButton: {
    height: 50,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  termsButton: {
    height: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
  userModes: {
    marginTop: 200,
  }
});

export default UserModeSelectScreen;
