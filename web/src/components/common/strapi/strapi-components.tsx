import { slugify } from '@/utils/page.utils';
import { ComponentType } from 'react';
import { Content } from '../../../models/content';
import StrapiComponent from './strapi-component';
import dynamic from 'next/dynamic';

/* load all components dynamically, reduces bundle size */

const DynamicText = dynamic(() => import('../components/text'));
const DynamicImageWithText = dynamic(() => import('../components/image-with-text'));
const DynamicNolleguide = dynamic(() => import('../components/nolleguide'));
const DynamicContact = dynamic(() => import('../components/contact/contact'));
// prettier-ignore
const DynamicNollekamp = dynamic(() => import('../components/nollekamp/nollekamp'));
const DynamicGroups = dynamic(() => import('../components/groups/groups'));
// prettier-ignore
const DynamicSponsors = dynamic(() => import('../components/sponsors/sponsors'));
const DynamicPhoset = dynamic(() => import('../components/phoset/phoset'));
const DynamicImages = dynamic(() => import('../components/images'));
// prettier-ignore
const DynamicCalendar = dynamic(() => import('../components/calendar/calendar'));

type Props = {
  content: Content[];
};

const StrapiComponents: React.FC<Props> = ({ content }) => {
  /**
   * Checks what type of content we have and renders the correct one
   * @param c The actual strapi-component
   * @returns A tuple of the component ID and the component
   */
  const mapContent = (c: Content): [string, ComponentType<any>] | null => {
    switch (c.__component) {
      case 'content.text':
        if (c.body || c.header) {
          return [slugify(c.header), DynamicText];
        }
        break;
      case 'content.image-with-text':
        if (c.image?.url) {
          return [slugify(c.title), DynamicImageWithText];
        }
        break;
      case 'content.images':
        if (c.images.length) {
          return [slugify(c.title), DynamicImages];
        }
        break;
      case 'content.phoset':
        if (c.phoset.length) {
          return ['phos', DynamicPhoset];
        }
        break;
      case 'content.calendar':
        if (c.calendarUrl) {
          return ['calendar', DynamicCalendar];
        }
        break;
      case 'content.nollekamp':
        if (c.missions?.length) {
          return ['nollekamp', DynamicNollekamp];
        }
        break;
      case 'content.phaddergroups':
        if (c.groups?.length) {
          return ['groups', DynamicGroups];
        }
        break;
      case 'content.sponsors':
        if (c.sponsors?.length) {
          return ['sponsors', DynamicSponsors];
        }
        break;
      case 'content.contact':
        if (c.email) {
          return [slugify(c.title), DynamicContact];
        }
        break;
      case 'content.nolleguide':
        if (c.file?.url) {
          return ['nolleguide-download', DynamicNolleguide];
        }
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
