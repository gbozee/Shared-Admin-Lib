/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import {
  brand_color,
  supported_color,
  base_color,
  app_color,
  border_color
} from "./design-system/color";
import GlobalStyle from "./design-system/global";
import { sizes } from "./design-system/sizes";
import { spacing } from "./design-system/spacing";
import { font_options, font } from "./design-system/fonts";
import {
  border_radius,
  border_thickness,
  focus_states
} from "./design-system/borders";

const defaultTheme = {
  fonts: {
    font_weight: font_options.graphik.font_weight,
    font_family: font_options.graphik.font_family,
    ...font
  },
  borders: {
    border_radius,
    border_thickness,
    focus_states
  },
  sizes,
  spacing,
  colors: {
    border_color,
    brand_color,
    supported_color,
    base_color,
    app_color
  }
};

export const Application = ({ theme = {}, children }) => {
  return (
    <ThemeProvider {...{ theme: { ...defaultTheme, ...theme } }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Application;
