import { CalendarEvent } from '@/models/calendar';
import dayjs from 'dayjs';

const CalendarEvent: React.FC<CalendarEvent> = ({ title, start, end }) => {
  const getTime = (date: Date) => {
    const d = dayjs(date);
    return d.format('HH:mm');
  };
  return (
    <div className="bg-accent p-4 text-primary">
      <h4>{title}</h4>
      <div>
        <span>{getTime(start)}</span>-<span>{getTime(end)}</span>
      </div>

      <p className="mt-1 text-sm italic">Klicka för mer information</p>
    </div>
  );
};

export default CalendarEvent;
