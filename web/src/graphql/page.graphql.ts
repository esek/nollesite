import { gql } from '@apollo/client';

export const PAGE_QUERY = gql`
  query getPage($id: ID!, $locale: I18NLocaleCode) {
    page(id: $id, locale: $locale) {
      data {
        attributes {
          title
          description
          updatedAt
          logo {
            data {
              attributes {
                url
              }
            }
          }
          section {
            header
            body
          }
          nollekamp {
            section {
              header
              body
            }
            mission {
              name
              points
            }
          }
          phos {
            name
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
