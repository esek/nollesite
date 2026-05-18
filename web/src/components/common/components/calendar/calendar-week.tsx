import { CalendarEventsGroupedByWeek } from '@/models/calendar';
import React from 'react';
import CalendarDay from './calendar-day';
import { FiChevronDown } from 'react-icons/fi';
import { useToggle } from '@/hooks/toggle.hook';
import { useLocale } from '@/hooks/locale.hook';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const CalendarWeek: React.FC<CalendarEventsGroupedByWeek> = ({
  weekNumber,
  days,
}) => {
  const thisWeek = dayjs().isoWeek();

  // default is opened if this is the current week
  const { isOpen, toggle } = useToggle(weekNumber === thisWeek);
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

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              ease: 'easeInOut',
              duration: 0.1,
            },
          }}
        >
          {days.map((d) => (
            <CalendarDay
              {...d}
              key={`calendar-week--${weekNumber}-${d.date}`}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CalendarWeek;
