import { GetServerSideProps } from 'next';
import { serverConfig } from '../../config.server';

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif'];

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

  const extension = file.split('.').pop();

  if (!query.format && extension && IMAGE_EXTENSIONS.includes(extension)) {
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
