// src/screens/SplashScreen.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  Animated,
  ViewToken,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { COLORS } from '../constants/colors';

// onboarding components
import OnboardingLogo from './onboarding/OnboardingLogo';
import OnboardingStepOne from './onboarding/OnboardingStepOne';
import OnboardingStepTwo from './onboarding/OnboardingStepTwo';
import OnboardingStepThree from './onboarding/OnboardingStepThree';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const { width } = Dimensions.get('window');

type SlideItem = {
  key: string;
  Component: React.ComponentType;
};

const slides: SlideItem[] = [
  { key: 'logo', Component: OnboardingLogo }, // index 0 -> logo
  { key: 'one', Component: OnboardingStepOne }, // index 1
  { key: 'two', Component: OnboardingStepTwo }, // index 2
  { key: 'three', Component: OnboardingStepThree }, // index 3
];

const TOTAL_STEPS = slides.length - 1; // 3

// Animated FlatList
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as typeof FlatList;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const flatRef = useRef<FlatList<SlideItem> | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current; // track horizontal offset
  const [index, setIndex] = useState(0);

  // status bar
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  // auto-advance logo page
  useEffect(() => {
    if (index === 0) {
      const t = setTimeout(() => {
        flatRef.current?.scrollToIndex({ index: 1, animated: true });
      }, 2000);
      return () => clearTimeout(t);
    }
    return;
  }, [index]);

  // typed viewability handler
  const onViewRef = useRef((info: { viewableItems: Array<ViewToken> }) => {
    if (info.viewableItems.length) {
      const newIndex = info.viewableItems[0].index ?? 0;
      setIndex(newIndex);
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleSkip = () => navigation.replace('SignIn');
  const handlePrev = () => {
    if (index > 1) flatRef.current?.scrollToIndex({ index: index - 1, animated: true });
  };
  const handleNext = () => {
    if (index < slides.length - 1) flatRef.current?.scrollToIndex({ index: index + 1, animated: true });
    else navigation.replace('SignIn');
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatRef as any}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // width interpolation requires JS driver
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef}
        renderItem={({ item }: { item: SlideItem }) => (
          <View style={[styles.slide, { width }]}>
            <item.Component />
          </View>
        )}
      />

      {/* TOP BAR (page number + skip) */}
      {index > 0 && (
        <View style={styles.topBar}>
          <View style={styles.topBarPagination}>
            <Text style={styles.activePageText}>{`${index}`}</Text>
            <Text style={styles.pageText}>{`/${TOTAL_STEPS}`}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.topText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* FOOTER (prev / dots / next) */}
      {index > 0 && (
        <View style={styles.footer}>
          <View>
            {index > 1 ? (
              <TouchableOpacity onPress={handlePrev}>
                <Text style={styles.skipText}>Prev</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 48 }} />
            )}
          </View>

          {/* animated dots */}
          <View style={styles.dots}>
            {slides.slice(1).map((_, i) => {
              // dot corresponds to pageIndex = i + 1 (because slides[0] is logo)
              const pageIndex = i + 1;
              const inputRange = [(pageIndex - 1) * width, pageIndex * width, (pageIndex + 1) * width];

              const animatedWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 38, 8],
                extrapolate: 'clamp',
              });

              const animatedOpacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              });

              return (
                <View key={i} style={styles.dotWrapper}>
                  {/* base grey dot */}
                  <View style={styles.baseDot} />

                  {/* animated black overlay expands and fades in/out */}
                  <Animated.View
                    style={[
                      styles.animatedDot,
                      {
                        width: animatedWidth,
                        opacity: animatedOpacity,
                      },
                    ]}
                  />
                </View>
              );
            })}
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>{index === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  slide: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },

  /* top bar */
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 44,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  topBarPagination: { flexDirection: 'row', alignItems: 'center' },
  topText: { color: COLORS.black, fontSize: 18 },
  activePageText: { fontSize: 14, fontWeight: '700', color: COLORS.black },
  pageText: { fontSize: 14, fontWeight: '700', color: COLORS.text },

  /* footer */
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  skipText: { color: COLORS.text, fontSize: 16 },
  nextBtn: { paddingVertical: 10, paddingHorizontal: 14 },
  nextText: { fontSize: 16, fontWeight: '600', color: COLORS.primary },

  /* dots */
  dots: { flexDirection: 'row', alignItems: 'center' },
  dotWrapper: {
    width: 38, // maximum width the animated dot can expand to
    // height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 6,
  },
  baseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    position: 'absolute',
  },
  animatedDot: {
    height: 8,
    borderRadius: 12,
    backgroundColor: COLORS.black,
    position: 'absolute',
  },
});

export default SplashScreen;
