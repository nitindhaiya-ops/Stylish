// src/screens/HomeScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string; // optional remote/local uri
  badge?: string;
};

const SAMPLE_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Classic Tee', price: 799, category: 'Tops' },
  { id: 'p2', name: 'Slim Jeans', price: 1999, category: 'Bottoms' },
  { id: 'p3', name: 'Sneaker Run', price: 3499, category: 'Shoes' },
  { id: 'p4', name: 'Bomber Jacket', price: 4599, category: 'Outerwear', badge: 'New' },
  { id: 'p5', name: 'Floral Dress', price: 2599, category: 'Dresses' },
  { id: 'p6', name: 'Cap', price: 499, category: 'Accessories' },
  { id: 'p7', name: 'Casual Shirt', price: 1099, category: 'Tops' },
  { id: 'p8', name: 'Running Shorts', price: 899, category: 'Bottoms' },
];

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Dresses', 'Accessories'];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading] = useState(false); // toggle on when fetching from API

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q);
    });
  }, [query, selectedCategory]);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Home' /* replace with Product details route when added */)}
    >
      <View style={styles.imagePlaceholder}>
        {/* Replace with <Image source={{uri: item.image}} style={styles.image} /> when you have images */}
        <Text style={styles.imageText}>{item.name.split(' ')[0]}</Text>
      </View>

      <View style={styles.cardContent}>
        <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>₹{item.price}</Text>
          {item.badge ? <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View> : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>Stylish</Text>
          <Text style={styles.sub}>New drops & curated picks</Text>
        </View>

        <TouchableOpacity style={styles.cartBtn} onPress={() => { /* open cart later */ }}>
          <Text style={styles.cartText}>Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search styles, brands, items..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.filterBtn} onPress={() => { /* open filters */ }}>
          <Text style={{ fontWeight: '600' }}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <FlatList
          data={CATEGORIES}
          horizontal
          keyExtractor={(c) => c}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const active = item === selectedCategory;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[styles.categoryPill, active ? styles.categoryActive : undefined]}
              >
                <Text style={[styles.categoryText, active ? styles.categoryTextActive : undefined]}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}><ActivityIndicator size="large" /></View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={renderProduct}
          ListEmptyComponent={<View style={styles.empty}><Text>No items found</Text></View>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { fontSize: 28, fontWeight: '800', color: COLORS.primary },
  sub: { fontSize: 12, color: '#666' },
  cartBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cartText: { fontWeight: '700', color: COLORS.primary },

  searchRow: {
    paddingHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#F5F6FA',
    marginRight: 10,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },

  categories: { marginTop: 12, paddingLeft: 16 },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F7F8FB',
    marginRight: 10,
  },
  categoryActive: { backgroundColor: COLORS.primary + '20' },
  categoryText: { fontSize: 13, color: '#333' },
  categoryTextActive: { color: COLORS.primary, fontWeight: '700' },

  list: { paddingHorizontal: CARD_MARGIN, paddingTop: 16, paddingBottom: 40 },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN / 2,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F2F6',
  },
  imagePlaceholder: {
    height: CARD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFBFF',
  },
  imageText: { fontSize: 22, fontWeight: '700', color: '#CCC' },
  cardContent: { padding: 10 },
  productName: { fontSize: 14, fontWeight: '600', color: '#222' },
  row: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  badge: { backgroundColor: COLORS.primary_two, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  empty: { padding: 40, alignItems: 'center' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
