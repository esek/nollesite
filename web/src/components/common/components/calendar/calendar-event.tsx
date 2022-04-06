import { CalendarEvent } from '@/models/calendar';
import dayjs from 'dayjs';
import { useState } from 'react';

const CalendarEvent: React.FC<CalendarEvent> = ({ title, start, end }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getTime = (date: Date) => {
    const d = dayjs(date);
    return d.format('HH:mm');
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      className="flex flex-col bg-accent p-4 text-primary transition-all hover:-translate-y-0.5 hover:opacity-80"
      onClick={toggle}
    >
      <h4 className="font-medium">{title}</h4>
      <div>
        <span>{getTime(start)}</span>-<span>{getTime(end)}</span>
      </div>

      <p className="mt-1 text-sm italic">Klicka för mer information</p>
    </button>
  );
};

export default CalendarEvent;
