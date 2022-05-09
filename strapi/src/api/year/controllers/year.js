'use strict';

/**
 *  year controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// when we fetch images, only the url and alt-text are important
const imagePopulate = ['url', 'alternativeText'];
const groupPopulate = ['name', 'number', 'link'];

module.exports = createCoreController('api::year.year', ({ strapi }) => ({
  /**
   * OK SO THIS DOES A LOT!
   * it gets the year, path and locale and makes a ton of ugly strapi calls
   * to fetch the navlinks, the current page as well as the global year data
   */
  async findOne(ctx) {
    const { locale = 'sv', password = '' } = ctx.query;
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
        content: {
          populate: {
            images: {
              populate: {
                image: {
                  select: imagePopulate,
                },
              },
            },
            sponsors: {
              populate: {
                image: {
                  select: imagePopulate,
                },
              },
            },
            phoset: {
              populate: {
                image: {
                  select: imagePopulate,
                },
              },
            },
            missions: true,
            standings: {
              populate: {
                group: {
                  select: groupPopulate,
                  populate: {
                    image: {
                      select: imagePopulate,
                    },
                  },
                },
              },
            },
            groups: {
              select: groupPopulate,
              populate: {
                image: {
                  select: imagePopulate,
                },
              },
            },
            file: {
              select: imagePopulate,
            },
          },
        },
      },
    });

    if (!entry) {
      return {};
    }

    const { primaryColor, secondaryColor, accentColor, ...reduced } = entry;

    return {
      ...reduced,
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
      },
    };
  },
}));
