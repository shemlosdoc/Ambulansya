import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

function CallReceivedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.gmapView}></View>
      <TouchableOpacity>ACCEPT</TouchableOpacity>
      <TouchableOpacity>DECLINE</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // put smth here
  },
  gmapView: {
    // put smth here
  },
});

export default CallReceivedScreen;
