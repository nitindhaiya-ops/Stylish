import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';

// Type for navigation
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'getStarted'>;
};

// Import background image
const bgImage = require('../assets/img/getStarted.png');

const GetStartedScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>You want Authentic, here you go!</Text>
          <Text style={styles.subtitle}>Find it here, buy it now!</Text>

          <CustomButton
            text="Get Started"
            onPress={() => navigation.replace('Home')}
            backgroundColor={COLORS.primary}
            style={{ marginTop: 40, width: '100%' }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

// 💅 Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 11, 11, 0.54)',

    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default GetStartedScreen;
