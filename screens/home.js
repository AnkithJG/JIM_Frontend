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

// Example usage in your main component
const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const handleTabPress = (tabName) => {
    setCurrentScreen(tabName);
    // Add your navigation logic here
    console.log(`Navigating to ${tabName}`);
  };

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
    // Add your date selection logic here
  };
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
            <Text style={styles.screenText}>Timeline Screen</Text>
          </View>
        );
      case 'Profile':
        return (
          <View style={styles.screen}>
            <Text style={styles.screenText}>Profile Screen</Text>
          </View>
        );
      case 'Shop':
        return (
          <View style={styles.screen}>
            <Text style={styles.screenText}>Shop Screen</Text>
          </View>
        );
      case 'Settings':
        return (
          <View style={styles.screen}>
            <Text style={styles.screenText}>Settings Screen</Text>
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
    backgroundColor: '#ff5b7a', // main screen background
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
    borderRadius: 24, // This makes it circular (half of width/height)
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Fixed typo: was 'overdflow'
  },
  activeIconWrapper: {
    backgroundColor: '#6a2230',
  },
});

export default HomeScreen;