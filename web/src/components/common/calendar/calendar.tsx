import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content } from '@/models/content';
import React, { useEffect } from 'react';
import { FiSave } from 'react-icons/fi';

const Calendar: React.FC<Content<'content.calendar'>> = ({ calendarUrl }) => {
  const { t } = useLocale();

  const iCalLink = `https://calendar.google.com/calendar/ical/${calendarUrl}/public/basic.ics`;

  const getCalendarInfo = async () => {
    const events = await fetch(`/api/calendar?c=${calendarUrl}`).then((res) =>
      res.json()
    );
    console.log(events);
  };

  const handleCalDownload = () => {
    window.open(iCalLink, '_blank');
  };

  useEffect(() => {
    getCalendarInfo();
  }, [calendarUrl]);

  return (
    <div>
      <Heading>{t('headers.calendar')}</Heading>
      <button className="flex items-center gap-2" onClick={handleCalDownload}>
        <FiSave />
        <span>{t('downloadCalendar')}</span>
      </button>
    </div>
  );
};

export default Calendar;
