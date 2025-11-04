/* src/screens/PaymentScreen.tsx */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import ConfettiCannon from 'react-native-confetti-cannon';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ←←← Animated Path for Checkmark
const AnimatedPath = Animated.createAnimatedComponent(Path);

const paymentMethods = [
  {
    id: 'card',
    title: 'Credit/Debit Card',
    subtitle: 'Pay with your card',
    icon: (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Rect x="2" y="5" width="20" height="14" rx="2" stroke={COLORS.primary} strokeWidth="2" />
        <Path d="M2 10H22" stroke={COLORS.primary} strokeWidth="2" />
        <Rect x="6" y="15" width="4" height="2" rx="1" fill={COLORS.primary} />
      </Svg>
    ),
  },
  {
    id: 'upi',
    title: 'UPI',
    subtitle: 'Pay using UPI apps',
    icon: (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke="#0070BA" strokeWidth="2" />
        <Path d="M8 12H16" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" />
        <Path d="M12 8V16" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" />
      </Svg>
    ),
  },
];

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { total = 0, cartItems = [] } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);

  const dashOffset = useRef(new Animated.Value(100)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const confettiRef = useRef<any>(null);

  const startSuccessAnimation = () => {
    setShowSuccess(true);
    confettiRef.current?.start();

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.timing(dashOffset, {
        toValue: 0,
        duration: 800,
        delay: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('Orders');
    }, 3500);
  };

  if (showSuccess) {
    return (
      <View style={styles.successContainer}>
        <ConfettiCannon
          ref={confettiRef}
          count={150}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
        />
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Svg width={120} height={120} viewBox="0 0 100 100">
            <Rect width="100" height="100" rx="50" fill="#10B981" />
            <AnimatedPath
              d="M25 50 L40 65 L75 30"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset={dashOffset}
            />
          </Svg>
        </Animated.View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSubtitle}>
          Order #{`ORD-${Date.now()}`.slice(-5)} confirmed
        </Text>
      </View>
    );
  }

  // ←←← FINAL WORKING TEST PAYMENT (NO SERVER, NO SECRET)
 const handlePayment = async () => {
  if (total <= 0) {
    Alert.alert("Error", "Cart is empty!");
    return;
  }

  const options = {
    description: 'Test payment for Stylish App',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_RbcvSVSxCmFPtf', // ← YOUR TEST KEY
    amount: total * 100, // ₹50 → 5000 paise
    name: 'Stylish App',
    prefill: {
      email: 'customer@example.com',
      contact: '9999999999',
      name: 'John Doe',
    },
    theme: { color: '#E11D48' }, // Rose-600
  };

  try {
    const data = await RazorpayCheckout.open(options);

    console.log('Payment Success:', data);

    // SAVE ORDER
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB'),
      total,
      status: 'Paid',
      paymentId: data.razorpay_payment_id,
      items: cartItems,
    };

    const saved = await AsyncStorage.getItem('orders');
    const orders = saved ? JSON.parse(saved) : [];
    orders.unshift(order);
    await AsyncStorage.setItem('orders', JSON.stringify(orders));

    startSuccessAnimation();
  } catch (error: any) {
    console.log('Payment Error:', error);
    Alert.alert(
      'Payment Failed',
      error?.description || 'Try again with test card'
    );
  }
};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Payment Method</Text>
        <Text style={styles.subtitle}>Choose your preferred payment method</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodCard,
                selectedMethod === method.id && styles.paymentMethodCardSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.paymentMethodLeft}>
                <View style={styles.iconContainer}>{method.icon}</View>
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodTitle}>{method.title}</Text>
                  <Text style={styles.paymentMethodSubtitle}>{method.subtitle}</Text>
                </View>
              </View>
              <View style={[styles.radioOuter, selectedMethod === method.id && styles.radioOuterSelected]}>
                {selectedMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{total.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Free</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.securitySection}>
          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M10 1L3 4V9C3 13.5 6 17.5 10 19C14 17.5 17 13.5 17 9V4L10 1Z" stroke="#10B981" strokeWidth="2" />
            <Path d="M7 10L9 12L13 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.securityText}>Secure payment encrypted and processed securely</Text>
        </View>

        {/* ←←← TEST CARD INFO (REMOVE IN PRODUCTION) */}
        <View style={styles.testCardInfo}>
          <Text style={styles.testTitle}>TEST CARD (Works 100%)</Text>
          <Text style={styles.testText}>Card: 4111 1111 1111 1111</Text>
          <Text style={styles.testText}>Exp: 12/28 | CVV: 111</Text>
          <Text style={styles.testText}>OTP: 123123</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay ₹{total.toLocaleString()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: 20, paddingTop: 60, backgroundColor: COLORS.white },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.black, marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
  content: { flex: 1, padding: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.black, marginBottom: 16 },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    marginBottom: 12,
  },
  paymentMethodCardSelected: { borderColor: COLORS.primary, backgroundColor: '#FFF5F5' },
  paymentMethodLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  paymentMethodInfo: { flex: 1 },
  paymentMethodTitle: { fontSize: 16, fontWeight: '600', color: COLORS.black },
  paymentMethodSubtitle: { fontSize: 14, color: '#666' },
  radioOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: COLORS.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.primary },
  summaryCard: { backgroundColor: '#F8F9FA', padding: 16, borderRadius: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, fontWeight: '500', color: COLORS.black },
  totalRow: { borderTopWidth: 1, borderTopColor: '#e0e0e0', paddingTop: 12, marginTop: 8 },
  totalLabel: { fontSize: 16, fontWeight: '600', color: COLORS.black },
  totalValue: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  securitySection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDF4', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 16 },
  securityText: { fontSize: 14, color: '#166534', marginLeft: 12, flex: 1, fontWeight: '500' },
  testCardInfo: { backgroundColor: '#EEF2FF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#C7D2FE' },
  testTitle: { fontSize: 16, fontWeight: '700', color: '#4338CA', marginBottom: 8 },
  testText: { fontSize: 14, color: '#3730A3', fontWeight: '500' },
  footer: { padding: 20, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  payButton: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  successContainer: { flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', padding: 20 },
  successTitle: { fontSize: 32, fontWeight: '800', color: '#10B981', marginTop: 32 },
  successSubtitle: { fontSize: 18, color: '#666', marginTop: 8 },
});
