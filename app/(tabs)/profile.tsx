
import React from 'react';
import { Stack } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProfileScreen() {
  const settingsOptions = [
    {
      id: '1',
      title: 'Notifications',
      icon: 'bell.fill',
      color: colors.primary,
    },
    {
      id: '2',
      title: 'Study Reminders',
      icon: 'clock.fill',
      color: colors.accent,
    },
    {
      id: '3',
      title: 'Theme',
      icon: 'paintbrush.fill',
      color: colors.secondary,
    },
    {
      id: '4',
      title: 'Export Data',
      icon: 'square.and.arrow.up.fill',
      color: colors.success,
    },
  ];

  const aboutOptions = [
    {
      id: '1',
      title: 'Help & Support',
      icon: 'questionmark.circle.fill',
    },
    {
      id: '2',
      title: 'Privacy Policy',
      icon: 'lock.fill',
    },
    {
      id: '3',
      title: 'Terms of Service',
      icon: 'doc.text.fill',
    },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Profile",
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
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.fill" size={48} color={colors.card} />
            </View>
            <Text style={styles.userName}>Student Name</Text>
            <Text style={styles.userEmail}>student@university.edu</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Assignments</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            {settingsOptions.map(option => (
              <Pressable
                key={option.id}
                style={styles.optionCard}
                onPress={() => console.log('Pressed:', option.title)}
              >
                <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                  <IconSymbol name={option.icon as any} size={20} color={colors.card} />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </Pressable>
            ))}
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            {aboutOptions.map(option => (
              <Pressable
                key={option.id}
                style={styles.optionCard}
                onPress={() => console.log('Pressed:', option.title)}
              >
                <View style={[styles.optionIcon, { backgroundColor: colors.textSecondary }]}>
                  <IconSymbol name={option.icon as any} size={20} color={colors.card} />
                </View>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
              </Pressable>
            ))}
          </View>

          {/* App Version */}
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.card,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 20,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 16,
  },
});
