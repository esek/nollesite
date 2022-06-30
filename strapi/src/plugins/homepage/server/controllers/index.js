'use strict';

const axios = require('axios');

module.exports = {
  homepage: {
    status: async (ctx) => {
      const url = strapi.config.get('server.webUrl');
      const response = await axios.get(`${url}/api/health`);

      return response.data;
    },
    iframe: async (ctx) => {
      const body = await strapi
        .plugin('homepage')
        .service('iframe')
        .generateIframeData();

      ctx.body = body;
    },
  },
};
