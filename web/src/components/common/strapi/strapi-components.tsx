import { slugify } from '@/utils/page.utils';
import { FunctionComponent } from 'react';
import { Content } from '../../../models/content';
import Calendar from '../components/calendar/calendar';
import Groups from '../components/groups/groups';
import Images from '../components/images';
import Phoset from '../components/phoset/phoset';
import Sponsors from '../components/sponsors/sponsors';
import Text from '../components/text';
import Nollekamp from '../nollekamp/nollekamp';
import StrapiComponent from './strapi-component';

type Props = {
  content: Content[];
};

const StrapiComponents: React.FC<Props> = ({ content }) => {
  /**
   * Checks what type of content we have and renders the correct one
   * @param c The actual strapi-component
   * @returns A tuple of the component ID and the component
   */
  const mapContent = (c: Content): [string, FunctionComponent<any>] | null => {
    switch (c.__component) {
      case 'content.text':
        if (c.body || c.header) {
          return [slugify(c.header), Text];
        }
        break;
      case 'content.images':
        if (c.images.length) {
          return [slugify(c.title), Images];
        }
        break;
      case 'content.phoset':
        if (c.phoset.length) {
          return ['phos', Phoset];
        }
        break;
      case 'content.calendar':
        if (c.calendarUrl) {
          return ['calendar', Calendar];
        }
        break;
      case 'content.nollekamp':
        if (c.missions?.length) {
          return ['nollekamp', Nollekamp];
        }
        break;
      case 'content.phaddergroups':
        if (c.groups?.length) {
          return ['groups', Groups];
        }
        break;
      case 'content.sponsors':
        if (c.sponsors?.length) {
          return ['sponsors', Sponsors];
        }
        break;
    }

    // If we don't recognize the component, don't render anything
    return null;
  };

  const buildContent = (c: Content) => {
    const mapped = mapContent(c);

    if (!mapped) {
      return null;
    }

    const [id, Component] = mapped;

    return (
      <StrapiComponent
        component={c.__component}
        id={id}
        key={`strapi-component--${c.id}-${id}`}
      >
        <Component {...c} />
      </StrapiComponent>
    );
  };

  return <>{content.map(buildContent)}</>;
};

export default StrapiComponents;
