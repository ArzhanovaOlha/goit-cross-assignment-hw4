import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';

const FAQS = [
  {
    id: 'f1',
    question: 'How do I place an order?',
    answer: 'Browse the menu on the Home screen, tap any drink to view details, select your preferred size, and press "Buy Now".',
  },
  {
    id: 'f2',
    question: 'Can I customise my drink?',
    answer: 'Yes! On the Coffee Details screen you can choose the size (S / M / L). More options are coming soon.',
  },
  {
    id: 'f3',
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 20–30 minutes depending on your location.',
  },
  {
    id: 'f4',
    question: 'Can I cancel my order?',
    answer: 'Orders can be cancelled within 2 minutes of placing them.',
  },
  {
    id: 'f5',
    question: 'How do loyalty points work?',
    answer: 'You earn 1 point for every $1 spent. 100 points = 1 free coffee.',
  },
];

export default function HelpScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (id: string) => setExpanded(prev => (prev === id ? null : id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <Text style={styles.title}>Help & FAQ</Text>
      <Text style={styles.subtitle}>Find answers to common questions</Text>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {FAQS.map(faq => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => toggle(faq.id)}
              activeOpacity={0.8}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.chevron}>{expanded === faq.id ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {expanded === faq.id && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </View>
        ))}

        <View style={styles.support}>
          <Text style={styles.supportTitle}>Still need help?</Text>
          <Text style={styles.supportText}>Our support team is available Mon–Fri, 9:00–18:00.</Text>
          <TouchableOpacity style={styles.supportBtn} activeOpacity={0.8}>
            <Text style={styles.supportBtnText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  title: { color: COLORS.textWhite, fontSize: FONT_SIZE.xl, fontWeight: FONT_WEIGHT.bold, paddingHorizontal: 24, paddingTop: 16, marginBottom: 4 },
  subtitle: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, paddingHorizontal: 24, marginBottom: 20 },
  content: { padding: 24, gap: 12, paddingBottom: 40 },
  faqItem: { backgroundColor: COLORS.surface, borderRadius: 14, overflow: 'hidden', marginBottom: 12 },
  faqHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 },
  question: { flex: 1, color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold },
  chevron: { color: COLORS.primary, fontSize: FONT_SIZE.xs },
  answer: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, lineHeight: 22, paddingHorizontal: 16, paddingBottom: 16 },
  support: { marginTop: 8, backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, alignItems: 'center', gap: 8 },
  supportTitle: { color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold },
  supportText: { color: COLORS.textSecondary, fontSize: FONT_SIZE.sm, textAlign: 'center', lineHeight: 20 },
  supportBtn: {
    marginTop: 8, height: 44, paddingHorizontal: 24, borderRadius: 12,
    backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center',
  },
  supportBtnText: { color: COLORS.textWhite, fontSize: FONT_SIZE.md, fontWeight: FONT_WEIGHT.semiBold },
});
