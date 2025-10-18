
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Assignment } from '@/types/schedule';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';

interface AssignmentCardProps {
  assignment: Assignment;
  onToggleComplete?: (id: string) => void;
  onPress?: () => void;
}

export default function AssignmentCard({ assignment, onToggleComplete, onPress }: AssignmentCardProps) {
  const priorityColors = {
    low: colors.success,
    medium: colors.warning,
    high: colors.error,
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(assignment.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Pressable 
        onPress={() => onToggleComplete?.(assignment.id)}
        style={styles.checkboxContainer}
      >
        <View style={[
          styles.checkbox,
          assignment.completed && styles.checkboxCompleted
        ]}>
          {assignment.completed && (
            <IconSymbol name="checkmark" size={16} color={colors.card} />
          )}
        </View>
      </Pressable>

      <View style={styles.contentContainer}>
        <Text 
          style={[
            styles.title,
            assignment.completed && styles.titleCompleted
          ]}
          numberOfLines={2}
        >
          {assignment.title}
        </Text>
        <Text style={styles.subject}>{assignment.subject}</Text>
        
        <View style={styles.footer}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColors[assignment.priority] }]}>
            <Text style={styles.priorityText}>{assignment.priority.toUpperCase()}</Text>
          </View>
          <Text style={[
            styles.dueDate,
            getDaysUntilDue() === 'Overdue' && styles.overdue,
            getDaysUntilDue() === 'Due today' && styles.dueToday
          ]}>
            {getDaysUntilDue()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  subject: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.card,
  },
  dueDate: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  overdue: {
    color: colors.error,
    fontWeight: '700',
  },
  dueToday: {
    color: colors.warning,
    fontWeight: '700',
  },
});
