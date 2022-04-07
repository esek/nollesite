'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('previewer')
      .service('myService')
      .getWelcomeMessage();
  },
};
