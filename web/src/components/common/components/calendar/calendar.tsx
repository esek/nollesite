import Cbx from '@/components/forms/cbx';
import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import {
  CalendarEventsGroupedByWeek,
  CalendarEventTag,
  TagIcons,
} from '@/models/calendar';
import { Content } from '@/models/content';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FiLoader, FiSave } from 'react-icons/fi';
import CalendarDay from './calendar-day';
import CalendarWeek from './calendar-week';
require('dayjs/locale/sv');

const Calendar: React.FC<Content<'content.calendar'>> = ({ calendarUrl }) => {
  const [events, setEvents] = useState<CalendarEventsGroupedByWeek[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [includePast, setIncludePast] = useState<boolean>(true);

  const { t, locale } = useLocale();

  const handleCalDownload = () => {
    window.open(`/api/calendar/download?c=${calendarUrl}`, '_blank');
  };

  // Function to update localstorage whenever the includePast variable is set
  const updateIncludePast = (value: boolean) => {
    localStorage.setItem("includePast", String(value))
    setIncludePast(value)
  }

  // Function added to verify based on the local storage if the full calendar should be loaded or not
  const shouldIncludePast = () => {
    return window.localStorage.getItem("includePast") !== "false"
  }

  // Triggers on page load to update the includePast variable to the value last set by the user
  useEffect(() => {
    setIncludePast(shouldIncludePast)
  }, []);

  /**
   * Runs anytime includePast or calendarUrl changes
   * and refetches the calendar info
   */
  useEffect(() => {
    /**
     * Fetches the calendar events from the given url
     * @param includePast Whether or not to include past events
     */
    const getCalendarInfo = async (includePast: boolean) => {
      setIsLoading(true);

      const events: CalendarEventsGroupedByWeek[] = await fetch(
        `/api/calendar?c=${calendarUrl}&p=${includePast}`
      )
        .then((res) => res.json())
        .catch(() => []);

      setIsLoading(false);

      setEvents(events);
    };

    getCalendarInfo(shouldIncludePast());
  }, [calendarUrl, includePast]);

  /**
   * Runs when the locale changes
   * lets the locale of dates
   */
  useEffect(() => {
    // set the date locale
    dayjs.locale(locale);
  }, [locale]);

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
      <CalendarWeek {...event} key={`calendar-week-${event.weekNumber}`} />
    ));
  };

  return (
    <>
      <Heading>{t('headers.calendar')}</Heading>
      <div className="space-y-4">
        <button
          className="flex items-center gap-2 hover:text-secondary/80"
          onClick={handleCalDownload}
        >
          <FiSave />
          <span>{t('downloadCalendar')}</span>
        </button>
        <Cbx
          value={includePast}
          onChange={updateIncludePast}
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
