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
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const { width } = Dimensions.get('window');

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

  // Use a stable ref callback to prevent rerenders
  const onViewRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length) {
      const newIndex = viewableItems[0].index ?? 0;
      setIndex(newIndex);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const handleSkip = () => navigation.replace('SignIn');

  const handleNext = () => {
    if (index < slides.length - 1) {
      flatRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      navigation.replace('SignIn');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {item.type === 'logo' ? (
              <View style={styles.logoContainer}>
                <View style={styles.logoWrapper}>
                  {/* Inline SVG logo (react-native-svg props fixed) */}
                  <Svg width="125" height="100" viewBox="0 0 125 100" fill="none">
                    <Path
                      d="M124.993 49.9986C124.993 36.7382 119.725 24.0208 110.349 14.6442C100.972 5.2677 88.255 1.7389e-06 74.9947 0C61.7343 -1.73889e-06 49.017 5.2677 39.6404 14.6442C30.2638 24.0208 24.9961 36.7382 24.9961 49.9986H40.6209C45.7984 49.9986 49.8363 45.6597 51.7328 40.8418C52.9778 37.6787 54.8672 34.7718 57.3174 32.3213C62.0057 27.6331 68.3645 24.9993 74.9947 24.9993C81.6249 24.9993 87.9837 27.6331 92.6719 32.3213C97.3602 37.0096 99.9938 43.3684 99.9938 49.9986H124.993Z"
                      fill="url(#paint0_linear_1_18748)"
                    />
                    <Path
                      d="M96.1908 69.1352C98.7035 63.069 99.9969 56.5675 99.9969 50.0017H124.993C124.993 77.6151 102.608 100 74.9949 100C70.6705 100 66.474 99.4511 62.4723 98.4191C64.7365 97.8357 66.962 97.0928 69.1318 96.1942C75.1979 93.6815 80.7097 89.9988 85.3525 85.356C89.9954 80.7131 93.6784 75.2013 96.1908 69.1352Z"
                      fill="#4392F9"
                    />
                    <Path
                      d="M0 49.9954C-9.3931e-07 56.5615 1.29325 63.0631 3.8059 69.1292C6.31858 75.1954 10.0014 80.7072 14.6442 85.35C19.287 89.9925 24.7988 93.6755 30.8649 96.1882C36.931 98.7009 43.4325 99.994 49.9986 99.994C56.5643 99.994 63.0659 98.7009 69.1321 96.1882C75.1982 93.6755 80.71 89.9925 85.3528 85.35C89.9957 80.7072 93.6784 75.1954 96.1911 69.1292C98.7038 63.0631 99.9972 56.5615 99.9972 49.9954H84.3724C79.1948 49.9954 75.157 54.3343 73.2605 59.1519C73.2067 59.2892 73.1512 59.4258 73.0948 59.5625C71.8385 62.5954 69.9971 65.3515 67.6756 67.6727C65.3543 69.994 62.5982 71.8356 59.5653 73.092C56.5324 74.3483 53.2816 74.9949 49.9986 74.9949C46.7156 74.9949 43.4648 74.3483 40.4319 73.092C37.3986 71.8356 34.6429 69.994 32.3213 67.6727C30 65.3515 28.1586 62.5954 26.9022 59.5625C25.6459 56.5293 24.9993 53.2785 24.9993 49.9954H0Z"
                      fill="url(#paint1_linear_1_18748)"
                    />
                    <Path
                      d="M0.00471497 49.9986C0.00471497 22.385 22.3898 0 50.003 0C54.3265 0 58.5216 0.548716 62.5231 1.58035C53.9371 3.79217 46.0167 8.26832 39.6405 14.6443C30.264 24.0207 24.9964 36.7382 24.9964 49.9986H0.00471497Z"
                      fill="#F83758"
                    />

                    <Defs>
                      <LinearGradient
                        id="paint0_linear_1_18748"
                        x1="124.993"
                        y1="24.9993"
                        x2="24.9961"
                        y2="24.9993"
                        gradientUnits="userSpaceOnUse"
                      >
                        <Stop offset="0" stopColor="#CFE2FC" />
                        <Stop offset="1" stopColor="#4392F9" />
                      </LinearGradient>

                      <LinearGradient
                        id="paint1_linear_1_18748"
                        x1="0"
                        y1="74.9949"
                        x2="99.9972"
                        y2="74.9949"
                        gradientUnits="userSpaceOnUse"
                      >
                        <Stop offset="0" stopColor="#F8BCC6" />
                        <Stop offset="1" stopColor="#F83758" />
                      </LinearGradient>
                    </Defs>
                  </Svg>
                </View>
                <Text style={styles.title}>Stylish</Text>
              </View>
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
  logoContainer: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  logoWrapper: { marginBottom: 12 },
  title: {
    fontSize: 32, color: COLORS.primary, marginTop: 8, fontFamily: 'LibreCaslonText-Regular'
  },
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
