import { CalendarResponse } from '@/models/calendar';
import dayjs from 'dayjs';
import React from 'react';
import CalendarEvent from './calendar-event';

const CalendarDay: React.FC<CalendarResponse> = ({ date, events }) => {
  return (
    <div className="mt-4 space-y-4">
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
