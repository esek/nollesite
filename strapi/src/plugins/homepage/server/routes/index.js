module.exports = [
  {
    method: 'GET',
    path: '/status',
    handler: 'homepage.status',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/iframe',
    handler: 'homepage.iframe',
    config: {
      policies: [],
    },
  },
];
