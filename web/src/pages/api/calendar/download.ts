import { stripCalendarTags } from '@/utils/style.utils';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Get endpoint for downloading the calendar
 * proxies the response to remove the [XX] tags from titles
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

  const iCalLink = `https://calendar.google.com/calendar/ical/${calendarUrl}/public/basic.ics`;

  try {
    const icsText = await fetch(iCalLink).then((res) => res.text());

    // set the content type so the browser knows that it's an ics
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="nollning-schema.ics"'
    );

    res.send(stripCalendarTags(icsText));
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

export default handler;
