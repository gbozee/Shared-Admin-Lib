/** @jsx jsx */
import { css, jsx } from "@emotion/core";
export const Dropdown = ({ value, options = [], onChange, ...rest }) => {
  return (
    <select
      {...rest}
      value={value}
      onChange={e => {
        e.preventDefault();
        onChange(e.target.value, e.target);
      }}
      css={css`
        width: 100%;
      `}
      onClick={e => {
        e.preventDefault();
      }}
    >
      {options.map(option => {
        let result = Array.isArray(option) ? option : [option, option];
        return (
          <option key={result[0]} value={result[0]}>
            {result[1]}
          </option>
        );
      })}
    </select>
  );
};
