module.exports = {
  previewer: {
    enabled: true,
    resolve: './src/plugins/previewer',
  },
  email: {
    config: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'no-reply@esek.se',
        defaultReplyTo: 'macapar+strapi@esek.se',
      },
    },
  },
};
