import React, { useState, useEffect, use } from 'react';
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedP, setIsFocusedP] = useState(false);


  const imageScale = useSharedValue(0);
  const containerScale = useSharedValue(0);
  const usernameScale = useSharedValue(0);
  const passwordScale = useSharedValue(0);
  const signUpScale = useSharedValue(0);
  const cancelScale = useSharedValue(0);
  const loginScale = useSharedValue(0);

  useEffect(() => {
    imageScale.value = withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    });

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
    <Animated.Image
      source={require('../assets/copy.png')}
      style={[{ width: '100%', height: 130, resizeMode: 'contain' }, imageStyle]}
    />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.formContainer, containerStyle]}>
            <Animated.View style={[styles.inputGroup, usernameStyle]}>
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