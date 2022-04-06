import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import {
  CalendarEventTag,
  CalendarResponse,
  TagIcons,
} from '@/models/calendar';
import { Content } from '@/models/content';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import CalendarDay from './calendar-day';
require('dayjs/locale/sv');

const Calendar: React.FC<Content<'content.calendar'>> = ({ calendarUrl }) => {
  const [events, setEvents] = useState<CalendarResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t, locale } = useLocale();

  const iCalLink = `https://calendar.google.com/calendar/ical/${calendarUrl}/public/basic.ics`;

  const getCalendarInfo = async () => {
    setIsLoading(true);
    const events: CalendarResponse[] = await fetch(
      `/api/calendar?c=${calendarUrl}`
    ).then((res) => res.json());
    setIsLoading(false);
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
    <>
      <Heading>{t('headers.calendar')}</Heading>
      <button className="flex items-center gap-2" onClick={handleCalDownload}>
        <FiSave />
        <span>{t('downloadCalendar')}</span>
      </button>
      {isLoading ? (
        <div className="mt-8 flex h-24 items-center justify-center bg-white/10 md:col-span-2">
          Laddar kalender...
        </div>
      ) : (
        events.map((event) => (
          <CalendarDay {...event} key={`calendar-day-${event.date}`} />
        ))
      )}

      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        {Object.values(CalendarEventTag).map((tag) => {
          const Icon = TagIcons[tag];
          const label = t(`calendar.${tag.toLowerCase()}`);

          return (
            <div className="flex items-center gap-2">
              <span className="text-xl">
                <Icon />
              </span>

              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
