import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBottomNavigation = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: 'calendar', label: 'Calendar' },
    { name: 'Timeline', icon: 'time', label: 'Timeline' },
    { name: 'Profile', icon: 'person', label: 'Profile' },
    { name: 'Shop', icon: 'storefront', label: 'Shop' },
    { name: 'Settings', icon: 'settings', label: 'Settings' },
  ];

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    if (onTabPress) {
      onTabPress(tabName);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tabButton,
              activeTab === tab.name && styles.activeTab,
            ]}
            onPress={() => handleTabPress(tab.name)}
          >
            <Icon
              name={activeTab === tab.name ? tab.icon : `${tab.icon}-outline`}
              size={24}
              color={activeTab === tab.name ? '#ff5b7a' : '#666'}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.name && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <View style={styles.screen}>
            <Text style={styles.screenText}>Home Screen</Text>
          </View>
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
      <CustomBottomNavigation onTabPress={handleTabPress} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#f0f0f0',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    color: '#666',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#ff5b7a',
    fontWeight: '600',
  },
});


export default HomeScreen;