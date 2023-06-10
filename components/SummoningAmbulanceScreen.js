import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';
import SummoningConfirmation from './SummoningConfirmation.js';
import { NavigationContainer } from '@react-navigation/native';


function SummoningAmbulanceScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.summonButton} onPress={() => navigation.navigate('SummoningConfirmation')}> 
      <Image
        style={styles.image}
        source={require('../images/ambulance.png')}
      />
      <Text style={styles.summonText}>
        SUMMON 
      </Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: 275,
    height: 200,
    borderRadius: 60,
  },
  summonButton: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#39FF14',
    borderRadius: 50,
  },
  summonText: {
    fontWeight: 'bold',
    fontSize: 45,
    color: 'white',
  }
});

export default SummoningAmbulanceScreen;
