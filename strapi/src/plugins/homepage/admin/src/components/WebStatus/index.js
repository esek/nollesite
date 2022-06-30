import { Box } from '@strapi/design-system/Box';
import { Loader } from '@strapi/design-system/Loader';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { request } from '@strapi/helper-plugin';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const WebStatus = () => {
  const [status, setStatus] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { formatMessage } = useIntl();

  useEffect(async () => {
    try {
      const response = await request('/homepage/status');
      setStatus({
        isAlive: true,
        message: response.message,
      });
    } catch (e) {
      setStatus({
        isAlive: false,
        message: e.message,
      });
    }
    setIsLoaded(true);
  }, []);

  return (
    <Box padding={4} background="neutral0" width="fit-content">
      {!isLoaded ? (
        <Loader>Loading status...</Loader>
      ) : (
        <Stack>
          <Typography variant="beta">
            {formatMessage({
              id: 'homepage.status.web.title',
              defaultMessage: 'Web status',
            })}
          </Typography>

          <Box>
            <Typography>{status.message}</Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default WebStatus;
