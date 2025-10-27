// src/screens/onboarding/OnboardingStepTwo.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
const imgMakePayment = require('../../assets/img/makePayment.png');

const OnboardingStepTwo: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={imgMakePayment} style={styles.image} resizeMode="contain" />
      </View>

      <Text style={styles.title}>Make Payment</Text>
      <Text style={styles.subtitle}>
        Secure & fast checkout with multiple payment options.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  imageWrap: { width: 220, height: 220, marginBottom: 18, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  title: { fontSize: 32, color: COLORS.black, textAlign: 'center', fontFamily: 'Montserrat-ExtraBold' },
  subtitle: { fontSize: 16, color: COLORS.text, textAlign: 'center', marginTop: 12, lineHeight: 24 },
});

export default OnboardingStepTwo;
