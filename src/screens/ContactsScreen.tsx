import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import CustomButton from '../components/CustomButton';

const CONTACT_DETAILS = [
  { icon: '📍', label: 'Address', value: '42 Brew Street, Kyiv, Ukraine' },
  { icon: '📞', label: 'Phone',   value: '+380 44 123 4567' },
  { icon: '✉️', label: 'Email',   value: 'hello@coffeeapp.com' },
  { icon: '🕐', label: 'Hours',   value: 'Mon–Fri: 08:00–22:00\nSat–Sun: 09:00–21:00' },
];

export default function ContactsScreen() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (name.trim() && message.trim()) { setSent(true); }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>We'd love to hear from you</Text>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoGrid}>
          {CONTACT_DETAILS.map(detail => (
            <View key={detail.label} style={styles.infoCard}>
              <Text style={styles.infoIcon}>{detail.icon}</Text>
              <Text style={styles.infoLabel}>{detail.label}</Text>
              <Text style={styles.infoValue}>{detail.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Send a message</Text>
          {sent ? (
            <View style={styles.successBox}>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.successText}>Thank you! We'll get back to you within 24 hours.</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor={COLORS.textSecondary}
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Your message…"
                placeholderTextColor={COLORS.textSecondary}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <CustomButton
                title="Send Message"
                icon="✉"
                onPress={handleSend}
                disabled={!name.trim() || !message.trim()}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  title: { color: COLORS.textWhite, fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold, paddingHorizontal: 24, paddingTop: 16, marginBottom: 4 },
  subtitle: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, paddingHorizontal: 24, marginBottom: 20 },
  content: { padding: 24, gap: 24, paddingBottom: 40 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  infoCard: { width: '47%', backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, gap: 6 },
  infoIcon: { fontSize: 22 },
  infoLabel: { color: COLORS.textSecondary, fontSize: FONT_SIZE.xs, fontWeight: FONT_WEIGHT.medium, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { color: COLORS.textWhite, fontSize: FONT_SIZE.sm, fontWeight: FONT_WEIGHT.medium, lineHeight: 18 },
  form: { gap: 14 },
  formTitle: { color: COLORS.textWhite, fontSize: FONT_SIZE.lg, fontWeight: FONT_WEIGHT.semiBold, marginBottom: 4 },
  input: {
    backgroundColor: COLORS.surface, borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 14,
    color: COLORS.textWhite, fontSize: FONT_SIZE.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  textarea: { height: 120, paddingTop: 14 },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(76,217,100,0.1)',
    borderWidth: 1, borderColor: '#4CD964', borderRadius: 14, padding: 16,
  },
  successIcon: { color: '#4CD964', fontSize: 24, fontWeight: FONT_WEIGHT.bold },
  successText: { flex: 1, color: '#4CD964', fontSize: FONT_SIZE.sm, lineHeight: 20 },
});
