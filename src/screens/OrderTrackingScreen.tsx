// src/screens/OrderTrackingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { RouteProp } from '@react-navigation/native';

type TrackingRouteProp = RouteProp<RootStackParamList, 'OrderTracking'>;

export default function OrderTrackingScreen() {
  const route = useRoute<TrackingRouteProp>();
  const orderId = route.params?.orderId ?? '—';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tracking Order #{orderId}</Text>
      <Text style={styles.info}>Your package is on the way!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.body, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.black, marginBottom: 12 },
  info: { fontSize: 16, color: '#666' },
});