import Heading from '@/components/typography/heading';
import { slugify } from '@/utils/page.utils';
import React, { useState } from 'react';
import { Content } from '../../../models/content';
import StrapiImg from '../strapi/strapi-image';
import ImageModal from './image-modal';
import { StrapiFile } from '@/models/image';

const Images: React.FC<Content<'content.images'>> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: StrapiFile;
    imageText?: string;
  } | null>(null);

  const openModal = (image: StrapiFile, imageText?: string) => {
    setSelectedImage({ image, imageText });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {title && <Heading id={slugify(title)}>{title}</Heading>}
      <div className="grid auto-cols-fr justify-center gap-4 md:grid-flow-col">
        {images.map(
          ({ id, image, imageText }) =>
            image.url && (
              <div
                key={`images-image-${id}`}
                className="mx-auto max-w-2xl space-y-2"
              >
                <button
                  className="cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                  onClick={() => openModal(image, imageText)}
                  aria-label={`View larger version of ${imageText || 'image'}`}
                >
                  <StrapiImg
                    {...image}
                    className="rounded-md object-cover"
                    alt={imageText}
                  />
                </button>
                {imageText && (
                  <p className="text-sm text-secondary">{imageText}</p>
                )}
              </div>
            )
        )}
      </div>
      
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        image={selectedImage?.image!}
        imageText={selectedImage?.imageText}
      />
    </>
  );
};

export default Images;
