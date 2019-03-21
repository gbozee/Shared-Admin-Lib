/** @jsx jsx */
import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Global, css, jsx } from "@emotion/core";
import ReactModal from "react-modal";
import { Button } from ".";

import { Box, Flex, Button as EButton, Text, Link } from "@rebass/emotion";
import "./modal.css";

const xs = 768;

export const ModalFooter = props => {
  const {
    children,
    modalAction,
    onClose,
    style,
    buttonType,
    is,
    showSpinner,
    buttonClass = "primary",
    override,
    disabled
  } = props;
  return (
    <div className="modal-footer" style={style}>
      <div className="row">
        {override ? (
          override(onClose)
        ) : (
          <>
            <Flex justifyContent="space-between">
              <Button
                type={"button"}
                onClick={onClose}
                buttonClass={"btn faint-gray-button capitalize"}
              >
                Cancel
              </Button>
              <Button
                type={buttonType || "submit"}
                is={is}
                showSpinner={showSpinner}
                onClick={e => {
                  e.preventDefault();
                  modalAction();
                }}
                buttonClass={`btn  ${buttonClass} capitalize`}
                disabled={disabled}
              >
                {children}
              </Button>
            </Flex>
          </>
        )}
      </div>
    </div>
  );
};

export const ModalContainer = props => (
  <div className="modal-backdrop">
    <div className={props.modalClass}>{props.children}</div>
  </div>
);

export const ModalHeader = props => (
  <div className="modal-header">
    <div className="row">
      <div className="col-80">
        <h3 className={"modal-title"}>{props.children}</h3>
      </div>
      <div className="col-20" style={{ paddingRight: 0 }}>
        <button
          className="modal-close"
          onClick={e => {
            e.preventDefault();
            props.onClose();
          }}
        >
          <i className="ion ion-android-close" />
        </button>
      </div>
    </div>
  </div>
);

export const ModalContent = props => (
  <div className="modal-body">{props.children}</div>
);
export const Modal = styled(ReactModal)`
  position: absolute;
  max-width: ${props => props.modalWidth}px;
  top: ${props => props.gutter}rem;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: ${props => props.gutter}rem;
  border: 1px solid #ccc;
  background: #fff;
  overflow-scrolling: touch;
  border-radius: 4px;
  outline: none;
  padding: 0;
  &.login {
  }
  & .modal-header {
    position: relative;
    & h2 {
      margin-top: 0;
    }
  }
  ${props =>
    css`
      ${props.css};
    `};
`;

const ImageModal = ({
  backgroundColor = "rgba(71, 82, 93, 0.7)",
  heading,
  headingCss,
  buttonText = "Submit",
  hideFooter = false,
  gutter,
  showModal,
  handleCloseModal,
  width,
  children,
  buttonClass,
  action,
  footerProps = {},
  ...props
}) => {
  let [height, toggleHeight] = useState(null);
  return (
    <Modal
      className={"modal-dialog small"}
      css={props.css || ""}
      gutter={gutter}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="Minimal Modal Example"
      modalWidth={width}
      closeTimeoutMS={100}
      ariaHideApp={false}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          backgroundColor,
          zIndex: 9999
        }
      }}
    >
      <Global
        style={css`
                .ReactModalPortal > div {
            // opacity: 0;
            .ReactModal__Content{
              transform: scale(.9) translate3d(0,0,0);
            }
        }
        
        .ReactModalPortal .ReactModal__Overlay {
          transition: opacity 200ms ease-in-out;
          background: rgba(0, 0, 0, 0.15);
          & .ReactModal__Content{
            transition: transform .6s cubic-bezier(0,0,0,1);
              /* @media(max-width: ${xs}px){
                margin-left: 24px;
                margin-right: 24px;
              } */
          }
          &--after-open {
            opacity: 1;
            & .ReactModal__Content {
              &--after-open {
                transform: scale(1) translate3d(0,0,0);
        
                @media (max-width: 420px) {
                      min-height: 100vh;
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      padding: 0;
                      margin: 0;
                      border-radius: 0;
                      border: 0;
                      overflow: auto;
                }
              }
        
            }
          }
          &--before-close {
              opacity: 0;
          }
        }
        
        `}
      />
      {heading && (
        <ModalHeader onClose={handleCloseModal}>{heading}</ModalHeader>
      )}
      <ModalContent>
        <Flex
          width={1}
          css={css`
            align-items: center;
          `}
        >
          <Text pb={4} fontSize={4} width={1}>
            {children}
          </Text>
        </Flex>
        {!hideFooter && (
          <ModalFooter
            buttonClass={buttonClass}
            onClose={handleCloseModal}
            modalAction={action}
            {...footerProps}
          >
            {buttonText}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
export const Dialog = ({
  modalIsOpen,
  close,
  children,
  buttonText,
  action,
  hideFooter,
  heading,
  footerChildren,
  ...rest
}) => {
  return (
    <ImageModal
      width={45}
      gutter={4}
      showModal={modalIsOpen}
      handleCloseModal={close}
      buttonClass={"red"}
      buttonText={buttonText}
      action={action}
      heading={heading}
      hideFooter={hideFooter}
      footerProps={{ override: footerChildren, ...rest }}
    >
      {children}
    </ImageModal>
  );
};

export const DialogElement = ({
  confirmAction,
  dialogText,
  hideFooter,
  heading,
  children
}) => {
  let [confirm, setConfirm] = useState(false);
  let [data, setData] = useState(null);
  const onConfirmAction = () => {
    confirmAction(this.state.data);
    setConfirm(false);
  };
  const openModal = data => {
    setConfirm(true);
    setData(data);
  };
  return (
    <>
      {children(openModal)}

      <Dialog
        modalIsOpen={confirm}
        close={() => setConfirm(false)}
        heading={heading}
        hideFooter={hideFooter}
        action={onConfirmAction}
      >
        {dialogText(data)}
      </Dialog>
    </>
  );
};
export const DialogButton = ({
  confirmAction,
  dialogText,
  hideFooter,
  heading,
  footerChildren,
  disabled,
  renderComponent = onClick => (
    <Button
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    />
  ),
  ...rest
}) => {
  let [confirm, setConfirm] = useState(false);
  const onConfirmAction = () => {
    confirmAction();
    setConfirm(false);
  };
  return (
    <>
      {React.cloneElement(renderComponent(() => setConfirm(true)), {
        ...rest
      })}
      <Dialog
        modalIsOpen={confirm}
        close={() => setConfirm(false)}
        heading={heading}
        hideFooter={hideFooter}
        action={onConfirmAction}
        footerChildren={footerChildren}
        disabled={disabled}
      >
        {dialogText}
      </Dialog>
    </>
  );
};

export default ImageModal;
