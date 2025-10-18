
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import ClassCard from '@/components/ClassCard';
import { mockClasses, mockAssignments } from '@/data/mockData';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const getMarkedDates = () => {
    const marked: any = {};
    
    // Mark assignment due dates
    mockAssignments.forEach(assignment => {
      if (!assignment.completed) {
        marked[assignment.dueDate] = {
          marked: true,
          dotColor: colors.secondary,
        };
      }
    });

    // Mark selected date
    marked[selectedDate] = {
      ...marked[selectedDate],
      selected: true,
      selectedColor: colors.primary,
    };

    return marked;
  };

  const getClassesForSelectedDate = () => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    return mockClasses.filter(cls => cls.dayOfWeek === dayOfWeek);
  };

  const getAssignmentsForSelectedDate = () => {
    return mockAssignments.filter(assignment => 
      assignment.dueDate === selectedDate && !assignment.completed
    );
  };

  const selectedClasses = getClassesForSelectedDate();
  const selectedAssignments = getAssignmentsForSelectedDate();

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Add event')}
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
            title: "Calendar",
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
          {/* Calendar */}
          <View style={styles.calendarContainer}>
            <Calendar
              current={selectedDate}
              onDayPress={(day: DateData) => {
                console.log('Selected day:', day.dateString);
                setSelectedDate(day.dateString);
              }}
              markedDates={getMarkedDates()}
              theme={{
                backgroundColor: colors.card,
                calendarBackground: colors.card,
                textSectionTitleColor: colors.textSecondary,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: colors.card,
                todayTextColor: colors.primary,
                dayTextColor: colors.text,
                textDisabledColor: colors.border,
                dotColor: colors.secondary,
                selectedDotColor: colors.card,
                arrowColor: colors.primary,
                monthTextColor: colors.text,
                textDayFontWeight: '500',
                textMonthFontWeight: '700',
                textDayHeaderFontWeight: '600',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
              style={styles.calendar}
            />
          </View>

          {/* Selected Date Info */}
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>

          {/* Classes for Selected Date */}
          {selectedClasses.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="book.fill" size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Classes</Text>
              </View>
              {selectedClasses.map(classEvent => (
                <ClassCard key={classEvent.id} classEvent={classEvent} />
              ))}
            </View>
          )}

          {/* Assignments Due on Selected Date */}
          {selectedAssignments.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <IconSymbol name="doc.text.fill" size={20} color={colors.secondary} />
                <Text style={styles.sectionTitle}>Assignments Due</Text>
              </View>
              {selectedAssignments.map(assignment => (
                <View key={assignment.id} style={styles.assignmentItem}>
                  <View style={[styles.priorityDot, { 
                    backgroundColor: assignment.priority === 'high' ? colors.error : 
                                   assignment.priority === 'medium' ? colors.warning : 
                                   colors.success 
                  }]} />
                  <View style={styles.assignmentContent}>
                    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                    <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Empty State */}
          {selectedClasses.length === 0 && selectedAssignments.length === 0 && (
            <View style={styles.emptyState}>
              <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyStateText}>No events on this day</Text>
              <Text style={styles.emptyStateSubtext}>Tap + to add a new event</Text>
            </View>
          )}

          {/* Legend */}
          <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>Legend</Text>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
              <Text style={styles.legendText}>Assignment Due</Text>
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
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  calendarContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    margin: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  calendar: {
    borderRadius: 12,
  },
  selectedDateContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
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
  assignmentItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  assignmentContent: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 40,
    margin: 16,
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
  legendContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
