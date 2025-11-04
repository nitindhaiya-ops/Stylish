/* src/screens/OrdersScreen.tsx */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OrdersNavigationProp = any;

export default function OrdersScreen() {
  const navigation = useNavigation<OrdersNavigationProp>();
  const [orders, setOrders] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    const saved = await AsyncStorage.getItem('orders');
    setOrders(saved ? JSON.parse(saved).reverse() : []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setTimeout(() => setRefreshing(false), 500);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={orderStyles.card}>
      <View style={orderStyles.header}>
        <Text style={orderStyles.orderId}>Order #{item.id}</Text>
        <Text style={orderStyles.date}>{item.date}</Text>
      </View>

      <View style={orderStyles.itemsContainer}>
        {item.items.map((prod: any, idx: number) => (
          <View key={idx} style={orderStyles.itemRow}>
            <Image source={prod.image} style={orderStyles.itemImage} />
            <View style={orderStyles.itemInfo}>
              <Text style={orderStyles.itemName}>{prod.name}</Text>
              <Text style={orderStyles.itemMeta}>
                Size: {prod.size} | Color: {prod.color} | Qty: {prod.qty}
              </Text>
              <Text style={orderStyles.itemPrice}>₹{prod.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={orderStyles.footer}>
        <View style={orderStyles.statusContainer}>
          <Text style={orderStyles.statusLabel}>Status:</Text>
          <Text style={orderStyles.statusValue}>{item.status}</Text>
        </View>
        <Text style={orderStyles.total}>Total: ₹{item.total.toLocaleString()}</Text>
      </View>

      <TouchableOpacity
        style={orderStyles.trackBtn}
        onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
      >
        <Text style={orderStyles.trackBtnText}>Track Order</Text>
        <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <Path d="M9 18L15 12L9 6" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: '#666' }}>No orders yet</Text>}
      />
    </SafeAreaView>
  );
}

/* STYLES — UNCHANGED */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.body },
  header: { paddingHorizontal: 16, paddingVertical: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#232327' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
});

const orderStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  orderId: { fontSize: 16, fontWeight: '600', color: COLORS.black },
  date: { fontSize: 14, color: '#666' },
  itemsContainer: { marginBottom: 12 },
  itemRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  itemImage: { width: 60, height: 70, borderRadius: 8, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', color: COLORS.black },
  itemMeta: { fontSize: 12, color: '#666', marginTop: 2 },
  itemPrice: { fontSize: 14, fontWeight: '600', color: COLORS.black, marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  statusLabel: { fontSize: 14, color: '#666', marginRight: 6 },
  statusValue: { fontSize: 14, fontWeight: '600', color: '#10B981' },
  total: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  trackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  trackBtnText: { color: COLORS.primary, fontWeight: '600', marginRight: 4 },
});