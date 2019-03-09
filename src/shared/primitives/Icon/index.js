import React from "react";
import { Flex } from "@rebass/emotion";

const IconGroup1 = React.lazy(() =>
  import(/* webpackChunkName: "group1" */ "./group1.js")
);
const IconGroup2 = React.lazy(() =>
  import(/* webpackChunkName: "group2" */ "./group2.js")
);
const IconGroup3 = React.lazy(() =>
  import(/* webpackChunkName: "group3" */ "./group3.js")
);
const IconGroup4 = React.lazy(() =>
  import(/* webpackChunkName: "group4" */ "./group4.js")
);
const IconGroup5 = React.lazy(() =>
  import(/* webpackChunkName: "group5" */ "./group5.js")
);
const IconGroup6 = React.lazy(() =>
  import(/* webpackChunkName: "group6" */ "./group6.js")
);
let icons = [
  [
    "add",
    "add-user",
    "add-doc",
    "right-arrow",
    "clock-02",
    "share",
    "framed-left-arrow",
    "framed-right-arrow",
    "doc",
    "calendar",
    "dots",
    "dots-01",
    "explore",
    "refresh",
    "star",
    "time-lapse",
    "edit-01",
    "avatar",
    "search",
    "up-and-down"
  ],
  [
    "funnel",
    "left-arrow",
    "delete",
    "delete-01",
    "clock",
    "close",
    "copy",
    "copy-01",
    "comment--colored",
    "expand-01",
    "shrink",
    "minus",
    "edit",
    "pen",
    "info",
    "up-arrow",
    "down-arrow",
    "warning",
    "error",
    "check"
  ],
  [
    "pdf",
    "check-circle",
    "link",
    "broken-link",
    "upload",
    "eye",
    "eye-ban",
    "globe",
    "lock",
    "award",
    "briefcase",
    "certificate",
    "computer",
    "download",
    "download-01",
    "email",
    "email-outline",
    "lock-outline",
    "facebook",
    "linkedin",
    "location"
  ],
  [
    "wand",
    "country",
    "phone",
    "mobile-phone",
    "save",
    "tools",
    "twitter",
    "whatsapp",
    "bell",
    "education",
    "help",
    "language",
    "send",
    "user",
    "loading",
    "loading-01",
    "messenger",
    "save-time",
    "rotate-left",
    "rotate-right"
  ],
  [
    "check-01",
    "close-01",
    "long-right-arrow",
    "long-left-arrow",
    "menu",
    "github",
    "behance",
    "home",
    "settings",
    "grow",
    "settings-01",
    "logout",
    "font",
    "dashboard",
    "language-01",
    "like",
    "folder",
    "charity",
    "publication",
    "trophy",
    "heart"
  ],
  [
    "badge",
    "expand",
    "bell-outline",
    "google",
    "cancel",
    "id-card",
    "instagram",
    "chat-heart",
    "chat-comment",
    "play",
    "play-01",
    "drag",
    "drag-01",
    "headset",
    "palette",
    "move",
    "money",
    "lightening",
    "spacing",
    "control",
    "add-section",
    "gmail",
    "paystack",
    "mailchimp"
  ]
];
let components = [
  IconGroup1,
  IconGroup2,
  IconGroup3,
  IconGroup4,
  IconGroup5,
  IconGroup6
];
export const Icon = ({ name, color, size, className, css }) => {
  let index = icons.findIndex(iconData => iconData.includes(name));
  if (index > -1) {
    let Component = components[index];
    return (
      <React.Suspense fallback={<div />}>
        <Component {...{ name, color, size, className, css }} />
      </React.Suspense>
    );
  }
  return null;
};

Icon.defaultProps = {
  name: "left-arrow",
  size: 16,
  className: ""
};

export const iconList = icons.flatMap(x => x);

export const FramedIcon = ({
  frameColor,
  name,
  iconColor,
  size,
  frameSize,
  ...rest
}) => {
  const defaultFrameSize = `${parseInt(size) * 2}px`;
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bgColor={frameColor}
      borderRadius="50%"
      height={frameSize || defaultFrameSize}
      width={frameSize || defaultFrameSize}
      {...rest}
    >
      <Icon name={name} size={size} color={iconColor} />
    </Flex>
  );
};
