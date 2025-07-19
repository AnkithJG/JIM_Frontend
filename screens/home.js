import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from './calendar'; 
import { useNavigation } from '@react-navigation/native';
// Login Screen Component
const Login = ({ onLogin }) => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Welcome Back</Text>
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={onLogin}
      >
        <Text style={styles.loginButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};



const CustomBottomNavigation = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'calendar' },
    { name: 'Timeline', icon: 'time' },
    { name: 'Profile', icon: 'person' },
    { name: 'Shop', icon: 'cart' },
    { name: 'Settings', icon: 'settings' },
  ];

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    if (onTabPress) onTabPress(tabName);
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handleTabPress(tab.name)}
              style={styles.tabButton}
            >
              <View style={[styles.iconWrapper, isActive && styles.activeIconWrapper]}>
                <Icon
                  name={isActive ? tab.icon : `${tab.icon}-outline`}
                  size={35}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Home');

    const navigation = useNavigation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.navigate('Login'); // Reset to home screen
  };

  const handleTabPress = (tabName) => {
    setCurrentScreen(tabName);
    console.log(`Navigating to ${tabName}`);
  };

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
            <CustomCalendar onDateSelect={handleDateSelect} />
          </ScrollView>
        );
      case 'Timeline':
        return (
          <View style={styles.screen}>
          </View>
        );
      case 'Profile':
        return (
          <View style={styles.screen}>
          </View>
        );
      case 'Shop':
        return (
          <View style={styles.screen}>
          </View>
        );
      case 'Settings':
        return (
          <View style={styles.screen}>
            <View style={styles.settingsContainer}>
              <Text style={styles.screenText}>Settings Screen</Text>
              <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <SafeAreaView style={{ backgroundColor: '#c13e58' }}>
        <CustomBottomNavigation onTabPress={handleTabPress} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ff5b7a',
  },
  content: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  screenText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: '#279CF6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#ff5b7a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loginTitle: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#279CF6',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navContainer: {
    backgroundColor: '#c13e58',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 10,
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  activeIconWrapper: {
    backgroundColor: '#6a2230',
  },
});

export default App;