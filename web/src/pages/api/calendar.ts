import { CalendarEvent, CalendarEventTag } from '@/models/calendar';
import dayjs from 'dayjs';
import { calendar_v3, google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serverConfig } from '../../config.server';

const calendar = google.calendar({
  version: 'v3',
  auth: serverConfig.GOOGLE_API_KEY,
});

const parseTagsFromTitle = (title: string): [string, CalendarEventTag[]] => {
  const tags: CalendarEventTag[] = [];
  let t = title;

  Object.values(CalendarEventTag).forEach((k) => {
    if (t.includes(k)) {
      t = t.replace(`[${k}]`, '').replace(`[${k.toLowerCase()}]`, '');
      tags.push(k);
    }
  });

  return [t.trim(), tags];
};

const getCalendarEvents = (
  calendarId: string,
  includePast: boolean
): Promise<CalendarEvent[]> => {
  const mapEvent = (item: calendar_v3.Schema$Event): CalendarEvent => {
    const { id, description, summary, start, end } = item;

    const startDate = start?.date ?? start?.dateTime;
    const endDate = end?.date ?? end?.dateTime;

    const [title, tags] = parseTagsFromTitle(summary ?? '');

    return {
      title,
      tags,
      id: id ?? '',
      description: description ?? '',
      start: new Date(startDate ?? ''),
      end: new Date(endDate ?? ''),
    };
  };

  return new Promise((resolve, reject) => {
    console.log(new Date().toISOString());
    calendar.events.list(
      {
        calendarId,
        timeMin: includePast ? undefined : new Date().toISOString(),
      },
      (err, data) => {
        if (err || !data) {
          reject(err);
          return;
        }

        const events = data.data.items?.map<CalendarEvent>(mapEvent) ?? [];

        resolve(events);
      }
    );
  });
};

const groupEvents = (events: CalendarEvent[]) => {
  const grouped: Record<string, CalendarEvent[]> = {};

  events.forEach((event) => {
    const start = dayjs(event.start);
    const key = start.format('YYYY-MM-DD');

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(event);
  });

  return Object.entries(grouped)
    .map(([date, events]) => ({ events, date }))
    .sort((a, b) => (a.date > b.date ? 1 : -1));
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const calendarId = req.query.c?.toString() ?? '';
  const hidePast = req.query.p !== 'true';

  const events = await getCalendarEvents(calendarId, !hidePast).catch(() => []);

  res.send(groupEvents(events));
};

export default handler;
