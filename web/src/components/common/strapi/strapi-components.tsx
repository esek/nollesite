import { slugify } from '@/utils/page.utils';
import { Content } from '../../../models/content';
import Calendar from '../calendar/calendar';
import Images from '../images';
import Phoset from '../phoset';
import Text from '../text';
import StrapiComponent from './strapi-component';

type Props = {
  content: Content[];
};

const StrapiComponents: React.FC<Props> = ({ content }) => {
  const buildContent = (c: Content, i: number) => {
    switch (c.__component) {
      case 'content.text':
        if (c.body || c.header) {
          return (
            <StrapiComponent
              component={c.__component}
              id={slugify(c.header)}
              key={c.id}
            >
              <Text {...c} />
            </StrapiComponent>
          );
        }
        break;
      case 'content.images':
        if (c.images.length) {
          return (
            <StrapiComponent
              component={c.__component}
              id={slugify(c.title)}
              key={c.id}
            >
              <Images {...c} />
            </StrapiComponent>
          );
        }
        break;
      case 'content.phoset':
        if (c.phoset.length) {
          return (
            <StrapiComponent component={c.__component} id="phoset" key={c.id}>
              <Phoset {...c} />
            </StrapiComponent>
          );
        }
        break;
      case 'content.calendar':
        if (c.calendarUrl) {
          return (
            <StrapiComponent component={c.__component} id="calendar" key={c.id}>
              <Calendar {...c} />
            </StrapiComponent>
          );
        }
    }

    return null;
  };

  return <div className="space-y-8">{content.map(buildContent)}</div>;
};

export default StrapiComponents;
