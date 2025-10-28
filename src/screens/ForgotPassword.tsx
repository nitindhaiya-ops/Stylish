// src/screens/ForgotPassword.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { COLORS } from '../constants/colors';
import InputWithIcon from '../components/InputWithIcon';
import CustomButton from '../components/CustomButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

const ForgotPassword: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const onReset = () => {
    // TODO: call password reset API
    Alert.alert('Reset link sent', 'Check your email for reset instructions.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forgot</Text>
        <Text style={styles.title}>Password?</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Enter your registered email below, and we’ll send you a link to reset your password.
      </Text>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <InputWithIcon
          icon="mail"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={{ color: COLORS.text }}> <Text style={{ color: COLORS.primary }}>*</Text> We will send you a message to set or reset your new password</Text>
      </View>

      {/* Reset Button */}
      <CustomButton
        text="Submit"
        onPress={onReset}
        backgroundColor={COLORS.primary}
      />

      {/* Back to Login */}
      <View style={styles.row}>
        <Text style={{ fontWeight: '400' }}>Remember your password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 💅 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 80, backgroundColor: COLORS.white },
  titleContainer: { marginBottom: 20 },
  title: { fontSize: 38, fontWeight: '700', color: COLORS.black },
  subtitle: {
    fontSize: 15,
    color: '#575757',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: { gap: 12, marginBottom: 20 },
  link: { color: COLORS.primary, fontWeight: '500', textDecorationLine: 'underline' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 40 },
});

export default ForgotPassword;
