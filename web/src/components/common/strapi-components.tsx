import { Content } from '../../models/content';
import Images from './images';
import Text from './text';

type Props = {
  content: Content[];
};

const StrapiComponents: React.FC<Props> = ({ content }) => {
  const buildContent = (c: Content) => {
    let inner = null;
    switch (c.__component) {
      case 'content.text':
        if (c.body || c.header) {
          inner = <Text {...c} />;
        }
        break;
      case 'content.images':
        if (c.images.length) {
          inner = <Images {...c} />;
        }
        break;
    }

    if (!inner) {
      return null;
    }

    return (
      <section className="max-w py-8" key={`strapi-content--${c.id}`}>
        {inner}
      </section>
    );
  };

  return <div className="space-y-8">{content.map(buildContent)}</div>;
};

export default StrapiComponents;
