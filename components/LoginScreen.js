import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

import AmbulansyaBanner from './AmbulansyaBanner.js';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUserUID = async () => {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          resolve(uid);
        } else {
          reject(new Error('User not logged in'));
        }
      });
    });
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        console.log('Login Success');
        try {
          const uid = await getUserUID();
          console.log(uid);
          if (uid === 'n3l9FXhDdmXZFuy38oFNPfW4qqq1') {
            navigation.navigate('UserProfile');
          } else {
            navigation.navigate('SummoningAmbulance');
          }
        } catch (error) {
          console.log('Error getting user UID:', error);
        }
      })
      .catch((error) => {
        console.log('Login Error', error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AmbulansyaBanner />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordRedirect}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserModeSelect')}>
        <Text style={styles.SignupRedirect}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  forgotPasswordRedirect: {
    height: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
  SignupRedirect: {
    height: 30,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 5,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LoginScreen;
