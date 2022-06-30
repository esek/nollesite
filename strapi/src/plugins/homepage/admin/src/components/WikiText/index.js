import { Box } from '@strapi/design-system/Box';
import { Loader } from '@strapi/design-system/Loader';
import { request } from '@strapi/helper-plugin';
import React, { useEffect, useState } from 'react';

const IFrame = () => {
  const [wikiData, setWikiData] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    const data = await request('/homepage/iframe');
    setWikiData(data);
    setIsLoaded(true);
  }, []);

  return (
    <Box padding={8} background="neutral0" width="60%">
      {isLoaded ? (
        <div
          className="wiki-text"
          dangerouslySetInnerHTML={{ __html: wikiData.body }}
        ></div>
      ) : (
        <Loader>Loading data...</Loader>
      )}
    </Box>
  );
};

export default IFrame;
