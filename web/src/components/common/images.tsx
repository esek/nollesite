import React from 'react';
import { Content } from '../../models/content';

const Images: React.FC<Content<'content.images'>> = ({ images }) => {
  return (
    <div className="grid justify-center gap-4 md:grid-flow-col">
      {images.map(
        ({ id, image, imageText }) =>
          image.url && (
            <div
              key={`images-image-${id}`}
              className="relative aspect-square max-h-80 overflow-hidden rounded-md"
            >
              <img
                src={image.url}
                className="h-full w-full"
                alt={image.alternativeText}
              />
              {imageText && <p className="text-accent">{imageText}</p>}
            </div>
          )
      )}
    </div>
  );
};

export default Images;
