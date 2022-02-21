import { useRouter } from 'next/router';
import React from 'react';
import EnFlag from '../../icons/en';
import SvFlag from '../../icons/sv';

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

const LanguageSelector: React.FC = ({}) => {
  const { locale, push, pathname, asPath, query } = useRouter();

  const changeLocale = (l: string) => {
    push({ pathname, query }, asPath, { locale: l });
  };

  return (
    <div className="group flex justify-center gap-2 rounded-full border border-white/40 px-3 py-2">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => changeLocale(l.code)}
          className={`aspect-square h-8 rounded-full ${
            l.code === locale ? 'bg-white/30' : ''
          }`}
          aria-label={l.name}
        >
          <l.component />
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
