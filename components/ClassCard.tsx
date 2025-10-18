
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ClassEvent } from '@/types/schedule';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface ClassCardProps {
  classEvent: ClassEvent;
  compact?: boolean;
}

export default function ClassCard({ classEvent, compact = false }: ClassCardProps) {
  return (
    <View style={[styles.container, { borderLeftColor: classEvent.color }]}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{classEvent.startTime}</Text>
        <Text style={styles.timeSeparator}>-</Text>
        <Text style={styles.timeText}>{classEvent.endTime}</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>{classEvent.title}</Text>
        <View style={styles.detailsRow}>
          <IconSymbol name="book.fill" size={14} color={colors.textSecondary} />
          <Text style={styles.subject}>{classEvent.subject}</Text>
        </View>
        {!compact && (
          <View style={styles.detailsRow}>
            <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
            <Text style={styles.location}>{classEvent.location}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    borderLeftWidth: 4,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  timeContainer: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  timeSeparator: {
    fontSize: 12,
    color: colors.textSecondary,
    marginVertical: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  subject: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  location: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 6,
  },
});
