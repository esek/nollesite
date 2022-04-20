const emailTemplate = `<p>Hejsan lille <%= user.firstname %>!</p>
<p>Har du glömt ditt lille lösenord?</p>
<p>Have no fear, InfU is here!</p>

<p>Klicka på länken nedan så kommer allt lösa sig!</p>
<p><a href="<%= url %>"><%= url %></a></p>

<p>Puss i ljumsken ❤️</p>`;

module.exports = ({ env }) => ({
  url: '/dashboard',
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9f1c6109a159dca881e139dc6edf1393'),
  },
  forgotPassword: {
    from: 'no-reply@esek.se',
    replyTo: 'macapar+strapi@esek.se',
    emailTemplate: {
      subject: 'Glömt ditt lösenord?',
      text: emailTemplate,
      html: emailTemplate,
    },
  },
});
