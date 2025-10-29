import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import {
  Easing,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Animated,
  Pressable,
  Image,
  View,
  Text,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { COLORS } from '../constants/colors';
import ProductCard from '../components/ProductCard';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
  ClipPath,
  Rect,
} from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const profileIcon = require('../assets/img/profileIcon.png');
const bannerOne = require('../assets/img/banner1.png');
const specialOfferBanner = require('../assets/img/specialOffer.png');
const visitNOwleftImg = require('../assets/img/visitNOwleftImg.png');
const visitNOwMiddleImg = require('../assets/img/visitNOwMiddleImg.png');
const visitNOwRightImg = require('../assets/img/visitNOwRightImg.png');

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: string;
  discount?: string;
  category: string;
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
    category: 'Tops',
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
    category: 'Bottoms',
    rating: 4.7,
    totalRatings: '1.8k',
    image: require('../assets/img/products/p2.png'),
  },
  {
    id: 'p3',
    name: 'Sneaker Run',
    price: 3499,
    category: 'Shoes',
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
    category: 'Outerwear',
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
    category: 'Dresses',
    rating: 4.6,
    totalRatings: '980',
    image: require('../assets/img/products/p5.png'),
  },
  {
    id: 'p6',
    name: 'Leather Cap',
    price: 499,
    category: 'Accessories',
    rating: 4.1,
    totalRatings: '320',
    image: require('../assets/img/products/p6.png'),
  },
];

const CATEGORIES = [
  'All',
  'Tops',
  'Bottoms',
  'Shoes',
  'Outerwear',
  'Dresses',
  'Accessories',
];

/* -------------------------------------------------
   CountdownTimer
   ------------------------------------------------- */
const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 8,
    seconds: 34,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else return { hours: 12, minutes: 8, seconds: 34 };
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <View style={styles.timerRow}>
      <View style={styles.timeBox}>
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <G clip-path="url(#clip0_135_11)">
            <Path
              d="M14.6667 3.79995L11.6 1.19995L10.7333 2.19995L13.8 4.79995L14.6667 3.79995ZM5.26668 2.26662L4.40001 1.26662L1.33334 3.79995L2.20001 4.79995L5.26668 2.26662ZM8.33334 5.33328H7.33334V9.33328L10.4667 11.2666L11 10.4666L8.33334 8.86662V5.33328ZM8.00001 2.66662C4.66668 2.66662 2.00001 5.33328 2.00001 8.66662C2.00001 12 4.66668 14.6666 8.00001 14.6666C11.3333 14.6666 14 12 14 8.66662C14 5.33328 11.3333 2.66662 8.00001 2.66662ZM8.00001 13.3333C5.40001 13.3333 3.33334 11.2666 3.33334 8.66662C3.33334 6.06662 5.40001 3.99995 8.00001 3.99995C10.6 3.99995 12.6667 6.06662 12.6667 8.66662C12.6667 11.2666 10.6 13.3333 8.00001 13.3333Z"
              fill="white"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_135_11">
              <Rect width="16" height="16" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
        <Text style={[styles.white, styles.timeText]}>{format(timeLeft.hours)}h</Text>
        <Text style={[styles.white, styles.timeText]}>{format(timeLeft.minutes)}m</Text>
        <Text style={[styles.white, styles.timeText]}>{format(timeLeft.seconds)}s</Text>
        <Text style={[styles.white, styles.timeText]}>remaining</Text>
      </View>
    </View>
  );
};

/* -------------------------------------------------
   DailyDeadline – Dynamic "Last Date" + Countdown
   ------------------------------------------------- */
const DailyDeadline: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeout(update, 100);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ h, m, s });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yy = String(today.getFullYear()).slice(-2);
  const dateStr = `${dd}/${mm}/${yy}`;

  const fmt = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <View style={styles.trendingDeadlineContainer}>
      <Svg width="12" height="14" viewBox="0 0 12 14" fill="none">
        <Path
          d="M2.66667 6H4V7.33333H2.66667V6ZM12 2.66667V12C12 12.7333 11.4 13.3333 10.6667 13.3333H1.33333C0.593333 13.3333 0 12.7333 0 12L0.00666666 2.66667C0.00666666 1.93333 0.593333 1.33333 1.33333 1.33333H2V0H3.33333V1.33333H8.66667V0H10V1.33333H10.6667C11.4 1.33333 12 1.93333 12 2.66667ZM1.33333 4H10.6667V2.66667H1.33333V4ZM10.6667 12V5.33333H1.33333V12H10.6667ZM8 7.33333H9.33333V6H8V7.33333ZM5.33333 7.33333H6.66667V6H5.33333V7.33333Z"
          fill="white"
        />
      </Svg>
      <Text style={styles.trendingDeadlineText}>
        Last Date {dateStr} 
        {/* – {fmt(timeLeft.h)}h {fmt(timeLeft.m)}m {fmt(timeLeft.s)}s */}
      </Text>
    </View>
  );
};

/* -------------------------------------------------
   HomeScreen – Now uses FlatList as root scroller
   ------------------------------------------------- */
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const menuAnim = useRef(new Animated.Value(-300)).current;
  const flatListRef = useRef<FlatList>(null);

  /* ---------- MENU ---------- */
  const toggleMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
      Animated.timing(menuAnim, { toValue: -300, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnim, { toValue: 0, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
    Animated.timing(menuAnim, { toValue: -300, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  };

  /* ---------- AUTO-PLAY EFFECTS ---------- */
  useEffect(() => {
    const maxIndex = Math.floor((SAMPLE_PRODUCTS.length - 1) / 2);
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        flatListRef.current?.scrollToIndex({
          index: next * 2,
          animated: true,
          viewPosition: 0,
        });
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- FILTERED PRODUCTS ---------- */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_PRODUCTS.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q);
    });
  }, [query, selectedCategory]);

  const handleSearchPress = () => console.log('Search icon pressed');
  const handleVoicePress = () => console.log('Voice icon pressed');

  /* ---------- LIST HEADER (All static content) ---------- */
  const ListHeader = () => (
    <>
      {/* ==================== HEADER ==================== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <G clipPath="url(#clip0_1_7348)">
              <Path d="M21 11.01L3 11V13H21V11.01ZM3 16H15V18H3V16ZM21 6H3V8.01L21 8V6Z" fill="#323232" />
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
            <Path d="M124.993 49.9986C124.993 36.7382 119.725 24.0208 110.349 14.6442C100.972 5.2677 88.255 1.7389e-06 74.9947 0C61.7343 -1.73889e-06 49.017 5.2677 39.6404 14.6442C30.2638 24.0208 24.9961 36.7382 24.9961 49.9986H40.6209C45.7984 49.9986 49.8363 45.6597 51.7328 40.8418C52.9778 37.6787 54.8672 34.7718 57.3174 32.3213C62.0057 27.6331 68.3645 24.9993 74.9947 24.9993C81.6249 24.9993 87.9837 27.6331 92.6719 32.3213C97.3602 37.0096 99.9938 43.3684 99.9938 49.9986H124.993Z" fill="url(#paint0)" />
            <Path d="M96.1908 69.1352C98.7035 63.069 99.9969 56.5675 99.9969 50.0017H124.993C124.993 77.6151 102.608 100 74.9949 100C70.6705 100 66.474 99.4511 62.4723 98.4191C64.7365 97.8357 66.962 97.0928 69.1318 96.1942C75.1979 93.6815 80.7097 89.9988 85.3525 85.356C89.9954 80.7131 93.6784 75.2013 96.1908 69.1352Z" fill="#4392F9" />
            <Path d="M0 49.9954C-9.3931e-07 56.5615 1.29325 63.0631 3.8059 69.1292C6.31858 75.1954 10.0014 80.7072 14.6442 85.35C19.287 89.9925 24.7988 93.6755 30.8649 96.1882C36.931 98.7009 43.4325 99.994 49.9986 99.994C56.5643 99.994 63.0659 98.7009 69.1321 96.1882C75.1982 93.6755 80.71 89.9925 85.3528 85.35C89.9957 80.7072 93.6784 75.1954 96.1911 69.1292C98.7038 63.0631 99.9972 56.5615 99.9972 49.9954H84.3724C79.1948 49.9954 75.157 54.3343 73.2605 59.1519C73.2067 59.2892 73.1512 59.4258 73.0948 59.5625C71.8385 62.5954 69.9971 65.3515 67.6756 67.6727C65.3543 69.994 62.5982 71.8356 59.5653 73.092C56.5324 74.3483 53.2816 74.9949 49.9986 74.9949C46.7156 74.9949 43.4648 74.3483 40.4319 73.092C37.3986 71.8356 34.6429 69.994 32.3213 67.6727C30 65.3515 28.1586 62.5954 26.9022 59.5625C25.6459 56.5293 24.9993 53.2785 24.9993 49.9954H0Z" fill="url(#paint1)" />
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

      {/* ==================== SEARCH ==================== */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={handleSearchPress} style={styles.iconLeft}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <G clipPath="url(#clip0_1_17043)">
                <Path d="M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z" fill="#BBBBBB" />
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
            style={styles.searchInput}
            returnKeyType="search"
          />

          <TouchableOpacity onPress={handleVoicePress} style={styles.iconRight}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <G clipPath="url(#clip0_1_17047)">
                <Path d="M12 14C13.66 14 14.99 12.66 14.99 11L15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM10.8 4.9C10.8 4.24 11.34 3.7 12 3.7C12.66 3.7 13.2 4.24 13.2 4.9L13.19 11.1C13.19 11.76 12.66 12.3 12 12.3C11.34 12.3 10.8 11.76 10.8 11.1V4.9ZM17.3 11C17.3 14 14.76 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C16.28 17.24 19 14.42 19 11H17.3Z" fill="#BBBBBB" />
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
      <View style={styles.featuredHeader}>
        <Text style={styles.featuredTitle}>All Featured</Text>
        <View style={styles.actionsRow}>
          <View style={styles.actionItem}>
            <Text style={styles.actionText}>Sort</Text>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <G clipPath="url(#clip0_135_7279)">
                <Path d="M11.3247 12.0485V6.38386H9.66234V12.0485H7.16884L10.4935 15.2727L13.8182 12.0485H11.3247ZM5.5065 0.727295L2.18182 3.95154H4.67533V9.61618H6.33767V3.95154H8.83117L5.5065 0.727295ZM11.3247 12.0485V6.38386H9.66234V12.0485H7.16884L10.4935 15.2727L13.8182 12.0485H11.3247ZM5.5065 0.727295L2.18182 3.95154H4.67533V9.61618H6.33767V3.95154H8.83117L5.5065 0.727295Z" fill="#232327" />
              </G>
              <Defs>
                <ClipPath id="clip0_135_7279">
                  <Rect width="16" height="16" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
          </View>
          <View style={styles.actionItem}>
            <Text style={styles.actionText}>Filter</Text>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path d="M14.6666 2H1.33331L6.66665 8.30667V12.6667L9.33331 14V11.1533V8.30667L14.6666 2Z" stroke="#232327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M9.33335 8H6.66669V11.9111L9.33335 13.3333V8Z" fill="#232327" />
            </Svg>
          </View>
        </View>
      </View>

      {/* ==================== CATEGORIES ==================== */}
      <View style={styles.categories}>
        <FlatList
          data={CATEGORIES}
          horizontal
          keyExtractor={c => c}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const active = item === selectedCategory;
            const iconMap: Record<string, any> = {
              All: require('../assets/img/category/cat1.png'),
              Tops: require('../assets/img/category/cat2.png'),
              Bottoms: require('../assets/img/category/cat3.png'),
              Shoes: require('../assets/img/category/cat4.png'),
              Outerwear: require('../assets/img/category/cat5.png'),
              Dresses: require('../assets/img/category/cat1.png'),
              Accessories: require('../assets/img/category/cat2.png'),
            };
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={[styles.categoryPill, active && styles.categoryActive]}>
                <Image source={iconMap[item]} style={styles.categoryIcon} resizeMode="contain" />
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ==================== PROMO BANNER ==================== */}
      <View style={styles.promoWrap}>
        <FlatList
          data={[bannerOne, bannerOne, bannerOne]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.promoContainer}>
              <Image source={item} style={styles.promo} />
              <View style={styles.bannerTextContainer}>
                <Text style={[styles.white, styles.offText]}>50-40% OFF</Text>
                <View style={{ marginBottom: 8 }}>
                  <Text style={[styles.white, styles.lightOffText]}>Now in (product)</Text>
                  <Text style={[styles.white, styles.lightOffText]}>All colours</Text>
                </View>
                <View style={styles.shopNowRow}>
                  <Text style={[styles.white, styles.shopNowText]}>Shop Now</Text>
                  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <G clipPath="url(#clip0_135_7285)">
                      <Path d="M10 3.33337L9.06001 4.27337L12.1133 7.33337H1.33334V8.66671H12.1133L9.05334 11.7267L10 12.6667L14.6667 8.00004L10 3.33337Z" fill="white" />
                    </G>
                    <Defs>
                      <ClipPath id="clip0_135_7285">
                        <Rect width="16" height="16" fill="white" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </View>
              </View>
            </View>
          )}
          onMomentumScrollEnd={e => {
            const slide = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentSlide(slide);
          }}
        />
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map(i => (
            <View key={i} style={[styles.dot, currentSlide === i ? styles.dotActive : styles.dotInactive]} />
          ))}
        </View>
      </View>

      {/* ==================== DEAL OF THE DAY ==================== */}
      <View style={styles.dealofthedayWrap}>
        <View style={styles.dealTimer}>
          <Text style={[styles.white, styles.dealText]}>Deal of the Day</Text>
          <CountdownTimer />
        </View>
        <View style={styles.shopNowRow}>
          <Text style={[styles.white, styles.viewAllText]}>View All</Text>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <G clipPath="url(#clip0_135_7285)">
              <Path d="M10 3.33337L9.06001 4.27337L12.1133 7.33337H1.33334V8.66671H12.1133L9.05334 11.7267L10 12.6667L14.6667 8.00004L10 3.33337Z" fill="white" />
            </G>
            <Defs>
              <ClipPath id="clip0_135_7285">
                <Rect width="16" height="16" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </View>
      </View>

      {/* ==================== 2-CARD SLIDER ==================== */}
      <View style={styles.dealSliderContainer}>
        <FlatList
          ref={flatListRef}
          data={SAMPLE_PRODUCTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH * 2 + CARD_MARGIN * 2}
          decelerationRate="fast"
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            if (index % 2 !== 0) return null;
            const next = SAMPLE_PRODUCTS[index + 1];
            return (
              <View style={styles.sliderPair}>
                <View style={styles.sliderCard}>
                  <ProductCard title={item.name} price={`₹${item.price}`} originalPrice={item.originalPrice} discount={item.discount} rating={item.rating} totalRatings={item.totalRatings} image={item.image} onPress={() => console.log('Pressed:', item.name)} />
                </View>
                {next && (
                  <View style={styles.sliderCard}>
                    <ProductCard title={next.name} price={`₹${next.price}`} originalPrice={next.originalPrice} discount={next.discount} rating={next.rating} totalRatings={next.totalRatings} image={next.image} onPress={() => console.log('Pressed:', next.name)} />
                  </View>
                )}
              </View>
            );
          }}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH * 2 + CARD_MARGIN * 2,
            offset: (CARD_WIDTH * 2 + CARD_MARGIN * 2) * Math.floor(index / 2),
            index,
          })}
          onScrollToIndexFailed={() => {
            const maxIndex = Math.floor((SAMPLE_PRODUCTS.length - 1) / 2);
            flatListRef.current?.scrollToIndex({
              index: Math.min(currentSlide, maxIndex) * 2,
              animated: true,
            });
          }}
          ListHeaderComponent={() => <View style={{ width: 16 }} />}
          ListFooterComponent={() => <View style={{ width: 16 }} />}
        />
        <TouchableOpacity style={styles.rightArrow} onPress={() => {
          const max = Math.floor((SAMPLE_PRODUCTS.length - 1) / 2);
          const next = currentSlide >= max ? 0 : currentSlide + 1;
          flatListRef.current?.scrollToIndex({ index: next * 2, animated: true, viewPosition: 0 });
          setCurrentSlide(next);
        }}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M9 6L15 12L9 18" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* ==================== SPECIAL OFFER ==================== */}
      <View style={styles.specialOfferWrap}>
        <Image source={specialOfferBanner} style={styles.specialOfferBanner} />
        <View style={styles.specialOfferTextContainer}>
          <Text style={styles.specialOfferTitle}>Special Offers</Text>
          <Text style={styles.specialOfferDesc}>
            We make sure you get the offer you need at best prices
          </Text>
        </View>
      </View>

      {/* ==================== VISIT NOW ==================== */}
      <View style={styles.visitNOwWrap}>
        <View style={styles.imgContainer}>
          <Image source={visitNOwleftImg} style={styles.visitNOwleftImg} />
          <Image source={visitNOwMiddleImg} style={styles.visitNOwMiddleImg} />
          <Image source={visitNOwRightImg} style={styles.visitNOwRightImg} resizeMode='contain' />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>Flat and Heels</Text>
          <Text style={styles.subTitle}>Stand a chance to get rewarded</Text>
          <View style={styles.visitNOwBtnWrap}>
            <Text style={styles.visitNOwBtn}>Visit now</Text>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <G clip-path="url(#clip0_135_7043)">
                <Path d="M9.99998 3.33337L9.05998 4.27337L12.1133 7.33337H1.33331V8.66671H12.1133L9.05331 11.7267L9.99998 12.6667L14.6666 8.00004L9.99998 3.33337Z" fill="white" />
              </G>
              <Defs>
                <ClipPath id="clip0_135_7043">
                  <Rect width="16" height="16" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
          </View>
        </View>
      </View>

      {/* ==================== TRENDING PRODUCTS ==================== */}
      <View style={styles.trendingWrap}>
        <View style={styles.dealTimer}>
          <Text style={[styles.white, styles.dealText]}>Trending Products</Text>
          <DailyDeadline />
        </View>
        <View style={styles.shopNowRow}>
          <Text style={[styles.white, styles.viewAllText]}>View All</Text>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <G clipPath="url(#clip0_135_7285)">
              <Path d="M10 3.33337L9.06001 4.27337L12.1133 7.33337H1.33334V8.66671H12.1133L9.05334 11.7267L10 12.6667L14.6667 8.00004L10 3.33337Z" fill="white" />
            </G>
            <Defs>
              <ClipPath id="clip0_135_7285">
                <Rect width="16" height="16" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* MAIN FLATLIST – Root scroller */}
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ProductCard
              title={item.name}
              price={`₹${item.price}`}
              originalPrice={item.originalPrice}
              discount={item.discount}
              rating={item.rating}
              totalRatings={item.totalRatings}
              image={item.image}
              onPress={() => console.log('Pressed:', item.name)}
            />
          )}
          ListEmptyComponent={<View style={styles.empty}><Text>No items found</Text></View>}
        />
      )}

      {/* ==================== SLIDING MENU ==================== */}
      {menuVisible && (
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnim }] }]}>
            <View style={styles.menuHeader}>
              <View style={styles.userInfo}>
                <Image source={profileIcon} style={styles.menuProfileIcon} />
                <View>
                  <Text style={styles.userName}>John Doe</Text>
                  <Text style={styles.userEmail}>john.doe@example.com</Text>
                </View>
              </View>
              <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path d="M18 6L6 18M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                </Svg>
              </TouchableOpacity>
            </View>
            <View style={styles.menuItems}>
              <TouchableOpacity style={styles.menuItem}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.menuIcon}>
                  <Path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.body },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  Logoflex: { flexDirection: 'row', alignItems: 'center' },
  logo: { color: COLORS.blue, fontSize: 20, fontFamily: 'LibreCaslonText-Bold', marginTop: 4, marginLeft: 4 },
  searchRow: { paddingHorizontal: 16, marginTop: 12, flexDirection: 'row', alignItems: 'center' },
  searchWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F6FA', borderRadius: 12, paddingHorizontal: 8 },
  iconLeft: { padding: 8 },
  iconRight: { padding: 8 },
  searchInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 4, fontSize: 16 },
  featuredHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  featuredTitle: { fontSize: 18, fontWeight: '700', color: '#232327' },
  actionsRow: { flexDirection: 'row', gap: 20 },
  actionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, gap: 6 },
  actionText: { fontSize: 14, color: '#232327', fontWeight: '500' },
  categories: { marginTop: 12, paddingLeft: 16 },
  categoryPill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#F7F8FB', marginRight: 10, alignItems: 'center' },
  categoryActive: { backgroundColor: COLORS.primary + '20' },
  categoryText: { fontSize: 13, color: '#333' },
  categoryTextActive: { color: COLORS.primary, fontWeight: '700' },
  categoryIcon: { width: 56, height: 56, marginBottom: 4 },
  promoWrap: { marginTop: 16, paddingHorizontal: 16, position: 'relative' },
  promoContainer: { width, overflow: 'hidden', borderRadius: 12 },
  promo: { width: '100%', height: 190, borderRadius: 12 },
  bannerTextContainer: { position: 'absolute', top: 40, left: 15 },
  white: { color: '#FFFFFF' },
  offText: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  lightOffText: { fontSize: 18, fontWeight: '300' },
  shopNowRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: '#FFFFFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  shopNowText: { fontSize: 14, fontWeight: '600' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  dotActive: { backgroundColor: '#ff9aac' },
  dotInactive: { backgroundColor: COLORS.text },
  dealofthedayWrap: { padding: 16, backgroundColor: COLORS.blue, flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, borderRadius: 12, marginHorizontal: 16, alignItems: 'center' },
  dealTimer: { alignItems: 'flex-start' },
  viewAllText: { fontSize: 16, fontWeight: '600' },
  timerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  dealText: { fontSize: 20, fontWeight: '500' },
  timeBox: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  timeText: { fontSize: 18, fontWeight: '700', minWidth: 32, textAlign: 'center' },
  dealSliderContainer: { marginTop: 16, position: 'relative' },
  sliderPair: { flexDirection: 'row', width: CARD_WIDTH * 2 + CARD_MARGIN, justifyContent: 'space-between', paddingHorizontal: CARD_MARGIN },
  sliderCard: { width: CARD_WIDTH },
  rightArrow: { position: 'absolute', right: 16, top: '50%', marginTop: -12, backgroundColor: '#fff', padding: 8, borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  list: { paddingHorizontal: CARD_MARGIN, paddingTop: 16, paddingBottom: 40 },
  empty: { padding: 40, alignItems: 'center' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000 },
  sideMenu: { position: 'absolute', top: 0, bottom: 0, width: '100%', backgroundColor: '#fff', elevation: 10, shadowColor: '#000', shadowOffset: { width: 2, height: 0 }, shadowOpacity: 0.25, shadowRadius: 10, zIndex: 1001, paddingTop: 60 },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 24, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: 16 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  menuProfileIcon: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  userName: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 2 },
  userEmail: { fontSize: 14, color: '#666' },
  closeButton: { padding: 4 },
  menuItems: { paddingHorizontal: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 8, borderRadius: 12, marginBottom: 4 },
  menuIcon: { marginRight: 16 },
  menuItemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  specialOfferWrap: { marginVertical: 24, padding: 16, position: 'relative', borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, gap: 16 },
  specialOfferBanner: { width: 60, height: 60, },
  specialOfferTextContainer: { flex: 1 },
  specialOfferTitle: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  specialOfferDesc: { fontSize: 16, fontWeight: '300' },
  visitNOwWrap: { marginBottom: 32, backgroundColor: COLORS.white, borderRadius: 12, marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 16 },
  imgContainer: { flexDirection: 'row', marginBottom: 12 },
  visitNOwleftImg: { width: 10, height: 170, },
  visitNOwMiddleImg: { width: 77, marginLeft: -5, height: 170 },
  visitNOwRightImg: { width: 144, marginLeft: -50, height: 170 },
  textContainer: { alignItems: 'center', gap: 4 },
  textTitle: { fontSize: 20, fontWeight: '500' },
  subTitle: { fontSize: 14, fontWeight: '300', color: COLORS.black },
  visitNOwBtnWrap: { marginLeft: 80, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, marginTop: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, gap: 6 },
  visitNOwBtn: { color: COLORS.white },
  trendingWrap: { padding: 16, backgroundColor: COLORS.primary_two, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 32, },
  trendingDeadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  trendingDeadlineText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default HomeScreen;