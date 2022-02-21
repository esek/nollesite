module.exports = ({ env }) => ({
  url: '/dashboard',
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9f1c6109a159dca881e139dc6edf1393'),
  },
});
