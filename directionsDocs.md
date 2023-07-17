## Code Documentation for the functions used to fetch the directions

### Function: fetchData(origin, destination)
```
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
```

This function is responsible for fetching directions data from the Google Maps Directions API. It makes an asynchronous request using the `axios` library and sets the fetched data in the component's state variables. Here's an overview of its functionality:

1. The function receives `origin` and `destination` as parameters, representing the latitude and longitude coordinates of the starting and ending points, respectively.
2. It constructs a request URL to the Google Maps Directions API, passing the required parameters such as `origin`, `destination`, `mode`, `units`, and the API key.
3. The response is stored in the `response` variable.
4. If the response contains valid data, it extracts the polyline points, decodes them, and converts them into an array of coordinates.
5. The polyline points are set in the `polylinePoints` state variable.
6. Additional data such as the response object, map region, and estimated time of arrival (ETA) are extracted and stored in corresponding state variables.
7. If the response is invalid or missing necessary data, an error message is logged.

### Function: handleLocationUpdate(position)
```
const handleLocationUpdate = (position) => {
      if (position && position.coords) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });

        /*if (mapRegion) {
          const { latitude, longitude } = mapRegion;
          const camera = {
            center: {
              latitude,
              longitude,
            },
            pitch: 0,
            heading: position.coords.heading || 0,
            zoom: 18,
          };
          mapRef.current.animateCamera(camera, { duration: 1000 });
        }
        */
      } else {
        console.log('Error: Invalid position object');
      }
    };
```

This function is responsible for handling location updates. It takes the position object as a parameter, containing latitude and longitude coordinates, and updates the component's `location` state variable accordingly. Here's an overview of its functionality:

1. The function receives a `position` object.
2. If the `position` object is valid and contains `coords` data, it extracts the latitude and longitude coordinates.
3. The latitude and longitude coordinates are set in the `location` state variable.
4. There is a commented-out section related to updating the map camera based on the location update.

### Function: requestLocationPermission()
```
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
```

This function is responsible for requesting location permissions and starting the watchPosition function from the Geolocation API. Here's an overview of its functionality:

1. The function checks the current location permission status using the `check` function from the `react-native-permissions` library.
2. If the permission status is denied, it requests location permission using the `request` function from `react-native-permissions`.
3. If the permission is granted, it starts watching the device's position updates using the `watchPosition` function from the Geolocation API.
4. The `watchPosition` function receives the `handleLocationUpdate` function as a success callback and console.log as an error callback. It also provides various configuration options for position updates.

### useEffect Hook

The `useEffect` hook is used to trigger the execution of the provided code block when specific dependencies change. In this case, it runs when the `location` state variable changes.

1. The code block consists of the functions `fetchData` and `requestLocationPermission` along with their necessary setup.
2. It first checks if `location` is truthy (non-null and non-undefined) and calls `fetchData` with the current location coordinates.
3. Next, it calls `requestLocationPermission` to handle location permission requests and updates.
4. The `useEffect` hook's dependency array contains `location`, ensuring that the code block is triggered whenever the `location` variable changes.

## Conclusion

The show codes are the main functions that fetches directions data from the Google Maps Directions API based on the user's location updates. It utilizes the `fetchData` function to make API requests, the `handleLocationUpdate` function to handle location updates, and the `requestLocationPermission` function to handle location permission requests and start watching position updates. The `useEffect` hook combines these functions and dependencies to automate the process of fetching data and handling location updates in the React Native component.
