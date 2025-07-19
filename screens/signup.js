import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Alert as RNAlert,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { Input, InputField } from "@/components/ui/input"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  
  // Focus states for styling
  const [focusedField, setFocusedField] = useState(null);
  
  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDay, setTempDay] = useState('');
  const [tempMonth, setTempMonth] = useState('');
  const [tempYear, setTempYear] = useState('');

  const navigation = useNavigation();

  // Animation values
  const imageScale = useSharedValue(0);
  const containerScale = useSharedValue(0);
  const usernameScale = useSharedValue(0);
  const phoneScale = useSharedValue(0);
  const emailScale = useSharedValue(0);
  const passwordScale = useSharedValue(0);
  const confirmPasswordScale = useSharedValue(0);
  const birthdateScale = useSharedValue(0);
  const loginLinkScale = useSharedValue(0);
  const cancelScale = useSharedValue(0);
  const createAccountScale = useSharedValue(0);

  useEffect(() => {
    imageScale.value = withTiming(1, {
      duration: 700,
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

    phoneScale.value = withDelay(500, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    emailScale.value = withDelay(600, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    passwordScale.value = withDelay(700, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    confirmPasswordScale.value = withDelay(800, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    birthdateScale.value = withDelay(900, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    loginLinkScale.value = withDelay(1000, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    cancelScale.value = withDelay(1100, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));

    createAccountScale.value = withDelay(1200, withTiming(1, {
      duration: 500,
      easing: Easing.bounce,
    }));
  }, []);

  // Animated styles
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

  const phoneStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: phoneScale.value }],
    };
  });

  const emailStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: emailScale.value }],
    };
  });

  const passwordStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: passwordScale.value }],
    };
  });

  const confirmPasswordStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: confirmPasswordScale.value }],
    };
  });

  const birthdateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: birthdateScale.value }],
    };
  });

  const loginLinkStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: loginLinkScale.value }],
    };
  });

  const cancelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cancelScale.value }],
    };
  });

  const createAccountStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: createAccountScale.value }],
    };
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      RNAlert.alert('Permission Needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Generate arrays for date picker
  const generateYears = () => {
    const years = [];
    for (let i = 2025; i >= 1900; i--) {
      years.push(i.toString());
    }
    return years;
  };

  const generateMonths = () => {
    return Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  };

  const getDaysInMonth = (month, year) => {
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (!monthNum || !yearNum) return 31;
    
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    return daysInMonth;
  };

  const generateDays = (month, year) => {
    const maxDays = getDaysInMonth(month, year);
    return Array.from({ length: maxDays }, (_, i) => (i + 1).toString().padStart(2, '0'));
  };

  const openDatePicker = () => {
    setTempDay(day);
    setTempMonth(month);
    setTempYear(year);
    setShowDatePicker(true);
  };

  const confirmDatePicker = () => {
    setDay(tempDay);
    setMonth(tempMonth);
    setYear(tempYear);
    setShowDatePicker(false);
  };

  const cancelDatePicker = () => {
    setTempDay(day);
    setTempMonth(month);
    setTempYear(year);
    setShowDatePicker(false);
  };

  const formatBirthdate = () => {
    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }
    return '';
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      RNAlert.alert('Error', 'Passwords do not match');
      return;
    }

    const birthdate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

    const backendURL = Platform.select({
      android: Config.ANDROID_BACKEND_URL,
      ios: Config.IOS_BACKEND_URL,
      default: Config.WEB_BACKEND_URL,
    });

    try {
      const response = await axios.post(`http://192.168.1.138:3000/signup`, {
        username,
        phoneNumber,
        email,
        password,
        birthdate,
      });

      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        navigation.navigate('Home');
      }

      if (response.data.message) {
        RNAlert.alert('Success', 'Account created successfully!');
        navigation.navigate('Home');
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data?.error || err.message);
      RNAlert.alert('Error', err.response?.data?.error || 'Signup failed');
    }
  };

  const handleCancel = () => {
    setUsername('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDay('');
    setMonth('');
    setYear('');
    setProfileImage(null);
  };

  const getInputStyle = (fieldName) => ({
    width: '100%',
    height: 50,
    backgroundColor: '#6a2230',
    borderRadius: 40,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 16,
    borderWidth: focusedField === fieldName ? 2 : 0,
    borderColor: focusedField === fieldName ? '#fff' : 'transparent',
  });

  const getDateInputStyle = (fieldName) => ({
    height: 50,
    backgroundColor: '#6a2230',
    borderRadius: 40,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
    textAlign: 'center',
    borderWidth: focusedField === fieldName ? 2 : 0,
    borderColor: focusedField === fieldName ? '#fff' : 'transparent',
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.imageContainer}>
            <Animated.View style={[styles.profileImageContainer, imageStyle]}>
              <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                  <View style={styles.profileImagePlaceholder}>
                    <MaterialIcons name="add-a-photo" size={40} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Animated.View style={[styles.formContainer, containerStyle]}>
            <Animated.View style={[styles.inputGroup, usernameStyle]}>
              <Text style={styles.label}>Username</Text>
              <Input style={getInputStyle('username')}>
                <InputField
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                  placeholderTextColor="#ddd"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}
                />
              </Input>
            </Animated.View>

            <Animated.View style={[styles.inputGroup, phoneStyle]}>
              <Text style={styles.label}>Phone Number</Text>
              <Input style={getInputStyle('phone')}>
                <InputField
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Enter phone number"
                  placeholderTextColor="#ddd"
                  keyboardType="phone-pad"
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}
                />
              </Input>
            </Animated.View>

            <Animated.View style={[styles.inputGroup, emailStyle]}>
              <Text style={styles.label}>Email</Text>
              <Input style={getInputStyle('email')}>
                <InputField
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email address"
                  placeholderTextColor="#ddd"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}
                />
              </Input>
            </Animated.View>

            <Animated.View style={[styles.inputGroup, passwordStyle]}>
              <Text style={styles.label}>Password</Text>
              <Input style={getInputStyle('password')}>
                <InputField
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  placeholderTextColor="#ddd"
                  secureTextEntry
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}
                />
              </Input>
            </Animated.View>

            <Animated.View style={[styles.inputGroup, confirmPasswordStyle]}>
              <Text style={styles.label}>Confirm Password</Text>
              <Input style={getInputStyle('confirmPassword')}>
                <InputField
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  placeholderTextColor="#ddd"
                  secureTextEntry
                  autoCapitalize="none"
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    color: '#fff',
                    fontSize: 16,
                  }}
                />
              </Input>
            </Animated.View>

            <Animated.View style={[styles.inputGroup, birthdateStyle]}>
              <Text style={styles.label}>Birthdate</Text>
              <TouchableOpacity onPress={openDatePicker} style={styles.datePickerButton}>
                <Text style={styles.datePickerText}>
                  {formatBirthdate() || 'Select Date'}
                </Text>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="#ddd" />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.loginPrompt, loginLinkStyle]}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.buttonContainer}>
              <Animated.View style={[cancelStyle]}>
                <TouchableOpacity onPress={handleCancel} style={styles.button}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={[createAccountStyle]}>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>

          {/* Date Picker Modal */}
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="fade"
            onRequestClose={cancelDatePicker}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Birthdate</Text>
                
                <View style={styles.pickerContainer}>
                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Day</Text>
                    <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                      {generateDays(tempMonth, tempYear).map((d) => (
                        <TouchableOpacity
                          key={d}
                          style={[
                            styles.pickerOption,
                            tempDay === d && styles.pickerOptionSelected
                          ]}
                          onPress={() => setTempDay(d)}
                        >
                          <Text style={[
                            styles.pickerOptionText,
                            tempDay === d && styles.pickerOptionTextSelected
                          ]}>
                            {d}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Month</Text>
                    <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                      {generateMonths().map((m) => (
                        <TouchableOpacity
                          key={m}
                          style={[
                            styles.pickerOption,
                            tempMonth === m && styles.pickerOptionSelected
                          ]}
                          onPress={() => setTempMonth(m)}
                        >
                          <Text style={[
                            styles.pickerOptionText,
                            tempMonth === m && styles.pickerOptionTextSelected
                          ]}>
                            {m}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerLabel}>Year</Text>
                    <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                      {generateYears().map((y) => (
                        <TouchableOpacity
                          key={y}
                          style={[
                            styles.pickerOption,
                            tempYear === y && styles.pickerOptionSelected
                          ]}
                          onPress={() => setTempYear(y)}
                        >
                          <Text style={[
                            styles.pickerOptionText,
                            tempYear === y && styles.pickerOptionTextSelected
                          ]}>
                            {y}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity onPress={cancelDatePicker} style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmDatePicker} style={[styles.modalButton, styles.modalButtonConfirm]}>
                    <Text style={styles.modalButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#c13e58',
    borderRadius: 25,
    padding: 25,
    paddingTop: 90,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 15,
    position: 'relative',
    marginTop: -60,
  },
  imageContainer: {
    alignItems: 'center',
    paddingBottom: 0,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6a2230',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    overflow: 'hidden',
    zIndex: 1,
  },
  imagePickerButton: {
    width: '100%',
    height: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#6a2230',
    borderRadius: 40,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#c13e58',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#6a2230',
    borderRadius: 10,
    maxHeight: 150,
  },
  pickerOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  pickerOptionSelected: {
    backgroundColor: '#279CF6',
  },
  pickerOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  pickerOptionTextSelected: {
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#6a2230',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonConfirm: {
    backgroundColor: '#279CF6',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginPrompt: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 15,
  },
  loginLink: {
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

export default SignupScreen;