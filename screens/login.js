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
  Image,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert"
import { InfoIcon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const handleLogin = async () => {
    if (!username || !password) {
      <Alert action="error" variant="solid">
        <AlertIcon as={InfoIcon} />
        <AlertText>Please enter your username and password</AlertText>
    </Alert>
      return;
    }

    const backendURL = Platform.select({
      android: Config.ANDROID_BACKEND_URL,
      ios: Config.IOS_BACKEND_URL,
      default: Config.WEB_BACKEND_URL,
    });

    try {
      const response = await axios.post(`http://10.0.2.2:3000/login`, {
        username,
        password,
      });

      if (response.data.token) {
        navigation.navigate('Home');
        <Alert action="success" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>Login Successful</AlertText>
        </Alert>
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.error || err.message);
      <Alert action="error" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>Login failed. Please check your credentials.</AlertText>
      </Alert>
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
      <Alert action="info" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>Navigating to signup page...</AlertText>
      </Alert>
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/copy.png')}
        style={{ width: '100%', height: 115, resizeMode: 'contain' }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
                <Input
                  style={{
                    width: '100%',
                    height: 50,
                    //backgroundColor: '#8f2e3f',
                    backgroundColor: '#6a2230',
                    borderRadius: 40,
                    paddingHorizontal: 10,
                    color: '#fff',
                    fontSize: 16,
                    borderWidth: isFocused ? 2 : 0,
                    borderColor: isFocused ? '#fff' : 'transparent',
                  }}
                >
                  <InputField
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                    placeholderTextColor="#ddd"
                    autoCapitalize="none"
                    keyboardType="username-address"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}
                  />
                </Input>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <Input
                style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: '#6a2230',
                    borderRadius: 40,
                    paddingHorizontal: 10,
                    color: '#fff',
                    fontSize: 16,
                    borderWidth: isFocusedP ? 2 : 0,
                    borderColor: isFocusedP ? '#fff' : 'transparent',
                }}
              >
                <InputField
                  type="password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  autoCapitalize="none"
                  onFocus={() => setIsFocusedP(true)}
                  onBlur={() => setIsFocusedP(false)}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    height: 50,
                  }}
                />
              </Input>
            </View>

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={navigateToSignup}>
                <Text style={styles.signupLink}>Sign Up!</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancel} style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
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
    paddingTop: 60, 
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
    //backgroundColor: '#ff5b7a',
    backgroundColor: '#c13e58',
    borderRadius: 25,
    padding: 25,
    paddingTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 15,
    position: 'relative',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  signupPrompt: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 15,
  },
  signupLink: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    width: 100,          
    height: 50,          
    borderRadius: 16,    
    backgroundColor: '#3b84d8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },  

});

export default LoginScreen;