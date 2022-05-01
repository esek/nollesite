import { serverConfig } from '@/config.server';
import axios from 'axios';
import { Agent } from 'https';
import { NextApiRequest, NextApiResponse } from 'next';
import absoluteUrl from 'next-absolute-url';

type Body = {
  to: string;
  from?: string;
  message: string;
};

interface IEmailBody {
  to: string[];
  subject: string;
  body: string;
  overrides: Record<string, string>;
  templateName: string;
}

const sendEmail = async (body: IEmailBody) => {
  const response = await axios.post(`${serverConfig.EBREV_URL}/send`, body, {
    headers: {
      authorization: serverConfig.EBREV_API_KEY,
      'content-type': 'application/json',
    },
  });

  return response;
};

/**
 * Validate that the provided email address is a valid Esek address
 * @param email Email address to validate
 * @returns True if valid, false otherwise
 */
const validateEsekAddress = (email: string) =>
  email.split('@')[1] === 'esek.se';

/**
 * Get endpoint for fetching calendar events from Google
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { origin, host } = absoluteUrl(req);

  if (req.headers.referer !== `${origin}/`) {
    res.status(403).end();
    return;
  }

  const { to, from, message }: Body = req.body;

  if (!to || !validateEsekAddress(to)) {
    res.status(400).end();
    return;
  }

  const mailBody: IEmailBody = {
    to: [to],
    subject: `Nytt meddelande från ${host}`,
    body: `
	 	<p style="text-style: italic">
		 Från: ${from ? from : 'Anonym'}
		</p>
		<p>${message}</p>

		<p style="text-style: italic; font-size: 0.75em;">Detta mailet är automatgenererat av Nollningshemsidan</p>
	  `,
    overrides: {},
    templateName: '',
  };

  const response = await sendEmail(mailBody);
  res.status(200).json(response.data);
};

export default handler;
