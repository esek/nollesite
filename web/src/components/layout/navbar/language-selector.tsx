import { useRouter } from 'next/router';
import React from 'react';
import EnFlag from '../../icons/en';
import SvFlag from '../../icons/sv';

type Props = {
  onClick: () => void;
};

const locales = [
  {
    code: 'sv',
    component: SvFlag,
    name: 'Swedish',
  },
  {
    code: 'en',
    component: EnFlag,
    name: 'English',
  },
];

const LanguageSelector: React.FC<Props> = ({ onClick }) => {
  const { locale, push, pathname, asPath } = useRouter();

  const changeLocale = (l: string) => {
    onClick();
    push({ pathname: pathname }, asPath, { locale: l });
  };

  return (
    <div className="group flex justify-center gap-2 px-3 py-2">
      {locales.map((l) => {
        if (l.code === locale) {
          return null;
        }

        return (
          <button
            key={l.code}
            onClick={() => changeLocale(l.code)}
            className="aspect-square h-8 rounded-full"
            aria-label={l.name}
          >
            <l.component />
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
