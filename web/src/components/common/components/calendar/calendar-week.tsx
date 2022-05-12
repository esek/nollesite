import { CalendarEventsGroupedByWeek } from '@/models/calendar';
import React, { useState } from 'react';
import CalendarDay from './calendar-day';
import { FiChevronDown } from 'react-icons/fi';
import { useToggle } from '@/hooks/toggle.hook';
import { useLocale } from '@/hooks/locale.hook';

const CalendarWeek: React.FC<CalendarEventsGroupedByWeek> = ({
  weekNumber,
  days,
}) => {
  const { isOpen, toggle } = useToggle(false);
  const { t } = useLocale();

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center justify-between border border-accent p-4 ${
          isOpen ? 'bg-accent/10' : ''
        }`}
        onClick={toggle}
      >
        <h2 className="font-semibold text-secondary">
          {t('calendar.week')} {weekNumber}
        </h2>

        <button aria-label={`${isOpen ? 'Close' : 'Open'} content`}>
          <FiChevronDown
            className={`transition-all ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div className={`overflow-hidden  ${!isOpen ? 'max-h-0' : 'max-h-full'}`}>
        {days.map((d) => (
          <CalendarDay {...d} key={`calendar-week--${weekNumber}-${d.date}`} />
        ))}
      </div>
    </div>
  );
};

export default CalendarWeek;
