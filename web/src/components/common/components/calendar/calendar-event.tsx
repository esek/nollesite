import Modal from '@/components/layout/modal';
import { useLocale } from '@/hooks/locale.hook';
import { CalendarEvent, TagIcons } from '@/models/calendar';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

const CalendarEvent: React.FC<CalendarEvent> = ({
  id,
  title,
  start,
  end,
  description,
  tags,
  location,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useLocale();
  const hasDescription = description && description.length > 0;

  const getTime = (date: Date) => {
    const d = dayjs(date);
    return d.format('HH:mm');
  };

  const toggle = () => {
    if (!hasDescription) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`relative flex flex-col bg-accent p-4 text-primary transition-all ${
          hasDescription
            ? 'hover:-translate-y-0.5 hover:opacity-80'
            : 'pointer-events-none'
        }`}
        onClick={toggle}
      >
        <h4 className="font-medium">{title}</h4>
        <div className="absolute right-4 top-0 bottom-0 flex flex-col items-center justify-center gap-1 text-xl">
          {tags.map((t) => {
            const Icon = TagIcons[t];
            return (
              <div key={`calendar-event-${id}-tag-${t}-icon`}>
                <Icon />
              </div>
            );
          })}
        </div>

        {location && (
          <div className="flex items-center gap-1">
            <FiMapPin />
            {location}
          </div>
        )}

        <div>
          <span>{getTime(start)}</span> - <span>{getTime(end)}</span>
        </div>

        {hasDescription && (
          <p className="mt-1 text-sm italic">{t('calendar.more-info')}</p>
        )}
      </button>

      <Modal title={title} isVisible={isOpen} onChange={setIsOpen}>
        {location && (
          <div className="mb-1 flex items-center gap-1 text-sm">
            <FiMapPin />
            {location}
          </div>
        )}

        <p className="text-sm">
          {getTime(start)} - {getTime(end)}
        </p>

        <div className="mt-2 flex gap-2 text-xl">
          {tags.map((tag) => {
            const Icon = TagIcons[tag];
            const label = t(`calendar.${tag.toLowerCase()}`);
            return (
              <div
                title={label}
                aria-label={label}
                key={`event-${id}--tag-${tag}`}
              >
                <Icon />
              </div>
            );
          })}
        </div>

        <p className="mt-2">
          {description ? (
            description
          ) : (
            <span className="italic">{t('descriptionMissing')}</span>
          )}
        </p>
      </Modal>
    </>
  );
};

export default CalendarEvent;
