import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';

function AmbulansyaBanner() {
  return (
    <View>
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={require('../images/ambulansyaFrontPage.jpg')}
      />
      <Text style={styles.appName}>AMBULANSYA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    opacity: 90,
    width: 400,
    height: 200,
    overflow: 'visible',
    resizeMode: 'cover',
    marginTop: 30,
  },
  appName: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 45,
    letterSpacing: 5,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
  },
});

export default AmbulansyaBanner;
