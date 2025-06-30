import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Main Content Area */}
      <View style={styles.content}>
        {/* Extra Large Mascot */}
        <Image 
          source={require('../assets/mascot1.png')} 
          style={styles.mascot}
          resizeMode="contain"
        />
        
        {/* Very Large Streak Container */}
        <View style={styles.streakContainer}>
          <Image 
            source={require('../assets/bluefire.png')} 
            style={styles.fireIcon}
            resizeMode="contain"
          />
          <View style={styles.streakTextContainer}>
            <Text style={styles.streakNumber}>7</Text>
            <Text style={styles.streakLabel}>Day{'\n'}Streak</Text>
          </View>
        </View>
        
        {/* Shop Timeline Text with Stacked Effect */}
        <View style={styles.titleArea}>
          <Text style={styles.title}>SHOP TIMELINE</Text>
          <Text style={[styles.title, styles.titleShadow1]}>SHOP TIMELINE</Text>
          <Text style={[styles.title, styles.titleShadow2]}>SHOP TIMELINE</Text>
    
        </View>
        
        {/* Main Content Card */}
        <View style={styles.card}>
          {/* Card content would go here */}
        </View>
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user-o" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5b7a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
    position: 'relative',
  },
  mascot: {
    width: width * 0.45,
    height: width * 0.45,
    position: 'absolute',
    top: 0,
    left: 15,
    zIndex: 10,
  },
  streakContainer: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b7bd8',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: width * 0.45,
    justifyContent: 'center',
  },
  fireIcon: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  streakTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
  },
  streakLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 20,
  },
  titleArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: width * 0.4,
    position: 'relative',
    height: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    zIndex: 5,
  },
  titleShadow1: {
    top: 3,
    opacity: 0.7,
  },
  titleShadow2: {
    top: 6,
    opacity: 0.4,
  },
  blueBar: {
    position: 'absolute',
    height: 100,
    width: 30,
    backgroundColor: '#3b7bd8',
    borderRadius: 15,
    left: '55%',
    top: -25,
    zIndex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(230, 77, 109, 0.7)',
    borderRadius: 15,
    marginTop: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ff5b7a',
    height: 60,
    paddingBottom: 5,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default HomeScreen;