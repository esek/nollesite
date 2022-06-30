'use strict';

const EWiki = require('../helpers/e-wiki');

module.exports = ({ strapi }) => ({
  generateIframeData: async () => {
    const wikiUrl = strapi.config.get('server.wikiUrl');
    const wikiUsername = strapi.config.get('server.wikiUsername');
    const wikiPassword = strapi.config.get('server.wikiPassword');

    const wiki = new EWiki(wikiUrl, wikiUsername, wikiPassword);

    const iframeData = await wiki.getPageData('Nollningshemsidan');

    return {
      body: iframeData,
    };
  },
});
