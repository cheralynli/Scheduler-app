
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import AssignmentCard from '@/components/AssignmentCard';
import { mockAssignments } from '@/data/mockData';
import { Assignment } from '@/types/schedule';

type FilterType = 'all' | 'pending' | 'completed';

export default function TasksScreen() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [filter, setFilter] = useState<FilterType>('all');

  const handleToggleComplete = (id: string) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
  };

  const getFilteredAssignments = () => {
    switch (filter) {
      case 'pending':
        return assignments.filter(a => !a.completed);
      case 'completed':
        return assignments.filter(a => a.completed);
      default:
        return assignments;
    }
  };

  const filteredAssignments = getFilteredAssignments();

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Add new task')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="plus" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Tasks",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={styles.container}>
        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <Pressable
            style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All ({assignments.length})
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.filterTab, filter === 'pending' && styles.filterTabActive]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
              Pending ({assignments.filter(a => !a.completed).length})
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.filterTab, filter === 'completed' && styles.filterTabActive]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
              Done ({assignments.filter(a => a.completed).length})
            </Text>
          </Pressable>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Priority Section - High */}
          {filteredAssignments.filter(a => a.priority === 'high' && !a.completed).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.error} />
                <Text style={styles.sectionTitle}>High Priority</Text>
              </View>
              {filteredAssignments
                .filter(a => a.priority === 'high' && !a.completed)
                .map(assignment => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment}
                    onToggleComplete={handleToggleComplete}
                    onPress={() => console.log('View assignment:', assignment.id)}
                  />
                ))}
            </View>
          )}

          {/* Priority Section - Medium */}
          {filteredAssignments.filter(a => a.priority === 'medium' && !a.completed).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="exclamationmark.circle.fill" size={20} color={colors.warning} />
                <Text style={styles.sectionTitle}>Medium Priority</Text>
              </View>
              {filteredAssignments
                .filter(a => a.priority === 'medium' && !a.completed)
                .map(assignment => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment}
                    onToggleComplete={handleToggleComplete}
                    onPress={() => console.log('View assignment:', assignment.id)}
                  />
                ))}
            </View>
          )}

          {/* Priority Section - Low */}
          {filteredAssignments.filter(a => a.priority === 'low' && !a.completed).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="info.circle.fill" size={20} color={colors.success} />
                <Text style={styles.sectionTitle}>Low Priority</Text>
              </View>
              {filteredAssignments
                .filter(a => a.priority === 'low' && !a.completed)
                .map(assignment => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment}
                    onToggleComplete={handleToggleComplete}
                    onPress={() => console.log('View assignment:', assignment.id)}
                  />
                ))}
            </View>
          )}

          {/* Completed Section */}
          {filteredAssignments.filter(a => a.completed).length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
                <Text style={styles.sectionTitle}>Completed</Text>
              </View>
              {filteredAssignments
                .filter(a => a.completed)
                .map(assignment => (
                  <AssignmentCard 
                    key={assignment.id} 
                    assignment={assignment}
                    onToggleComplete={handleToggleComplete}
                    onPress={() => console.log('View assignment:', assignment.id)}
                  />
                ))}
            </View>
          )}

          {/* Empty State */}
          {filteredAssignments.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="tray.fill" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyStateText}>No tasks found</Text>
              <Text style={styles.emptyStateSubtext}>
                {filter === 'pending' && 'All tasks are completed!'}
                {filter === 'completed' && 'No completed tasks yet'}
                {filter === 'all' && 'Tap + to add your first task'}
              </Text>
            </View>
          )}

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Task Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Tasks:</Text>
              <Text style={styles.summaryValue}>{assignments.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pending:</Text>
              <Text style={[styles.summaryValue, { color: colors.warning }]}>
                {assignments.filter(a => !a.completed).length}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Completed:</Text>
              <Text style={[styles.summaryValue, { color: colors.success }]}>
                {assignments.filter(a => a.completed).length}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${(assignments.filter(a => a.completed).length / assignments.length) * 100}%` 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round((assignments.filter(a => a.completed).length / assignments.length) * 100)}% Complete
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 12,
    padding: 4,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.card,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },
  headerButtonContainer: {
    padding: 6,
  },
});
