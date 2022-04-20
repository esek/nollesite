module.exports = {
  previewer: {
    enabled: true,
    resolve: './src/plugins/previewer',
  },
  email: {
    config: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'noreply@esek.se',
        defaultReplyTo: 'macapar+strapi@esek.se',
      },
    },
  },
};
