import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { SCREENS } from '../navigation/SCREENS';
import type { ProfileStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, typeof SCREENS.SETTINGS>;

interface SettingItem {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'arrow';
}

const SETTINGS: { section: string; items: SettingItem[] }[] = [
  {
    section: 'Notifications',
    items: [
      { id: 'push',  label: 'Push Notifications', description: 'Order updates and promotions', type: 'toggle' },
      { id: 'email', label: 'Email Alerts',        description: 'Weekly digest and offers',    type: 'toggle' },
    ],
  },
  {
    section: 'Account',
    items: [
      { id: 'edit_profile',    label: 'Edit Profile',     type: 'arrow' },
      { id: 'change_password', label: 'Change Password',  type: 'arrow' },
      { id: 'payment_methods', label: 'Payment Methods',  type: 'arrow' },
    ],
  },
  {
    section: 'Preferences',
    items: [
      { id: 'dark_mode', label: 'Dark Mode',          type: 'toggle' },
      { id: 'location',  label: 'Location Services',  description: 'Find nearby stores', type: 'toggle' },
    ],
  },
];

export default function SettingsScreen({ navigation }: Props) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    push: true, email: false, dark_mode: true, location: true,
  });

  const toggle = (id: string) => setToggles(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* Custom header with back button — Task 4 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {SETTINGS.map(group => (
          <View key={group.section} style={styles.group}>
            <Text style={styles.sectionLabel}>{group.section}</Text>
            <View style={styles.card}>
              {group.items.map((item, idx) => (
                <View key={item.id}>
                  <View style={styles.row}>
                    <View style={styles.rowText}>
                      <Text style={styles.rowLabel}>{item.label}</Text>
                      {item.description != null && (
                        <Text style={styles.rowDescription}>{item.description}</Text>
                      )}
                    </View>
                    {item.type === 'toggle' ? (
                      <Switch
                        value={toggles[item.id] ?? false}
                        onValueChange={() => toggle(item.id)}
                        trackColor={{ false: COLORS.border, true: COLORS.primary }}
                        thumbColor={COLORS.textWhite}
                      />
                    ) : (
                      <Text style={styles.arrow}>›</Text>
                    )}
                  </View>
                  {idx < group.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: COLORS.surface, alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { color: COLORS.textWhite, fontSize: 28, lineHeight: 34, fontWeight: FONT_WEIGHT.bold, marginLeft: -2 },
  headerTitle: { flex: 1, color: COLORS.textWhite, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.bold, textAlign: 'center' },
  headerSpacer: { width: 40 },
  content: { padding: 24, gap: 24, paddingBottom: 40 },
  group: { gap: 10 },
  sectionLabel: {
    color: COLORS.textSecondary, fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semiBold, textTransform: 'uppercase', letterSpacing: 0.8,
  },
  card: { backgroundColor: COLORS.surface, borderRadius: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowText: { flex: 1 },
  rowLabel: { color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.medium, marginBottom: 2 },
  rowDescription: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs },
  arrow: { color: COLORS.textSecondary, fontSize: 22, fontWeight: FONT_WEIGHT.medium },
  divider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 16 },
  logoutBtn: {
    height: 56, borderRadius: 16,
    backgroundColor: 'rgba(237,81,81,0.12)',
    borderWidth: 1, borderColor: COLORS.favorite,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  logoutText: { color: COLORS.favorite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold },
});
