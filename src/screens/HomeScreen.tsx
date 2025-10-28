import React, { useState, useMemo, useRef } from 'react';
import { Easing } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Animated,
  Pressable,
  Image,
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

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const profileIcon = require('../assets/img/profileIcon.png');

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: any;
  badge?: string;
};

const SAMPLE_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Classic Tee', price: 799, category: 'Tops', image: require('../assets/img/products/p1.png') },
  { id: 'p2', name: 'Slim Jeans', price: 1999, category: 'Bottoms', image: require('../assets/img/products/p2.png') },
  { id: 'p3', name: 'Sneaker Run', price: 3499, category: 'Shoes', image: require('../assets/img/products/p3.png') },
  { id: 'p4', name: 'Bomber Jacket', price: 4599, category: 'Outerwear', badge: 'New', image: require('../assets/img/products/p4.png') },
  { id: 'p5', name: 'Floral Dress', price: 2599, category: 'Dresses', image: require('../assets/img/products/p5.png') },
  { id: 'p6', name: 'Cap', price: 499, category: 'Accessories', image: require('../assets/img/products/p6.png') },
  { id: 'p7', name: 'Casual Shirt', price: 1099, category: 'Tops', image: require('../assets/img/products/p7.png') },
  { id: 'p8', name: 'Running Shorts', price: 899, category: 'Bottoms', image: require('../assets/img/products/p8.png') },
];

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Dresses', 'Accessories'];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const menuAnim = useRef(new Animated.Value(-300)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      // Closing
      setMenuVisible(false);
      Animated.timing(menuAnim, {
        toValue: -300,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      // Opening
      setMenuVisible(true); // Show overlay immediately
      Animated.timing(menuAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  };

  const closeMenu = () => {
    setMenuVisible(false); // Hide overlay instantly
    Animated.timing(menuAnim, {
      toValue: -300,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q);
    });
  }, [query, selectedCategory]);

  // Dummy handlers
  const handleSearchPress = () => {
    console.log('Search icon pressed');
  };
  const handleVoicePress = () => {
    console.log('Voice icon pressed');
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
          <Svg width="38" height="38" viewBox="0 0 125 100" fill="none" accessibilityLabel="Stylish logo">
            {/* ... logo paths ... */}
            <Path
              d="M124.993 49.9986C124.993 36.7382 119.725 24.0208 110.349 14.6442C100.972 5.2677 88.255 1.7389e-06 74.9947 0C61.7343 -1.73889e-06 49.017 5.2677 39.6404 14.6442C30.2638 24.0208 24.9961 36.7382 24.9961 49.9986H40.6209C45.7984 49.9986 49.8363 45.6597 51.7328 40.8418C52.9778 37.6787 54.8672 34.7718 57.3174 32.3213C62.0057 27.6331 68.3645 24.9993 74.9947 24.9993C81.6249 24.9993 87.9837 27.6331 92.6719 32.3213C97.3602 37.0096 99.9938 43.3684 99.9938 49.9986H124.993Z"
              fill="url(#paint0)"
            />
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

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          {/* Search Icon */}
          <TouchableOpacity onPress={handleSearchPress} style={styles.iconLeft}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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

          {/* TextInput */}
          <TextInput
            placeholder="Search any Product.."
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            returnKeyType="search"
          />

          {/* Voice Icon */}
          <TouchableOpacity onPress={handleVoicePress} style={styles.iconRight}>
            <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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


      <View style={styles.featuredHeader}>
        <Text style={styles.featuredTitle}>All Featured</Text>

        <View style={styles.actionsRow}>
          {/* Sort */}
          <View style={styles.actionItem}>
            <Text style={styles.actionText}>Sort</Text>
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

          {/* Filter */}
          <View style={styles.actionItem}>
            <Text style={styles.actionText}>Filter</Text>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M14.6666 2H1.33331L6.66665 8.30667V12.6667L9.33331 14V11.1533V8.30667L14.6666 2Z"
                stroke="#232327"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path d="M9.33335 8H6.66669V11.9111L9.33335 13.3333V8Z" fill="#232327" />
            </Svg>
          </View>
        </View>
      </View>

      {/* Categories */}
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
                <Text style={[styles.categoryText, active ? styles.categoryTextActive : undefined]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Product Grid */}
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ProductCard
              title={item.name}
              price={`₹${item.price}`}
              image={item.image}
              onPress={() => console.log('Tapped:', item.name)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text>No items found</Text>
            </View>
          }
        />
      )}

      {/* Sliding Menu */}
      {menuVisible && (
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <Animated.View style={[styles.sideMenu, { transform: [{ translateX: menuAnim }] }]}>
            {/* Menu Header */}
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

            {/* Menu Items */}
            <View style={styles.menuItems}>
              {/* ... menu items ... */}
              <TouchableOpacity style={styles.menuItem}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.menuIcon}>
                  <Path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.menuIcon}>
                  <Path d="M3 9H21V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M16 5L12 1L8 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M12 1V13" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Text style={styles.menuItemText}>Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.menuIcon}>
                  <Path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.menuIcon}>
                  <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M19.4 15C19.2662 15.3044 19.1776 15.6279 19.1375 15.9592C19.0974 16.2905 19.1063 16.6257 19.1639 16.9536C19.2215 17.2815 19.327 17.598 19.4762 17.8915C19.6254 18.185 19.8163 18.4519 20.042 18.6825C20.2677 18.9131 20.5254 19.1045 20.8053 19.2495C21.0852 19.3945 21.3836 19.4913 21.6895 19.5363C21.9954 19.5812 22.3048 19.5737 22.6078 19.5141C22.9108 19.4545 23.2034 19.3436 23.474 19.1856C23.7446 19.0276 23.9895 18.8246 24.2 18.5843C24.4104 18.344 24.5836 18.0696 24.713 17.7717C24.8423 17.4738 24.9259 17.1565 24.9606 16.8311C24.9952 16.5057 24.9804 16.1765 24.9168 15.8562C24.8532 15.5359 24.7418 15.2286 24.5868 14.9462L24.507 14.8C24.231 14.2971 23.8216 13.8765 23.3228 13.5835C22.824 13.2904 22.2543 13.1361 21.674 13.1361C21.0937 13.1361 20.524 13.2904 20.0252 13.5835C19.5264 13.8765 19.117 14.2971 18.841 14.8L18.6 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M4.60078 15C4.73456 15.3044 4.82317 15.6279 4.86327 15.9592C4.90337 16.2905 4.89444 16.6257 4.83685 16.9536C4.77927 17.2815 4.67378 17.598 4.52458 17.8915C4.37538 18.185 4.1845 18.4519 3.95879 18.6825C3.73308 18.9131 3.47534 19.1045 3.19545 19.2495C2.91556 19.3945 2.61714 19.4913 2.31124 19.5363C2.00534 19.5812 1.69595 19.5737 1.39294 19.5141C1.08993 19.4545 0.797333 19.3436 0.526726 19.1856C0.256119 19.0276 0.0112261 18.8246 -0.199218 18.5843C-0.409662 18.344 -0.58286 18.0696 -0.712203 17.7717C-0.841546 17.4738 -0.925148 17.1565 -0.959792 16.8311C-0.994436 16.5057 -0.979644 16.1765 -0.916045 15.8562C-0.852446 15.5359 -0.741048 15.2286 -0.586016 14.9462L-0.506219 14.8C-0.230203 14.2971 0.179181 13.8765 0.677985 13.5835C1.17679 13.2904 1.74648 13.1361 2.32678 13.1361C2.90708 13.1361 3.47677 13.2904 3.97557 13.5835C4.47438 13.8765 4.88376 14.2971 5.15978 14.8L5.40078 15" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem}>
                <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.menuIcon}>
                  <Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M16 17L21 12L16 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <Path d="M21 12H9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, paddingTop: 36, backgroundColor: COLORS.body },
  Logoflex: { flexDirection: 'row', alignItems: 'center' },
  logo: { color: COLORS.blue, fontSize: 20, fontFamily: 'LibreCaslonText-Bold', marginTop: 4, marginLeft: 4 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginRight: 10,
  },
  iconLeft: { padding: 8 },
  iconRight: { padding: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 16,
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
  empty: { padding: 40, alignItems: 'center' },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  /* Menu */
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    zIndex: 1001,
    paddingTop: 60,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuProfileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    padding: 4,
  },
  menuItems: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
    marginHorizontal: 8,
  },

  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#232327',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#232327',
    fontWeight: '500',
  },
});

export default HomeScreen;