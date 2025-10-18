
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import ClassCard from '@/components/ClassCard';
import AssignmentCard from '@/components/AssignmentCard';
import { getClassesForDay, getUpcomingAssignments, mockAssignments } from '@/data/mockData';
import { Assignment } from '@/types/schedule';

export default function HomeScreen() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  
  const today = new Date();
  const dayOfWeek = today.getDay();
  const todayClasses = getClassesForDay(dayOfWeek);
  const upcomingAssignments = getUpcomingAssignments(3);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleToggleComplete = (id: string) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id 
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Add new item')}
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
            title: "Dashboard",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello, Student! 👋</Text>
            <Text style={styles.date}>{formatDate(today)}</Text>
          </View>

          {/* Today's Schedule Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="calendar" size={24} color={colors.primary} />
              <Text style={styles.sectionTitle}>Today&apos;s Schedule</Text>
            </View>
            
            {todayClasses.length > 0 ? (
              todayClasses.map(classEvent => (
                <ClassCard key={classEvent.id} classEvent={classEvent} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="checkmark.circle.fill" size={48} color={colors.success} />
                <Text style={styles.emptyStateText}>No classes today!</Text>
                <Text style={styles.emptyStateSubtext}>Enjoy your free day</Text>
              </View>
            )}
          </View>

          {/* Upcoming Assignments Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="doc.text.fill" size={24} color={colors.secondary} />
              <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
            </View>
            
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment}
                  onToggleComplete={handleToggleComplete}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="checkmark.circle.fill" size={48} color={colors.success} />
                <Text style={styles.emptyStateText}>All caught up!</Text>
                <Text style={styles.emptyStateSubtext}>No pending assignments</Text>
              </View>
            )}
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol name="book.fill" size={28} color={colors.primary} />
              <Text style={styles.statNumber}>{todayClasses.length}</Text>
              <Text style={styles.statLabel}>Classes Today</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="doc.text.fill" size={28} color={colors.secondary} />
              <Text style={styles.statNumber}>
                {assignments.filter(a => !a.completed).length}
              </Text>
              <Text style={styles.statLabel}>Pending Tasks</Text>
            </View>
            
            <View style={styles.statCard}>
              <IconSymbol name="checkmark.circle.fill" size={28} color={colors.success} />
              <Text style={styles.statNumber}>
                {assignments.filter(a => a.completed).length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  headerButtonContainer: {
    padding: 6,
  },
});
