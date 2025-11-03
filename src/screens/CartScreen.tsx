/* src/screens/CartScreen.tsx */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useCart, CartItem } from '../hooks/useCart';

const profileIcon = require('../assets/img/profileIcon.png');

const CartItemCard: React.FC<{
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <View style={cartItemStyles.card}>
      <Image source={item.image} style={cartItemStyles.image} />

      <View style={cartItemStyles.details}>
        <View style={cartItemStyles.header}>
          <Text style={cartItemStyles.name}>{item.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)}>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path
                d="M15 5L5 15M5 5L15 15"
                stroke="#FF3B30"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={cartItemStyles.variants}>
          <Text style={cartItemStyles.variantText}>Size: {item.size}</Text>
          <Text style={cartItemStyles.variantText}>Color: {item.color}</Text>
        </View>

        {!item.inStock && (
          <Text style={cartItemStyles.outOfStockText}>Out of Stock</Text>
        )}

        <View style={cartItemStyles.priceRow}>
          <Text style={cartItemStyles.price}>₹{item.price}</Text>
          {item.originalPrice && (
            <>
              <Text style={cartItemStyles.originalPrice}>₹{item.originalPrice}</Text>
              <Text style={cartItemStyles.discount}>{item.discount}</Text>
            </>
          )}
        </View>

        <View style={cartItemStyles.quantityContainer}>
          <Text style={cartItemStyles.quantityLabel}>Quantity:</Text>
          <View style={cartItemStyles.quantityControls}>
            <TouchableOpacity
              style={cartItemStyles.quantityButton}
              onPress={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              disabled={!item.inStock}
            >
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path
                  d="M3 8H13"
                  stroke={item.inStock ? "#323232" : "#CCCCCC"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>

            <Text
              style={[
                cartItemStyles.quantityText,
                !item.inStock && cartItemStyles.disabledText,
              ]}
            >
              {item.quantity}
            </Text>

            <TouchableOpacity
              style={cartItemStyles.quantityButton}
              onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={!item.inStock}
            >
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path
                  d="M8 3V13M3 8H13"
                  stroke={item.inStock ? "#323232" : "#CCCCCC"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const cartItemStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
    marginRight: 8,
  },
  variants: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  variantText: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  outOfStockText: {
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '500',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 14,
    color: '#666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FB',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  disabledText: {
    color: '#CCCCCC',
  },
});

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    total,
    totalItems,
  } = useCart();

  const inStockItems = items.filter(item => item.inStock);

  const proceedToCheckout = () => {
    if (inStockItems.length === 0) {
      Alert.alert('Cannot Proceed', 'No items in stock to checkout.');
      return;
    }

    navigation.navigate('Checkout', {
      cartItems: items,
      total,
    });
  };

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <Path
          d="M46.6667 46.6667H35L31.6667 70H108.333L105 46.6667H93.3333M46.6667 46.6667V35C46.6667 29.6667 50.6667 25.6667 56 25.6667C61.3333 25.6667 65.3333 29.6667 65.3333 35V46.6667M46.6667 46.6667H65.3333M65.3333 46.6667H93.3333M93.3333 46.6667V35C93.3333 29.6667 89.3333 25.6667 84 25.6667C78.6667 25.6667 74.6667 29.6667 74.6667 35V46.6667M40 70L35 116.667H105L100 70H40Z"
          stroke="#E0E0E0"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M56 56C59.6819 56 62.6667 53.0152 62.6667 49.3333C62.6667 45.6514 59.6819 42.6667 56 42.6667C52.3181 42.6667 49.3333 45.6514 49.3333 49.3333C49.3333 53.0152 52.3181 56 56 56Z"
          fill="#E0E0E0"
        />
        <Path
          d="M84 56C87.6819 56 90.6667 53.0152 90.6667 49.3333C90.6667 45.6514 87.6819 42.6667 84 42.6667C80.3181 42.6667 77.3333 45.6514 77.3333 49.3333C77.3333 53.0152 80.3181 56 84 56Z"
          fill="#E0E0E0"
        />
      </Svg>
      <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Add some stylish items to your cart and they will appear here
      </Text>
      <TouchableOpacity style={styles.shopButton}>
        <Text style={styles.shopButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
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

        <View style={styles.Logoflex}>
          <Svg width="38" height="38" viewBox="0 0 125 100" fill="none">
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
              <linearGradient
                id="paint0"
                x1="124.993"
                y1="24.9993"
                x2="24.9961"
                y2="24.9993"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#CFE2FC" />
                <stop offset="1" stopColor="#4392F9" />
              </linearGradient>
              <linearGradient
                id="paint1"
                x1="0"
                y1="74.9949"
                x2="99.9972"
                y2="74.9949"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#F8BCC6" />
                <stop offset="1" stopColor="#F83758" />
              </linearGradient>
            </Defs>
          </Svg>
          <Text style={styles.logo}>Stylish</Text>
        </View>

        <TouchableOpacity>
          <Image source={profileIcon} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      </View>

      {/* Cart Header */}
      <View style={styles.cartHeader}>
        <View>
          <Text style={styles.cartTitle}>Shopping Cart</Text>
          <Text style={styles.cartSubtitle}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
        </View>

        {items.length > 0 && (
          <TouchableOpacity style={styles.clearAllButton} onPress={clearCart}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length > 0 ? (
        <>
          {/* Cart Items */}
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CartItemCard
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            )}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          />

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
              <Text style={styles.summaryValue}>₹{subtotal.toLocaleString()}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {shipping > 0 ? `₹${shipping}` : 'Free'}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>- ₹0</Text>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total.toLocaleString()}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.checkoutButton,
                inStockItems.length === 0 && styles.disabledButton,
              ]}
              onPress={proceedToCheckout}
              disabled={inStockItems.length === 0}
            >
              <Text style={styles.checkoutButtonText}>
                {inStockItems.length === 0
                  ? 'No Items Available'
                  : 'Proceed to Checkout'}
              </Text>
              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <EmptyCart />
      )}
    </SafeAreaView>
  );
}

/* ------------------- STYLES (ONLY ONE!) ------------------- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.body,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Logoflex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: COLORS.blue,
    fontSize: 20,
    fontFamily: 'LibreCaslonText-Bold',
    marginTop: 4,
    marginLeft: 4,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#232327',
  },
  cartSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  clearAllButton: {
    backgroundColor: '#FFE6E6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearAllText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  cartList: {
    paddingBottom: 20,
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#232327',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#232327',
  },
  discountValue: {
    color: COLORS.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#232327',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#232327',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});