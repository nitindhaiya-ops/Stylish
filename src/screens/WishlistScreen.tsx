// src/screens/WishlistScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G, ClipPath, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../constants/colors';

const profileIcon = require('../assets/img/profileIcon.png');

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  totalRatings?: string;
  image?: any;
  badge?: string;
  inStock?: boolean;
};

const WISHLIST_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Tee',
    price: 799,
    originalPrice: '₹999',
    discount: '20% OFF',
    rating: 4.5,
    totalRatings: '2.1k',
    image: require('../assets/img/products/p1.png'),
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Bomber Jacket',
    price: 4599,
    originalPrice: '₹5999',
    discount: '23% OFF',
    badge: 'New',
    rating: 4.8,
    totalRatings: '1.2k',
    image: require('../assets/img/products/p4.png'),
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Floral Dress',
    price: 2599,
    originalPrice: '₹3299',
    discount: '21% OFF',
    rating: 4.6,
    totalRatings: '980',
    image: require('../assets/img/products/p5.png'),
    inStock: false,
  },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const ProductCard: React.FC<{
  product: Product;
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onPress: (product: Product) => void;
}> = ({ product, onRemove, onAddToCart, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(product)}
      style={productStyles.card}
    >
      <ImageBackground
        source={product.image}
        style={productStyles.image}
        imageStyle={productStyles.imageStyle}
        resizeMode="cover"
      >
        {!product.inStock && (
          <View style={productStyles.outOfStockOverlay}>
            <Text style={productStyles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
        
        {product.badge && (
          <View style={productStyles.badge}>
            <Text style={productStyles.badgeText}>{product.badge}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={productStyles.heartButton} 
          onPress={() => onRemove(product.id)}
        >
          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path
              d="M17.3667 3.84166C16.9411 3.41583 16.4357 3.07803 15.8795 2.84756C15.3233 2.6171 14.7271 2.49854 14.125 2.49854C13.5229 2.49854 12.9267 2.6171 12.3705 2.84756C11.8143 3.07803 11.3089 3.41583 10.8833 3.84166L10 4.725L9.11667 3.84166C8.25692 2.98192 7.09092 2.49898 5.875 2.49898C4.65908 2.49898 3.49308 2.98192 2.63333 3.84166C1.77359 4.70141 1.29065 5.86741 1.29065 7.08333C1.29065 8.29925 1.77359 9.46525 2.63333 10.325L3.51667 11.2083L10 17.6917L16.4833 11.2083L17.3667 10.325C17.7925 9.89944 18.1303 9.39404 18.3608 8.83782C18.5912 8.2816 18.7098 7.6854 18.7098 7.08333C18.7098 6.48126 18.5912 5.88506 18.3608 5.32884C18.1303 4.77262 17.7925 4.26722 17.3667 3.84166Z"
              fill="#EB3030"
              stroke="#EB3030"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </ImageBackground>

      {/* Product Info */}
      <View style={productStyles.textContainer}>
        <Text style={productStyles.title} numberOfLines={1} ellipsizeMode="tail">
          {product.name}
        </Text>

        <Text style={productStyles.subtitle} numberOfLines={2} ellipsizeMode="tail">
          {product.name}
        </Text>

        {/* Price Section */}
        {product.originalPrice && product.discount ? (
          <View style={productStyles.priceRow}>
            <Text style={productStyles.price}>₹{product.price}</Text>
            <View style={productStyles.discountRow}>
              <Text style={productStyles.lineThrough}>{product.originalPrice}</Text>
              <Text style={productStyles.offPercent}>{product.discount}</Text>
            </View>
          </View>
        ) : (
          <Text style={productStyles.price}>₹{product.price}</Text>
        )}

        {/* Star Rating */}
        <View style={productStyles.starWrapper}>
          {[...Array(5)].map((_, i) => (
            <Svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <Path
                d={i < Math.floor(product.rating || 0) 
                  ? "M5.83333 8.9075L9.43833 11.0833L8.48167 6.9825L11.6667 4.22333L7.4725 3.8675L5.83333 0L4.19417 3.8675L0 4.22333L3.185 6.9825L2.22833 11.0833L5.83333 8.9075Z"
                  : "M12.8334 5.38996L8.63919 5.02829L7.00002 1.16663L5.36085 5.03413L1.16669 5.38996L4.35169 8.14913L3.39502 12.25L7.00002 10.0741L10.605 12.25L9.65419 8.14913L12.8334 5.38996ZM7.00002 8.98329V3.55829L7.99752 5.91496L10.5525 6.13663L8.61585 7.81663L9.19919 10.3133L7.00002 8.98329Z"
                }
                fill={i < Math.floor(product.rating || 0) ? "#EDB310" : "#BBBBBB"}
              />
            </Svg>
          ))}
          {product.totalRatings && (
            <Text style={productStyles.ratingCount}>{product.totalRatings}</Text>
          )}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={[
            productStyles.addToCartButton, 
            !product.inStock && productStyles.disabledButton
          ]} 
          onPress={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <Text style={productStyles.addToCartText}>
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const productStyles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    margin: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  imageStyle: {
    borderRadius: 16,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  outOfStockText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    lineHeight: 18,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 4,
    color: COLORS.black,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 4,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  offPercent: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  starWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(WISHLIST_PRODUCTS);

  const handleRemoveFromWishlist = (productId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setWishlistItems(prev => prev.filter(item => item.id !== productId));
          }
        },
      ]
    );
  };

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return;
    
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart!`,
      [{ text: 'OK' }]
    );
  };

  const handleProductPress = (product: Product) => {
    console.log('Product pressed:', product.name);
  };

  const handleClearAll = () => {
    if (wishlistItems.length === 0) return;
    
    Alert.alert(
      'Clear Wishlist',
      'Are you sure you want to remove all items from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => setWishlistItems([])
        },
      ]
    );
  };

  const EmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <Path
          d="M107.366 33.8417C106.941 33.4158 106.436 33.078 105.879 32.8476C105.323 32.6171 104.727 32.4985 104.125 32.4985C103.523 32.4985 102.927 32.6171 102.371 32.8476C101.814 33.078 101.309 33.4158 100.883 33.8417L100 34.725L99.1167 33.8417C97.3972 32.1222 94.9028 31.249 92.375 31.499C89.8472 31.249 87.3528 32.1222 85.6333 33.8417C83.9139 35.5611 83.0406 38.0556 83.2906 40.5833C83.0406 43.1111 83.9139 45.6056 85.6333 47.325L86.5167 48.2083L100 61.6917L113.483 48.2083L114.367 47.325C114.793 46.8994 115.13 46.394 115.361 45.8378C115.591 45.2816 115.71 44.6854 115.71 44.0833C115.71 43.4813 115.591 42.8851 115.361 42.3288C115.13 41.7726 114.793 41.2672 114.367 40.8417C113.941 40.4158 113.436 40.078 112.879 39.8476C112.323 39.6171 111.727 39.4985 111.125 39.4985C110.523 39.4985 109.927 39.6171 109.371 39.8476C108.814 40.078 108.309 40.4158 107.883 40.8417L107 41.725L106.117 40.8417C104.397 39.1222 101.903 38.249 99.375 38.499C96.8472 38.249 94.3528 39.1222 92.6333 40.8417C90.9139 42.5611 90.0406 45.0556 90.2906 47.5833C90.0406 50.1111 90.9139 52.6056 92.6333 54.325L93.5167 55.2083L100 68.6917L113.483 55.2083L114.367 54.325C116.086 52.6056 116.96 50.1111 116.71 47.5833C116.96 45.0556 116.086 42.5611 114.367 40.8417C113.941 40.4158 113.436 40.078 112.879 39.8476C112.323 39.6171 111.727 39.4985 111.125 39.4985C110.523 39.4985 109.927 39.6171 109.371 39.8476C108.814 40.078 108.309 40.4158 107.883 40.8417L107 41.725L106.117 40.8417C104.397 39.1222 101.903 38.249 99.375 38.499C96.8472 38.249 94.3528 39.1222 92.6333 40.8417C90.9139 42.5611 90.0406 45.0556 90.2906 47.5833C90.0406 50.1111 90.9139 52.6056 92.6333 54.325L93.5167 55.2083L100 68.6917L113.483 55.2083L114.367 54.325C116.086 52.6056 116.96 50.1111 116.71 47.5833C116.96 45.0556 116.086 42.5611 114.367 40.8417Z"
          fill="#F0F0F0"
          stroke="#E0E0E0"
          strokeWidth="2"
        />
      </Svg>
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Save your favorite items here to easily find them later
      </Text>
      <TouchableOpacity style={styles.shopButton}>
        <Text style={styles.shopButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <G clipPath="url(#clip0_1_7348)">
              <Path
                d="M21 11.01L3 11V13H21V11.01ZM3 16H15V18H3V16ZM21 6H3V8.01L21 8V6Z"
                fill="#323232"
              />
            </G>
            <Defs>
              <ClipPath id="clip0_1_7348">
                <Rect width="24" height="24" rx="12" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </TouchableOpacity>

        <View style={styles.Logoflex}>
          <Svg width="38" height="38" viewBox="0 0 125 100" fill="none">
            <Path
              d="M124.993 49.9986C124.993 36.7382 119.725 24.0208 110.349 14.6442C100.972 5.2677 88.255 1.7389e-06 74.9947 0C61.7343 -1.73889e-06 49.017 5.2677 39.6404 14.6442C30.2638 24.0208 24.9961 36.7382 24.9961 49.9986H40.6209C45.7984 49.9986 49.8363 45.6597 51.7328 40.8418C52.9778 37.6787 54.8672 34.7718 57.3174 32.3213C62.0057 27.6331 68.3645 24.9993 74.9947 24.9993C81.6249 24.9993 87.9837 27.6331 92.6719 32.3213C97.3602 37.0096 99.9938 43.3684 99.9938 49.9986H124.993Z"
              fill="url(#paint0)"
            />
            <Path
              d="M96.1908 69.1352C98.7035 63.069 99.9969 56.5675 99.9969 50.0017H124.993C124.993 77.6151 102.608 100 74.9949 100C70.6705 100 66.474 99.4511 62.4723 98.4191C64.7365 97.8357 66.962 97.0928 69.1318 96.1942C75.1979 93.6815 80.7097 89.9988 85.3525 85.356C89.9954 80.7131 93.6784 75.2013 96.1908 69.1352Z"
              fill="#4392F9"
            />
            <Path
              d="M0 49.9954C-9.3931e-07 56.5615 1.29325 63.0631 3.8059 69.1292C6.31858 75.1954 10.0014 80.7072 14.6442 85.35C19.287 89.9925 24.7988 93.6755 30.8649 96.1882C36.931 98.7009 43.4325 99.994 49.9986 99.994C56.5643 99.994 63.0659 98.7009 69.1321 96.1882C75.1982 93.6755 80.71 89.9925 85.3528 85.35C89.9957 80.7072 93.6784 75.1954 96.1911 69.1292C98.7038 63.0631 99.9972 56.5615 99.9972 49.9954H84.3724C79.1948 49.9954 75.157 54.3343 73.2605 59.1519C73.2067 59.2892 73.1512 59.4258 73.0948 59.5625C71.8385 62.5954 69.9971 65.3515 67.6756 67.6727C65.3543 69.994 62.5982 71.8356 59.5653 73.092C56.5324 74.3483 53.2816 74.9949 49.9986 74.9949C46.7156 74.9949 43.4648 74.3483 40.4319 73.092C37.3986 71.8356 34.6429 69.994 32.3213 67.6727C30 65.3515 28.1586 62.5954 26.9022 59.5625C25.6459 56.5293 24.9993 53.2785 24.9993 49.9954H0Z"
              fill="url(#paint1)"
            />
            <Defs>
              <LinearGradient id="paint0" x1="124.993" y1="24.9993" x2="24.9961" y2="24.9993" gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor="#CFE2FC" />
                <Stop offset="1" stopColor="#4392F9" />
              </LinearGradient>
              <LinearGradient id="paint1" x1="0" y1="74.9949" x2="99.9972" y2="74.9949" gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor="#F8BCC6" />
                <Stop offset="1" stopColor="#F83758" />
              </LinearGradient>
            </Defs>
          </Svg>
          <Text style={styles.logo}>Stylish</Text>
        </View>

        <TouchableOpacity>
          <Image source={profileIcon} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>

      {/* Wishlist Header */}
      <View style={styles.wishlistHeader}>
        <View>
          <Text style={styles.wishlistTitle}>My Wishlist</Text>
          <Text style={styles.wishlistSubtitle}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        
        {wishlistItems.length > 0 && (
          <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Wishlist Products */}
      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          numColumns={2}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
              onPress={handleProductPress}
            />
          )}
        />
      ) : (
        <EmptyWishlist />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: COLORS.body 
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Logoflex: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logo: { 
    color: COLORS.blue, 
    fontSize: 20, 
    fontFamily: 'LibreCaslonText-Bold', 
    marginTop: 4, 
    marginLeft: 4 
  },
  wishlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  wishlistTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#232327',
  },
  wishlistSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  clearAllButton: {
    backgroundColor: '#FFE6E6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearAllText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#232327',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});