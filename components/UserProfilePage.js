import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';

const UserProfilePage = () => {
  const userProfileImage = require('../images/janiProfPic.jpeg');
  const userProfileMapsImage = require('../images/userProfileMapsImage.jpg');
  const userName = 'Johnny Navarro';
  const userAddress = 'Tuyom, Carcar City, Cebu ';

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Login'); // Replace 'Login' with the appropriate screen name for your login screen
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profView}>
        <Image source={userProfileImage} style={styles.profilePicture} />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userAddress}>{userAddress}</Text>
      </View>
      <TouchableOpacity>
        <Image source={require('../images/telephoneCall.png')} style={styles.telephoneIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={userProfileMapsImage} style={styles.userProfileMapsImage} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  profView: {
    padding: 40,
    flex: 1,
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userProfileMapsImage: {
    width: 320,
    height: 350,
    borderRadius: 5,
    marginBottom: 20,
  },
  userName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userAddress: {
    fontSize: 15,
  },
  telephoneIcon: {
    width: 32,
    height: 32,
    marginBottom: 25,
  },
  logoutButton: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default UserProfilePage;
