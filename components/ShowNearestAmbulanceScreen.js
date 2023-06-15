import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import GoogleMapScreen from './GoogleMapScreen.js';

function ShowNearestAmbulanceScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Image 
          style={styles.image}
          source={require('../images/sampleGmap.jpeg')}
        />*/}
        <GoogleMapScreen style={styles.map} />
        <View style={styles.eta}>
          <Text style={styles.text}>Estimated Time Of Arrival: </Text>
          <Text style={styles.etaText}>? minutes</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  map: {
    opacity: 90,
    width: '100%',
    height: '100%',
    overflow: 'visible',
    resizeMode: 'cover',
    marginTop: 30,
  },
  eta: {
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: '20%',
  },
  text: {
    fontSize: 20,
  },
  etaText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ShowNearestAmbulanceScreen;
