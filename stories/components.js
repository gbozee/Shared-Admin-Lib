/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { Box, Flex, Text } from "@rebass/emotion";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import { Tabs, TabContent } from "../src/shared/primitives";
import { FormDrawer } from "../src/shared/components";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));
const Content = ({ children }) => (
  <Flex
    p="32px"
    mb="8px"
    mt="16px"
    flexDirection="column"
    justifyContent="center"
    css={css`
      align-items: center;
      background-color: rgb(244, 245, 247);
      color: rgb(107, 119, 140);
      flex-grow: 1;
      font-size: 4em;
      font-weight: 300;
      border-radius: 3px;
    `}
  >
    {children}
  </Flex>
);

const TABS = [
  { label: "Tab 1", content: <Content>One</Content> },
  { label: "Tab 2", content: <Content>Two</Content> },
  { label: "Tab 3", content: <Content>Three</Content> },
  { label: "Tab 4", content: <Content>Four</Content> }
];
const Components = storiesOf("Primitives", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("Tabs", () => (
    <Tabs>
      <TabContent heading={"One"}>
        <Content>One</Content>
      </TabContent>
      <TabContent heading={"Two"}>
        <Content>Two</Content>
      </TabContent>
      <TabContent heading={"Thress"}>
        <Content>three</Content>
      </TabContent>
    </Tabs>
  ))
  .add("Form Drawer", () => <FormDrawer />);
