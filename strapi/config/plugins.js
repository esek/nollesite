module.exports = ({ env }) => ({
  // enable the custom previewer plugin
  previewer: {
    enabled: true,
    resolve: './src/plugins/previewer',
  },
  // setup nodemailer to send emails
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.google.com'),
        port: env('SMTP_PORT', 465),
        secure: true,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: 'E-Sektionen <no-reply@esek.se>',
        defaultReplyTo: 'macapar+strapi@esek.se',
      },
    },
  },
  // add the placeholder plugin, which will generate base64 placeholder images
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
});
