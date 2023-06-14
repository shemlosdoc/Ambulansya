import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-google-maps-directions';
import { NavigationContainer } from '@react-navigation/native';


const GoogleMapDriverRouteScreen = ({ navigation }) => {
  const origin = { latitude: 37.78825, longitude: -122.4324 }; // Starting location
  const destination = { latitude: 37.7749, longitude: -122.4194 }; // Destination location
  const YOUR_GOOGLE_MAPS_API_KEY = 'AIzaSyAIGunAKRYfaFpQ8ZklwesjJ3KSWCRTv98';

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ latitude: 37.78825, longitude: -122.4324 }}>
        <Marker coordinate={origin} title="Origin" />
        <Marker coordinate={destination} title="Destination" />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={YOUR_GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maps: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMapDriverRouteScreen;
