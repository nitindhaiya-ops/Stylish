/* src/screens/ProductScreen.tsx */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../constants/colors';

// ---- SVG for stars (same as in SearchScreen) ----
const ActiveStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="none">
  <path d="M5.83333 8.9075L9.43833 11.0833L8.48167 6.9825L11.6667 4.22333L7.4725 3.8675L5.83333 0L4.19417 3.8675L0 4.22333L3.185 6.9825L2.22833 11.0833L5.83333 8.9075Z" fill="#EDB310"/>
</svg>`;
const DeactiveStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="none">
  <g clip-path="url(#clip0)">
    <path d="M12.8334 5.38996L8.63919 5.02829L7.00002 1.16663L5.36085 5.03413L1.16669 5.38996L4.35169 8.14913L3.39502 12.25L7.00002 10.0741L10.605 12.25L9.65419 8.14913L12.8334 5.38996ZM7.00002 8.98329V3.55829L7.99752 5.91496L10.5525 6.13663L8.61585 7.81663L9.19919 10.3133L7.00002 8.98329Z" fill="#BBBBBB"/>
  </g>
  <defs><clipPath id="clip0"><rect width="14" height="14" fill="white"/></clipPath></defs>
</svg>`;

// ---- Type for the product passed from Search ----
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
};

type ProductRouteParams = { product: Product };

export default function ProductScreen() {
  const { params } = useRoute<RouteProp<{ params: ProductRouteParams }, 'params'>>();
  const product = params?.product;

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <SvgXml
        key={i}
        xml={i < Math.floor(product.rating || 0) ? ActiveStarSvg : DeactiveStarSvg}
      />
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ---- Hero Image ---- */}
      <ImageBackground
        source={product.image}
        style={styles.hero}
        imageStyle={styles.heroImg}
        resizeMode="cover"
      >
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </ImageBackground>

      {/* ---- Content ---- */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          {renderStars()}
          {product.totalRatings && (
            <Text style={styles.ratingCount}>({product.totalRatings})</Text>
          )}
        </View>

        {/* Price */}
        {product.originalPrice && product.discount ? (
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.original}>₹{product.originalPrice}</Text>
            <Text style={styles.discount}>{product.discount}</Text>
          </View>
        ) : (
          <Text style={styles.price}>₹{product.price}</Text>
        )}

        {/* Description (you can enrich this later) */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Text>

        {/* ---- Buy / Add to Cart Buttons ---- */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <Text style={styles.addBtnText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85}>
            <Text style={styles.buyBtnText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

/* ------------------- STYLES ------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  hero: { height: 380, justifyContent: 'flex-start' },
  heroImg: { borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },

  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  content: { padding: 20 },

  title: { fontSize: 24, fontWeight: '700', color: COLORS.black, marginBottom: 8 },

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ratingCount: { marginLeft: 6, color: '#666', fontSize: 14 },

  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  price: { fontSize: 22, fontWeight: '600', color: COLORS.black },
  original: {
    marginLeft: 8,
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 16,
  },
  discount: { marginLeft: 8, color: COLORS.primary, fontWeight: '600', fontSize: 16 },

  description: { fontSize: 15, lineHeight: 22, color: '#555', marginBottom: 24 },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  addBtn: {
    flex: 0.48,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addBtnText: { color: COLORS.primary, fontWeight: '600', fontSize: 16 },
  buyBtn: {
    flex: 0.48,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});