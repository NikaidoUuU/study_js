import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import palette from 'lib/styles/palette';

const globalStyles = createGlobalStyle`
  ${reset};
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  #root {
    min-height: 100%;
  }
  body {
    min-height: 100%;
    background-color: ${palette.gray[2]};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  html {
    height: 100%;
  }
`;

export default globalStyles;
