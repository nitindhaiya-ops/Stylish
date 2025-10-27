import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Stylish!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,                     // fill the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  text: {
    fontSize: 40,
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default WelcomeScreen;
