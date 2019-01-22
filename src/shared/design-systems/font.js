import { breakpoints } from "./breakpoints";

// Font Family
// export const font_family = `'${
//   font_name.graphik
// }',system-ui, sans-serif !important`;
const activeFont = "graphik";
export const font_options = {
  graphik: {
    font_family: "Graphik, system-ui, sans-serif !important",
    font_weight: {
      regular: 400,
      medium: 500,
      bold: 600
    }
  },
  "system-ui": {
    font_family:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Helvetica, Arial,sans-serif, Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol !important",
    font_weight: {
      regular: 400,
      medium: 600,
      bold: 700
    }
  },
  atlas: {
    font_family: "AtlasGrotesk, system-ui, sans-serif !important",
    font_weight: {
      regular: 300,
      medium: 400,
      bold: 600
    }
  }
};

export const font_weight = font_options[activeFont].font_weight;
export const font_family = font_options[activeFont].font_family;
// Line Heights
export const line_height = {
  xxxl: "60px",
  xxl: "48px",
  xl: "40px",
  l: "32px",
  m: "28px",
  default: "24px",
  s: "20px;",
  xs: "16px;"
};

// Font Sizes
export const font_size = {
  xxxxl: "44px",
  xxxl: "36px",
  xxl: "30px",
  xl: "25px",
  l: "21px",
  m: "17px",
  default: "15px",
  s: "13px",
  xs: "11px"
};

export const font = {
  hero_heading: `
    font-size: ${font_size.xxxxl};
    line-height: 1.3;
    font-weight: ${font_weight.medium};

    @media(max-width: ${breakpoints.tablet}){
      font-size: ${font_size.xxxl};
    }
    `,
  big_heading: `
    font-size: ${font_size.xxxl};
    line-height: 1.3;
    font-weight: ${font_weight.medium};

    @media(max-width: ${breakpoints.tablet}){
      font-size: ${font_size.xl};
    }
    `,
  medium_heading: `
    font-size: ${font_size.xxl};
    line-height: 1.3;
    font-weight: ${font_weight.medium};

    @media(max-width: ${breakpoints.tablet}){
      font-size: ${font_size.l};
    }
    `,
  regular_heading: `
    font-size: ${font_size.xl};
    line-height: 1.3;
    font-weight: ${font_weight.medium};

    @media(max-width: ${breakpoints.tablet}){
      font-size: ${font_size.l};
    }
  `,
  small_heading: `
    font-size: ${font_size.l};
    line-height: 1.3;
    font-weight: ${font_weight.medium};

    @media(max-width: ${breakpoints.tablet}){
      font-size: ${font_size.m};
    }
  `,
  big_body: `
    font-size: ${font_size.m};
    line-height: 1.5;
    font-weight: ${font_weight.regular};
  `,
  regular_body: `
    font-size: ${font_size.default};
    line-height: 1.5;
    font-weight: ${font_weight.regular};
    `,
  small_body: `
    font-size: ${font_size.s};
    line-height: 1.5;
    font-weight: ${font_weight.regular};
  `,
  tiny_body: `
    font-size: ${font_size.xs};
    line-height: 1.5;
    font-weight: ${font_weight.regular};
  `
};
