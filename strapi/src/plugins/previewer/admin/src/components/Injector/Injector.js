import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import React from 'react';
import Button from '../Button';

const Injector = () => {
  const { modifiedData, isCreatingEntry, slug } = useCMEditViewDataManager();

  const [url, setUrl] = React.useState('');

  const { year, password } = modifiedData;

  React.useEffect(() => {
    setUrl(`https://${year}.nollning.esek.se/?password=${password}`);
  }, [modifiedData]);

  if (isCreatingEntry || slug !== 'api::year.year') {
    return null;
  }

  return (
    <div>
      <Button url={url} />
    </div>
  );
};

export default Injector;
