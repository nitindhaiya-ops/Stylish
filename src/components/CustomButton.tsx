import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../constants/colors';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  hoverBorderColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  backgroundColor = COLORS.primary,
  textColor = COLORS.white,
  borderColor = 'transparent',
  style,
  textStyle,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: textColor },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CustomButton;
