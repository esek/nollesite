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
> = async ({ params }) => {
  const file = params?.file ?? '';

  return {
    redirect: {
      destination: `${serverConfig.STRAPI_URL}/uploads/${file}`,
      permanent: true,
    },
  };
};

export default File;
