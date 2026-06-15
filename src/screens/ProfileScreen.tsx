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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { SCREENS } from '../navigation/SCREENS';
import type { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.PROFILE>;
type ProfileTab = 'orders' | 'saved';

const ORDERS = [
  { id: 'o1', name: 'Caffe Mocha × 2', date: '12 Jun 2026', total: '$9.06', status: 'Delivered' },
  { id: 'o2', name: 'Flat White × 1',  date: '10 Jun 2026', total: '$3.53', status: 'Delivered' },
  { id: 'o3', name: 'Cappuccino × 1',  date: '08 Jun 2026', total: '$4.00', status: 'Cancelled' },
];

const SAVED = [
  { id: 's1', name: 'Caffe Mocha', type: 'Deep Foam',    price: '$4.53', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400' },
  { id: 's2', name: 'Cappuccino',  type: 'Steamed Milk', price: '$4.00', imageUrl: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=400' },
];

export default function ProfileScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('orders');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Profile</Text>
        {/* Navigate to Settings — Task 3 */}
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate(SCREENS.SETTINGS)}
          activeOpacity={0.8}>
          <Text style={styles.settingsIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }}
            style={styles.avatarImage}
          />
          <Text style={styles.userName}>Olha Arzhanova</Text>
          <Text style={styles.userEmail}>olha@coffeeapp.com</Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { value: '24', label: 'Orders' },
            { value: '2',  label: 'In Cart' },
            { value: '5',  label: 'Saved' },
          ].map(stat => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Tab switcher — Order History vs Saved */}
        <View style={styles.tabRow}>
          {(['orders', 'saved'] as ProfileTab[]).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}>
              <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
                {tab === 'orders' ? 'Order History' : 'Saved'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'orders' && (
          <View style={styles.listSection}>
            {ORDERS.map(order => (
              <View key={order.id} style={styles.orderItem}>
                <View>
                  <Text style={styles.orderName}>{order.name}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.orderTotal}>{order.total}</Text>
                  <Text style={[styles.orderStatus, order.status === 'Cancelled' && styles.orderStatusCancelled]}>
                    {order.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'saved' && (
          <View style={styles.listSection}>
            {SAVED.map(item => (
              <View key={item.id} style={styles.savedItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.savedImage} />
                <View style={styles.savedInfo}>
                  <Text style={styles.savedName}>{item.name}</Text>
                  <Text style={styles.savedType}>{item.type}</Text>
                </View>
                <Text style={styles.savedPrice}>{item.price}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8,
  },
  screenTitle: { color: COLORS.textWhite, fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold },
  settingsBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center',
  },
  settingsIcon: { fontSize: 20 },
  content: { paddingBottom: 100 },
  avatar: { alignItems: 'center', paddingVertical: 24 },
  avatarImage: { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: COLORS.primary, marginBottom: 12 },
  userName: { color: COLORS.textWhite, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold, marginBottom: 4 },
  userEmail: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm },
  statsRow: {
    flexDirection: 'row', marginHorizontal: 24,
    backgroundColor: COLORS.surface, borderRadius: 16, paddingVertical: 16, marginBottom: 24,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: COLORS.primary, fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold, marginBottom: 2 },
  statLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs },
  tabRow: {
    flexDirection: 'row', marginHorizontal: 24,
    backgroundColor: COLORS.surface, borderRadius: 12, padding: 4, marginBottom: 16,
  },
  tabBtn: { flex: 1, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tabBtnActive: { backgroundColor: COLORS.primary },
  tabLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.medium },
  tabLabelActive: { color: COLORS.textWhite, fontWeight: FONT_WEIGHT.semiBold },
  listSection: { paddingHorizontal: 24, gap: 12, paddingBottom: 24 },
  orderItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginBottom: 12,
  },
  orderName: { color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold },
  orderDate: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 4 },
  orderRight: { alignItems: 'flex-end', gap: 4 },
  orderTotal: { color: COLORS.primary, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.bold },
  orderStatus: { color: '#4CD964', fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.medium },
  orderStatusCancelled: { color: COLORS.favorite },
  savedItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: 14, padding: 12, gap: 12, marginBottom: 12,
  },
  savedImage: { width: 60, height: 60, borderRadius: 10 },
  savedInfo: { flex: 1, gap: 4 },
  savedName: { color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold },
  savedType: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs },
  savedPrice: { color: COLORS.primary, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.bold },
});
