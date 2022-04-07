import { Button as StrapiButton } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';
import React from 'react';
import { useIntl } from 'react-intl';

const Button = ({ url }) => {
  const { formatMessage } = useIntl();

  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <StrapiButton
      size="S"
      startIcon={<ExternalLink />}
      variant="secondary"
      style={{ width: '100%' }}
      onClick={handleClick}
    >
      {formatMessage({ id: 'previewer.preview', defaultMessage: 'Preview' })}
    </StrapiButton>
  );
};

export default Button;
