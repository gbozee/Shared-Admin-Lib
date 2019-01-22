/** @jsx jsx */
import { css, jsx, Global } from "@emotion/core";
import styled from "@emotion/styled";
import React, { Component } from "react";
import { Text } from "@rebass/emotion";
import { Button, EmptyButton } from "../primitives/Button";

import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { breakpoints, z_index } from "../design-systems/breakpoints";
import { color } from "../design-systems/color";
import { Icon } from "../primitives/Icon";

let slideDirection = props =>
  css`
    ${props.slideDirection === "leftToRight" ? "left: 0" : "right: 0"};
  `;

let openBackDropStyles = props =>
  props.isOpen &&
  props.showBackdrop &&
  css`
    bottom: 0;
    contain: content;
    left: 0;
    overflow: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: ${props => props.zIndex};
    transition-duration: 100ms;
    background-color: rgba(45, 62, 80, 0.79);
  `;

const DrawerDiv = styled.div`
  position: relative;
  z-index: ${z_index.drawer};

  ${openBackDropStyles} .Drawer {
    display: flex;
    flex-flow: column nowrap;
    width: ${props => props.width};
    height: 100vh;
    overflow: auto;
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;

    ${slideDirection} &__Close {
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      display: flex;
      flex-shrink: 0;
      flex-flow: row nowrap;
      padding-top: 16px;
      padding-bottom: 18px;
      width: 100%;
      border-radius: 0;
      border-bottom: 2px solid ${color.gray.ui_02};

      &:focus {
        box-shadow: none;
        background-color: ${color.gray.ui_03};
      }

      &:hover {
        background-color: ${color.gray.ui_03};
      }

      .Icon {
        margin-right: 8px;
        margin-left: -16px;
      }
    }

    &__Content {
      height: 100vh;
      /* padding-top: 24px;
      flex: 1 1 0%;
      overflow: auto;
      padding-bottom: 64px; */
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 100%;
      flex-direction: column-reverse;

      &__Close {
        border-bottom: none;
        box-shadow: 0px -4px 8px 0px #0000000d;
        z-index: 2;
      }
    }

    &-enter {
      transform: translateX(
        ${props => (props.slideDirection === "leftToRight" ? "-100%" : "100%")}
      );
    }

    &-enter-active {
      transform: translateX(0);
      transition: all 0.3s;
    }

    &-exit {
      transform: translateX(0);
    }

    &-exit-active {
      transform: translateX(
        ${props => (props.slideDirection === "leftToRight" ? "-100%" : "100%")}
      );
      transition: all 0.3s;
    }
  }
`;

export class Drawer extends React.Component {
  componentDidMount = () => {
    document.addEventListener("click", this.handleClickOutside, true);
    window.addEventListener("keydown", this.handleKeyDown);
  };

  componentDidUpdate(prevProps) {
    const { isOpen, preventBodyScrollOnMount } = this.props;

    if (isOpen === false) {
      document.body.classList.remove("Drawer__Body--open");
    } else {
      if (preventBodyScrollOnMount) {
        document.body.classList.add("Drawer__Body--open");
      }
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClickOutside, true);
    window.removeEventListener("keydown", this.handleKeyDown);
  };

  handleClickOutside = e => {
    const domNode = ReactDOM.findDOMNode(this);
    const { shouldCloseOnOutsideClick, onClose } = this.props;

    if (
      (!domNode || !domNode.contains(e.target)) &&
      shouldCloseOnOutsideClick
    ) {
      onClose();
    }
  };

  handleKeyDown = e => {
    // If User Presses Escape Key, Close the Drawer
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const {
      width,
      children,
      showCloseButton,
      closeText,
      className,
      isOpen,
      onClose,
      slideDirection,
      zIndex = "1000",
      showBackdrop,
      preventBodyScrollOnMount
    } = this.props;

    return (
      <DrawerDiv
        {...{ width, className, slideDirection, isOpen, showBackdrop, zIndex }}
      >
        <CSSTransition
          classNames="Drawer"
          in={isOpen}
          timeout={300}
          unmountOnExit
        >
          {status => (
            <React.Fragment>
              <div className="Drawer">
                {showCloseButton && (
                  <EmptyButton className="Drawer__Close" onClick={onClose}>
                    <Icon name="left-arrow" />
                    <Text fontWeight="medium">{closeText}</Text>
                  </EmptyButton>
                )}

                <div className="Drawer__Content" style={{ overflow: "scroll" }}>
                  {typeof children === "function" ? children(status) : children}
                </div>
              </div>
            </React.Fragment>
          )}
        </CSSTransition>
      </DrawerDiv>
    );
  }
}

Drawer.defaultProps = {
  width: "256px",
  preventBodyScrollOnMount: false,
  children: "Drawer Content",
  closeText: "Close Drawer",
  showBackdrop: false,
  slideDirection: "leftToRight",
  isOpen: true,
  shouldCloseOnOutsideClick: true,
  showCloseButton: true
};

const DrawerContent = styled.div`
  padding: 40px;
  height: calc(100% - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;

  .Drawer {
    box-shadow: -25px 1px 25px 0 rgba(0, 0, 0, 0.02),
      2px 0 11px 0 rgba(0, 0, 0, 0.25);
  }
`;

const DrawerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: ${color.cyan.primary};
  background-image: linear-gradient(-303deg, #00a4bd, #00afb2 56%, #00bda5);
  color: #fff;
  height: 64px;
  padding: 0 16px 0 40px;

  .CustomerDrawer__Close-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const DrawerFooter = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 13px 40px;
  height: 64px;
  background-color: #fff;
  transform: translate3d(0, 0, 0);
  z-index: 6;
  border-top: 1px solid #dadfe3;
  text-align: right;
`;

export class FormDrawer extends Component {
  render() {
    const {
      onClose,
      isOpen = true,
      action,
      initialValues,
      onSubmit,
      header,
      children,
      edit,
      heading="Request"
    } = this.props;
    return (
      <React.Fragment>
        <Global
          styles={css`
            body.Drawer__Body--open {
              overflow: hidden;
              position: relative;
              height: 100%;
            }
          `}
        />
        <Drawer
          onClose={onClose}
          width="520px"
          isOpen={isOpen}
          showBackdrop
          preventBodyScrollOnMount
          slideDirection="RightToLeft"
          showCloseButton={false}
          zIndex="2"
          shouldCloseOnOutsideClick={false}
        >
          <DrawerHeader>
            <Text fontWeight="medium" size="big" color="white">
              {!edit ? `Create ${heading}` : `Edit ${heading}`}
            </Text>

            <EmptyButton
              onClick={onClose}
              className="CustomerDrawer__Close-btn"
            >
              <Icon name="close" color="white" size="24px" />
            </EmptyButton>
          </DrawerHeader>

          <DrawerContent>{children}</DrawerContent>
        </Drawer>
      </React.Fragment>
    );
  }
}

FormDrawer.defaultProps = {
  isOpen: true,
  action: "add"
};

export default FormDrawer;
