// src/screens/SplashScreen.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const { width, height } = Dimensions.get('window');

const slides = [
  { key: 'logo', title: 'Stylish', subtitle: 'Fashion at your fingertips', type: 'logo' },
  { key: 'one', title: 'Discover Trends', subtitle: 'Handpicked collections and daily drops.' },
  { key: 'two', title: 'Fast Delivery', subtitle: 'Lightning-fast shipping across the city.' },
  { key: 'three', title: 'Secure Payments', subtitle: 'Multiple secure payment options.' },
];

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const flatRef = useRef<FlatList<any> | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length) setIndex(viewableItems[0].index);
  };

  const handleSkip = () => navigation.replace('SignIn'); // navigate to SignIn as second screen

  const handleNext = () => {
    if (index < slides.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={slides}
        keyExtractor={(i) => i.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {item.type === 'logo' ? (
              <>
                <View style={styles.logoWrapper}>
                  {/* Inline SVG logo (keeps your existing SVG) */}
                  <Svg width={150} height={120} viewBox="0 0 125 100" accessibilityLabel="Stylish logo">
                    <Defs>
                      <LinearGradient id="g0" x1="124.993" y1="24.9993" x2="24.9961" y2="24.9993" gradientUnits="userSpaceOnUse">
                        <Stop offset="0" stopColor="#CFE2FC" />
                        <Stop offset="1" stopColor="#4392F9" />
                      </LinearGradient>
                      <LinearGradient id="g1" x1="0" y1="74.9949" x2="99.9972" y2="74.9949" gradientUnits="userSpaceOnUse">
                        <Stop offset="0" stopColor="#F8BCC6" />
                        <Stop offset="1" stopColor="#F83758" />
                      </LinearGradient>
                    </Defs>
                    {/* keep same paths as your original logo */}
                    <Path d="M124.993 49.9986C124.993 36.7382 119.725 24.0208 110.349 14.6442C100.972 5.2677 88.255 1.7389e-06 74.9947 0C61.7343 -1.73889e-06 49.017 5.2677 39.6404 14.6442C30.2638 24.0208 24.9961 36.7382 24.9961 49.9986H40.6209C45.7984 49.9986 49.8363 45.6597 51.7328 40.8418C52.9778 37.6787 54.8672 34.7718 57.3174 32.3213C62.0057 27.6331 68.3645 24.9993 74.9947 24.9993C81.6249 24.9993 87.9837 27.6331 92.6719 32.3213C97.3602 37.0096 99.9938 43.3684 99.9938 49.9986H124.993Z" fill="url(#g0)" />
                    <Path d="M96.1908 69.1352C98.7035 63.069 99.9969 56.5675 99.9969 50.0017H124.993C124.993 77.6151 102.608 100 74.9949 100C70.6705 100 66.474 99.4511 62.4723 98.4191C64.7365 97.8357 66.962 97.0928 69.1318 96.1942C75.1979 93.6815 80.7097 89.9988 85.3525 85.356C89.9954 80.7131 93.6784 75.2013 96.1908 69.1352Z" fill="#4392F9" />
                  </Svg>
                </View>
                <Text style={styles.title}>Stylish</Text>
                <Text style={styles.subtitle}>Welcome to Stylish — your wardrobe reinvented</Text>
              </>
            ) : (
              <>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </>
            )}
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === index ? styles.activeDot : undefined]} />
          ))}
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>{index === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  logoWrapper: { marginBottom: 12 },
  title: { fontSize: 32, fontWeight: '700', color: COLORS.primary, marginTop: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 8, maxWidth: 320 },
  footer: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  skipText: { color: '#666', fontSize: 16 },
  nextBtn: { paddingVertical: 10, paddingHorizontal: 14 },
  nextText: { fontSize: 16, fontWeight: '600', color: COLORS.primary },
  dots: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#DDD', marginHorizontal: 6 },
  activeDot: { backgroundColor: COLORS.primary, width: 18 },
});

export default SplashScreen;
