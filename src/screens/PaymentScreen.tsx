/* src/screens/PaymentScreen.tsx */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import Svg, { Path, Circle, Rect } from 'react-native-svg'; // FIXED: Import Path, Circle, Rect

const paymentMethods = [
  {
    id: 'card',
    title: 'Credit/Debit Card',
    subtitle: 'Pay with your card',
    icon: (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Rect x="2" y="5" width="20" height="14" rx="2" stroke={COLORS.primary} strokeWidth="2"/>
        <Path d="M2 10H22" stroke={COLORS.primary} strokeWidth="2"/>
        <Rect x="6" y="15" width="4" height="2" rx="1" fill={COLORS.primary}/>
      </Svg>
    ),
  },
  {
    id: 'paypal',
    title: 'PayPal',
    subtitle: 'Pay with your PayPal account',
    icon: (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M19 8C19.5 8 20 8.5 20 9C20 9.5 19.5 10 19 10H13C12.5 10 12 9.5 12 9C12 8.5 12.5 8 13 8H19Z" fill="#0070BA"/>
        <Path d="M19 12C19.5 12 20 12.5 20 13C20 13.5 19.5 14 19 14H13C12.5 14 12 13.5 12 13C12 12.5 12.5 12 13 12H19Z" fill="#0070BA"/>
        <Path d="M7 16C7.5 16 8 16.5 8 17C8 17.5 7.5 18 7 18H5C4.5 18 4 17.5 4 17C4 16.5 4.5 16 5 16H7Z" fill="#0070BA"/>
        <Path d="M19 4C20.5 4 21.5 5 21.5 6.5V17.5C21.5 19 20.5 20 19 20H5C3.5 20 2.5 19 2.5 17.5V6.5C2.5 5 3.5 4 5 4H19Z" stroke="#0070BA" strokeWidth="2"/>
      </Svg>
    ),
  },
  {
    id: 'upi',
    title: 'UPI',
    subtitle: 'Pay using UPI apps',
    icon: (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke="#0070BA" strokeWidth="2"/>
        <Path d="M8 12H16" stroke="#0070BA" strokeWidth="2" strokeLinecap="round"/>
        <Path d="M12 8V16" stroke="#0070BA" strokeWidth="2" strokeLinecap="round"/>
      </Svg>
    ),
  },
];

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { total = 0 } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('card');

  const handlePayment = () => {
    Alert.alert(
      'Payment Successful!',
      'Your order has been placed successfully.',
      [
        {
          text: 'Continue Shopping',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs', params: { screen: 'HomeTab' } }],
          }),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Payment Method</Text>
        <Text style={styles.subtitle}>Choose your preferred payment method</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payment Methods */}
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
                <View style={styles.iconContainer}>
                  {method.icon}
                </View>
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodTitle}>{method.title}</Text>
                  <Text style={styles.paymentMethodSubtitle}>{method.subtitle}</Text>
                </View>
              </View>

              <View style={[
                styles.radioOuter,
                selectedMethod === method.id && styles.radioOuterSelected,
              ]}>
                {selectedMethod === method.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
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
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>- ₹0</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Security Badge */}
        <View style={styles.securitySection}>
          <View style={styles.securityRow}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path d="M10 1L3 4V9C3 13.5 6 17.5 10 19C14 17.5 17 13.5 17 9V4L10 1Z" stroke="#10B981" strokeWidth="2"/>
              <Path d="M7 10L9 12L13 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
            <Text style={styles.securityText}>Secure payment encrypted and processed securely</Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay ₹{total.toLocaleString()}</Text>
          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 16,
  },
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
  paymentMethodCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF5F5',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  paymentMethodSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  summaryCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
  discountValue: {
    color: COLORS.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  securitySection: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityText: {
    fontSize: 14,
    color: '#166534',
    marginLeft: 12,
    flex: 1,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  payButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});