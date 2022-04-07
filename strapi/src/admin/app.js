import favicon from './extensions/favicon.ico';
import logo from './extensions/logo.svg';

export default {
  config: {
    auth: {
      logo,
    },
    head: {
      favicon,
    },
    menu: {
      logo,
    },
    tutorials: false,
    notifications: { release: false },
    locales: ['sv'],
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Nollesite Admin',
        'app.components.LeftMenu.navbrand.workplace': 'E-Sektionen inom TLTH',
        'Auth.form.welcome.title': 'Nollesite Admin',
        'Auth.form.welcome.subtitle': 'E-Sektionen inom TLTH',
      },
      sv: {
        'app.components.LeftMenu.navbrand.title': 'Nollesite Admin',
        'app.components.LeftMenu.navbrand.workplace': 'E-Sektionen inom TLTH',
        'Auth.form.welcome.title': 'Nollesite Admin',
        'Auth.form.welcome.subtitle': 'E-Sektionen inom TLTH',
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
