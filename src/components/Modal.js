import React from "react";
import styled from "styled-components";

function Modal({ children, toggleModal, ...rest }) {
  const closeModalHandler = (e) => {
    toggleModal();
    console.log("clicked");
  };

  const onModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper onClick={closeModalHandler}>
      <ModalContainer onClick={onModalClick} {...rest}>
        {children}
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;
const ModalContainer = styled.div`
  z-index: 1;
  width: 400px;
  height: 400px;
  border-radius: 10px;
  background: #fff;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export default Modal;
