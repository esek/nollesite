import React from 'react';
import { Content } from '../../models/content';

const Images: React.FC<Content<'content.images'>> = ({ images }) => {
  console.log(images);
  return (
    <div>
      {images.map(
        ({ id, image, imageText }) =>
          image.url && (
            <div key={`images-image-${id}`} className="relative max-h-80">
              <img
                src={image.url}
                className="h-full"
                alt={image.alternativeText}
              />
            </div>
          )
      )}
    </div>
  );
};

export default Images;
