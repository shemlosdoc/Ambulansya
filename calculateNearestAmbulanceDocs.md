## Code Documentation for the functions used to fetch the nearest Ambulance Available

### Function: fetchDriverData()

```
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

```

### Description

The `fetchDriverData` function performs the following steps:

1. Fetches all drivers' data from the Firebase Realtime Database using the `firebase.database().ref('drivers').once('value')` method.

2. Iterates through the retrieved drivers' data to calculate the distance between each driver's position and User A's position using the `calculateDistance` function.

3. Keeps track of the nearest driver and the minimum distance found during the iteration.

4. Sets the nearest driver's position as `userB` using the `setUserB` function.

5. Calls the `calculateETA` function, passing the minimum distance as an argument, to estimate the time of arrival to the nearest driver.

6. Handles any errors that may occur during the data fetching process and logs them to the console.

### Parameters

The `fetchDriverData` function does not accept any parameters.

## Function: calculateDistance(origin, destination)

```
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

```

### Description
The `calculateDistance` function is responsible for calculating the distance between two points on the Earth's surface, given their latitude and longitude coordinates. It uses the Haversine formula to compute the great-circle distance, which represents the shortest distance between two points on a sphere (in this case, Earth).

### Parameters

The `calculateDistance` function accepts two parameters:

1. `origin` (Object): An object containing the latitude and longitude of the origin point. It should have the following structure:
2. `destination` (Object): An object containing the latitude and longitude of the destination point. It should have the same structure as the `origin` parameter.

Both `latitude` and `longitude` values should be in degrees.

### Return Value

The `calculateDistance` function returns the calculated distance in kilometers (km) between the `origin` and `destination` points.
