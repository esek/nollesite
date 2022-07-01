import styled from 'styled-components';

export const WikiTextContainer = styled.div`
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.neutral700};

  > *:not(:first-child) {
    margin-top: 1em;
  }

  a {
    text-decoration: none;
    color: currentColor;
    pointer-events: none;
  }

  b {
    font-weight: 600;
  }

  i {
    font-style: italic;
  }

  h2 {
    font-weight: 700;
    font-size: 1.5em;
  }

  h3 {
    font-weight: 700;
    font-size: 1.25em;
  }

  h4 {
    font-weight: 700;
    font-size: 1.15em;
  }

  code,
  pre {
    font-family: monospace;
    padding: 0.15em 0.5em;
    background: ${({ theme }) => theme.colors.neutral100};
    border-radius: 0.25em;
    white-space: pre-wrap;
  }

  ul {
    list-style: disc;
    padding-left: 1em;
  }

  ul li {
    margin-bottom: 0.75em;
  }

  .mw-editsection {
    display: none;
  }

  table {
  }

  tr {
    border-top: 1px solid #ddd;
  }

  tr:first-child {
    border-top: none;
  }

  th {
    text-align: left;
    font-weight: 600;
    padding: 0.5em;
  }

  td {
    padding: 0.25em 0.5em;
  }

  > h2:last-of-type,
  > ul:last-of-type {
    display: none;
  }
`;
