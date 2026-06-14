import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_SIZE, FONT_WEIGHT } from '../constants/typography';
import { SearchIcon, FilterIcon } from './Icons';

interface Props {
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  onSuggestionSelect?: (text: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  onSuggestionSelect,
  placeholder = 'Search',
  suggestions = [],
}: Props) {
  const [localValue, setLocalValue] = useState('');
  const { width } = useWindowDimensions();

  const inputText = value ?? localValue;

  const filteredSuggestions = inputText.length > 0
    ? suggestions.filter(s => s.toLowerCase().includes(inputText.toLowerCase()))
    : [];

  const handleChange = (text: string) => {
    setLocalValue(text);
    onChangeText?.(text);
  };

  const handleSelect = (suggestion: string) => {
    setLocalValue(suggestion);
    onChangeText?.(suggestion);
    onSuggestionSelect?.(suggestion);
  };

  return (
    // position: relative is default in RN — allows the absolute dropdown to overflow
    <View style={{ width: width - 48 }}>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <SearchIcon size={16} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={handleChange}
            placeholder={placeholder}
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress} activeOpacity={0.8}>
          <FilterIcon size={18} color={COLORS.textWhite} />
        </TouchableOpacity>
      </View>

      {filteredSuggestions.length > 0 && (
        <View style={styles.dropdown}>
          {filteredSuggestions.map((s, i) => (
            <TouchableOpacity
              key={s}
              style={[styles.suggestionItem, i > 0 && styles.suggestionDivider]}
              onPress={() => handleSelect(s)}
              activeOpacity={0.7}>
              <SearchIcon size={14} color={COLORS.textSecondary} />
              <Text style={styles.suggestionText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.md,
  },
  filterButton: {
    width: 52,
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    marginTop: 6,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  suggestionDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  suggestionText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
});
