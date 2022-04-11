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

  // Remove the [XX] tags from the title and append them to the tags array
  Object.values(CalendarEventTag).forEach((k) => {
    if (t.includes(k)) {
      t = t.replace(`[${k}]`, '').replace(`[${k.toLowerCase()}]`, '');
      tags.push(k);
    }
  });

  // remove any whitespaces
  return [t.trim(), tags];
};

/**
 * Gets the calendar events from the Google API
 * @param calendarId The ID of the calendar to get events from
 * @param includePast Whether or not to include past events
 * @returns A mapped list of calendar events
 */
const getCalendarEvents = (
  calendarId: string,
  includePast: boolean
): Promise<CalendarEvent[]> => {
  /**
   * Maps a google calendar event to a nicer event with only
   * the values we use
   * @param item Google calendar event
   * @returns A mapped `CalendarEvent`
   */
  const mapEvent = (item: calendar_v3.Schema$Event): CalendarEvent => {
    const { id, description, summary, start, end, location } = item;

    const startDate = start?.date ?? start?.dateTime;
    const endDate = end?.date ?? end?.dateTime;

    // Get the [XX] values from the title and remove them from the title
    const [title, tags] = parseTagsFromTitle(summary ?? '');

    return {
      title,
      tags,
      id: id ?? '',
      description: description ?? '',
      start: new Date(startDate ?? ''),
      end: new Date(endDate ?? ''),
      location: location ?? '',
    };
  };

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId,
        timeMin: includePast ? undefined : new Date().toISOString(),
      },
      (err, data) => {
        if (err || !data) {
          console.error('Calendar API errored: ', err);
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

/**
 * Get endpoint for fetching calendar events from Google
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get the calendarId from the query
  const calendarId = req.query.c?.toString() ?? '';

  // If no calendar ID is provided, return an empty array
  if (!calendarId) {
    res.send([]);
    return;
  }

  // Wether or not to include past events
  const hidePast = req.query.p !== 'true';

  const events = await getCalendarEvents(calendarId, !hidePast).catch(() => []);

  res.send(groupEvents(events));
};

export default handler;
