// Spacing

const _spacing = {
    xxxs: "4px",
    xxs: "8px",
    xs: "12px",
    s: "16px",
    default: "24px",
    m: "32px",
    l: "48px",
    xl: "64px",
    xxl: "72px",
    xxxl: "88px"
  };
  
  export const spacing = {
    ..._spacing,
  
    button: {
      small: {
        default: "0 16px",
        left_icon: "0 16px 0 28px",
        right_icon: "0 28px 0 16px"
      },
      regular: {
        default: "0 24px",
        left_icon: "0 24px 0 40px",
        right_icon: "0 40px 0 24px"
      },
      big: {
        default: "0 32px",
        left_icon: "0 24px 0 44px",
        right_icon: "0 44px 0 24px"
      },
      hero: {
        default: "0 32px",
        left_icon: "0 32px 0 48px",
        right_icon: "0 48px 0 32px"
      }
    },
  
    form: {
      big: {
        normal: "0 16px",
        left_icon: "0 16px 0 40px",
        right_icon: "0 40px 0 16px",
        left_and_right_icon: "0 40px 0 40px"
      },
      regular: {
        normal: "0 16px",
        left_icon: "0 16px 0 40px",
        right_icon: "0 40px 0 16px",
        left_and_right_icon: "0 40px 0 40px"
      },
      small: {
        normal: "0 12px",
        left_icon: "0 16px 0 32px",
        right_icon: "0 32px 0 16px",
        left_and_right_icon: "0 32px 0 32px"
      }
    }
  };
  
  export const FORM_SPACING = "32px";
  