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
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../constants/colors';

// ---- SVG: Back Arrow (Left) ----
const backArrowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="21" viewBox="0 0 11 21" fill="none">
  <path d="M10.0858 0.707092L1.29292 9.49999C0.902398 9.89051 0.902398 10.5237 1.29292 10.9142L10.0858 19.7071" stroke="black" stroke-width="2"/>
</svg>`;

// ---- SVG: Cart Icon (Right) ----
const cartIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_190_7721)">
    <path d="M5.83337 15C4.91671 15 4.17504 15.75 4.17504 16.6667C4.17504 17.5834 4.91671 18.3334 5.83337 18.3334C6.75004 18.3334 7.50004 17.5834 7.50004 16.6667C7.50004 15.75 6.75004 15 5.83337 15ZM14.1667 15C13.25 15 12.5084 15.75 12.5084 16.6667C12.5084 17.5834 13.25 18.3334 14.1667 18.3334C15.0834 18.3334 15.8334 17.5834 15.8334 16.6667C15.8334 15.75 15.0834 15 14.1667 15ZM12.9584 10.8334C13.5834 10.8334 14.1334 10.4917 14.4167 9.97502L17.4 4.56669C17.7084 4.01669 17.3084 3.33335 16.675 3.33335H4.34171L3.55837 1.66669H0.833374V3.33335H2.50004L5.50004 9.65835L4.37504 11.6917C3.76671 12.8084 4.56671 14.1667 5.83337 14.1667H15.8334V12.5H5.83337L6.75004 10.8334H12.9584ZM5.13337 5.00002H15.2584L12.9584 9.16669H7.10837L5.13337 5.00002Z" fill="#323232"/>
  </g>
  <defs>
    <clipPath id="clip0_190_7721">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

// ---- SVG: Stars (unchanged) ----
const ActiveStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="none">
  <path d="M5.83333 8.9075L9.43833 11.0833L8.48167 6.9825L11.6667 4.22333L7.4725 3.8675L5.83333 0L4.19417 3.8675L0 4.22333L3.185 6.9825L2.22833 11.0833L5.83333 8.9075Z" fill="#EDB310"/>
</svg>`;
const DeactiveStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 14" fill="none">
  <g clip-path="url(#clip0)">
    <path d="M12.8334 5.38996L8.63919 5.02829L7.00002 1.16663L5.36085 5.03413L1.16669 5.38996L4.35169 8.14913L3.39502 12.25L7.00002 10.0741L10.605 12.25L9.65419 8.14913L12.8334 5.38996ZM7.00002 8.98329V3.55829L7.99752 5.91496L10.5525 6.13663L8.61585 7.81663L9.19919 10.3133L7.00002 8.98329Z" fill="#BBBBBB"/>
  </g>
  <defs><clipPath id="clip0"><rect width="14" height="14" fill="white"/></clipPath></defs>
</svg>`;
const LocationSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_1_17347)">
    <path d="M8.00004 2.66671C9.28671 2.66671 11.3334 3.60004 11.3334 6.10004C11.3334 7.54004 10.1867 9.21337 8.00004 10.98C5.81337 9.21337 4.66671 7.53337 4.66671 6.10004C4.66671 3.60004 6.71337 2.66671 8.00004 2.66671ZM8.00004 1.33337C5.82004 1.33337 3.33337 2.97337 3.33337 6.10004C3.33337 8.18004 4.88671 10.3734 8.00004 12.6667C11.1134 10.3734 12.6667 8.18004 12.6667 6.10004C12.6667 2.97337 10.18 1.33337 8.00004 1.33337Z" fill="#828282"/>
    <path d="M8.00004 4.66663C7.26671 4.66663 6.66671 5.26663 6.66671 5.99996C6.66671 6.73329 7.26671 7.33329 8.00004 7.33329C8.35366 7.33329 8.6928 7.19282 8.94285 6.94277C9.1929 6.69272 9.33337 6.35358 9.33337 5.99996C9.33337 5.64634 9.1929 5.3072 8.94285 5.05715C8.6928 4.8071 8.35366 4.66663 8.00004 4.66663ZM3.33337 13.3333H12.6667V14.6666H3.33337V13.3333Z" fill="#828282"/>
  </g>
  <defs>
    <clipPath id="clip0_1_17347">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>`;
const Lock = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_1_17350)">
    <path d="M12 5.33329H11.3333V3.99996C11.3333 2.15996 9.83996 0.666626 7.99996 0.666626C6.15996 0.666626 4.66663 2.15996 4.66663 3.99996V5.33329H3.99996C3.26663 5.33329 2.66663 5.93329 2.66663 6.66663V13.3333C2.66663 14.0666 3.26663 14.6666 3.99996 14.6666H12C12.7333 14.6666 13.3333 14.0666 13.3333 13.3333V6.66663C13.3333 5.93329 12.7333 5.33329 12 5.33329ZM5.99996 3.99996C5.99996 2.89329 6.89329 1.99996 7.99996 1.99996C9.10663 1.99996 9.99996 2.89329 9.99996 3.99996V5.33329H5.99996V3.99996ZM12 13.3333H3.99996V6.66663H12V13.3333ZM7.99996 11.3333C8.73329 11.3333 9.33329 10.7333 9.33329 9.99996C9.33329 9.26663 8.73329 8.66663 7.99996 8.66663C7.26663 8.66663 6.66663 9.26663 6.66663 9.99996C6.66663 10.7333 7.26663 11.3333 7.99996 11.3333Z" fill="#828282"/>
  </g>
  <defs>
    <clipPath id="clip0_1_17350">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>`;
const ReturnPolicySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_1_17353)">
    <path d="M12.4 13H14V14.3334H10V10.3334H11.3334V12.1534C12.5534 11.1734 13.3334 9.68003 13.3334 8.00003C13.3334 5.2867 11.2934 3.04003 8.66671 2.71337V1.3667C12.0334 1.70003 14.6667 4.54003 14.6667 8.00003C14.6667 9.99337 13.7867 11.78 12.4 13ZM2.66671 8.00003C2.66671 6.32003 3.44671 4.82003 4.66671 3.8467V5.6667H6.00004V1.6667H2.00004V3.00003H3.60004C2.21337 4.22003 1.33337 6.0067 1.33337 8.00003C1.33337 11.46 3.96671 14.3 7.33337 14.6334V13.2867C4.70671 12.96 2.66671 10.7134 2.66671 8.00003ZM10.8267 5.4067L7.05337 9.18003L5.16671 7.29337L4.22671 8.23337L7.05337 11.06L11.7667 6.3467L10.8267 5.4067Z" fill="#828282"/>
  </g>
  <defs>
    <clipPath id="clip0_1_17353">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>`;
const EyeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1_17377)">
    <path d="M12 6.5C15.79 6.5 19.17 8.63 20.82 12C19.17 15.37 15.8 17.5 12 17.5C8.2 17.5 4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM12 7.5C9.52 7.5 7.5 9.52 7.5 12C7.5 14.48 9.52 16.5 12 16.5C14.48 16.5 16.5 14.48 16.5 12C16.5 9.52 14.48 7.5 12 7.5Z" fill="#232327"/>
  </g>
  <defs>
    <clipPath id="clip0_1_17377">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

const CompareSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1_17380)">
    <path d="M2.52998 19.65L3.86998 20.21V11.18L1.43998 17.04C1.02998 18.06 1.51998 19.23 2.52998 19.65ZM22.03 15.95L17.07 3.98C16.76 3.23 16.03 2.77 15.26 2.75C15 2.75 14.73 2.79 14.47 2.9L7.09998 5.95C6.34998 6.26 5.88998 6.98 5.86998 7.75C5.85998 8.02 5.90998 8.29 6.01998 8.55L10.98 20.52C11.29 21.28 12.03 21.74 12.81 21.75C13.07 21.75 13.33 21.7 13.58 21.6L20.94 18.55C21.96 18.13 22.45 16.96 22.03 15.95ZM12.83 19.75L7.86998 7.79L15.22 4.75H15.23L20.18 16.7L12.83 19.75Z" fill="#323232"/>
    <path d="M11 10C11.5523 10 12 9.55228 12 9C12 8.44772 11.5523 8 11 8C10.4477 8 10 8.44772 10 9C10 9.55228 10.4477 10 11 10Z" fill="#323232"/>
    <path d="M5.88 19.75C5.88 20.85 6.78 21.75 7.88 21.75H9.33L5.88 13.41V19.75Z" fill="#323232"/>
  </g>
  <defs>
    <clipPath id="clip0_1_17380">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>`;


// ────────────────────── DUMMY SIMILAR PRODUCTS ──────────────────────
const SIMILAR_PRODUCTS: Product[] = [
  {
    id: 's1',
    name: 'Slim Fit Shirt',
    price: 1299,
    originalPrice: '₹1799',
    discount: '28% OFF',
    rating: 4.4,
    totalRatings: '1.5k',
    image: require('../assets/img/products/p2.png'),
  },
  {
    id: 's2',
    name: 'Denim Jacket',
    price: 3999,
    originalPrice: '₹5499',
    discount: '27% OFF',
    rating: 4.6,
    totalRatings: '890',
    badge: 'New',
    image: require('../assets/img/products/p4.png'),
  },
  {
    id: 's3',
    name: 'Running Shoes',
    price: 2799,
    rating: 4.2,
    totalRatings: '2.3k',
    image: require('../assets/img/products/p3.png'),
  },
  {
    id: 's4',
    name: 'Floral Top',
    price: 899,
    originalPrice: '₹1299',
    discount: '31% OFF',
    rating: 4.5,
    totalRatings: '1.1k',
    image: require('../assets/img/products/p5.png'),
  },
];


// ────────────────────── SIMPLE CARD (flex-wrap) ──────────────────────
type SimpleCardProps = { product: Product; onPress?: () => void };

const SimpleCard: React.FC<SimpleCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.simpleCard} onPress={onPress}>
      <ImageBackground
        source={product.image}
        style={styles.simpleImage}
        imageStyle={styles.simpleImageStyle}
        resizeMode="cover"
      >
        {product.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </ImageBackground>

      <View style={styles.simpleText}>
        <Text style={styles.simpleTitle} numberOfLines={1}>
          {product.name}
        </Text>

        {product.originalPrice && product.discount ? (
          <View style={styles.simplePriceRow}>
            <Text style={styles.simplePrice}>₹{product.price}</Text>
            <Text style={styles.simpleOriginal}>₹{product.originalPrice}</Text>
            <Text style={styles.simpleDiscount}>{product.discount}</Text>
          </View>
        ) : (
          <Text style={styles.simplePrice}>₹{product.price}</Text>
        )}

        <View style={styles.simpleStarRow}>
          {[...Array(5)].map((_, i) => (
            <SvgXml
              key={i}
              xml={i < Math.floor(product.rating || 0) ? ActiveStarSvg : DeactiveStarSvg}
            />
          ))}
          {product.totalRatings && (
            <Text style={styles.simpleRatingCount}>({product.totalRatings})</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};


// ---- Product Type ----
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
  const navigation = useNavigation<any>();
  const openProductDetail = (p: Product) =>
    navigation.push('ProductDetail', { product: p });
  
  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const goBack = () => navigation.goBack();
  const goToCart = () => navigation.navigate('MainTabs', { screen: 'CartTab' });

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <SvgXml
        key={i}
        xml={i < Math.floor(product.rating || 0) ? ActiveStarSvg : DeactiveStarSvg}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* ===== HEADER WITH ICONS ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.iconButton}>
          <SvgXml xml={backArrowSvg} width={11} height={21} />
        </TouchableOpacity>

        <TouchableOpacity onPress={goToCart} style={styles.iconButton}>
          <SvgXml xml={cartIconSvg} width={20} height={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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

          {/* Description */}
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>

          <View style={styles.otherDescriptionFlex}>
            <View style={styles.otherDescriptionBox}>
              <SvgXml xml={LocationSvg} width={20} height={20} />
              <Text style={styles.otherDescriptionText}>Nearest Store</Text>
            </View>
            <View style={styles.otherDescriptionBox}>
              <SvgXml xml={Lock} width={20} height={20} />
              <Text style={styles.otherDescriptionText}>VIP</Text>
            </View>
            <View style={styles.otherDescriptionBox}>
              <SvgXml xml={ReturnPolicySvg} width={20} height={20} />
              <Text style={styles.otherDescriptionText}>Return policy</Text>
            </View>
          </View>

          {/* ---- Buy / Add to Cart Buttons ---- */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
              <Text style={styles.addBtnText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85}>
              <Text style={styles.buyBtnText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: COLORS.primary_three, paddingInline: 25, paddingBlock: 10, marginBlock: 12, borderRadius: 5 }}>
            <Text style={{ fontWeight: 500, fontSize: 14 }}>
              Delivery in
            </Text>
            <Text style={{ fontWeight: 700, fontSize: 22 }}>
              1 within Hour
            </Text>
          </View>

          {/* ───── VIEW SIMILAR / COMPARE (buttons) ───── */}
          <View style={styles.flex}>
            <TouchableOpacity style={[styles.flex, styles.viewBtn]}>
              <SvgXml xml={EyeSvg} width={20} height={20} />
              <Text style={styles.viewBtnText}>View Similar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.flex, styles.viewBtn]}>
              <SvgXml xml={CompareSvg} width={20} height={20} />
              <Text style={styles.viewBtnText}>Add to Compare</Text>
            </TouchableOpacity>
          </View>

          {/* ───── ALL FEATURED HEADER ───── */}
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredTitle}>All Featured</Text>
            <View style={styles.actionsRow}>
              <View style={styles.actionItem}>
                <Text style={styles.actionText}>Sort</Text>
                {/* (you can keep your sort SVG here if you have it) */}
              </View>
              <View style={styles.actionItem}>
                <Text style={styles.actionText}>Filter</Text>
                {/* (filter SVG) */}
              </View>
            </View>
          </View>

          {/* ───── SIMPLE FLEX-WRAP GRID ───── */}
          <View style={styles.similarWrapContainer}>
            {SIMILAR_PRODUCTS.map(p => (
              <SimpleCard
                key={p.id}
                product={p}
                onPress={() => openProductDetail(p)}
              />
            ))}
          </View>


        </View>
      </ScrollView>
    </View>
  );
}

/* ------------------- STYLES ------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
  },

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

  description: { fontSize: 15, lineHeight: 22, color: '#555', marginBottom: 12 },

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
  otherDescriptionFlex: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  otherDescriptionBox: {
    flexDirection: 'row',
    padding: 4,
    borderWidth: 2,
    borderColor: COLORS.text,
    borderRadius: 4,
  },
  otherDescriptionText: {
    color: COLORS.text,
    fontWeight: 600
  },
  flex: {
    flexDirection: 'row',
    gap: 8,
  },
    // ───── View Similar / Compare Buttons ─────
  viewBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 8,
  },
  viewBtnText: { marginLeft: 6, fontSize: 14, color: '#232327' },

  // ───── Featured Header ─────
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  featuredTitle: { fontSize: 18, fontWeight: '700', color: '#232327' },
  actionsRow: { flexDirection: 'row', gap: 12 },
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

  // ───── Flex-Wrap Grid ─────
  similarWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  simpleCard: {
    width: '48%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  simpleImage: { height: 180, justifyContent: 'flex-start' },
  simpleImageStyle: { borderRadius: 16 },
  simpleText: { padding: 10 },
  simpleTitle: { fontSize: 15, fontWeight: '600', color: COLORS.black },
  simplePriceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  simplePrice: { fontSize: 15, fontWeight: '600', color: COLORS.black },
  simpleOriginal: {
    marginLeft: 6,
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 13,
  },
  simpleDiscount: { marginLeft: 6, color: COLORS.primary, fontSize: 13, fontWeight: '600' },
  simpleStarRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 6 },
  simpleRatingCount: { marginLeft: 4, fontSize: 12, color: '#666' },
});