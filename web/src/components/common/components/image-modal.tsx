import React, { useEffect } from 'react';
import StrapiImg from '../strapi/strapi-image';
import { StrapiFile } from '@/models/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: StrapiFile;
  imageText?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image, imageText }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-all"
          aria-label="Close modal"
        >
          x
        </button>
        
        {/* Image */}
        <StrapiImg
          {...image}
          className="max-h-[80vh] w-auto object-contain"
          alt={imageText || 'Enlarged image'}
          options={{ width: 1200, height: 800 }}
        />
        
        {/* Image text */}
        {imageText && (
          <div className="bg-white p-4">
            <p className="text-center text-gray-700">{imageText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;