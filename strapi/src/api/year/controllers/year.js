'use strict';

/**
 *  year controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// when we fetch images, only the url and alt-text are important
const imagePopulate = ['url', 'alternativeText'];

module.exports = createCoreController('api::year.year', ({ strapi }) => ({
  /**
   * OK SO THIS DOES A LOT!
   * it gets the year, path and locale and makes a ton of ugly strapi calls
   * to fetch the navlinks, the current page as well as the global year data
   */
  async findOne(ctx) {
    const { locale = 'sv', path = '/', password = '' } = ctx.query;
    const { id } = ctx.params;

    const where = [
      {
        $or: [
          {
            password: {
              $eq: password,
            },
          },
          {
            password: {
              $eq: '',
            },
          },
          {
            password: {
              $null: true,
            },
          },
        ],
      },
      {
        year: {
          $eq: id,
        },
      },
      {
        locale: {
          $eq: locale,
        },
      },
    ];

    // if (password) {
    //   where.push({
    //     password: {
    //       $eq: password,
    //     },
    //   });
    // } else {
    //   where.push({
    //     $or: [
    //       {
    //         password: {
    //           $eq: ,
    //         },
    //       },
    //       {
    //         password: {
    //           $null: true,
    //         },
    //       },
    //     ],
    //   });
    // }

    // Fetch the year based on the query param
    const entry = await strapi.db.query('api::year.year').findOne({
      where: {
        $and: where,
      },
      // by default no objects are populated by strapi so this needs to be done manually
      populate: {
        logo: {
          select: imagePopulate,
        },
        sponsors: {
          populate: {
            image: {
              select: imagePopulate,
            },
          },
        },
        pages: {
          populate: {
            pages: {
              select: ['path', 'title', 'id'],
            },
          },
        },
      },
    });

    if (!entry) {
      return {};
    }

    // map the navlinks to a better format (and remove any broken links)
    const navLinks = entry.pages
      .filter((p) => p.pages)
      .map((p) => ({ relationId: p.id, ...p.pages }));

    // map the year to a nice to work object
    const year = {
      id: entry.id,
      year: entry.year,
      logo: entry.logo,
      sponsors: entry.sponsors,
      colors: {
        primary: entry.primaryColor,
        secondary: entry.secondaryColor,
        accent: entry.accentColor,
      },
    };

    const page = await strapi.db.query('api::page.page').findOne({
      populate: {
        content: {
          populate: {
            images: {
              populate: {
                image: {
                  select: imagePopulate,
                },
              },
            },
          },
        },
        nollekamp: {
          populate: {
            mission: true,
          },
        },
        phos: {
          populate: {
            image: {
              select: imagePopulate,
            },
          },
        },
      },
      where: {
        $and: [
          {
            // make sure it's a page from the current year
            id: {
              $in: navLinks.map((l) => l.id),
            },
          },
          {
            path: {
              $eq: path,
            },
          },
          {
            locale: {
              $eq: locale,
            },
          },
        ],
      },
    });

    return {
      page,
      year,
      navLinks,
    };
  },
}));
