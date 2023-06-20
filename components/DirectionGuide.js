import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { decode } from '@mapbox/polyline';

const DirectionGuide = () => {
  const [responseData, setResponseData] = useState(null);
  const [polylinePoints, setPolylinePoints] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
          params: {
            // ... API parameters
            origin: '10.232256997034291, 123.77235892703698',
            destination: '10.246826980973587, 123.79677775783757',
            //waypoints: 'via:enc:lexeF{~wsZejrPjtye@:',
            mode: 'driving',
            units: 'metric',
            key: 'AIzaSyAIGunAKRYfaFpQ8ZklwesjJ3KSWCRTv98'
          }
        });

        const points = response.data.routes[0].overview_polyline.points;
        const decodedPoints = decode(points);
        const coordinates = decodedPoints.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setPolylinePoints(coordinates);
        setResponseData(response.data);

        // Calculate the bounding box of start and end locations
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

        // Set the map region to the bounding box with some padding
        setMapRegion({
          latitude: (northeast.latitude + southwest.latitude) / 2,
          longitude: (northeast.longitude + southwest.longitude) / 2,
          latitudeDelta: Math.abs(northeast.latitude - southwest.latitude) * 1.1, // Add padding
          longitudeDelta: Math.abs(northeast.longitude - southwest.longitude) * 1.1, // Add padding
        });

        const etaText = response.data.routes[0].legs[0].duration.text;
        setEta(etaText);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {responseData ? (
        <View style={{ flex:1 }}>
          <MapView style={{ flex: 1 }} region={mapRegion}>
            <Polyline
              coordinates={polylinePoints}
              strokeWidth={3}
              strokeColor="red"
            />
            <Marker
              coordinate={{
                latitude: responseData.routes[0].legs[0].start_location.lat,
                longitude: responseData.routes[0].legs[0].start_location.lng,
              }}
              title="Start"
            />
            <Marker
              coordinate={{
                latitude: responseData.routes[0].legs[0].end_location.lat,
                longitude: responseData.routes[0].legs[0].end_location.lng,
              }}
              title="End"
            />
          </MapView>
          <View style={{ padding: 10, backgroundColor: 'black' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ETA: {eta}</Text>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default DirectionGuide;
