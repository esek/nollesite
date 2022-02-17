import { gql } from '@apollo/client';

export const PAGES_FOR_NAVBAR_QUERY = gql`
  query getYearsByYear($year: String!) {
    years(filters: { year: { eq: $year } }) {
      data {
        attributes {
          pages {
            pages {
              data {
                id
                attributes {
                  path
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;
