import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Settings = ({ navigation }) => {
  const [streakReminders, setStreakReminders] = useState(true);
  const [rewardNotifications, setRewardNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your workout data, streaks, and rewards.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Account deleted');
          },
        },
      ]
    );
  };

  const handleResetAppData = () => {
    Alert.alert(
      'Reset App Data',
      'This will clear all local app data and cache. Your account, streaks, and workout history will remain safe on our servers.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            console.log('App data reset');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ff6b8a" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Update contact')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="email" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Update Email or Phone</Text>
                  <Text style={styles.settingsSubtitle}>Change your contact information</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Change password')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="lock" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Change Password</Text>
                  <Text style={styles.settingsSubtitle}>Update your account password</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Edit username')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="person" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Edit Username</Text>
                  <Text style={styles.settingsSubtitle}>Modify your display name</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={handleDeleteAccount}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="delete-forever" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={[styles.settingsTitle, styles.destructiveText]}>Delete Account</Text>
                  <Text style={styles.settingsSubtitle}>Permanently delete your account</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Edit birthdate')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="cake" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Edit Birthdate</Text>
                  <Text style={styles.settingsSubtitle}>Used for age verification and rewards</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Preferred units')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="straighten" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Preferred Units</Text>
                  <Text style={styles.settingsSubtitle}>Choose between metric and imperial</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Streak & Reward Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streak & Reward Settings</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="local-fire-department" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Streak Reminders</Text>
                  <Text style={styles.settingsSubtitle}>Daily workout reminders at 7 PM</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Switch
                  value={streakReminders}
                  onValueChange={setStreakReminders}
                  trackColor={{ false: '#6a2230', true: '#279CF6' }}
                  thumbColor={streakReminders ? '#fff' : '#fff'}
                />
              </View>
            </View>

            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="card-giftcard" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Reward Notifications</Text>
                  <Text style={styles.settingsSubtitle}>Get notified when rewards are unlocked</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Switch
                  value={rewardNotifications}
                  onValueChange={setRewardNotifications}
                  trackColor={{ false: '#6a2230', true: '#279CF6' }}
                  thumbColor={rewardNotifications ? '#fff' : '#fff'}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Workout Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Settings</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Workout settings')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="fitness-center" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Default Workout Settings</Text>
                  <Text style={styles.settingsSubtitle}>Set default duration and intensity</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Macro tracking')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="restaurant" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Macro Tracking Units</Text>
                  <Text style={styles.settingsSubtitle}>Coming soon - nutrition tracking</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Goal preferences')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="flag" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Goal Preferences</Text>
                  <Text style={styles.settingsSubtitle}>Muscle gain, weight loss, endurance</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="dark-mode" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Dark Mode</Text>
                  <Text style={styles.settingsSubtitle}>Switch between light and dark theme</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#6a2230', true: '#279CF6' }}
                  thumbColor={darkMode ? '#fff' : '#fff'}
                />
              </View>
            </View>

            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="notifications" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Push Notifications</Text>
                  <Text style={styles.settingsSubtitle}>Receive app notifications</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: '#6a2230', true: '#279CF6' }}
                  thumbColor={pushNotifications ? '#fff' : '#fff'}
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Language settings')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="language" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Language</Text>
                  <Text style={styles.settingsSubtitle}>Choose your preferred language</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Data export')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="download" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Data Export</Text>
                  <Text style={styles.settingsSubtitle}>Download your workout history</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Privacy policy')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="privacy-tip" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Privacy Policy</Text>
                  <Text style={styles.settingsSubtitle}>View our privacy policy</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Terms of use')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="description" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Terms of Use</Text>
                  <Text style={styles.settingsSubtitle}>Read our terms and conditions</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('App permissions')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="security" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>App Permissions</Text>
                  <Text style={styles.settingsSubtitle}>Manage app permissions</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Report bug')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="bug-report" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Report a Bug</Text>
                  <Text style={styles.settingsSubtitle}>Help us improve the app</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={() => console.log('Contact support')}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="support-agent" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>Contact Support</Text>
                  <Text style={styles.settingsSubtitle}>Get help from our team</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>

            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="info" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={styles.settingsTitle}>App Version</Text>
                  <Text style={styles.settingsSubtitle}>Version 1.0.0</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.settingsItem} 
              onPress={handleResetAppData}
              activeOpacity={0.7}
            >
              <View style={styles.settingsItemLeft}>
                <View style={styles.settingsIcon}>
                  <Icon name="refresh" size={20} color="#fff" />
                </View>
                <View style={styles.settingsTextContainer}>
                  <Text style={[styles.settingsTitle, styles.destructiveText]}>Reset App Data</Text>
                  <Text style={styles.settingsSubtitle}>Clear local cache and data</Text>
                </View>
              </View>
              <View style={styles.settingsItemRight}>
                <Icon name="chevron-right" size={24} color="rgba(255,255,255,0.6)" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ff5b7a',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  sectionContent: {
    backgroundColor: '#c13e58',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6a2230',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  settingsItemRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  destructiveText: {
    color: '#ff4757',
  },
  bottomSpacing: {
    height: 100,
  },
    backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#c13e58',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Settings;