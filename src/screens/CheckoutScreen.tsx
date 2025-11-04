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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../constants/colors';
import { useCart } from '../hooks/useCart';

const EditSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.5 2.5L21.5 5.5L12.5 14.5H9.5V11.5L18.5 2.5Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const DEFAULT_ADDRESS = {
  name: 'John Doe',
  phone: '+91 98765 43210',
  address: '123, ABC Apartments, MG Road',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
};

export default function CheckoutScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { cartItems = [], total = 0 } = route.params || {};
  const { items } = useCart();

  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    Alert.alert('Success', 'Address updated successfully!');
    setIsEditing(false);
  };

  const handleProceed = () => {
    navigation.navigate('Payment', { total, cartItems });
  };
  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Checkout</Text>
        </View>

        {/* Order Summary - Matching Cart Style */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          {cartItems.map((item: any) => (
            <View key={item.id} style={styles.cartItemCard}>
              <Image source={item.image} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <View style={styles.cartItemHeader}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                </View>

                <View style={styles.cartItemVariants}>
                  <Text style={styles.variantText}>Size: {item.size}</Text>
                  <Text style={styles.variantText}>Color: {item.color}</Text>
                </View>

                {!item.inStock && (
                  <Text style={styles.outOfStockText}>Out of Stock</Text>
                )}

                <View style={styles.cartItemPriceRow}>
                  <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                  {item.originalPrice && (
                    <>
                      <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                      <Text style={styles.discount}>{item.discount}</Text>
                    </>
                  )}
                </View>

                <View style={styles.cartItemQuantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <View style={styles.quantityControls}>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
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
                placeholder="Full Name"
                value={address.name}
                onChangeText={(text) => setAddress({ ...address, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={address.phone}
                onChangeText={(text) => setAddress({ ...address, phone: text })}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address.address}
                onChangeText={(text) => setAddress({ ...address, address: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={address.city}
                onChangeText={(text) => setAddress({ ...address, city: text })}
              />
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="State"
                  value={address.state}
                  onChangeText={(text) => setAddress({ ...address, state: text })}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Pincode"
                  value={address.pincode}
                  onChangeText={(text) => setAddress({ ...address, pincode: text })}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.buttonRow}>
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
              <Text style={styles.addressPhone}>{address.phone}</Text>
              <Text style={styles.addressLine}>{address.address}</Text>
              <Text style={styles.addressLine}>{address.city}, {address.state} - {address.pincode}</Text>
            </View>
          )}
        </View>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
          <Text style={styles.proceedBtnText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.body },
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#232327',
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#232327',
    marginBottom: 16,
  },
  cartItemCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 1,
  },
  cartItemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
  },
  cartItemVariants: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  variantText: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  outOfStockText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
    marginBottom: 6,
  },
  cartItemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  cartItemQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
  },
  quantityControls: {
    backgroundColor: '#F7F8FB',
    borderRadius: 8,
    padding: 4,
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#232327',
  },
  discountValue: {
    color: COLORS.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#232327',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#232327',
  },
  addressCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#232327',
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  editForm: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  cancelBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
  },
  cancelBtnText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  proceedBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  proceedBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});