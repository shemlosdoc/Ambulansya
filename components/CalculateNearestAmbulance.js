import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { firebase } from '@react-native-firebase/database';
import axios from 'axios';

const CalculateNearestAmbulance = () => {
  const [userA, setUserA] = useState({ latitude: 40.7128, longitude: -74.0060 }); // User A's position
  const [userB, setUserB] = useState(null); // User B's position (nearest driver)
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    fetchDriverData();
  }, []);

  const fetchDriverData = async () => {
      // Fetch all drivers' data from Firebase Realtime Database
      try {
        const driversSnapshot = await firebase.database().ref('drivers').once('value');
        const driversData = driversSnapshot.val();

        // Calculate distances and find the nearest driver
        let nearestDriver = null;
        let minDistance = Infinity;

        for (const driverId in driversData) {
          const driver = driversData[driverId];
          const driverPosition = { latitude: driver.latitude, longitude: driver.longitude };
          const distance = calculateDistance(userA, driverPosition);

          if (distance < minDistance) {
            nearestDriver = driverPosition;
            minDistance = distance;
          }
        }

        setUserB(nearestDriver);
        calculateETA(minDistance);
      } catch (error) {
        console.error('Error fetching drivers data: ', error);
      }
    };

  const calculateETA = (distance) => {
    const speed = 30; // Assume an average speed of 30 km/h for the driver.
    const estimatedTime = distance / speed;
    setEstimatedTime(estimatedTime.toFixed(1)); // Estimated time in hours
  };

  const calculateDistance = (origin, destination) => {
    const earthRadius = 6371; // Earth's radius in kilometers
    const lat1 = origin.latitude;
    const lon1 = origin.longitude;
    const lat2 = destination.latitude;
    const lon2 = destination.longitude;

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };

return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userA.latitude,
          longitude: userA.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userB && <Marker coordinate={userB} title="Nearest Driver" />}
        <Marker coordinate={userA} title="User A" />
      </MapView>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Text>Estimated Time of Arrival: {estimatedTime} hours</Text>
      </View>
    </View>
  );
};

export default CalculateNearestAmbulance;

