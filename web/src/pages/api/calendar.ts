import { calendar_v3, google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serverConfig } from '../../config.server';
import { CalendarEvent } from '../../models/calendar';

const calendar = google.calendar({
  version: 'v3',
  auth: serverConfig.GOOGLE_API_KEY,
});

const getCalendarEvents = (calendarId: string): Promise<CalendarEvent[]> => {
  const mapEvent = (item: calendar_v3.Schema$Event): CalendarEvent => {
    const { id, description, summary, start, end } = item;
    return {
      id: id ?? '',
      title: summary ?? '',
      description: description ?? '',
      start: start?.date ? new Date(start.date) : null,
      end: end?.date ? new Date(end.date) : null,
    };
  };

  return new Promise((resolve, reject) => {
    calendar.events.list({ calendarId }, (err, data) => {
      if (err || !data) {
        reject(err);
        return;
      }

      const events = data.data.items?.map<CalendarEvent>(mapEvent) ?? [];

      resolve(events);
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const calendarId = req.query.c?.toString() ?? '';

  const events = await getCalendarEvents(calendarId).catch(() => []);

  res.send(events);
};

export default handler;
