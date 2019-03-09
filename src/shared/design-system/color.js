export const brand_color = {
  whatsapp: {
    dark: "#30A020",
    primary: "#34af23",
    light: "#4cba3c",
    faint: "#A8D5D0"
  },
  facebook: {
    dark: "#31497D",
    primary: "#3b5998",
    light: "#4C68A1",
    faint: "#B7C2DA"
  },
  linkedin: {
    dark: "#006295",
    primary: "#0077b5",
    light: "#1783BB",
    faint: "#A2CDE4"
  },
  messenger: {
    dark: "#006DD1",
    primary: "#0084FF",
    light: "#2E9AFF",
    faint: "#A2D2FF"
  },
  behance: {
    dark: "#003ecb",
    primary: "#0057ff",
    light: "#2E75FF",
    faint: "#8BB2FF"
  },
  github: {
    primary: "#24292e",
    dark: "#1E2226",
    light: "#4B4F54",
    faint: "#AFB1B3"
  },
  twitter: {
    primary: "#38A1F3",
    dark: "#3393DD",
    light: "#80C3F7",
    faint: "#9bcdf3"
  }
};

export const supported_color = {
  gray: {
    dark: "#273444",
    primary: "#273444",
    light: "#495566",
    faint: "#7B8899",
    ui_01: "#CFD3D9",
    ui_02: "#EBECF0",
    ui_03: "#F4F5F7"
  },
  cyan: {
    dark: "#00A5C5",
    primary: "#00B5D8",
    light: "#2EC2DF",
    faint: "#8DDDED",
    ui_01: "#CCEBF3",
    ui_02: "#E7F8FB",
    ui_03: "#F0F9FB"
  },
  red: {
    dark: "#E85257",
    primary: "#FF5A5F",
    light: "#FF787C",
    faint: "#FF9699",
    ui_01: "#ffcccc",
    ui_02: "#FFEBE6"
  },
  orange: {
    dark: "#F7B422",
    primary: "#FFC145",
    light: "#FFD788",
    faint: "#FFE3A0",
    ui_01: "#FFF0B3",
    ui_02: "#FFFAE6"
  },
  green: {
    dark: "#32A373",
    primary: "#36B37E",
    light: "#5AC095",
    faint: "#79F2C0",
    ui_01: "#ABF5D1",
    ui_02: "#E3FCEF"
  },
  blue: {
    dark: "#0065FF",
    primary: "#26A1FF",
    light: "#87C5FF",
    faint: "#B3D4FF",
    ui_01: "#DEEBFF",
    ui_02: "#EAF2FE"
  }
};
export const app_color = {
  default: supported_color.gray,
  primary: supported_color.cyan,
  secondary: supported_color.red,
  outlines: {
    primary: supported_color.gray.primary,
    faint: supported_color.gray.faint,
    dark: supported_color.gray.ui_01,
    bright: supported_color.gray.ui_02
  },
  subtleCyan: {
    primary: "transparent",
    light: supported_color.cyan.ui_02,
    dark: supported_color.cyan.ui_01,
    faint: supported_color.cyan.ui_03
  },
  subtleGray: {
    primary: "transparent",
    light: supported_color.gray.ui_02,
    dark: supported_color.gray.ui_01,
    faint: supported_color.gray.ui_03
  }
};

export const border_color = {
  normal: supported_color.gray.ui_02,
  active: supported_color.cyan.primary,
  hover: supported_color.gray.ui_01,
  error: supported_color.red.primary
};
export const base_color = {
  white: "#FFFFFF",
  primary: {
    default: supported_color.gray.primary,
    faint: supported_color.gray.faint,
    focus: supported_color.cyan.faint
  },
  error: supported_color.red,
  addon: "#FAFAFA"
};
