'use strict';

/**
 * `redirect-to-admin` middleware.
 */

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.path != '/') {
      await next();
      return;
    }

    ctx.response.status = 301;
    ctx.set({
      Location: '/dashboard',
    });
  };
};
