// src/screens/onboarding/OnboardingStepOne.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
const imgChooseProduct = require('../../assets/img/chooseProduct.png');

const OnboardingStepOne: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image source={imgChooseProduct} style={styles.image} resizeMode="contain" />
      </View>

      <Text style={styles.title}>Choose Products</Text>
      <Text style={styles.subtitle}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  imageWrap: { width: 220, height: 220, marginBottom: 18, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  title: {
    fontSize: 32,
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: 'Montserrat-ExtraBold', // keep only fontFamily (no fontWeight)
  },
  subtitle: { fontSize: 16, color: COLORS.text, textAlign: 'center', marginTop: 12, lineHeight: 24 },
});

export default OnboardingStepOne;
