import { GetServerSideProps } from 'next';
import { serverConfig } from '../../config.server';

/**
 * Used to proxy files to the strapi cms
 * @returns absolutly nothing
 */
const File = () => {
  return <div>Not found</div>;
};

export const getServerSideProps: GetServerSideProps<
  {},
  { file: string }
> = async ({ params, query }) => {
  const file = params?.file ?? '';
  delete query.file;

  const q = new URLSearchParams(query as {});

  if (!query.format) {
    q.append('format', 'webp');
  }

  return {
    redirect: {
      destination: `${serverConfig.STRAPI_URL}/uploads/${file}?${q.toString()}`,
      permanent: true,
    },
  };
};

export default File;
