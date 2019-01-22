import React from "react";
import icons from "./iconPath";
import { text_color } from "../../design-systems/color";

const PlaceHolder = ({}) => <div />;

export class Icon extends React.Component {
  state = {
    icon: {}
  };
  componentDidMount() {
    icons[this.props.name].then(module => {
      this.setState({ icon: module.default });
    });
  }
  render() {
    const { color, size, className } = this.props;
    let selectedIcon = this.state.icon;
    return (
      <svg
        className={`Icon ${className}`}
        width={size}
        height={size}
        color={color}
        viewBox={selectedIcon.viewBox}
        style={{ flexShrink: 0 }}
      >
        {selectedIcon.path}
      </svg>
    );
  }
}

Icon.defaultProps = {
  name: "left-arrow",
  size: 16,
  color: `${text_color.primary}`,
  className: ""
};
export default Icon;
export const iconList = Object.keys(icons);
