import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import AmbulansyaBanner from './AmbulansyaBanner.js';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';

const EmergencyDetailScreen = ({ navigation }) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientSex, setPatientSex] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  const addData = async () => {
    try {
      const databaseRef = database().ref("Emergency Details");
      const newEntryRef = databaseRef.push();
      const data = {
        patientName: patientName,
        patientAge: patientAge,
        patientSex: patientSex,
        patientCondition: patientCondition,
        currentLocation: currentLocation
      };
      const identifier = "Patient: " + patientName + "'s details";
      await newEntryRef.child(identifier).set(data);
      console.log('Data set successfully.');
    } catch (error) {
      console.error('Error setting data:', error);
    }
  };

    const requestLocationPermission = async () => {
      try {
        const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (granted === 'granted') {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    };
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.log('Error getting current location:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

  useEffect(() => {
    // Get data from Firebase Realtime Database
    const getData = () => {
      const databaseRef = database().ref('Emergency Details');
      databaseRef.on('value', (snapshot) => {
        const message = snapshot.val();
        console.log('Received data:', message);
      });
    };
    
    const unsubscribe = getData();
    requestLocationPermission(); 

    return () => {
      const databaseRef = database().ref('message');
      databaseRef.off();
      unsubscribe();
    };
  }, []);

  const handleClick = () => {
    addData();
    navigation.navigate('GoogleMap');
  };

  return (
    <View style={styles.container}>
      <AmbulansyaBanner />
      <TextInput
        style={styles.input}
        placeholder="Patient's Name"
        onChangeText={(text) => setPatientName(text)}
        value={patientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={(text) => setPatientAge(text)}
        value={patientAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Sex"
        onChangeText={(text) => setPatientSex(text)}
        value={patientSex}
      />
      <TextInput
        style={styles.inputCondition}
        placeholder="Condition"
        onChangeText={(text) => setPatientCondition(text)}
        value={patientCondition}
      />
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputCondition: {
    width: '80%',
    height: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 5,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  testText: {
    fontSize: 24,
    color: 'black',
  },
});

export default EmergencyDetailScreen;
