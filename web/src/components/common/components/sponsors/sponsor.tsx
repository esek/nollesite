import Modal from '@/components/layout/modal';
import { useLocale } from '@/hooks/locale.hook';
import { useToggle } from '@/hooks/toggle.hook';
import { ContentSponsor } from '@/models/content';
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import StrapiImg from '../../strapi/strapi-image';

const Sponsor: React.FC<ContentSponsor> = ({
  image,
  name,
  link,
  description,
}) => {
  const { toggle, isOpen } = useToggle();
  const { t } = useLocale();

  return (
    <>
      <button className="block h-full w-full" onClick={toggle} title={name}>
        <StrapiImg {...image} options={{ width: 320, height: 320 }} />
      </button>

      <Modal isVisible={isOpen} title={name} onChange={toggle}>
        <div className="my-4">
          <StrapiImg
            {...image}
            className="mx-auto w-[50%]"
            options={{ width: 320, height: 320 }}
          />
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="text-sm"
        ></div>

        <div className="pt-4 pb-8">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1 text-accent"
          >
            {t('sponsors.read-more')}
            {name}

            <span className="transition-all group-hover:translate-x-1">
              <FiArrowRight />
            </span>
          </a>
        </div>
      </Modal>
    </>
  );
};

export default Sponsor;
