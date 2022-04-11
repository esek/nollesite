import Cbx from '@/components/forms/cbx';
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
import { FiLoader, FiSave } from 'react-icons/fi';
import CalendarDay from './calendar-day';
require('dayjs/locale/sv');

const Calendar: React.FC<Content<'content.calendar'>> = ({ calendarUrl }) => {
  const [events, setEvents] = useState<CalendarResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [includePast, setIncludePast] = useState<boolean>(false);

  const { t, locale } = useLocale();

  const iCalLink = `https://calendar.google.com/calendar/ical/${calendarUrl}/public/basic.ics`;

  /**
   * Fetches the calendar events from the given url
   * @param includePast Whether or not to include past events
   */
  const getCalendarInfo = async (includePast: boolean) => {
    setIsLoading(true);
    const events: CalendarResponse[] = await fetch(
      `/api/calendar?c=${calendarUrl}&p=${includePast}`
    ).then((res) => res.json());
    setIsLoading(false);
    setEvents(events);
  };

  const handleCalDownload = () => {
    window.open(iCalLink, '_blank');
  };

  /**
   * Runs anytime locale, includePast or calendarUrl changes
   * and refetches the calendar info
   */
  useEffect(() => {
    dayjs.locale(locale);
    getCalendarInfo(includePast);
  }, [calendarUrl, locale, includePast]);

  const renderCalendarItems = () => {
    if (isLoading) {
      return (
        <div className="flex h-24 items-center justify-center gap-2 bg-white/10 md:col-span-2">
          <FiLoader className="animate-spin" size="1.25em" />
          <p>{t('calendar.loading')}</p>
        </div>
      );
    }

    // If no events, show a box saying so
    if (!events.length) {
      return (
        <div className="flex h-24 items-center justify-center bg-secondary/10 p-4">
          <p>{t('calendar.no-events')}</p>
        </div>
      );
    }

    return events.map((event) => (
      <CalendarDay {...event} key={`calendar-day-${event.date}`} />
    ));
  };

  return (
    <>
      <Heading>{t('headers.calendar')}</Heading>
      <div className="space-y-4">
        <button className="flex items-center gap-2" onClick={handleCalDownload}>
          <FiSave />
          <span>{t('downloadCalendar')}</span>
        </button>
        <Cbx
          value={includePast}
          onChange={setIncludePast}
          label={t('calendar.show-past-events')}
          name="show-past-events"
        />

        {renderCalendarItems()}

        <div className="flex flex-col gap-4 md:flex-row">
          {Object.values(CalendarEventTag).map((tag) => {
            const Icon = TagIcons[tag];
            const label = t(`calendar.${tag.toLowerCase()}`);

            return (
              <div className="flex items-center gap-2" key={`tag-info--${tag}`}>
                <span className="text-xl">
                  <Icon />
                </span>

                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
