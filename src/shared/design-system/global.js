/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
let basePath = '/static/fonts/';

// Inject the @font-face and reset text globally
const GlobalStyle = ({
  fontPath,
  font_family,
  text_color,
  selection_color,
  ...props
}) => {
  return (
    <Global
      styles={theme => css`
  @font-face {
    font-family: AtlasGrotesk;
    font-display: swap;
    src: url("${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Medium.woff") format("woff"),
    url('${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Medium.woff2') format('woff2'),
    url("${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Medium.ttf") format("truetype");
    font-weight: 300;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }

   @font-face {
    font-family: AtlasGrotesk;
    font-display: swap;
    src: url("${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Bold.woff") format("woff"),
    url("${fontPath || basePath}atlas/AtlasGrotesk-Web-Bold.eot") format("eot"),
    url("${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Bold.ttf") format("truetype"),
    url('${fontPath || basePath}atlas/AtlasGrotesk-Web-Bold.svg') format('svg');
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: AtlasGrotesk;
    font-display: swap;
    src: url("${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Regular.woff") format("woff"),
    url("${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Regular.eot") format("eot"),
    url("${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Regular.ttf") format("truetype"),
    url('${fontPath ||
      basePath}atlas/AtlasGrotesk-Web-Regular.svg') format('svg');
    font-weight: 600;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }


   @font-face {
    font-family: Graphik;
    font-display: swap;
    src: url("${fontPath ||
      basePath}graphik/Graphik-Semibold.woff") format("woff"),
    url("${fontPath || basePath}graphik/Graphik-Semibold.eot") format("eot"),
    url("${fontPath ||
      basePath}graphik/Graphik-Semibold.ttf") format("truetype"),
    url('${fontPath || basePath}graphik/Graphik-Semibold.svg') format('svg');
    font-weight: 600;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }
  
   @font-face {
    font-family: Graphik;
    font-display: swap;
    src: url("${fontPath ||
      basePath}graphik/Graphik-Medium.woff") format("woff"),
    url('${fontPath || basePath}graphik/Graphik-Medium.woff2') format('woff2'),
    url("${fontPath || basePath}graphik/Graphik-Medium.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: Graphik;
    font-display: swap;
    src: url("${fontPath ||
      basePath}graphik/Graphik-Regular.woff") format("woff"),
    url("${fontPath || basePath}graphik/Graphik-Regular.eot") format("eot"),
    url("${props =>
      fontPath || basePath}graphik/Graphik-Regular.ttf") format("truetype"),
    url('${props =>
      fontPath || basePath}graphik/Graphik-Regular.svg') format('svg');
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: Graphik;
    font-display: swap;
    src: url("${fontPath || basePath}graphik/Graphik-Bold.woff") format("woff"),
    url("${fontPath || basePath}graphik/Graphik-Bold.eot") format("eot"),
    url("${fontPath || basePath}graphik/Graphik-Bold.ttf") format("truetype"),
    url('${fontPath || basePath}graphik/Graphik-Bold.svg') format('svg');
    font-weight: 800;
    font-style: normal;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: "Inter";
    src: url("${fontPath || basePath}Inter/Inter-Regular.woff") format("woff"),
    url("${fontPath || basePath}Inter/Inter-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: "Inter";
    src: url("${fontPath || basePath}Inter/Inter-Medium.woff") format("woff"),
    url("${fontPath || basePath}Inter/Inter-Medium.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
    text-rendering: optimizeLegibility;
  }


  @font-face {
    font-family: "Inter";
    src: url("${fontPath || basePath}Inter/Inter-SemiBold.woff") format("woff"),
    url("${fontPath || basePath}Inter/Inter-SemiBold.ttf") format("truetype");
    font-weight: 600;
    font-style: normal;
    font-display: fallback;
    text-rendering: optimizeLegibility;
}


  @font-face {
    font-family: "Inter";
    src: url("${fontPath || basePath}Inter/Inter-Bold.woff") format("woff"),
    url("${fontPath || basePath}Inter/Inter-Bold.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
    text-rendering: optimizeLegibility;
}

  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body{
    margin: 0;
    font-family: ${theme.fonts.font_family};
    color: ${theme.colors.app_color.default.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizelegibility;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ::selection{
    background: ${theme.colors.app_color.subtleCyan.dark};  
  }



  html, body, p, div, h1, h2, h3, h4, h5, h6, ul, ol, dl, img, pre, form, fieldset, blockquote{
    margin: 0;
    padding: 0;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

`}
    />
  );
};

export const formStyle = `label {
  padding-bottom: 4px;
  font-size: 14px;
}
input[type='text'],
input[type='email'],
input[type='date'],
input[type='number'],
input[type='tel'] {
  padding: 0 12px;
  height: 30px;
}
select {
  padding: 0 12px;
  height: 35px;
}`;

export default GlobalStyle;
