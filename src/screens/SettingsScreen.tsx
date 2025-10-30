// src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G, ClipPath, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../constants/colors';

const profileIcon = require('../assets/img/profileIcon.png');

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive' },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' },
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    hasSwitch = false, 
    switchValue, 
    onSwitchChange,
    onPress,
    isDestructive = false 
  }: any) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, isDestructive && styles.destructiveIcon]}>
          {icon}
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingTitle, isDestructive && styles.destructiveText]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#f0f0f0', true: COLORS.primary }}
          thumbColor="#fff"
        />
      ) : (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <G clipPath="url(#clip0_1_17092)">
            <Path 
              d="M8.35011 5L7.17511 6.175L10.9918 10L7.17511 13.825L8.35011 15L13.35011 10L8.35011 5Z" 
              fill={isDestructive ? "#FF3B30" : "#323232"} 
            />
          </G>
          <Defs>
            <ClipPath id="clip0_1_17092">
              <Rect width="20" height="20" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <G clipPath="url(#clip0_1_7348)">
              <Path
                d="M21 11.01L3 11V13H21V11.01ZM3 16H15V18H3V16ZM21 6H3V8.01L21 8V6Z"
                fill="#323232"
              />
            </G>
            <Defs>
              <ClipPath id="clip0_1_7348">
                <Rect width="24" height="24" rx="12" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </TouchableOpacity>

        <View style={styles.Logoflex}>
          <Svg width="38" height="38" viewBox="0 0 125 100" fill="none">
            <Path
              d="M124.993 49.9986C124.993 36.7382 119.725 24.0208 110.349 14.6442C100.972 5.2677 88.255 1.7389e-06 74.9947 0C61.7343 -1.73889e-06 49.017 5.2677 39.6404 14.6442C30.2638 24.0208 24.9961 36.7382 24.9961 49.9986H40.6209C45.7984 49.9986 49.8363 45.6597 51.7328 40.8418C52.9778 37.6787 54.8672 34.7718 57.3174 32.3213C62.0057 27.6331 68.3645 24.9993 74.9947 24.9993C81.6249 24.9993 87.9837 27.6331 92.6719 32.3213C97.3602 37.0096 99.9938 43.3684 99.9938 49.9986H124.993Z"
              fill="url(#paint0)"
            />
            <Path
              d="M96.1908 69.1352C98.7035 63.069 99.9969 56.5675 99.9969 50.0017H124.993C124.993 77.6151 102.608 100 74.9949 100C70.6705 100 66.474 99.4511 62.4723 98.4191C64.7365 97.8357 66.962 97.0928 69.1318 96.1942C75.1979 93.6815 80.7097 89.9988 85.3525 85.356C89.9954 80.7131 93.6784 75.2013 96.1908 69.1352Z"
              fill="#4392F9"
            />
            <Path
              d="M0 49.9954C-9.3931e-07 56.5615 1.29325 63.0631 3.8059 69.1292C6.31858 75.1954 10.0014 80.7072 14.6442 85.35C19.287 89.9925 24.7988 93.6755 30.8649 96.1882C36.931 98.7009 43.4325 99.994 49.9986 99.994C56.5643 99.994 63.0659 98.7009 69.1321 96.1882C75.1982 93.6755 80.71 89.9925 85.3528 85.35C89.9957 80.7072 93.6784 75.1954 96.1911 69.1292C98.7038 63.0631 99.9972 56.5615 99.9972 49.9954H84.3724C79.1948 49.9954 75.157 54.3343 73.2605 59.1519C73.2067 59.2892 73.1512 59.4258 73.0948 59.5625C71.8385 62.5954 69.9971 65.3515 67.6756 67.6727C65.3543 69.994 62.5982 71.8356 59.5653 73.092C56.5324 74.3483 53.2816 74.9949 49.9986 74.9949C46.7156 74.9949 43.4648 74.3483 40.4319 73.092C37.3986 71.8356 34.6429 69.994 32.3213 67.6727C30 65.3515 28.1586 62.5954 26.9022 59.5625C25.6459 56.5293 24.9993 53.2785 24.9993 49.9954H0Z"
              fill="url(#paint1)"
            />
            <Defs>
              <LinearGradient id="paint0" x1="124.993" y1="24.9993" x2="24.9961" y2="24.9993" gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor="#CFE2FC" />
                <Stop offset="1" stopColor="#4392F9" />
              </LinearGradient>
              <LinearGradient id="paint1" x1="0" y1="74.9949" x2="99.9972" y2="74.9949" gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor="#F8BCC6" />
                <Stop offset="1" stopColor="#F83758" />
              </LinearGradient>
            </Defs>
          </Svg>
          <Text style={styles.logo}>Stylish</Text>
        </View>

        <TouchableOpacity>
          <Image source={profileIcon} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Settings</Text>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileCard}>
            <Image source={profileIcon} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M10 16.25C13.4518 16.25 16.25 13.4518 16.25 10C16.25 6.54822 13.4518 3.75 10 3.75C6.54822 3.75 3.75 6.54822 3.75 10C3.75 13.4518 6.54822 16.25 10 16.25Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M10 6.25V10L12.5 11.25"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Notifications"
              subtitle="Receive order updates and promotions"
              hasSwitch={true}
              switchValue={notifications}
              onSwitchChange={setNotifications}
            />

            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                  />
                  <Path
                    d="M10 6.25V10L12.5 11.25"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Dark Mode"
              subtitle="Switch between light and dark theme"
              hasSwitch={true}
              switchValue={darkMode}
              onSwitchChange={setDarkMode}
            />

            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M7.5 9.16667H5.83333C5.39131 9.16667 4.96738 9.34226 4.65482 9.65482C4.34226 9.96738 4.16667 10.3913 4.16667 10.8333V15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333V10.8333C15.8333 10.3913 15.6577 9.96738 15.3452 9.65482C15.0326 9.34226 14.6087 9.16667 14.1667 9.16667H12.5"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M9.16667 13.3333V4.16667C9.16667 3.72464 9.34226 3.30072 9.65482 2.98816C9.96738 2.67559 10.3913 2.5 10.8333 2.5C11.2754 2.5 11.6993 2.67559 12.0118 2.98816C12.3244 3.30072 12.5 3.72464 12.5 4.16667V9.16667"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M7.5 9.16667L10 11.6667L12.5 9.16667"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Biometric Login"
              subtitle="Use fingerprint or face ID"
              hasSwitch={true}
              switchValue={biometric}
              onSwitchChange={setBiometric}
            />

            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M17.5 3.75H2.5C2.15482 3.75 1.875 4.02982 1.875 4.375V15.625C1.875 15.9702 2.15482 16.25 2.5 16.25H17.5C17.8452 16.25 18.125 15.9702 18.125 15.625V4.375C18.125 4.02982 17.8452 3.75 17.5 3.75Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M1.875 6.25H18.125"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Marketing Emails"
              subtitle="Receive news and special offers"
              hasSwitch={true}
              switchValue={marketingEmails}
              onSwitchChange={setMarketingEmails}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M10 13.75V10"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M10 6.25H10.0083"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Help Center"
              subtitle="Get help with your account"
            />

            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M7.57495 7.50002C7.77087 6.94308 8.15758 6.47344 8.66658 6.17429C9.17558 5.87515 9.77403 5.7658 10.3559 5.86561C10.9377 5.96543 11.4656 6.26796 11.8458 6.71963C12.2261 7.1713 12.4342 7.74298 12.4333 8.33335C12.4333 10 9.93328 10.8334 9.93328 10.8334"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M10 14.1667H10.0083"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Contact Us"
              subtitle="Reach out to our support team"
            />

            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M10 5V10L13.3333 11.6667"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="About Us"
              subtitle="Learn more about Stylish"
            />

            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M15.8333 17.5V15.8333C15.8333 14.9493 15.4821 14.1014 14.857 13.4763C14.2319 12.8512 13.384 12.5 12.5 12.5H7.5C6.61595 12.5 5.7681 12.8512 5.143 13.4763C4.51785 14.1014 4.16667 14.9493 4.16667 15.8333V17.5"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M10 9.16667C11.3807 9.16667 12.5 8.04738 12.5 6.66667C12.5 5.28595 11.3807 4.16667 10 4.16667C8.61929 4.16667 7.5 5.28595 7.5 6.66667C7.5 8.04738 8.61929 9.16667 10 9.16667Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Privacy Policy"
              subtitle="How we handle your data"
            />
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M13.3333 5V4.33333C13.3333 3.44928 12.9821 2.60143 12.357 1.97631C11.7319 1.35119 10.884 1 10 1C9.11595 1 8.2681 1.35119 7.64298 1.97631C7.01786 2.60143 6.66667 3.44928 6.66667 4.33333V5M3.33333 5H16.6667C17.1269 5 17.5 5.3731 17.5 5.83333V16.6667C17.5 17.1269 17.1269 17.5 16.6667 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V5.83333C2.5 5.3731 2.8731 5 3.33333 5Z"
                    stroke="#323232"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Change Password"
              subtitle="Update your password"
            />

            <SettingItem
              icon={
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                    stroke="#FF3B30"
                    strokeWidth="1.5"
                  />
                  <Path
                    d="M12.5 7.5L7.5 12.5"
                    stroke="#FF3B30"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M7.5 7.5L12.5 12.5"
                    stroke="#FF3B30"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
              title="Delete Account"
              subtitle="Permanently delete your account"
              isDestructive={true}
              onPress={handleDeleteAccount}
            />

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path
                  d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                  stroke="#FF3B30"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M13.3333 14.1667L17.5 10L13.3333 5.83333"
                  stroke="#FF3B30"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M17.5 10H7.5"
                  stroke="#FF3B30"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: COLORS.body 
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Logoflex: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logo: { 
    color: COLORS.blue, 
    fontSize: 20, 
    fontFamily: 'LibreCaslonText-Bold', 
    marginTop: 4, 
    marginLeft: 4 
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#232327',
    marginTop: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#232327',
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#232327',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  settingsGroup: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F7F8FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: '#FFE6E6',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#232327',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE6E6',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});