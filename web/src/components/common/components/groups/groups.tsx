import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content } from '@/models/content';

const Groups: React.FC<Content<'content.groups'>> = ({ groups }) => {
  const { t } = useLocale();
  return (
    <>
      <Heading>{t('headers.groups')}</Heading>
    </>
  );
};

export default Groups;
