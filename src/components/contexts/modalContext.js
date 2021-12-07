import React from "react";
import useModal from "components/hooks/useModal";
import Modal from "components/Modal";

let ModalContext;
let { Provider } = ( ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, openModal, closeModal, modalContent } = useModal();
  return (
    <Provider value={{ modal, handleModal, openModal, closeModal, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };