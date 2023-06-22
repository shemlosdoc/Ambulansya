import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AmbulansyaBanner from './AmbulansyaBanner.js';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/database';
import database from '@react-native-firebase/database';
import GoogleMapScreen from './GoogleMapScreen.js';

function SummoningConfirmation({ navigation }) {

  //const firebaseDatabase = FirebaseDatabase.getInstance();
  //const myRef = firebaseDatabase.ref('message');

  /*
  myRef.set('Hello, World!')
  .then(() => {
    console.log('Message written successfully!');
  })
  .catch((error) => {
    console.error('Error writing message:', error);
  });
  */

  /*  
  const logInteraction = (userId, interaction) => {
    firebaseDatabase.ref(`interactions/${userId}`).push(interaction);
  };
  */

  const handleClick = () => {
    
    /*
    // Call the logInteraction function with the appropriate parameters
    logInteraction('zbnhCbGmZJg5UwtsbGI4wfvZAq73', {
      action: 'summon',
      userLocation: '10.245207407055927, 123.79596735052833',
      ambulanceLocation: '10.235622138022235, 123.77750327071905',
      device: 'mobile'
    });
    */
    navigation.navigate('GoogleMap');
  };
  

  return (
    <View style={styles.container}>
      <AmbulansyaBanner />
      <View style={styles.innerContainer}>
        <Text style={styles.summonText}>Summon the nearest Ambulance</Text>
        <View style={styles.cancelOrConfirm}> 
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('SummoningAmbulance')}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleClick}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  innerContainer: {
    width: 350,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderRadius: 50,
  },
  cancelOrConfirm: {
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: 'red',
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#39FF14',
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20,
  },
  summonText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default SummoningConfirmation;
