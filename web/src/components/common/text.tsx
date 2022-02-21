import React from 'react';
import { Content } from '../../models/content';

const Text: React.FC<Content<'content.text'>> = ({ header, body }) => {
  return (
    <div className="strapi-wysiwyg space-y-4 text-white">
      {header && (
        <h2 className={`text-header text-header text-2xl font-bold`}>
          {header}
        </h2>
      )}
      {body && <div dangerouslySetInnerHTML={{ __html: body }}></div>}
    </div>
  );
};

export default Text;
