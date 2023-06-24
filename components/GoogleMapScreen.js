import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';
import { decode } from '@mapbox/polyline';
import patient from '../images/patient.png';
import ambulanceIcon from '../images/ambulanceIcon.png';

const GoogleMapScreen = () => {
  const [location, setLocation] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const fetchData = async (origin, destination) => {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
          params: {
            origin: origin,
            destination: destination,
            mode: 'driving',
            units: 'metric',
            key: 'AIzaSyAIGunAKRYfaFpQ8ZklwesjJ3KSWCRTv98',
          },
        });

        if (response.data && response.data.routes && response.data.routes.length > 0) {
          const points = response.data.routes[0].overview_polyline.points;
          const decodedPoints = decode(points);
          const coordinates = decodedPoints.map(point => ({
            latitude: point[0],
            longitude: point[1],
          }));

          setPolylinePoints(coordinates);
          setResponseData(response.data);

          const startLocation = response.data.routes[0].legs[0].start_location;
          const endLocation = response.data.routes[0].legs[0].end_location;
          const northeast = {
            latitude: Math.max(startLocation.lat, endLocation.lat),
            longitude: Math.max(startLocation.lng, endLocation.lng),
          };
          const southwest = {
            latitude: Math.min(startLocation.lat, endLocation.lat),
            longitude: Math.min(startLocation.lng, endLocation.lng),
          };

          setMapRegion({
            latitude: (northeast.latitude + southwest.latitude) / 2,
            longitude: (northeast.longitude + southwest.longitude) / 2,
            latitudeDelta: Math.abs(northeast.latitude - southwest.latitude) * 1.1,
            longitudeDelta: Math.abs(northeast.longitude - southwest.longitude) * 1.1,
          });

          const etaText = response.data.routes[0].legs[0].duration.text;
          setEta(etaText);
        } else {
          console.log('Error: Invalid response from Google Maps Directions API');
        }
      } catch (error) {
        console.log('Error fetching data from Google Maps Directions API:', error);
      }
    };

    const handleLocationUpdate = (position) => {
      if (position && position.coords) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
      } else {
        console.log('Error: Invalid position object');
      }
    };

    const requestLocationPermission = async () => {
      try {
        const permission =
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

        const result = await check(permission);
        if (result === RESULTS.DENIED) {
          const requestResult = await request(permission);
          if (requestResult === RESULTS.GRANTED) {
            Geolocation.watchPosition(handleLocationUpdate, console.log, {
              enableHighAccuracy: true,
              distanceFilter: 10,
              interval: 1000,
              fastestInterval: 1000,
              forceRequestLocation: true,
            });
          } else {
            console.log('Location permission denied');
          }
        } else if (result === RESULTS.GRANTED) {
          Geolocation.watchPosition(handleLocationUpdate, console.log, {
            enableHighAccuracy: true,
            distanceFilter: 10,
            interval: 1000,
            fastestInterval: 1000,
            forceRequestLocation: true,
          });
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    };

    if (location) {
      fetchData(`${location.latitude},${location.longitude}`, '10.30812320220457,123.8922460536254');
    }
    requestLocationPermission();
  }, [location]);

  return (
    <View style={styles.container}>
      {responseData ? (
        <View style={styles.innerView}>
          <MapView style={{ flex: 1 }} region={mapRegion}>
            <Polyline coordinates={polylinePoints} strokeWidth={3} strokeColor="red" />
            <Marker
              coordinate={{
                latitude: responseData.routes[0].legs[0].start_location.lat,
                longitude: responseData.routes[0].legs[0].start_location.lng,
              }}
              title="Start"
            >
              <Image source={patient} style={styles.markerIcon} />
            </Marker>
            <Marker
              coordinate={{
                latitude: responseData.routes[0].legs[0].end_location.lat,
                longitude: responseData.routes[0].legs[0].end_location.lng,
              }}
              title="End"
            >
              <Image source={ambulanceIcon} style={styles.markerIcon} />
            </Marker>
          </MapView>
          <View style={styles.eta}>
            <Text style={styles.etaText}>ETA: {eta}</Text>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    width: '100%',
    height: '100%',
    padding: 5,
  },
  markerIcon: {
    width: 32,
    height: 32,
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
  etaText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default GoogleMapScreen;
