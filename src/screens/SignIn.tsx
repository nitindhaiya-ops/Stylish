// src/screens/SignIn.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import CustomInput from '../components/CustomInput';
import InputWithIcon from '../components/InputWithIcon';


type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
};

const SignIn: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onSignIn = () => {
    navigation.replace('getStarted')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>Back!</Text>
      </View>

      <View style={styles.inputContainer}>
        <InputWithIcon icon="user" placeholder="Email or username" keyboardType="email-address" />
        <InputWithIcon icon="lock" secure placeholder="Password" />
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgetLink}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        text="Login"
        onPress={onSignIn}
        backgroundColor={COLORS.primary}
      />

      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ color: COLORS.text, marginTop: 75 }}>
          - OR Continue with -
        </Text>
      </View>

      <View style={styles.loginOptionsWrapper}>
        <View style={styles.loginOptions}>

          <Svg width="25px" height="25px" viewBox="-3 0 262 262"  preserveAspectRatio="xMidYMid"><Path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><Path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><Path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><Path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></Svg>
        </View>
        <View style={styles.loginOptions}>
          <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" >
            <G clipPath="url(#clip0_1_18626)">
              <Path d="M17.1864 0C15.8536 0.092187 14.2958 0.945307 13.388 2.05624C12.5599 3.06404 11.8786 4.56091 12.1443 6.01559C13.6005 6.0609 15.1052 5.18747 15.977 4.05779C16.7927 3.00623 17.4098 1.51874 17.1864 0Z" fill="black" />
              <Path d="M22.4535 8.38746C21.1739 6.78278 19.3754 5.85153 17.677 5.85153C15.4348 5.85153 14.4864 6.92496 12.9286 6.92496C11.3224 6.92496 10.1021 5.85466 8.163 5.85466C6.25832 5.85466 4.23021 7.01871 2.94428 9.00933C1.13648 11.8124 1.44585 17.0827 4.37552 21.5718C5.42395 23.178 6.82395 24.9842 8.65518 24.9999C10.2849 25.0155 10.7442 23.9546 12.952 23.9436C15.1598 23.9311 15.5786 25.0139 17.2051 24.9967C19.0379 24.9827 20.5145 22.9811 21.5629 21.3749C22.3145 20.2233 22.5942 19.6436 23.177 18.3436C18.9379 16.7296 18.2583 10.7015 22.4535 8.38746Z" fill="black" />
            </G>
            <Defs>
              <ClipPath id="clip0_1_18626">
                <Rect width="25" height="25" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </View>

        <View style={styles.loginOptions}>

          <Svg width="26" height="26" viewBox="0 0 26 26" fill="none" >
            <Path d="M15.0135 26V14.141H18.9925L19.5895 9.51803H15.0135V6.56691C15.0135 5.22886 15.3836 4.31699 17.3045 4.31699L19.7505 4.31599V0.180999C19.3275 0.126029 17.8755 0 16.1855 0C12.6565 0 10.2405 2.15406 10.2405 6.10905V9.51803H6.24951V14.141H10.2405V26H15.0135Z" fill="#3D4DA6" />
          </Svg>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={{fontWeight: 400}}>Create An Account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 80, backgroundColor: COLORS.white },
  title: { fontSize: 38, fontWeight: '700', color: COLORS.black },
  titleContainer: { marginBottom: 40 },
  input: { borderWidth: 1, borderColor: '#EEE', padding: 12, borderRadius: 8, marginBottom: 12 },
  link: { color: COLORS.primary, marginBottom: 20, fontWeight: '500', textDecorationLine: 'underline' },
  forgetLink: { color: COLORS.primary, marginBottom: 20, fontWeight: '300' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  loginOptionsWrapper: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20, gap: 20 },
  loginOptions: { borderWidth: 2, borderColor: COLORS.primary, padding: 12, borderRadius: '50%', backgroundColor: COLORS.primary_four },
  inputContainer: { gap: 12, marginBottom: 12 },
});

export default SignIn;
