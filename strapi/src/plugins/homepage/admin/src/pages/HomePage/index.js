/*
 *
 * HomePage
 *
 */

import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { auth } from '@strapi/helper-plugin';
import React, { memo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import WikiText from '../../components/WikiText';

import '../../styles/homepage.css';

const HomePage = () => {
  const user = auth.getUserInfo();
  const { formatMessage } = useIntl();

  useEffect(() => {
    const body = document.querySelector('body');
    const className = 'plugin-active--homepage';

    body.classList.add(className);

    return () => {
      body.classList.remove(className);
    };
  }, []);

  return (
    <Stack padding={10} spacing={4}>
      <Stack>
        <Typography variant="alpha">
          {formatMessage(
            {
              id: 'homepage.welcome-message',
              defaultMessage: 'Hello {name} 👋',
            },
            { name: user.firstname }
          )}
        </Typography>
        <Typography>
          {formatMessage({
            id: 'homepage.welcome-subtext',
          })}
        </Typography>
      </Stack>

      <WikiText />
    </Stack>
  );
};

export default memo(HomePage);
