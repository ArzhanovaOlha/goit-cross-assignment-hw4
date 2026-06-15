import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import CustomButton from '../components/CustomButton';

interface CartItem {
  id: string;
  name: string;
  type: string;
  size: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const INITIAL_CART: CartItem[] = [
  {
    id: '1',
    name: 'Caffe Mocha',
    type: 'Deep Foam',
    size: 'M',
    price: 4.53,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Flat White',
    type: 'Espresso',
    size: 'L',
    price: 4.23,
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    quantity: 2,
  },
];

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);

  const updateQty = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0),
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <Text style={styles.screenTitle}>My Cart</Text>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>☕</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {cart.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>{item.type} · {item.size}</Text>
                  <Text style={styles.itemPrice}>$ {(item.price * item.quantity).toFixed(2)}</Text>
                </View>
                <View style={styles.qtyControl}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQty(item.id, -1)}
                    activeOpacity={0.8}>
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={[styles.qtyBtn, styles.qtyBtnAdd]}
                    onPress={() => updateQty(item.id, 1)}
                    activeOpacity={0.8}>
                    <Text style={[styles.qtyBtnText, styles.qtyBtnAddText]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>$ {total.toFixed(2)}</Text>
            </View>
            <CustomButton title="Order Now" icon="✓" onPress={() => {}} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  screenTitle: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 24, gap: 16, paddingBottom: 100 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    gap: 12,
    marginBottom: 16,
  },
  itemImage: { width: 72, height: 72, borderRadius: 12 },
  itemInfo: { flex: 1, gap: 4 },
  itemName: { color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold },
  itemMeta: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs },
  itemPrice: { color: COLORS.primary, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.bold, marginTop: 4 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: 8,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnAdd: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  qtyBtnText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.lg, lineHeight: 22, fontWeight: FONT_WEIGHT.bold },
  qtyBtnAddText: { color: COLORS.textWhite },
  qtyValue: { color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold, minWidth: 20, textAlign: 'center' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
  footer: {
    padding: 24, paddingTop: 16, gap: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.md },
  totalValue: { color: COLORS.textWhite, fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold },
});
