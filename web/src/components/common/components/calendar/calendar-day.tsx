import { CalendarEventsGroupedByDay } from '@/models/calendar';
import dayjs from 'dayjs';
import React from 'react';
import CalendarEvent from './calendar-event';

const CalendarDay: React.FC<CalendarEventsGroupedByDay> = ({
  date,
  events,
}) => {
  // Sorting events based on the start time
  events.sort((a, b) =>
    a.start > b.start ? 1 : -1
  )

  return (
    <div className="my-4 space-y-4">
      <h3 className="text-lg font-semibold capitalize">
        {dayjs(date).format('dddd, D MMMM')}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {events.map((e) => (
          <CalendarEvent {...e} key={`calendar-event-${e.id}`} />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
