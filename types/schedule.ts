
export interface ClassEvent {
  id: string;
  title: string;
  subject: string;
  startTime: string;
  endTime: string;
  location: string;
  color: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  recurrence?: 'weekly' | 'biweekly';
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type: 'class' | 'assignment' | 'study' | 'exam';
  color: string;
  description?: string;
}
