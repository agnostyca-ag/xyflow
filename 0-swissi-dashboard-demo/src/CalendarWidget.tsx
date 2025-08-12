import React, { useState, useMemo, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Event {
  date: Date;
  title: string;
}

const CalendarWidget: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());

  // Memoized events data to prevent recreation on every render
  const events: Event[] = useMemo(() => [
    { date: new Date(2025, 7, 5), title: 'Thesis Defense Presentation' },
    { date: new Date(2025, 7, 8), title: 'Research Seminar' },
    { date: new Date(2025, 7, 12), title: 'Assignment Due: Statistics' },
    { date: new Date(2025, 7, 15), title: 'Office Hours with Prof. Smith' },
    { date: new Date(2025, 7, 20), title: 'Mid-term Exam' },
  ], []);

  // Memoized function to check if a date has events
  const hasEvent = useCallback((date: Date) => {
    return events.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  }, [events]);

  // Custom tile content to show event indicators
  const tileContent = useCallback(({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && hasEvent(date)) {
      return <div className="event-indicator">•</div>;
    }
    return null;
  }, [hasEvent]);

  // Get events for selected date - memoized
  const selectedEvents = useMemo(() => {
    if (!value || Array.isArray(value)) return [];
    
    return events.filter(event => 
      event.date.toDateString() === (value as Date).toDateString()
    );
  }, [value, events]);

  // Memoized upcoming events
  const upcomingEvents = useMemo(() => events.slice(0, 3), [events]);

  return (
    <>
      <h5 className="widget-title">Academic Calendar</h5>
      <div className="calendar-container">
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={tileContent}
          className="custom-calendar"
        />
        
        {selectedEvents.length > 0 && (
          <div className="selected-events">
            <h6>Events on {value && !Array.isArray(value) && value.toLocaleDateString()}:</h6>
            {selectedEvents.map((event, index) => (
              <div key={index} className="event-item">
                {event.title}
              </div>
            ))}
          </div>
        )}
        
        <div className="upcoming-events">
          <h6>Upcoming Events:</h6>
          {upcomingEvents.map((event, index) => (
            <div key={index} className="event-preview">
              <span className="event-date">{event.date.toLocaleDateString()}</span>
              <span className="event-title">{event.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarWidget;
