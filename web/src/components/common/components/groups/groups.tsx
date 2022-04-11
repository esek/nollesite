import Heading from '@/components/typography/heading';
import { useLocale } from '@/hooks/locale.hook';
import { Content, ContentPhadderGroup } from '@/models/content';
import Group from './group';

const Groups: React.FC<Content<'content.phaddergroups'>> = ({ groups }) => {
  const { t } = useLocale();

  const sortGroups = (g: ContentPhadderGroup[]) =>
    g.sort((a, b) => (a.number > b.number ? 1 : -1));

  return (
    <>
      <Heading>{t('headers.groups')}</Heading>
      {groups?.length && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {sortGroups(groups).map((g) => (
            <Group {...g} key={`group-${g.number}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default Groups;
