import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import GoogleMapScreen from './GoogleMapScreen.js';

function WaitingForCallScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <GoogleMapScreen />
        <View style={styles.eta}>
          <Text style={styles.waitingSummonText}>Waiting For Summon</Text>
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
});

export default WaitingForCallScreen;
