import {
  CalendarEvent,
  CalendarEventsGroupedByDay,
  CalendarEventsGroupedByWeek,
  CalendarEventTag,
} from '@/models/calendar';
import dayjs from 'dayjs';
import { calendar_v3, google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serverConfig } from '@/config.server';
import { weekNumber } from 'weeknumber';
import { stripCalendarTags } from '@/utils/style.utils';

const calendar = google.calendar({
  version: 'v3',
  auth: serverConfig.GOOGLE_API_KEY,
});

/**
 * Gets for example [OUVVE] and maps it to a tag and removes it from the title
 * @param title the title from google
 * @returns a touple of the title and the tags
 */
const parseTagsFromTitle = (title: string): [string, CalendarEventTag[]] => {
  const tags: CalendarEventTag[] = [];

  const strippedTitle = stripCalendarTags(title, (tag) => tags.push(tag));
  return [strippedTitle, tags];
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

    const startDateOrTime = start?.date ?? start?.dateTime;
    const endDateOrTime = end?.date ?? end?.dateTime;

    // Get the [XX] values from the title and remove them from the title
    const [title, tags] = parseTagsFromTitle(summary ?? '');

    const startDate = new Date(startDateOrTime ?? '');

    // get the week number of the event
    const week = weekNumber(startDate);

    return {
      title,
      tags,
      id: id ?? '',
      description: description ?? '',
      start: new Date(startDate ?? ''),
      end: new Date(endDateOrTime ?? ''),
      location: location ?? '',
      weekNumber: week,
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
          reject(err);
          return;
        }

        const events = data.data.items?.map<CalendarEvent>(mapEvent) ?? [];

        resolve(events);
      }
    );
  });
};

const groupEventsByDay = (
  events: CalendarEvent[]
): CalendarEventsGroupedByDay[] => {
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
    .map(([date, events]) => ({ date, events }))
    .sort((a, b) => (a.date > b.date ? 1 : -1));
};

/**
 * Converts a list of events and groups them into objects
 * grouped by their weeknumber
 * @param events The events to group
 * @returns Calendar events grouped by week
 */
const groupEventsByWeek = (events: CalendarEvent[]) => {
  const grouped: Record<number, CalendarEvent[]> = {};

  events.forEach((event) => {
    const { weekNumber } = event;

    if (!grouped[weekNumber]) {
      grouped[weekNumber] = [];
    }

    grouped[weekNumber].push(event);
  });

  return Object.entries(grouped).map(([weekNumber, events]) => ({
    weekNumber: parseInt(weekNumber),
    events,
  }));
};

const groupEvents = (
  events: CalendarEvent[]
): CalendarEventsGroupedByWeek[] => {
  const byWeek = groupEventsByWeek(events);

  return (
    byWeek
      .map(({ weekNumber, events }) => ({
        weekNumber,
        // Group events by day
        days: groupEventsByDay(events),
      }))
      // sort the events by week number
      .sort((a, b) => (a.weekNumber > b.weekNumber ? 1 : -1))
  );
};

/**
 * Get endpoint for fetching calendar events from Google
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

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
