export const font_options = {
  graphik: {
    font_family: "Graphik, system-ui, sans-serif !important",
    font_weight: {
      regular: 400,
      medium: 500,
      bold: 600,
      bolder: 800
    }
  },
  inter: {
    font_family:
      "Inter, -apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Helvetica, Arial,sans-serif, Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol !important",
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

export const font = {
  font: {
    heading: {
      hero: {
        fontSize: 44,
        lineHeight: 1.3,
        "@media (max-width: 743px)": {
          fontSize: 36
        }
      },
      big: {
        fontSize: 36,
        lineHeight: 1.3,
        "@media (max-width: 743px)": {
          fontSize: 30
        }
      },
      medium: {
        fontSize: 30,
        lineHeight: 1.3,
        "@media (max-width: 743px)": {
          fontSize: 25
        }
      },
      regular: {
        fontSize: 25,
        lineHeight: 1.3
      },
      small: {
        fontSize: 21,
        lineHeight: 1.3
      }
    },
    text: {
      big: {
        fontSize: 17,
        lineHeight: 1.6
      },
      regular: {
        fontSize: 15,
        lineHeight: 1.6
      },
      small: {
        fontSize: 13,
        lineHeight: 1.6
      },
      tiny: {
        fontSize: 11,
        lineHeight: 1.6
      }
    }
  },
  __typography: {
    fontFamily:
      "Graphik,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
    fontSizes: {
      xxxxl: 44,
      xxxl: 36,
      xxl: 30,
      xl: 25,
      l: 21,
      m: 17,
      base: 15,
      s: 13,
      xs: 11
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 600,
      bolder: 800
    },
    lineHeight: {
      tight: 0.8,
      base: 1,
      tall: 1.25,
      normal: 1.5
    },
    letterSpacing: {
      tight: -0.05,
      normal: 0,
      wide: 0.05
    }
  },
  size: {
    button: {
      hero: {
        size: 56,
        iconSize: 18,
        fontSize: 18,
        iconPos: 18
      },
      big: {
        size: 48,
        iconSize: 16,
        fontSize: 16,
        iconPos: 16
      },
      regular: {
        size: 40,
        iconSize: 16,
        fontSize: 15,
        iconPos: 14
      },
      small: {
        size: 32,
        iconSize: 12,
        fontSize: 13,
        iconPos: 8
      }
    },
    radio: {
      regular: {
        size: 16,
        dotSize: 8
      },
      big: {
        size: 24,
        dotSize: 12
      }
    }
  }
};
