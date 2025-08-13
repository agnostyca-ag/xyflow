// Calendar Widget Types
export interface CalendarEvent {
  id: string
  date: Date
  title: string
  description?: string
  type?: 'deadline' | 'meeting' | 'event' | 'reminder'
  color?: string
}

export interface CalendarWidgetConfig {
  title: string
  events: CalendarEvent[]
  defaultView?: 'month' | 'week' | 'day'
  showUpcoming?: boolean
  maxUpcomingEvents?: number
  allowEventCreation?: boolean
}

export interface CalendarWidgetData {
  config: CalendarWidgetConfig
  selectedDate?: Date
  viewMode?: 'month' | 'week' | 'day'
}