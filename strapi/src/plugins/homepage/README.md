# 📚 Homepage plugin

This is a plugin that adds the documentation from DDG-wiki to the homepage.
It uses the same Wikiservice that was built for `ekorre` to fetch the text from the wiki.

## Usage with `patch-package`

Due to the limitations of `strapi@4`, at the moment of writing this, there was no built in way to update the landing page.
Therefore, `patch-package` was used to add an `<InjectionZone>` to the homepage in the `node_modules`. This could then be utilized to add more information to the page.

We are hiding the default Strapi page by setting and removing a css class on the body when the plugin mounts or unmounts.

## Required variables

- `WIKI_USERNAME`
- `WIKI_PASSWORD`
- `WIKI_URL` - Base URL of the wiki, e.g. `https://ddgwiki.esek.se`
