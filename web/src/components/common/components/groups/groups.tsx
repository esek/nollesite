import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content, ContentGroup } from '@/models/content';
import Group from './group';

const Groups: React.FC<Content<'content.groups'>> = ({ groups }) => {
  const { t } = useLocale();

  const sortGroups = (g: ContentGroup[]) =>
    g.sort((a, b) => (a.number > b.number ? 1 : -1));

  return (
    <>
      <Heading>{t('headers.groups')}</Heading>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {sortGroups(groups).map((g) => (
          <Group {...g} key={`group-${g.number}`} />
        ))}
      </div>
    </>
  );
};

export default Groups;
