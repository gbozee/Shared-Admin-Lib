/** @jsx jsx */
import { jsx, css } from "@emotion/core";
export const IconFunc = icon => ({ name, color, size, className }) => {
  let selectedIcon = icon[name];
  return (
    <svg
      className={`Icon ${className}`}
      width={size}
      height={size}
      css={theme => {
        let DColor = color || theme.colors.app_color.primary.primary;
        return css`
          color: ${DColor};
        `;
      }}
      viewBox={selectedIcon.viewBox}
      style={{ flexShrink: 0 }}
    >
      {selectedIcon.path}
    </svg>
  );
};
