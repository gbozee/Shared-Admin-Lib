import { base_color } from "./color";

export const border_thickness = "2px";

export const border_radius = {
  s: "2px",
  default: "4px",
  m: "8px",
  l: "16px",
  xl: "16px",
  round: "50px",
  addonBefore: "4px 0 0 4px",
  addonAfter: "0 4px 4px 0"
};

export const focus_states = {
  link: `
    &:focus {
      outline: 0;
      border-radius: 4px;
      box-shadow: 0 0 0 4px ${base_color.primary.focus};
    }
  `,
  modal_close_button: `
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 4px ${base_color.primary.focus};
    }
  `,
  button: `
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 4px ${base_color.primary.focus};
    }
  `
};
