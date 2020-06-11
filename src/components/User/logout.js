import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import * as modalConstants from "../../constants/modal";

Modal.setAppElement("#root");

export default function Logout() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const logout = () => {
    // localStorage.removeItem('token')
    history.push("/"); // back to login page
  };

  return (
    <div>
      <Button variant="dark" onClick={openModal}>
        Logout
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalConstants.logoutModal}
      >
        <h3>本当にログアウトしますか？</h3>
        <button type="submit" onClick={logout}>
          ログアウトします
        </button>
        <button type="submit" onClick={closeModal}>
          戻る
        </button>
      </Modal>
    </div>
  );
}
