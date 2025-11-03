/*  src/navigation/RootNavigator.tsx  */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import getStartedScreen from '../screens/getStartedScreen';
import TabNavigator from './TabNavigator';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentScreen from '../screens/PaymentScreen';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  getStarted: undefined;
  MainTabs: undefined; 
  Checkout: undefined; 
  Payment: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="getStarted" component={getStartedScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        {/* THIS IS THE ONLY SCREEN THAT SHOWS THE BOTTOM TABS */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}