/* src/screens/CheckoutScreen.tsx */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../constants/colors';

// ---- SVG: Edit Icon ----
const EditSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M14.06 0.940002L15.06 1.94C15.64 2.52 15.64 3.47 15.06 4.06L4.53 14.59L0.940002 16L2.35 12.41L12.88 1.88C13.47 1.29 14.42 1.29 15 1.88L14.06 0.940002Z" fill="#232327"/>
</svg>`;

// ---- Dummy Cart Items (same as similar products) ----
const CART_ITEMS = [
  {
    id: 's1',
    name: 'Slim Fit Shirt',
    price: 1299,
    image: require('../assets/img/products/p2.png'),
    qty: 1,
  },
  {
    id: 's2',
    name: 'Denim Jacket',
    price: 3999,
    image: require('../assets/img/products/p4.png'),
    qty: 1,
  },
];

// ---- Dummy User Address (editable) ----
const DEFAULT_ADDRESS = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 98765 43210',
  address: '123, MG Road, Near City Mall',
  city: 'Mumbai',
  pincode: '400001',
};

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [isEditing, setIsEditing] = useState(false);

  const total = CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSave = () => {
    Alert.alert('Success', 'Address updated successfully!');
    setIsEditing(false);
  };

  const handleProceed = () => {
    navigation.navigate('Payment'); // You can create this later
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Checkout</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {CART_ITEMS.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>Qty: {item.qty}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₹{total}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery</Text>
            <Text style={styles.priceValue}>Free</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.addressHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <SvgXml xml={EditSvg} width={16} height={16} />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <View style={styles.editForm}>
              <TextInput
                style={styles.input}
                value={address.name}
                onChangeText={text => setAddress({ ...address, name: text })}
                placeholder="Full Name"
              />
              <TextInput
                style={styles.input}
                value={address.email}
                onChangeText={text => setAddress({ ...address, email: text })}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                value={address.phone}
                onChangeText={text => setAddress({ ...address, phone: text })}
                placeholder="Phone"
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                value={address.address}
                onChangeText={text => setAddress({ ...address, address: text })}
                placeholder="Street Address"
              />
              <TextInput
                style={styles.input}
                value={address.city}
                onChangeText={text => setAddress({ ...address, city: text })}
                placeholder="City"
              />
              <TextInput
                style={styles.input}
                value={address.pincode}
                onChangeText={text => setAddress({ ...address, pincode: text })}
                placeholder="Pincode"
                keyboardType="numeric"
              />

              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.addressCard}>
              <Text style={styles.addressName}>{address.name}</Text>
              <Text style={styles.addressText}>{address.email}</Text>
              <Text style={styles.addressText}>{address.phone}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
              <Text style={styles.addressText}>{address.city} - {address.pincode}</Text>
            </View>
          )}
        </View>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
          <Text style={styles.proceedBtnText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ------------------- STYLES ------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.black },

  section: { padding: 20, backgroundColor: '#f9f9f9', marginVertical: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#232327' },

  // Cart Item
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 15, fontWeight: '600' },
  itemPrice: { fontSize: 16, color: COLORS.primary, marginTop: 4 },
  qtyBox: { backgroundColor: '#eee', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  qtyText: { fontSize: 13, fontWeight: '600' },

  // Price Breakdown
  priceBreakdown: { padding: 20, backgroundColor: '#fff' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { fontSize: 16, color: '#555' },
  priceValue: { fontSize: 16, fontWeight: '600' },
  totalRow: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderColor: '#eee' },
  totalLabel: { fontSize: 18, fontWeight: '700' },
  totalValue: { fontSize: 20, fontWeight: '700', color: COLORS.primary },

  // Address
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  addressName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  addressText: { fontSize: 14, color: '#555', marginBottom: 2 },

  // Edit Form
  editForm: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  editButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: {
    flex: 0.48,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtnText: { color: '#999', fontWeight: '600' },
  saveBtn: {
    flex: 0.48,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: '600' },

  // Proceed Button
  proceedBtn: {
    margin: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  proceedBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});