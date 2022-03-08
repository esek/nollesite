import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send({
    message: "I'm alive!",
    date: new Date().toISOString(),
  });
};

export default handler;
