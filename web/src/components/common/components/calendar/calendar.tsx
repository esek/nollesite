import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { CalendarResponse } from '@/models/calendar';
import { Content } from '@/models/content';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import CalendarDay from './calendar-day';
require('dayjs/locale/sv');

const Calendar: React.FC<Content<'content.calendar'>> = ({ calendarUrl }) => {
  const [events, setEvents] = useState<CalendarResponse[]>([]);

  const { t, locale } = useLocale();

  const iCalLink = `https://calendar.google.com/calendar/ical/${calendarUrl}/public/basic.ics`;

  const getCalendarInfo = async () => {
    const events: CalendarResponse[] = await fetch(
      `/api/calendar?c=${calendarUrl}`
    ).then((res) => res.json());

    setEvents(events);
  };

  const handleCalDownload = () => {
    window.open(iCalLink, '_blank');
  };

  useEffect(() => {
    dayjs.locale(locale);
    getCalendarInfo();
  }, [calendarUrl]);

  return (
    <div>
      <Heading>{t('headers.calendar')}</Heading>
      <button className="flex items-center gap-2" onClick={handleCalDownload}>
        <FiSave />
        <span>{t('downloadCalendar')}</span>
      </button>
      {events.map((event) => (
        <CalendarDay {...event} key={`calendar-day-${event.date}`} />
      ))}
    </div>
  );
};

export default Calendar;
