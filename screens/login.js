import React, { useState, useEffect } from 'react';
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
  Alert as RNAlert,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { Alert, AlertText, AlertIcon } from "@/components/ui/alert"
import { InfoIcon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedP, setIsFocusedP] = useState(false);
  const [showAlert, setShowAlert] = useState(null); // For managing alerts

  // Separate animations for image and form elements
  const imageScale = useSharedValue(0);
  const containerScale = useSharedValue(0);
  const usernameScale = useSharedValue(0);
  const passwordScale = useSharedValue(0);
  const signUpScale = useSharedValue(0);
  const cancelScale = useSharedValue(0);
  const loginScale = useSharedValue(0);

  useEffect(() => {
    // Image appears first
    imageScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.bounce,
    });

    // Then the form container
    containerScale.value = withDelay(200, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    usernameScale.value = withDelay(400, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));
    
    passwordScale.value = withDelay(600, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    signUpScale.value = withDelay(800, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    cancelScale.value = withDelay(1000, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    loginScale.value = withDelay(1200, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));
  }, []);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: imageScale.value }],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: containerScale.value }],
    };
  });

  const usernameStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: usernameScale.value }],
    };
  });

  const passwordStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: passwordScale.value }],
    };
  });

  const signUpStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: signUpScale.value }],
    };
  });

  const cancelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cancelScale.value }],
    };
  });

  const loginStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: loginScale.value }],
    };
  });

  const handleLogin = async () => {
    if (!username || !password) {
      RNAlert.alert('Error', 'Please enter your username and password');
      return;
    }

    const backendURL = Platform.select({
      android: Config.ANDROID_BACKEND_URL,
      ios: Config.IOS_BACKEND_URL,
      default: Config.WEB_BACKEND_URL,
    });

    try {
      const response = await axios.post(`http://192.168.1.138:3000/login`, {
        username,
        password,
      });

      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        navigation.navigate('Home');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.error || err.message);
      RNAlert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContainer}>
            {/* Image section - now inside the scrollable container */}
            <Animated.View style={[styles.imageContainer, imageStyle]}>
              <Image
                source={require('../assets/copy.png')}
                style={styles.image}
              />
            </Animated.View>

            {/* Form section */}
            <Animated.View style={[styles.formContainer, containerStyle]}>
              <Animated.View style={[styles.inputGroup, usernameStyle]}>
                <Text style={styles.label}>Username</Text>
                <Input
                  style={{
                    width: '100%',
                    height: 50,
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
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}
                  />
                </Input>
              </Animated.View>

              <Animated.View style={[styles.inputGroup, passwordStyle]}>
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
                    secureTextEntry={true}
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
              </Animated.View>

              <Animated.View style={[styles.signupPrompt, signUpStyle]}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={styles.signupLink}>Sign Up!</Text>
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.buttonContainer}>
                <Animated.View style={[cancelStyle]}>
                  <TouchableOpacity onPress={handleCancel} style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[loginStyle]}>
                  <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>
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
    paddingTop: 60, // Reduced to move logo up
    paddingBottom: 60, // Added bottom padding
  },
  mainContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 75, // Reduced margin for tighter spacing
  },
  image: {
    width: 300, // Fixed width instead of percentage
    height: 120,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
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
    backgroundColor: '#279CF6',
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