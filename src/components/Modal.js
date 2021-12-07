import React, { Fragment } from "react";
import ReactDOM from "react-dom";
//import styled from "styled-components"
import { ModalContext } from "components/contexts/modalContext";


const Modal = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <div
        className="modalFullScreen" 
        onClick={() => handleModal()}
      >
        <div className="modalScreen">
          <div >
            {modalContent}
          </div>
        </div>

      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
