import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import GoogleMapScreen from './GoogleMapScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import DriverEnRouteScreen from './DriverEnRouteScreen.js';


function WaitingForCallScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <GoogleMapScreen />
        <View style={styles.eta}>
          <Text style={{fontWeight: 'bold', fontSize: 20 }}>You have been summoned</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('SummoningAmbulance')}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('DriverEnRoute')}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitingSummonText: {
    fontSize: 30,
  },
  innerView: {
    width: '100%',
    height: '100%',
    padding: 5,
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
  cancelButton: {
    backgroundColor: 'red',
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: '#39FF14',
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default WaitingForCallScreen;
