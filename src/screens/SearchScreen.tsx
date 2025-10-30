// src/screens/SearchScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Path,
  G,
  Defs,
  ClipPath,
  Rect,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../constants/colors';

// ────────────────────── ASSETS ──────────────────────
const profileIcon = require('../assets/img/profileIcon.png');

// ────────────────────── DUMMY DATA ──────────────────────
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

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Tee',
    price: 799,
    originalPrice: '₹999',
    discount: '20% OFF',
    rating: 4.5,
    totalRatings: '2.1k',
    image: require('../assets/img/products/p1.png'),
  },
  {
    id: 'p2',
    name: 'Slim Jeans',
    price: 1999,
    originalPrice: '₹2499',
    discount: '20% OFF',
    rating: 4.7,
    totalRatings: '1.8k',
    image: require('../assets/img/products/p2.png'),
  },
  {
    id: 'p3',
    name: 'Sneaker Run',
    price: 3499,
    rating: 4.3,
    totalRatings: '890',
    image: require('../assets/img/products/p3.png'),
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
  },
  {
    id: 'p6',
    name: 'Leather Cap',
    price: 499,
    rating: 4.1,
    totalRatings: '320',
    image: require('../assets/img/products/p6.png'),
  },
];

// ────────────────────── CARD DIMENSIONS ──────────────────────
const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const NORMAL_WIDTH = (width - CARD_MARGIN * 3) / 2;           // 2-column base
const LARGE_WIDTH = (width - CARD_MARGIN * 3) / 2;
const NORMAL_HEIGHT = 240;
const LARGE_HEIGHT = NORMAL_HEIGHT * 1.5;

// ────────────────────── SVG STARS ──────────────────────
const ActiveStarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M5.83333 8.9075L9.43833 11.0833L8.48167 6.9825L11.6667 4.22333L7.4725 3.8675L5.83333 0L4.19417 3.8675L0 4.22333L3.185 6.9825L2.22833 11.0833L5.83333 8.9075Z" fill="#EDB310"/>
</svg>
`;

const DeactiveStarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <g clip-path="url(#clip0_135_7265)">
    <path d="M12.8334 5.38996L8.63919 5.02829L7.00002 1.16663L5.36085 5.03413L1.16669 5.38996L4.35169 8.14913L3.39502 12.25L7.00002 10.0741L10.605 12.25L9.65419 8.14913L12.8334 5.38996ZM7.00002 8.98329V3.55829L7.99752 5.91496L10.5525 6.13663L8.61585 7.81663L9.19919 10.3133L7.00002 8.98329Z" fill="#BBBBBB"/>
  </g>
  <defs>
    <clipPath id="clip0_135_7265">
      <rect width="14" height="14" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;

// ────────────────────── PRODUCT CARD COMPONENT ──────────────────────
type ProductCardProps = {
  title: string;
  price: string;
  image: ImageSourcePropType;
  originalPrice?: string;
  discount?: string;
  onPress?: () => void;
  rating?: number;
  totalRatings?: string;
  badge?: string;
  isLarge?: boolean;          // new
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  originalPrice,
  discount,
  onPress,
  rating,
  totalRatings,
  badge,
  isLarge = false,
}) => {
  const cardStyle = isLarge
    ? [styles.card, { width: LARGE_WIDTH, height: LARGE_HEIGHT }]
    : [styles.card, { width: NORMAL_WIDTH, height: NORMAL_HEIGHT }];

  const imageStyle = isLarge
    ? [styles.image, { height: LARGE_HEIGHT * 0.65 }]
    : styles.image;

  return (
    <View style={{ flex: 1 , flexDirection: 'column' }}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={cardStyle}
    >
      <ImageBackground
        source={image}
        style={imageStyle}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </ImageBackground>

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>

        <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>

        {originalPrice && discount ? (
          <View style={styles.priceRow}>
            <Text style={styles.price}>{price}</Text>
            <View style={styles.discountRow}>
              <Text style={styles.lineThrough}>{originalPrice}</Text>
              <Text style={styles.offPercent}>{discount}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.price}>{price}</Text>
        )}

        <View style={styles.starWrapper}>
          {[...Array(5)].map((_, i) => (
            <SvgXml
              key={i}
              xml={i < Math.floor(rating || 0) ? ActiveStarSvg : DeactiveStarSvg}
            />
          ))}
          {totalRatings && (
            <Text style={styles.ratingCount}>{totalRatings}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 1556,
    overflow: 'hidden',
    backgroundColor: '#fff',
    margin: 6,
    elevation: 3,
  },
  image: {
    height: NORMAL_HEIGHT * 0.65,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  imageStyle: {
    borderRadius: 16,
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
  textContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    width: '80%',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    lineHeight: 18,
    width: '90%',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 4,
  },
  priceRow: {},
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
});

// ────────────────────── HELPERS ──────────────────────
const pairProducts = (list: Product[]) => {
  const pairs: { left: Product; right: Product; rowIndex: number }[] = [];
  for (let i = 0; i < list.length; i += 2) {
    const left = list[i];
    const right = list[i + 1] ?? null;
    pairs.push({ left, right: right!, rowIndex: Math.floor(i / 2) });
  }
  return pairs;
};

// ────────────────────── SEARCH SCREEN ──────────────────────
export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_PRODUCTS.filter(p => p.name.toLowerCase().includes(q));
  }, [query]);

  const paired = useMemo(() => pairProducts(filteredProducts), [filteredProducts]);

  const handleSearchPress = () => console.log('Search icon pressed');
  const handleVoicePress = () => console.log('Voice icon pressed');

  return (
    <SafeAreaView style={screenStyles.safe} edges={['top']}>
      {/* ==================== HEADER ==================== */}
      <View style={screenStyles.header}>
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

        <View style={screenStyles.Logoflex}>
          <Svg width="38" height="38" viewBox="0 0 125 100" fill="none">
            {/* logo SVG – unchanged */}
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
          <Text style={screenStyles.logo}>Stylish</Text>
        </View>

        <TouchableOpacity>
          <Image source={profileIcon} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>

      {/* ==================== SEARCH ==================== */}
      <View style={screenStyles.searchRow}>
        <View style={screenStyles.searchWrapper}>
          <TouchableOpacity onPress={handleSearchPress} style={screenStyles.iconLeft}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <G clipPath="url(#clip0_1_17043)">
                <Path
                  d="M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z"
                  fill="#BBBBBB"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_1_17043">
                  <Rect width="20" height="20" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
          </TouchableOpacity>

          <TextInput
            placeholder="Search any Product.."
            value={query}
            onChangeText={setQuery}
            style={screenStyles.searchInput}
            returnKeyType="search"
            autoFocus
          />

          <TouchableOpacity onPress={handleVoicePress} style={screenStyles.iconRight}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <G clipPath="url(#clip0_1_17047)">
                <Path
                  d="M12 14C13.66 14 14.99 12.66 14.99 11L15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM10.8 4.9C10.8 4.24 11.34 3.7 12 3.7C12.66 3.7 13.2 4.24 13.2 4.9L13.19 11.1C13.19 11.76 12.66 12.3 12 12.3C11.34 12.3 10.8 11.76 10.8 11.1V4.9ZM17.3 11C17.3 14 14.76 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C16.28 17.24 19 14.42 19 11H17.3Z"
                  fill="#BBBBBB"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_1_17047">
                  <Rect width="24" height="24" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* ==================== FEATURED HEADER ==================== */}
      <View style={screenStyles.featuredHeader}>
        <Text style={screenStyles.featuredTitle}>
          {filteredProducts.length > 0
            ? `${filteredProducts.length} Items`
            : 'No results'}
        </Text>
        <View style={screenStyles.actionsRow}>
          <View style={screenStyles.actionItem}>
            <Text style={screenStyles.actionText}>Sort</Text>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <G clipPath="url(#clip0_135_7279)">
                <Path
                  d="M11.3247 12.0485V6.38386H9.66234V12.0485H7.16884L10.4935 15.2727L13.8182 12.0485H11.3247ZM5.5065 0.727295L2.18182 3.95154H4.67533V9.61618H6.33767V3.95154H8.83117L5.5065 0.727295ZM11.3247 12.0485V6.38386H9.66234V12.0485H7.16884L10.4935 15.2727L13.8182 12.0485H11.3247ZM5.5065 0.727295L2.18182 3.95154H4.67533V9.61618H6.33767V3.95154H8.83117L5.5065 0.727295Z"
                  fill="#232327"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_135_7279">
                  <Rect width="16" height="16" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
          </View>

          <View style={screenStyles.actionItem}>
            <Text style={screenStyles.actionText}>Filter</Text>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M14.6666 2H1.33331L6.66665 8.30667V12.6667L9.33331 14V11.1533V8.30667L14.6666 2Z"
                stroke="#232327"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M9.33335 8H6.66669V11.9111L9.33335 13.3333V8Z"
                fill="#232327"
              />
            </Svg>
          </View>
        </View>
      </View>

      {/* ==================== PRODUCT GRID (custom rows) ==================== */}
      <FlatList
        data={paired}
        keyExtractor={(_, i) => `row-${i}`}
        contentContainerStyle={screenStyles.productList}
        renderItem={({ item: { left, right, rowIndex } }) => {
          const isOddRow = rowIndex % 2 === 0; // row 0,2,4… → left normal, right large
          return (
            <View style={screenStyles.row}>
              <ProductCard
                title={left.name}
                price={`₹${left.price}`}
                image={left.image}
                originalPrice={left.originalPrice}
                discount={left.discount}
                rating={left.rating}
                totalRatings={left.totalRatings}
                badge={left.badge}
                isLarge={!isOddRow}
                onPress={() => console.log('Pressed:', left.name)}
              />
              {right && (
                <ProductCard
                  title={right.name}
                  price={`₹${right.price}`}
                  image={right.image}
                  originalPrice={right.originalPrice}
                  discount={right.discount}
                  rating={right.rating}
                  totalRatings={right.totalRatings}
                  badge={right.badge}
                  isLarge={isOddRow}
                  onPress={() => console.log('Pressed:', right.name)}
                />
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={screenStyles.emptyContainer}>
            <Text style={screenStyles.emptyText}>No products found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

/* ==================== SCREEN STYLES ==================== */
const screenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.body },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Logoflex: { flexDirection: 'row', alignItems: 'center' },
  logo: {
    color: COLORS.blue,
    fontSize: 20,
    fontFamily: 'LibreCaslonText-Bold',
    marginTop: 4,
    marginLeft: 4,
  },

  searchRow: {
    paddingHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  iconLeft: { padding: 8 },
  iconRight: { padding: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 16,
  },

  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  featuredTitle: { fontSize: 18, fontWeight: '700', color: '#232327' },
  actionsRow: { flexDirection: 'row', gap: 20 },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionText: { fontSize: 14, color: '#232327', fontWeight: '500' },

  productList: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});