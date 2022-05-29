import { CalendarEventTag } from '@/models/calendar';
import { NextApiRequest, NextApiResponse } from 'next';
import { GiConsoleController } from 'react-icons/gi';

const toiCalLink = (calendarUrl: string) =>
  `https://calendar.google.com/calendar/ical/${calendarUrl}/public/basic.ics`;

/**
 * Get endpoint for fetching calendar events from Google
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  // Get the calendarId from the query
  const calendarUrl = req.query.c?.toString() ?? '';

  if (!calendarUrl) {
    res.status(400).end();
    return;
  }

  const iCalLink = toiCalLink(calendarUrl);

  let icsText = await fetch(iCalLink).then((res) => res.text());

  // Remove the [XX] tags from the titles
  Object.values(CalendarEventTag).forEach((k) => {
    icsText = icsText
      .replaceAll(`[${k}]`, '')
      .replaceAll(`[${k.toLowerCase()}]`, '');
  });

  res.setHeader('Content-Type', 'text/calendar');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="nollning-schema.ics"'
  );

  res.send(icsText);
};

export default handler;
