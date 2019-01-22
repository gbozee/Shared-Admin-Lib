/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import { color } from "../design-systems/color";
import { Icon } from "../primitives/Icon";
import { border_radius } from "../design-systems/border";
import { font_weight, font_family, font } from "../design-systems/font";

function generateBgColor(props) {
  switch (props.appearance) {
    case "gray":
      return css`
        background-color: ${color.gray.ui_02};
        color: ${color.gray.primary};

        &:hover,
        &:focus {
          background-color: ${color.gray.ui_01};
        }
      `;
    case "blue":
      return css`
        background-color: rgb(76, 154, 255);
        color: rgb(23, 43, 77);
      `;
    case "green":
      return css`
        background-color: rgb(87, 217, 163);
        color: rgb(23, 43, 77);
      `;
    case "cyan":
      return css`
        background-color: ${color.cyan.primary};

        .Icon,
        span {
          color: white !important;
        }

        &:hover,
        &:focus {
          background-color: ${color.cyan.dark};
        }
      `;
    case "lightCyan":
      return css`
        background-color: ${color.cyan.ui_01};
        color: ${color.gray.primary};

        &:hover,
        &:focus {
          background-color: ${color.cyan.faint};
        }
      `;
    case "orange":
      return css`
        background-color: rgb(255, 196, 0);
        color: ${color.gray.primary};
      `;

    default:
      break;
  }
}

const StyledTag = styled.div`
  display: inline-flex;
  align-items: center;
  font-family: ${font_family};
  min-height: 32px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  vertical-align: top;
  margin: 4px;
  outline: 0;
  overflow: hidden;
  cursor: pointer;
  padding: 0 12px;

  ${props => generateBgColor(props)};

  border-radius: ${props =>
    props.isRounded ? border_radius.round : border_radius.default};

  .Tag {
    &__Text {
      font-size: 14px;
      font-weight: ${font_weight.regular};
    }

    &__Addon {
      background: none;
      appearance: none;
      outline: 0;
      padding: 0;
      border: none;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;

      &--after {
        height: 18px;
        width: 18px;
        margin-left: 4px;
      }

      &--before {
        height: 24px;
        width: 24px;
        margin-left: -4px;
        margin-right: 4px;
      }
    }
  }
`;

export class Tag extends React.Component {
  onAdd = () => {
    this.props.onAdd(this.props.text);
  };

  onRemove = () => {
    this.props.onRemove(this.props.text);
  };

  action = () => {
    const { isAddable, isRemovable } = this.props;
    if (isAddable) {
      this.onAdd();
    } else if (isRemovable) {
      return;
    } else {
      return;
    }
  };

  render() {
    const {
      text,
      gray,
      appearance,
      isRemovable,
      className,
      isAddable,
      isRounded
    } = this.props;

    return (
      <StyledTag
        {...{
          text,
          gray,
          isRemovable,
          appearance,
          isAddable,
          isRounded,
          className: `Tag ${className}`
        }}
        className="Tag"
        tabIndex="0"
        onClick={this.action}
      >
        {isAddable && (
          <button
            type="button"
            tabIndex="-1"
            aria-label={`Add ${text}`}
            className="Tag__Addon Tag__Addon--before"
            onClick={this.onAdd}
          >
            <Icon name="add" size={14} />
          </button>
        )}

        <span className="Tag__Text">{text}</span>
        {isRemovable && (
          <button
            type="button"
            tabIndex="-1"
            aria-label={`Remove ${text}`}
            className="Tag__Addon Tag__Addon--after"
            onClick={this.onRemove}
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </StyledTag>
    );
  }
}

Tag.defaultProps = {
  isRounded: true,
  appearance: "cyan",
  text: "Tag Text",
  isRemovable: false,
  isAddable: false,
  onAdd: () => {},
  onRemove: () => {}
};

var _ENTER = 13;
var _COMMA = 188;
var _BACKSPACE = 8;

const TagInput = styled.div`
  border: 0;
  font-family: ${font_family};
  ${font.small_body};
  display: inline-block;
  min-width: 100px;
  flex: 1 1 auto;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: #fff;
  color: #484848;
  outline: 0;
  padding: 0 12px;

  &:empty:before {
    content: attr(placeholder);
    color: ${color.gray.faint};
  }
`;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const TagGroup = props => (
  <div
    className="TagsInput"
    css={css`
      display: inline-flex;
      align-items: center;
      flex-flow: wrap;
    `}
    {...props}
  />
);
export class TagsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }

  onKeyDown = e => {
    var key = e.keyCode;

    if (key === _COMMA || key === _ENTER) {
      if (validateEmail(e.target.innerHTML)) {
        this.addTag(e.target.innerHTML);
        e.preventDefault();
        e.target.innerHTML = "";
      }
    }

    if (
      key === _BACKSPACE &&
      Boolean(e.target.innerHTML) === false &&
      this.state.tags.length > 0
    ) {
      this.removeTag();
    }
  };

  addTag = tag => {
    this.setState({ tags: [...this.state.tags, tag] }, () => {
      this.props.onChange(this.state.tags);
    });
  };

  handlePaste = e => {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  removeTag = tagText => {
    if (tagText) {
      this.setState(
        {
          tags: [...this.state.tags.filter(tag => tag !== tagText)]
        },
        () => {
          this.props.onChange(this.state.tags);
        }
      );
    } else {
      this.setState(
        {
          tag: [...this.state.tags.pop()]
        },
        () => {
          this.props.onChange(this.state.tags);
        }
      );
    }
  };

  render() {
    const { tags } = this.state;
    const { placeholder } = this.props;
    return (
      <TagGroup>
        {tags.map((tag, index) => {
          return (
            <Tag
              key={`${tag}-${index}`}
              appearance="gray"
              isRemovable
              small
              onRemove={this.removeTag}
              text={tag}
              isRounded={false}
            />
          );
        })}
        <TagInput
          contentEditable
          suppressContentEditableWarning
          onKeyDown={this.onKeyDown}
          onPaste={this.handlePaste}
          placeholder={tags.length > 0 ? "" : placeholder}
        />
      </TagGroup>
    );
  }
}

TagsInput.defaultProps = {
  onChange: emails => console.log(emails)
};

export default TagsInput;
