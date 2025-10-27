// src/components/CustomInput.tsx
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
  ViewStyle,
  TextStyle,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import Svg, { G, Path, Rect, ClipPath, Defs } from 'react-native-svg';
import { COLORS } from '../constants/colors';

export type InputType = 'text' | 'email' | 'password';

export interface CustomInputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  type?: InputType;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  height?: number;
  borderRadius?: number;
  /**
   * leftIcon accepts any React node: a <Svg/> icon, <Image/>, or a component.
   * Example: <CustomInput leftIcon={<MySvg width={20} height={20}/>} />
   */
  leftIcon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder = '',
  type = 'text',
  containerStyle,
  inputStyle,
  textColor = COLORS.black,
  backgroundColor = '#fff',
  borderColor = '#EEE',
  height = 48,
  borderRadius = 8,
  leftIcon,
  keyboardType,
  ...rest
}) => {
  const isPassword = type === 'password';
  const isEmail = type === 'email';

  // password hidden state
  const [hidden, setHidden] = useState(true);

  // animation for the eye icon "pop"
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // small pop animation when toggling
  const triggerPop = () => {
    scaleAnim.setValue(1);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    // when visibility changes, play pop
    if (isPassword) triggerPop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  const resolvedKeyboardType = keyboardType ?? (isEmail ? 'email-address' : 'default');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderRadius,
          height,
        },
        containerStyle,
      ]}
    >
      {/* Left icon if provided */}
      {leftIcon ? <View style={styles.leftIconWrap}>{leftIcon}</View> : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text}
        style={[
          styles.input,
          { color: textColor, height, borderRadius },
          inputStyle as any,
          leftIcon ? { paddingLeft: 8 } : {},
        ]}
        keyboardType={resolvedKeyboardType as TextInputProps['keyboardType']}
        autoCapitalize={isEmail ? 'none' : 'sentences'}
        autoCorrect={false}
        secureTextEntry={isPassword ? hidden : false}
        underlineColorAndroid="transparent"
        {...rest}
      />

      {/* Eye toggle for password inputs */}
      {isPassword && (
        <Pressable
          onPress={() => setHidden((s) => !s)}
          style={styles.eyeButton}
          android_ripple={{ color: 'rgba(0,0,0,0.08)', radius: 20 }}
          accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          accessibilityRole="button"
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            {/* Eye icon - color follows textColor */}
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <G>
                <Path
                  d="M0.833 10s3.333-6.666 9.167-6.666S19.167 10 19.167 10s-3.333 6.667-9.167 6.667S0.833 10 0.833 10z"
                  stroke={textColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M10 12.5A2.5 2.5 0 1 0 10 7.5a2.5 2.5 0 0 0 0 5z"
                  stroke={textColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </G>
              <Defs>
                <ClipPath id="clip0">
                  <Rect width="20" height="20" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: Platform.OS === 'ios' ? 10 : 8,
  },
  eyeButton: {
    marginLeft: 8,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconWrap: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomInput;
