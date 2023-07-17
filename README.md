# A smart summoning mobile application for the nearest ambulance available

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.1 or higher)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

### Steps
1. Clone the repository:
```
git clone https://github.com/shemlosdoc/Ambulansya.git
```

2. Install dependencies:
`npm install @react-navigation/native`
`npm install @react-navigation/native-stack`
`npm install @react-native-firebase/auth`
`npm install react-native-maps`
`npm install react-native-geolocation-service`
`npm install react-native-permissions`
`npm install @mapbox/polyline`

3. Run the application:
`npx react-native start`
`npx react-native run-android`

## Dependencies

The following dependencies are required for this project:

- React Native (version 9.7.2)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [react-native-google-maps](https://github.com/react-native-maps/react-native-google-maps)
- [firebase](https://firebase.google.com/)

Install these dependencies by running the following command in your project folder:

## Google Maps API

To utilize Google Maps in this project, follow these steps:

1. Enable the Google Maps API:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Enable the Google Maps JavaScript API for your project.

2. Obtain an API key:
   - Go to the [APIs & Services](https://console.cloud.google.com/apis/credentials) page.
   - Click on "Create credentials" and select "API key".
   - Copy the generated API key.

3. Integrate the API key in your project:
   - Open the `AndroidManifest.xml` file.
   - Add the following within the `<application>` tag:
     ```
     <meta-data
       android:name="com.google.android.geo.API_KEY"
       android:value="YOUR_API_KEY_HERE" />
     ```
   - Replace `YOUR_API_KEY_HERE` with the API key obtained in the previous step.

## Google Cloud Console

To use Google Cloud Console in this project, follow these steps:

1. Enable the necessary APIs:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project or select an existing one.
   - Enable the required APIs, such as Firebase Cloud Messaging (FCM) or Firestore.

2. Obtain the required credentials:
   - Depending on the APIs used, you might need to obtain specific credentials (e.g., service account key, OAuth 2.0 client ID).

3. Integrate the credentials in your project:
   - Follow the documentation provided by the respective APIs to integrate the credentials properly.

## Firebase

To use Firebase in this project, follow these steps:

1. Set up a Firebase project:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or select an existing one.

2. Integrate Firebase SDKs:
   - Follow the Firebase documentation to integrate the required SDKs into your project.

3. Configure Firebase services:
   - Enable the necessary Firebase services (e.g., Firestore, Authentication, Cloud Messaging) through the Firebase Console.

4. Update project configurations:
   - Update the Firebase configuration in `config.js` with your project-specific settings.

For more detailed instructions and specific implementation details, refer to the respective documentation of each dependency and service.

