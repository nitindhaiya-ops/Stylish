import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../constants/colors';

type ProductCardProps = {
  title: string;
  price: string;
  image: ImageSourcePropType;
  originalPrice?: string;
  discount?: string;
  onPress?: () => void;
  rating?: number;
  totalRatings?: string;
};

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

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  originalPrice,
  discount,
  onPress,
  rating,
  totalRatings,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
      <ImageBackground
        source={image}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      />

      {/* Product Info */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>

        <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>

        {/* Price Section - Conditional */}
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

        {/* Star Rating */}
        <View style={styles.starWrapper}>
          {[...Array(5)].map((_, i) => (
            <SvgXml
              key={i}
              xml={i < Math.floor(rating || 0) ? ActiveStarSvg : DeactiveStarSvg}
            />
          ))}
          {totalRatings && <Text style={styles.ratingCount}>{totalRatings}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 16,
    elevation: 3,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
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
  priceRow: {
  },
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

export default ProductCard;