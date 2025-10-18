
import { ClassEvent, Assignment, CalendarEvent } from '@/types/schedule';

export const mockClasses: ClassEvent[] = [
  {
    id: '1',
    title: 'Data Structures',
    subject: 'Computer Science',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Room 301',
    color: '#3F51B5',
    dayOfWeek: 1, // Monday
    recurrence: 'weekly',
  },
  {
    id: '2',
    title: 'Calculus II',
    subject: 'Mathematics',
    startTime: '11:00',
    endTime: '12:30',
    location: 'Room 205',
    color: '#E91E63',
    dayOfWeek: 1, // Monday
    recurrence: 'weekly',
  },
  {
    id: '3',
    title: 'Physics Lab',
    subject: 'Physics',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Lab 102',
    color: '#00BCD4',
    dayOfWeek: 2, // Tuesday
    recurrence: 'weekly',
  },
  {
    id: '4',
    title: 'Data Structures',
    subject: 'Computer Science',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Room 301',
    color: '#3F51B5',
    dayOfWeek: 3, // Wednesday
    recurrence: 'weekly',
  },
  {
    id: '5',
    title: 'English Literature',
    subject: 'English',
    startTime: '13:00',
    endTime: '14:30',
    location: 'Room 410',
    color: '#4CAF50',
    dayOfWeek: 4, // Thursday
    recurrence: 'weekly',
  },
  {
    id: '6',
    title: 'Calculus II',
    subject: 'Mathematics',
    startTime: '11:00',
    endTime: '12:30',
    location: 'Room 205',
    color: '#E91E63',
    dayOfWeek: 5, // Friday
    recurrence: 'weekly',
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Binary Search Tree Implementation',
    subject: 'Computer Science',
    dueDate: '2024-02-15',
    priority: 'high',
    completed: false,
    description: 'Implement a balanced BST with insert, delete, and search operations',
  },
  {
    id: '2',
    title: 'Integration Problems Set',
    subject: 'Mathematics',
    dueDate: '2024-02-12',
    priority: 'medium',
    completed: false,
    description: 'Complete problems 1-20 from Chapter 7',
  },
  {
    id: '3',
    title: 'Lab Report: Kinematics',
    subject: 'Physics',
    dueDate: '2024-02-10',
    priority: 'high',
    completed: true,
    description: 'Write up findings from Tuesday\'s lab experiment',
  },
  {
    id: '4',
    title: 'Essay: Shakespeare Analysis',
    subject: 'English',
    dueDate: '2024-02-18',
    priority: 'medium',
    completed: false,
    description: 'Analyze themes in Hamlet - 1500 words',
  },
  {
    id: '5',
    title: 'Midterm Study Guide',
    subject: 'Mathematics',
    dueDate: '2024-02-08',
    priority: 'low',
    completed: true,
    description: 'Review chapters 1-6 for midterm exam',
  },
];

export const getClassesForDay = (dayOfWeek: number): ClassEvent[] => {
  return mockClasses.filter(cls => cls.dayOfWeek === dayOfWeek);
};

export const getUpcomingAssignments = (limit: number = 5): Assignment[] => {
  const today = new Date();
  return mockAssignments
    .filter(assignment => !assignment.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, limit);
};
