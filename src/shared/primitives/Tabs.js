/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button as EButton, Text, Link } from "@rebass/emotion";
import React from "react";

export const TabContext = React.createContext({
  addHeading: () => {}
});
class TabHeaderAdder extends React.Component {
  static contextType = TabContext;
  componentDidMount() {
    this.context.addHeading(this.props.heading, this.props.index);
  }
  render() {
    return this.props.children;
  }
}
export class TabContent extends React.Component {
  state = {
    heading: this.props.heading
  };
  render() {
    let { children, active, index } = this.props;
    return (
      <TabHeaderAdder heading={this.state.heading} index={index}>
        <div className={active ? "" : "hide-content"}>{children}</div>
      </TabHeaderAdder>
    );
  }
}

export class Tabs extends React.Component {
  onAddHeading = (node, index) => {
    let { headings } = this.state;
    this.setState(
      { headings: { ...this.state.headings, [index]: node } },
      () => {
        if (Object.keys(this.nodes).length > 0) {
          if (Object.keys(this.state.headings) !== Object.keys(this.nodes)) {
            let newNodes = {};
            Object.keys(this.nodes).forEach(nn => {
              newNodes[nn] = this.nodes[nn].props.heading;
            });
            this.setState({ headings: newNodes });
          }
        }
      }
    );
  };
  state = {
    activeTab: this.props.activeTab || 0,
    headings: {},
    context: {
      addHeading: this.onAddHeading
    }
  };
  nodes = {};
  onChangeTab = index => {
    this.setState({ activeTab: index });
  };
  render() {
    return (
      <TabContext.Provider value={this.state.context}>
        <Flex
          flexDirection="column"
          css={css`
            flex-grow: 1;
            max-width: 100%;
            min-height: 0%;
            .hide-content {
              display: none;
            }
          `}
          className={`Tabs`}
        >
          <div className="TabListWrapper">
            <TabList
              tabs={Object.keys(this.state.headings).map(
                i => this.state.headings[i]
              )}
              activeTab={this.state.activeTab}
              onSelect={this.onChangeTab}
            />
            <Box role="tabpanel" className="TabPanel">
              {React.Children.map(this.props.children, (child, index) => {
                return React.cloneElement(child, {
                  index,
                  active: this.state.activeTab === index,
                  ref: node => (this.nodes[index] = node)
                });
              })}
            </Box>
          </div>
        </Flex>
      </TabContext.Provider>
    );
  }
}

const TabItem = ({
  onClick,
  children,
  isSelected,
  isFitted,
  spacing,
  className = ""
}) => (
  <li
    css={css`
      cursor: pointer;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 300;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
      flex: ${isFitted ? "1" : "initial"};
      text-align: center;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      padding: 0 ${spacing || "0"};

      &:hover {
        color: black;
        box-shadow: inset 0 -2px 0 0 gray;
      }

      &.TabItem--selected {
        color: black;

        box-shadow: inset 0 -2px 0 0 blue;
        :hover {
          color: black;
          box-shadow: inset 0 -2px 0 0 blue;
        }
      }

      &:focus {
        background-color: #ababd4;
        outline: 0;
      }
    `}
    aria-selected={isSelected ? "true" : "false"}
    role="tab"
    tabIndex="0"
    onClick={onClick}
    onKeyDown={e => {
      if (e.keyCode === 13) {
        onClick();
      }
    }}
    className={`TabItem ${isSelected ? `TabItem--selected` : ""} ${className}`}
  >
    {children}
  </li>
);
export const TabList = ({
  tabs,
  onSelect,
  activeTab,
  isFitted,
  spacing,
  height,
  SingleTabItem = TabItem,
  showNavLine,
  fixed = true
}) => {
  return (
    <ul
      role="tablist"
      className="TabList"
      css={css`
        display: flex;
        font-weight: 400;
        list-style-type: none;
        height: ${height};
        box-shadow: ${showNavLine ? `0 -2px 0px 0 inset ${"gray"}` : "none"};
        justify-content: center;
      `}
    >
      {tabs.map((tab, index) => (
        <SingleTabItem
          spacing={spacing}
          isFitted={isFitted}
          key={tab}
          isSelected={activeTab === index}
          onClick={() => onSelect(index)}
          href={tab.url}
        >
          {tab}
        </SingleTabItem>
      ))}
    </ul>
  );
};

TabList.defaultProps = {
  isFitted: true,
  activeTab: "Tab 2",
  height: "52px",
  showNavLine: true
};
