import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ambulanceIcon from '../images/ambulanceIcon.png';
import patient from '../images/patient.png';

const GoogleMapScreen = () => {
  const [location, setLocation] = useState(null);
  const [nearestHospitals, setNearestHospitals] = useState([]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await check(permission);
      if (result === RESULTS.DENIED) {
      // Permission has been denied, show a prompt to request permission again
      const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          // Permission granted, you can now retrieve the user's location
          getDeviceLocation();
        } else {
          console.log('Location permission denied');
        }
      } else if (result === RESULTS.GRANTED) {
        // Permission granted, you can now retrieve the user's location
        getDeviceLocation();
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const getDeviceLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ latitude, longitude });
        } else {
          console.log('Error: Invalid position object');
        }
      },
      (error) => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 10.232232962974857,
            longitude: 123.77157021924658,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
	    coordinate={{ latitude: 10.232232962974857, longitude: 123.77157021924658 }}
	  >
	    <Image source={ambulanceIcon} style={styles.markerIcon} />
	  </Marker>
	  <Marker
	    coordinate={{ latitude: 10.254827937534879, longitude: 123.81421036752832 }}
	  >
	    <Image source={patient} style={styles.markerIcon} />
	  </Marker>
        </MapView>
      ) : (
        <Text>Loading Location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  markerIcon: {
    width: 32,
    height: 32,
},
});

export default GoogleMapScreen;
