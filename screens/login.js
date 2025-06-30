import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Config from 'react-native-config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    const backendURL = Platform.select({
      android: Config.ANDROID_BACKEND_URL,
      ios: Config.IOS_BACKEND_URL,
      default: Config.WEB_BACKEND_URL,
    });

    try {
      const response = await axios.post(`http://10.0.2.2:3000/login`, {
        email,
        password,
      });

      if (response.data.token) {
        navigation.navigate('Home');
        Alert.alert('Success', 'Login successful!');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.error || err.message);
      Alert.alert('Error', err.response?.data?.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
    Alert.alert('Navigation', 'Navigating to Sign Up page');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImagePlaceholder} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#a55"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#a55"
                secureTextEntry
              />
            </View>

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={styles.signupLink}>Sign Up!</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <MaterialIcons name="close" size={32} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
                <MaterialIcons name="check" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5b7a',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 91, 122, 0.6)',
    borderRadius: 25,
    padding: 25,
    paddingTop: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    position: 'relative',
  },
  profileImageContainer: {
    position: 'absolute',
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#c13e58',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    overflow: 'hidden',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#c13e58',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#c13e58',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  signupPrompt: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 14,
  },
  signupLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  cancelButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b84d8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b84d8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default LoginScreen;